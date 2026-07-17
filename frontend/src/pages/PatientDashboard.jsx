import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Calendar, FileText, Settings, Bell, 
  Sparkles, CheckCircle2, ChevronRight, Download, Info
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import CardWrapper from '../components/layout/CardWrapper';
import { appointmentAPI } from '../services/api';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    whatsapp: true,
    sms: true,
    email: false
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentAPI.getAll();
        // Assume current logged in patient matches Alice Smith or general entries
        setAppointments(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load appointments for patient dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const medicalRecords = [
    { title: 'Lipid Panel Report', date: '2026-06-15', doc: 'Dr. Sarah Jenkins', file: 'lipid_panel.pdf' },
    { title: 'Echocardiogram Diagnostic', date: '2026-05-10', doc: 'Dr. Sarah Jenkins', file: 'echo_diagnostics.pdf' },
    { title: 'Routine Complete Blood Count', date: '2026-02-18', doc: 'Dr. James Wilson', file: 'blood_cbc.pdf' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 pt-8 pb-16 text-white relative overflow-hidden">
        <PageContainer>
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate('/home')} 
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition-all font-bold cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <span className="text-xs bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 px-3 py-1 rounded-full font-bold">
              Account Active
            </span>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">Patient Portal</h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Welcome back, <strong>Alice Smith</strong>. Manage your scheduled slots, view physician notes, review lab sheets, and adjust notification profiles.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Appointments & Medical Records */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* AI Advisor Card */}
            <CardWrapper className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-950/60 dark:to-indigo-950/60 text-white border-none shadow-[0_4px_20px_rgba(37,99,235,0.25)] p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1 flex items-center gap-1.5">
                    AI Health Companion Insights
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed mb-3">
                    Based on your cardiology checkup history, maintaining a low-sodium diet and logging any blood pressure fluctuations is recommended. The optimization engine recommends a follow-up consultation in September.
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate('/features/symptom-checker')}
                      className="bg-white hover:bg-slate-100 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Run Symptom Check
                    </button>
                  </div>
                </div>
              </div>
            </CardWrapper>

            {/* Upcoming Appointments */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Your Schedule</h3>
                <button 
                  onClick={() => navigate('/hospitals')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  Book New Slot <ChevronRight size={13} />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-6">
                  <p className="text-slate-400 text-xs">Loading appointments...</p>
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map(apt => (
                    <div 
                      key={apt._id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-700/60 rounded-2xl flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                            {apt.doctorId?.name || 'Assigned Provider'}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{apt.specialization}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{apt.appointmentDate} | {apt.appointmentTime}</p>
                        </div>
                      </div>
                      <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {apt.status || 'Confirmed'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">No appointments scheduled.</p>
                </div>
              )}
            </CardWrapper>

            {/* Medical Records & Lab Reports */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">Medical Records &amp; Lab Reports</h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {medicalRecords.map((record, i) => (
                  <div 
                    key={i}
                    className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-700/60 rounded-2xl flex flex-col justify-between h-40"
                  >
                    <div>
                      <FileText className="text-slate-400 dark:text-slate-500 mb-2" size={24} />
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">{record.title}</h4>
                      <p className="text-[9px] text-slate-400 mt-1">{record.date} | {record.doc}</p>
                    </div>
                    
                    <button 
                      onClick={() => alert(`Simulating report download: ${record.file}`)}
                      className="w-full mt-3 py-1.5 bg-slate-200 hover:bg-slate-350 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-[10px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Download size={11} /> Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </CardWrapper>

          </div>

          {/* RIGHT: Channels Preferences */}
          <div className="lg:col-span-4 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Notification Profiles</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Configure preferred delivery methods for automated slot updates, warnings, and wait-time notifications.
              </p>

              <div className="space-y-3">
                {[
                  { id: 'whatsapp', label: 'WhatsApp Messenger' },
                  { id: 'sms', label: 'SMS Texts' },
                  { id: 'email', label: 'Email Reports' }
                ].map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setPreferences(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      preferences[item.id]
                        ? 'border-blue-500 bg-blue-500/5 text-slate-950 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs">{item.label}</span>
                    <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${
                      preferences[item.id] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 transform ${
                        preferences[item.id] ? 'translate-x-3.5' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-2 flex items-center gap-1.5">
                <Info size={14} className="text-blue-500" /> Patient Support
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Need to transfer records, request clinical corrections, or cancel health rosters? Reach out to support staff.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-250 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Contact Support Desk
              </button>
            </CardWrapper>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
