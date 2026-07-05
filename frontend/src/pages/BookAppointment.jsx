import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, ClipboardList, CheckCircle, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { getDoctors, bookAppointment } from '../api/services';

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialState = location.state || {};
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initialState.hospitalId) {
      navigate('/hospitals');
    }
  }, [initialState.hospitalId, navigate]);
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialState.doctorId || '');
  const [selectedDate, setSelectedDate] = useState(initialState.preferredDate || '');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    reasonForVisit: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
        
        // If specialization came from Home page instead of doctorId
        if (initialState.specialization && !initialState.doctorId) {
          const match = data.find(d => d.specialization.toLowerCase() === initialState.specialization.toLowerCase());
          if (match) setSelectedDoctorId(match._id);
        }
      } catch (error) {
        console.error("Failed to load doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [initialState]);

  const selectedDoctor = doctors.find(d => d._id === selectedDoctorId);

  // Generate fake time slots based on doctor's hours
  const generateTimeSlots = (doc) => {
    if (!doc || !doc.startTime || !doc.endTime) return [];
    const slots = [];
    
    const parseHour = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let hour = parseInt(time.split(':')[0]);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      return hour;
    };
    
    const startHour = parseHour(doc.startTime);
    const endHour = parseHour(doc.endTime);
    
    for (let i = startHour; i < endHour; i++) {
      const period = i >= 12 ? 'PM' : 'AM';
      const displayHour = i > 12 ? i - 12 : (i === 0 ? 12 : i);
      slots.push(`${displayHour}:00 ${period}`);
      slots.push(`${displayHour}:30 ${period}`);
    }
    return slots.slice(0, 8); // Return sample slots
  };

  const timeSlots = generateTimeSlots(selectedDoctor);

  const handleInputChange = (e) => {
    setPatientDetails({
      ...patientDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step === 1 && !selectedDoctorId) {
      setError('Please select a doctor first.');
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setError('Please select a date and time slot.');
      return;
    }
    setError('');
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientDetails.patientName || !patientDetails.patientPhone) {
      setError('Please fill in required patient details.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const appointmentData = {
        doctorId: selectedDoctorId,
        hospitalId: initialState.hospitalId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        patientName: patientDetails.patientName,
        patientPhone: patientDetails.patientPhone,
        patientEmail: patientDetails.patientEmail || 'no-email@provided.com',
        notes: patientDetails.reasonForVisit,
        priority: patientDetails.priority || 'routine'
      };
      
      await bookAppointment(appointmentData);
      setBookingSuccess(true);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-slate-100">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <CheckCircle size={48} />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Thank you, <span className="font-bold">{patientDetails.patientName}</span>. Your slot is secured.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-left mb-8 space-y-4">
            <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">Appointment Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1 font-medium">Hospital</p>
                <p className="font-bold text-slate-900">{initialState.hospitalName || "Partner Hospital"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1 font-medium">Doctor</p>
                <p className="font-bold text-slate-900">{selectedDoctor?.name || "Assigned Doctor"}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1 font-medium">Date</p>
                <p className="font-bold text-slate-900">{selectedDate}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1 font-medium">Time</p>
                <p className="font-bold text-slate-900">{selectedTime}</p>
              </div>
            </div>
          </div>

          {(patientDetails.patientEmail || patientDetails.patientPhone) && (
            <div className="text-sm text-slate-500 bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-8 flex flex-col gap-2">
              <p className="font-bold text-blue-800">What's Next?</p>
              {patientDetails.patientPhone && (
                <p>We've sent a <strong className="text-blue-700">WhatsApp</strong> confirmation to {patientDetails.patientPhone}.</p>
              )}
              {patientDetails.patientEmail && patientDetails.patientEmail !== 'no-email@provided.com' && (
                <p>An electronic receipt has been sent via <strong className="text-blue-700">Email</strong> to {patientDetails.patientEmail}.</p>
              )}
            </div>
          )}

          <button 
            onClick={() => navigate('/home')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-400">
            {initialState.hospitalName || "Partner Hospital"}
          </div>
          <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Complete the steps below to secure your consultation slot.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row min-h-[500px]">
          
          {/* Progress Sidebar */}
          <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-8">Booking Progress</h3>
              <div className="space-y-8">
                <div className={`flex items-center gap-4 ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-400 bg-blue-400/20' : 'border-slate-700'}`}>
                    <User size={18} />
                  </div>
                  <span className="font-medium">1. Select Doctor</span>
                </div>
                
                <div className={`flex items-center gap-4 ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-400 bg-blue-400/20' : 'border-slate-700'}`}>
                    <Calendar size={18} />
                  </div>
                  <span className="font-medium">2. Date & Time</span>
                </div>
                
                <div className={`flex items-center gap-4 ${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-400 bg-blue-400/20' : 'border-slate-700'}`}>
                    <ClipboardList size={18} />
                  </div>
                  <span className="font-medium">3. Patient Details</span>
                </div>
              </div>
            </div>
            
            {selectedDoctor && (
              <div className="mt-12 p-5 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Selected Doctor</p>
                <div className="flex items-center gap-3">
                  <img src={selectedDoctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedDoctor.name)}&background=eff6ff&color=2563eb`} alt={selectedDoctor.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-white">{selectedDoctor.name}</p>
                    <p className="text-xs text-blue-400">{selectedDoctor.specialization}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10 flex-1 flex flex-col relative overflow-hidden">
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                {error}
              </div>
            )}

            <div className="flex-1 relative">
              <AnimatePresence custom={direction} mode="wait">
                {/* Step 1: Doctor Selection */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose a Specialist</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {doctors.map(doctor => (
                        <div 
                          key={doctor._id}
                          onClick={() => setSelectedDoctorId(doctor._id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 ${selectedDoctorId === doctor._id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-300'}`}
                        >
                          <img src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=eff6ff&color=2563eb`} className="w-14 h-14 rounded-full object-cover" alt={doctor.name} />
                          <div>
                            <p className="font-bold text-slate-900">{doctor.name}</p>
                            <p className="text-xs text-slate-500">{doctor.specialization}</p>
                            <p className="text-xs font-bold text-blue-600 mt-1">${doctor.fee}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Date & Time</h2>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-700 font-medium"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Available Time Slots</label>
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map(time => (
                            <div 
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 text-center rounded-xl border-2 cursor-pointer transition-all font-medium text-sm flex items-center justify-center gap-2 ${selectedTime === time ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'}`}
                            >
                              <Clock size={14} className={selectedTime === time ? 'text-white' : 'text-slate-400'} /> {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Patient Details */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                        <div className="relative">
                          <UserCheck className="absolute left-4 top-3.5 text-slate-400" size={18} />
                          <input type="text" name="patientName" value={patientDetails.patientName} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm" placeholder="John Doe" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                          <input type="text" name="patientPhone" value={patientDetails.patientPhone} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm mb-1" placeholder="+1 234 567 8900" required />
                          <p className="text-[10px] text-slate-500 font-medium">Used for secure WhatsApp booking confirmation.</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Age</label>
                          <input type="number" name="patientAge" value={patientDetails.patientAge} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm" placeholder="35" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input type="email" name="patientEmail" value={patientDetails.patientEmail} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm mb-1" placeholder="john@example.com" />
                        <p className="text-[10px] text-slate-500 font-medium">Used to send your electronic receipt and appointment reminder.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Urgency / Priority</label>
                          <select name="priority" value={patientDetails.priority || 'routine'} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm">
                            <option value="routine">Routine Checkup</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Visit</label>
                          <input type="text" name="reasonForVisit" value={patientDetails.reasonForVisit} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm" placeholder="Briefly describe your symptoms..."/>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              {step > 1 ? (
                <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors">
                  <ArrowLeft size={18} /> Back
                </button>
              ) : <div></div>}
              
              {step < 3 ? (
                <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'} <CheckCircle size={18} />
                </button>
              )}
            </div>

          </div>
        </div>
      </PageContainer>
    </div>
  );
}