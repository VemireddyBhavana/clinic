const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patientName: { type: String },
  patientPhone: { type: String },
  patientEmail: { type: String },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['booking_confirmation', 'reminder', 'follow_up', 'alert'], 
    required: true 
  },
  channel: {
    type: String,
    enum: ['whatsapp', 'email', 'sms', 'system'],
    default: 'system'
  },
  scheduledFor: { type: Date },
  sentAt: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'sent', 'failed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
