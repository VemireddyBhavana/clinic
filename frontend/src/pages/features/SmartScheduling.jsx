import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles, CheckCircle2, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import CardWrapper from '../../components/layout/CardWrapper';

export default function SmartScheduling() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology');
  const [demoActive, setDemoActive] = useState(false);

  const specialtiesData = {
    Cardiology: { manualWait: 45, aiWait: 6, recommendedSlot: '10:30 AM Today', doc: 'Dr. Sarah Jenkins' },
    Neurology: { manualWait: 60, aiWait: 8, recommendedSlot: '11:15 AM Today', doc: 'Dr. Robert Chen' },
    Pediatrics: { manualWait: 30, aiWait: 5, recommendedSlot: '09:00 AM Tomorrow', doc: 'Dr. Emily Carter' },
    Dermatology: { manualWait: 40, aiWait: 7, recommendedSlot: '02:30 PM Today', doc: 'Dr. Michael Rodriguez' },
    Orthopedics: { manualWait: 50, aiWait: 9, recommendedSlot: '04:15 PM Today', doc: 'Dr. Anita Patel' },
    'General Practice': { manualWait: 25, aiWait: 4, recommendedSlot: '08:45 AM Today', doc: 'Dr. James Wilson' }
  };

  const currentData = specialtiesData[selectedSpecialty];

  const steps = [
    { num: '1', title: 'Triage & Specialization Match', desc: 'Gemini analyzes patient inputs and maps symptoms to the best department.' },
    { num: '2', title: 'Queue & Load Analysis', desc: 'Evaluates real-time patient traffic, waiting rooms, and schedule density.' },
    { num: '3', title: 'Optimized Recommendation', desc: 'Balances rosters and recommends slots that minimize delays.' }
  ];

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
              <Sparkles size={12} /> Optimization Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">AI Smart Scheduling</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              MediSlot AI optimizes clinic scheduling, routes triage entries to available specialists, and reduces patient wait times in real-time.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Explanation & Workflow */}
          <div className="lg:col-span-2 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">How Smart Scheduling Works</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Traditional booking platforms schedule appointments sequentially, leading to crowded waiting rooms, uneven doctor workloads, and extreme doctor burnout. MediSlot AI monitors live clinic conditions and dynamically routes patients to optimal times.
              </p>

              {/* Visual Workflow Steps */}
              <div className="space-y-6 relative">
                {/* Connecting Vertical line */}
                <div className="absolute left-6 top-3 bottom-3 w-[2px] border-l border-dashed border-slate-200 dark:border-slate-800" />
                
                {steps.map(step => (
                  <div key={step.num} className="flex gap-4 relative z-10">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 border-2 border-blue-100 dark:border-blue-900 shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

            {/* Benefits list */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: '85% Delay Reduction', desc: 'Load balancing distributes queues to prevent clinical bottlenecks.' },
                { title: 'Improved Roster Efficiency', desc: 'Maximizes slot utilization without double-booking active staff.' },
                { title: 'Zero Waiting Room Congestion', desc: 'Predictive queue tracking schedules patient arrivals just-in-time.' },
                { title: 'Seamless Hospital Handoff', desc: 'Matches patient symptoms directly with target specialization.' }
              ].map(benefit => (
                <CardWrapper key={benefit.title} className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 p-4 flex gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">{benefit.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{benefit.desc}</p>
                  </div>
                </CardWrapper>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Demo */}
          <div className="lg:col-span-1">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 sticky top-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Interactive Scheduling Demo</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose a specialization to simulate AI queue balancing.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Specialization</label>
                  <select 
                    className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-lg focus:outline-none focus:border-blue-500"
                    value={selectedSpecialty}
                    onChange={(e) => {
                      setSelectedSpecialty(e.target.value);
                      setDemoActive(true);
                    }}
                  >
                    {Object.keys(specialtiesData).map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Queue Simulation Stats */}
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Queue Delay Comparison</p>
                    
                    <div className="space-y-2 text-xs">
                      {/* Standard Booking */}
                      <div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-300 font-semibold mb-1">
                          <span>Standard Wait</span>
                          <span className="text-red-500 font-bold">{currentData.manualWait} Mins</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentData.manualWait / 60) * 100}%` }}
                            className="bg-red-500 h-full rounded-full"
                          />
                        </div>
                      </div>
                      
                      {/* AI Booking */}
                      <div className="pt-1">
                        <div className="flex justify-between text-slate-900 dark:text-white font-bold mb-1">
                          <span className="flex items-center gap-1"><Sparkles size={12} className="text-blue-500 animate-pulse" /> AI Triage Wait</span>
                          <span className="text-emerald-500 font-extrabold">{currentData.aiWait} Mins</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentData.aiWait / 60) * 100}%` }}
                            className="bg-emerald-500 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slot suggestion card */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-1">AI Recommended Slot</p>
                    <p className="text-lg font-extrabold text-blue-900 dark:text-white">{currentData.recommendedSlot}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 font-semibold mt-0.5">with {currentData.doc}</p>
                    
                    <div className="flex gap-1.5 items-center bg-white/70 dark:bg-slate-900/50 rounded-lg p-2 mt-3 border border-blue-200/40 dark:border-blue-900/40">
                      <Clock size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                      <p className="text-[10px] text-blue-800 dark:text-blue-300 leading-snug">
                        Routing reduces queue congestion by <strong>{100 - Math.round((currentData.aiWait / currentData.manualWait) * 100)}%</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/book', { state: { specialization: selectedSpecialty.toLowerCase() } })}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
                >
                  Book Recommended Slot <ChevronRight size={14} />
                </button>
              </div>
            </CardWrapper>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
