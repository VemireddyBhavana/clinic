const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const { sendEmail, sendWhatsApp } = require('../utils/notificationService');

const calculateNoShowRisk = (appointmentDate, appointmentTime, priority) => {
  let score = 0;
  let reasons = [];
  
  // 1. Date factor
  const daysDiff = Math.ceil((new Date(appointmentDate) - new Date()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 7) {
    score += 3;
    reasons.push("Far-future booking date (>7 days out)");
  } else if (daysDiff > 3) {
    score += 1;
    reasons.push("Moderate booking buffer (>3 days out)");
  }
  
  // 2. Time factor
  const hour = parseInt(appointmentTime.split(':')[0]);
  const isMorning = hour < 9;
  const isEvening = hour >= 18;
  if (isMorning) {
    score += 2;
    reasons.push("Early morning slot");
  } else if (isEvening) {
    score += 2;
    reasons.push("Late evening slot");
  }
  
  // 3. Priority factor
  if (priority === 'urgent') {
    score -= 2;
    reasons.push("High priority urgency discount");
  } else if (priority === 'routine') {
    score += 1;
    reasons.push("Routine appointment buffer");
  }
  
  let risk = 'low';
  if (score >= 3) risk = 'high';
  else if (score >= 1) risk = 'medium';
  
  let reason = reasons.length > 0 
    ? `AI Risk Factors: ${reasons.join(', ')}.` 
    : 'AI Risk Factors: Stable booking metrics.';
    
  return { risk, reason };
};

const triggerWaitlistAutopilot = async (cancelledAppt) => {
  try {
    // Find future booked appointments for the same doctor
    const futureAppt = await Appointment.findOne({
      doctorId: cancelledAppt.doctorId,
      status: 'booked',
      _id: { $ne: cancelledAppt._id },
      appointmentDate: { $gt: cancelledAppt.appointmentDate }
    }).sort({ appointmentDate: 1, appointmentTime: 1 });

    if (!futureAppt) {
      console.log("Waitlist Autopilot: No future appointments found to offer slot.");
      return;
    }

    const offerMessage = `Hello ${futureAppt.patientName}, a slot has just opened up with Dr. ${cancelledAppt.doctorName} on ${cancelledAppt.appointmentDate} at ${cancelledAppt.appointmentTime}. Would you like to reschedule and see the doctor sooner? Reply YES to confirm!`;

    // Queue the WhatsApp Notification for this waitlist patient
    await Notification.create({
      appointmentId: futureAppt._id,
      patientName: futureAppt.patientName,
      patientPhone: futureAppt.patientPhone,
      type: 'reminder',
      channel: 'whatsapp',
      message: offerMessage,
      status: 'pending'
    });

    // Create a system alert in Notification log to show in Admin
    await Notification.create({
      appointmentId: cancelledAppt._id,
      patientName: cancelledAppt.patientName,
      type: 'alert',
      channel: 'system',
      message: `Waitlist Autopilot: Offered freed slot (${cancelledAppt.appointmentDate} at ${cancelledAppt.appointmentTime}) to ${futureAppt.patientName} (originally scheduled on ${futureAppt.appointmentDate}) via WhatsApp.`,
      status: 'pending'
    });

    console.log(`Waitlist Autopilot: Offered slot to ${futureAppt.patientName}`);
  } catch (error) {
    console.error("Error in Waitlist Autopilot:", error);
  }
};

// @route   POST /api/appointments/book
exports.bookAppointment = async (req, res) => {
  try {
    const { 
      patientName, patientEmail, patientPhone, doctorId, 
      appointmentDate, appointmentTime, notes, priority, noShowRisk 
    } = req.body;

    // 0. Validate appointment date & slot time against current IST time
    const now = new Date();
    const istDateFormatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const istToday = istDateFormatter.format(now);

    if (appointmentDate < istToday) {
      return res.status(400).json({
        message: 'Appointments cannot be booked for past dates. Please select today or a future date.'
      });
    }

    if (appointmentDate === istToday && appointmentTime) {
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const timeParts = timeFormatter.formatToParts(now);
      let hour = 0;
      let minute = 0;
      timeParts.forEach(p => {
        if (p.type === 'hour') hour = parseInt(p.value, 10);
        if (p.type === 'minute') minute = parseInt(p.value, 10);
      });
      const istCurrentMinutes = (hour % 24) * 60 + minute;

      const [time, period] = appointmentTime.split(' ');
      let [h, m] = time.split(':').map(Number);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      const slotMinutes = h * 60 + m;

      if (slotMinutes <= istCurrentMinutes) {
        return res.status(400).json({
          message: 'This consultation time slot has already passed for today according to IST. Please select a future time slot.'
        });
      }
    }

    // 1. Prevent Double Booking
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: 'cancelled' } // Allow booking if previous was cancelled
    });

    if (existingAppointment) {
      return res.status(400).json({ 
        message: 'Double booking detected. The doctor is already booked for this time slot.' 
      });
    }

    // Get doctor and hospital info for denormalization
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    
    let hospitalName = 'Unknown Hospital';
    if (req.body.hospitalId) {
      const hospital = await Hospital.findById(req.body.hospitalId);
      if (hospital) hospitalName = hospital.name;
    }

    // Calculate dynamic No-Show risk score
    const riskAnalysis = calculateNoShowRisk(appointmentDate, appointmentTime, priority || 'routine');

    // 2. Create Appointment
    const newAppointment = new Appointment({
      patientName,
      patientEmail,
      patientPhone,
      doctorId,
      hospitalId: req.body.hospitalId,
      hospitalName,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      appointmentDate,
      appointmentTime,
      notes,
      priority: priority || 'routine',
      noShowRisk: riskAnalysis.risk,
      noShowReason: riskAnalysis.reason,
      status: 'booked'
    });

    const savedAppointment = await newAppointment.save();

    // 3. Create Notification Log entries automatically in DB
    const emailNotification = new Notification({
      appointmentId: savedAppointment._id,
      patientName: patientName,
      patientEmail: patientEmail,
      type: 'booking_confirmation',
      channel: 'email',
      message: `Your appointment with ${doctor.name} at ${hospitalName} is confirmed for ${appointmentDate} at ${appointmentTime}.`,
      status: 'pending'
    });
    await emailNotification.save();

    const whatsappNotification = new Notification({
      appointmentId: savedAppointment._id,
      patientName: patientName,
      patientPhone: patientPhone,
      type: 'booking_confirmation',
      channel: 'whatsapp',
      message: `Hello ${patientName}, your appointment at ${hospitalName} is confirmed for ${appointmentDate} at ${appointmentTime}.`,
      status: 'pending'
    });
    await whatsappNotification.save();

    // Create a scheduled reminder (1 day before)
    const appointmentDateObj = new Date(appointmentDate);
    appointmentDateObj.setDate(appointmentDateObj.getDate() - 1);
    const reminderNotification = new Notification({
      appointmentId: savedAppointment._id,
      patientName: patientName,
      patientPhone: patientPhone,
      type: 'reminder',
      channel: 'whatsapp',
      scheduledFor: appointmentDateObj,
      message: `Reminder: You have an appointment tomorrow at ${hospitalName} with ${doctor.name} at ${appointmentTime}.`,
      status: 'pending'
    });
    await reminderNotification.save();

    // 4. Send External Notifications (WhatsApp & Email)
    const emailSubject = 'Booking Confirmation - MediSlot AI';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Appointment Confirmed!</h2>
        </div>
        <div style="padding: 20px;">
          <p>Dear <strong>${patientName}</strong>,</p>
          <p>Your appointment has been successfully booked. Here are the details:</p>
          <ul style="background-color: #f8fafc; padding: 15px 15px 15px 35px; border-radius: 8px;">
            <li><strong>Hospital:</strong> ${hospitalName}</li>
            <li><strong>Doctor:</strong> ${doctor.name} (${doctor.specialization})</li>
            <li><strong>Date:</strong> ${appointmentDate}</li>
            <li><strong>Time:</strong> ${appointmentTime}</li>
          </ul>
          <p>Please arrive 10 minutes before your scheduled time.</p>
          <p>Thank you for choosing MediSlot AI!</p>
        </div>
      </div>
    `;
    
    // Send email async without blocking the response
    if (patientEmail && patientEmail !== 'no-email@provided.com') {
      sendEmail(patientEmail, emailSubject, emailHtml).then(async (result) => {
        if (result && result.success) {
          emailNotification.status = 'sent';
        } else {
          emailNotification.status = 'failed';
          emailNotification.message += ` [ERROR: ${result.error}]`;
        }
        emailNotification.sentAt = new Date();
        await emailNotification.save();
      }).catch(err => console.error("Email async error:", err));
    }
    
    if (patientPhone) {
      const waMessage = `*Appointment Confirmed!*\n\nHi ${patientName},\nYour appointment with ${doctor.name} at ${hospitalName} is scheduled for *${appointmentDate}* at *${appointmentTime}*.\n\nThank you, MediSlot AI.`;
      
      // Send async without blocking response
      sendWhatsApp(patientPhone, waMessage).then(async (result) => {
        if (result && result.success) {
          whatsappNotification.status = 'sent';
        } else {
          whatsappNotification.status = 'failed';
          whatsappNotification.message += ` [ERROR: ${result.error}]`;
        }
        whatsappNotification.sentAt = new Date();
        await whatsappNotification.save();
      }).catch(err => console.error("WhatsApp async error:", err));
    }

    res.status(201).json({ 
      message: 'Appointment booked successfully', 
      appointment: savedAppointment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   GET /api/appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   GET /api/appointments/:id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    // Supports updating status (completed, cancelled, no-show)
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    
    // Auto trigger notification if status changed to no-show or cancelled
    if (req.body.status === 'no-show' || req.body.status === 'cancelled') {
      await Notification.create({
        appointmentId: updatedAppointment._id,
        patientName: updatedAppointment.patientName,
        patientPhone: updatedAppointment.patientPhone,
        patientEmail: updatedAppointment.patientEmail,
        type: 'follow_up',
        channel: 'whatsapp',
        message: `Hi ${updatedAppointment.patientName}, you missed your appointment with Dr. ${updatedAppointment.doctorName}. Would you like to reschedule?`,
        status: 'pending',
        scheduledFor: new Date() // send immediately
      });
      
      // Also keep the internal alert
      await Notification.create({
        appointmentId: updatedAppointment._id,
        patientName: updatedAppointment.patientName,
        type: 'alert',
        channel: 'system',
        message: `Patient ${updatedAppointment.patientName} was a ${req.body.status} for appointment with Dr. ${updatedAppointment.doctorName}.`,
        status: 'pending'
      });
      
      // If cancelled, trigger the Smart Rescheduling waitlist autopilot
      if (req.body.status === 'cancelled') {
        await triggerWaitlistAutopilot(updatedAppointment);
      }
    }

    res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   GET /api/appointments/doctor/:doctorId
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
