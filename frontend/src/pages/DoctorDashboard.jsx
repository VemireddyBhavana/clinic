import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Users, Calendar, ShieldCheck, Clock, Sparkles, 
  CheckCircle, Play, UserCheck, Stethoscope, FileText
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import CardWrapper from '../components/layout/CardWrapper';

import LanguageSelector from '../components/ui/LanguageSelector';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([
    { 
      id: 'APT-1092', 
      name: 'Alice Smith', 
      time: '10:30 AM', 
      status: 'Awaiting', 
      symptoms: 'I have chest pain and shortness of breath when walking up stairs.',
      aiSummary: 'Patient presenting with exertional chest discomfort & dyspnea. Risk flags: cardiac pathway. Recommended: immediate ECG, blood draw for troponin, blood pressure tracking.' 
    },
    { 
      id: 'APT-1093', 
      name: 'Bob Johnson', 
      time: '11:15 AM', 
      status: 'Awaiting', 
      symptoms: 'I have a high fever, dry cough, and persistent fatigue since 3 days.',
      aiSummary: 'Presentation fits upper respiratory viral checklist. High load observed. Recommended: lung auscultation, rapid viral swabs, standard antipyretics.' 
    },
    { 
      id: 'APT-1094', 
      name: 'Charlie Brown', 
      time: '12:00 PM', 
      status: 'Awaiting', 
      symptoms: 'Chronic lower back stiffness and radiating pain down left leg.',
      aiSummary: 'Suspected lumbar radiculopathy (sciatica). Recommended: straight leg raise test, review MRI referrals, adjust ergonomic profiles.' 
    }
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const activePatients = patients.filter(p => p.status !== 'Completed');
  const checkedInCount = patients.filter(p => p.status === 'Checked In').length;
  const completedCount = patients.filter(p => p.status === 'Completed').length;

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
            <div className="flex items-center gap-3">
              <span className="text-xs bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 px-3 py-1 rounded-full font-bold">
                Provider Portal
              </span>
              <LanguageSelector dropdownPosition="bottom-right" />
            </div>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">Clinical Console</h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Welcome back, <strong>Dr. Sarah Jenkins</strong>. Manage your live clinical queues, view Gemini patient intake summaries, and check in arrivals.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Quick Stats Summary */}
          <div className="lg:col-span-4 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Today's Schedule Summary</h2>
              
              <div className="space-y-4">
                {/* Total Patients */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total Roster Slots</p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">{patients.length}</p>
                  </div>
                  <Users className="text-slate-400" size={24} />
                </div>

                {/* Checked In */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">In Waiting Room</p>
                    <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{checkedInCount}</p>
                  </div>
                  <Clock className="text-blue-500" size={24} />
                </div>

                {/* Completed */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Visits Completed</p>
                    <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{completedCount}</p>
                  </div>
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
              </div>
            </CardWrapper>

            {/* Provider Notes helper */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs mb-2 flex items-center gap-1.5">
                <FileText size={14} className="text-blue-500" /> Clinic Directives
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Remember to verify insurance papers, request patient details during checkout, and report any workload roster deviations to the hospital board.
              </p>
            </CardWrapper>
          </div>

          {/* RIGHT: Patients Queue Controls */}
          <div className="lg:col-span-8 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">Patient Check-In Queue</h3>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {activePatients.length > 0 ? (
                    activePatients.map(patient => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        key={patient.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          patient.status === 'Checked In'
                            ? 'border-blue-500/60 bg-blue-500/5'
                            : 'border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-850/40'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              {patient.id}
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">{patient.name}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                              <Clock size={12} /> Scheduled: {patient.time}
                            </p>
                          </div>
                          
                          {/* Controls */}
                          <div className="flex gap-2">
                            {patient.status === 'Awaiting' && (
                              <button 
                                onClick={() => handleUpdateStatus(patient.id, 'Checked In')}
                                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                              >
                                <Play size={11} /> Check In Patient
                              </button>
                            )}
                            {patient.status === 'Checked In' && (
                              <button 
                                onClick={() => handleUpdateStatus(patient.id, 'Completed')}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                              >
                                <UserCheck size={11} /> Complete Visit
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Symptoms box */}
                        <div className="mb-3">
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Patient Symptoms Description</label>
                          <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850/80 leading-relaxed font-sans">
                            {patient.symptoms}
                          </p>
                        </div>

                        {/* AI Intake Summary */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-3.5 rounded-xl">
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles className="text-blue-500" size={13} />
                            <span className="text-[9px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">Gemini Clinical Summary</span>
                          </div>
                          <p className="text-xs text-blue-900 dark:text-blue-300 leading-relaxed">
                            {patient.aiSummary}
                          </p>
                        </div>

                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                      <CheckCircle className="text-emerald-500 mx-auto mb-2" size={32} />
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">Roster Cleared!</h4>
                      <p className="text-xs text-slate-400">All scheduled clinical patient visits have been completed.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardWrapper>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
