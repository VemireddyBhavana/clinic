import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, User, AlertTriangle, ShieldCheck, Mail, Phone, CalendarCheck, Send } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import CardWrapper from '../../components/layout/CardWrapper';

export default function NoShowPrediction() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('Alice Smith');
  const [outreachConfirmed, setOutreachConfirmed] = useState(false);

  const demoPatients = {
    'Alice Smith': {
      risk: 'Low',
      score: 12,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      reason: 'Patient has a 100% attendance history and booked a mid-afternoon slot (2:00 PM) within 2 days of availability.',
      recommendation: 'Send standard booking confirmation email and auto-scheduled WhatsApp reminder 24h prior.',
      history: [
        { id: '#APT-9920', date: '2026-06-15', doc: 'Dr. Sarah Jenkins', status: 'Completed' },
        { id: '#APT-8812', date: '2026-05-10', doc: 'Dr. Emily Carter', status: 'Completed' }
      ]
    },
    'Bob Johnson': {
      risk: 'High',
      score: 84,
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      reason: 'AI Risk Factors: Patient has missed 2 of their last 3 appointments. Early morning slot (8:00 AM) booked 12 days in advance increases failure metrics.',
      recommendation: 'Priority Outreach: Trigger interactive automated phone call verification 48 hours prior, and double-confirm via WhatsApp. Require manual staff callback if unanswered.',
      history: [
        { id: '#APT-9241', date: '2026-06-20', doc: 'Dr. Robert Chen', status: 'No-Show' },
        { id: '#APT-8115', date: '2026-06-02', doc: 'Dr. Anita Patel', status: 'Completed' },
        { id: '#APT-7128', date: '2026-05-18', doc: 'Dr. James Wilson', status: 'No-Show' }
      ]
    },
    'Charlie Brown': {
      risk: 'Medium',
      score: 48,
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      reason: 'AI Risk Factors: Far-future booking date (>7 days out). Patient has stable historic metrics but high cancelled-to-completed ratio.',
      recommendation: 'Send email alert and WhatsApp re-engagement notes with a direct "Reschedule or Cancel" click-action.',
      history: [
        { id: '#APT-9008', date: '2026-07-01', doc: 'Dr. Emily Carter', status: 'Cancelled' },
        { id: '#APT-8890', date: '2026-06-12', doc: 'Dr. Sarah Jenkins', status: 'Completed' }
      ]
    }
  };

  const currentPatient = demoPatients[selectedPatient];

  const handleConfirmOutreach = () => {
    setOutreachConfirmed(true);
    setTimeout(() => setOutreachConfirmed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 pt-8 pb-16 text-white relative overflow-hidden">
        <PageContainer>
          <button 
            onClick={() => navigate('/home')} 
            className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 mb-6 transition-all font-bold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 mb-3">
              <Brain size={12} /> Predictive Analytics
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">AI No-Show Risk Prediction</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              MediSlot AI uses machine learning to assign a no-show risk score to each booked slot, helping clinics preemptively engage patients and reduce missed appointments.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Explanation & Demo Control */}
          <div className="lg:col-span-1 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Select Demo Patient</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose a patient profile to test the AI risk assessment engine.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Patient Profile</label>
                  <select 
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {Object.keys(demoPatients).map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Risk Score Dial Card */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-150 dark:border-slate-700/60 flex flex-col items-center justify-center text-center">
                  <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                    {/* Ring background */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(226,232,240,0.4)" strokeWidth="8" fill="transparent" />
                      <motion.circle 
                        cx="50" cy="50" r="40" 
                        stroke={currentPatient.risk === 'High' ? '#ef4444' : currentPatient.risk === 'Medium' ? '#f97316' : '#10b981'} 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251"
                        animate={{ strokeDashoffset: 251 - (251 * currentPatient.score) / 100 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none">{currentPatient.score}%</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">No-Show Risk</span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentPatient.color}`}>
                    {currentPatient.risk === 'High' ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
                    {currentPatient.risk} Risk Profile
                  </span>
                </div>
              </div>
            </CardWrapper>
          </div>

          {/* RIGHT: AI Risk Breakdown & Reminders */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Risk Factors Explanations */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Brain className="text-blue-500" size={20} /> AI Risk Assessment Analysis
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-150 dark:border-slate-700/60 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {currentPatient.reason}
              </div>
            </CardWrapper>

            {/* Smart Reminder Recommendation */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">AI Recommended Outreach Plan</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                The optimization engine customizes notification intervals and outreach priorities based on predicted scores to avoid cancellations.
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 p-4 rounded-2xl mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <Send size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 dark:text-blue-200 text-xs mb-1">Outreach Protocol</h4>
                    <p className="text-xs text-blue-800 dark:text-blue-300 leading-normal">{currentPatient.recommendation}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirmOutreach}
                disabled={outreachConfirmed}
                className={`w-full py-3 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  outreachConfirmed 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-0.5'
                }`}
              >
                {outreachConfirmed ? (
                  <>
                    <ShieldCheck size={14} /> Outreach Protocol Dispatched!
                  </>
                ) : (
                  <>
                    <CalendarCheck size={14} /> Confirm Automated Outreach Protocol
                  </>
                )}
              </button>
            </CardWrapper>

            {/* Previous History logs */}
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 overflow-hidden" noPadding>
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Historical Attendance Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 border-b border-slate-100 dark:border-slate-800 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Booking ID</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Assigned Provider</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentPatient.history.map(row => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">{row.id}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.date}</td>
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-bold">{row.doc}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === 'Completed' 
                              ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200/50' 
                              : row.status === 'No-Show' 
                              ? 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200/50'
                              : 'bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 border border-orange-200/50'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardWrapper>

          </div>

        </div>
      </PageContainer>
    </div>
  );
}
