import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, AlertTriangle, ShieldCheck, RefreshCw, BarChart2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import CardWrapper from '../../components/layout/CardWrapper';

export default function WorkloadBalancer() {
  const navigate = useNavigate();
  const [isBalanced, setIsBalanced] = useState(false);
  const [doctorsList, setDoctorsList] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', appointments: 11, maxLoad: 10, status: 'Overloaded' },
    { id: 2, name: 'Dr. Robert Chen', specialty: 'Neurology', appointments: 5, maxLoad: 10, status: 'Normal' },
    { id: 3, name: 'Dr. Emily Carter', specialty: 'Pediatrics', appointments: 9, maxLoad: 10, status: 'Normal' },
    { id: 4, name: 'Dr. Michael Rodriguez', specialty: 'Dermatology', appointments: 12, maxLoad: 10, status: 'Overloaded' },
    { id: 5, name: 'Dr. Anita Patel', specialty: 'Orthopedics', appointments: 6, maxLoad: 10, status: 'Normal' },
    { id: 6, name: 'Dr. James Wilson', specialty: 'General Practice', appointments: 8, maxLoad: 10, status: 'Normal' }
  ]);

  const handleBalanceRoster = () => {
    setIsBalanced(true);
    setDoctorsList(prev => prev.map(doc => {
      if (doc.name === 'Dr. Sarah Jenkins') {
        return { ...doc, appointments: 8, status: 'Normal' };
      }
      if (doc.name === 'Dr. Michael Rodriguez') {
        return { ...doc, appointments: 9, status: 'Normal' };
      }
      if (doc.name === 'Dr. Robert Chen') {
        return { ...doc, appointments: 7, status: 'Normal' };
      }
      if (doc.name === 'Dr. Anita Patel') {
        return { ...doc, appointments: 8, status: 'Normal' };
      }
      return doc;
    }));
  };

  const handleReset = () => {
    setIsBalanced(false);
    setDoctorsList([
      { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', appointments: 11, maxLoad: 10, status: 'Overloaded' },
      { id: 2, name: 'Dr. Robert Chen', specialty: 'Neurology', appointments: 5, maxLoad: 10, status: 'Normal' },
      { id: 3, name: 'Dr. Emily Carter', specialty: 'Pediatrics', appointments: 9, maxLoad: 10, status: 'Normal' },
      { id: 4, name: 'Dr. Michael Rodriguez', specialty: 'Dermatology', appointments: 12, maxLoad: 10, status: 'Overloaded' },
      { id: 5, name: 'Dr. Anita Patel', specialty: 'Orthopedics', appointments: 6, maxLoad: 10, status: 'Normal' },
      { id: 6, name: 'Dr. James Wilson', specialty: 'General Practice', appointments: 8, maxLoad: 10, status: 'Normal' }
    ]);
  };

  const totalCapacity = doctorsList.reduce((acc, curr) => acc + curr.maxLoad, 0);
  const totalBooked = doctorsList.reduce((acc, curr) => acc + curr.appointments, 0);
  const averageUtilization = Math.round((totalBooked / totalCapacity) * 100);

  const overloadedCount = doctorsList.filter(d => d.status === 'Overloaded').length;

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
              <Users size={12} /> Resource Allocation
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">Doctor Workload Balancer</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              MediSlot AI distributes patient visits evenly across specialists, flag clinical burnout risks, and load balances bookings.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Stats & Analytics Summary */}
          <div className="lg:col-span-1 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Clinic Utilization Metrics</h2>
              
              <div className="space-y-4">
                {/* Average Load */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-150 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Average Staff Load</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{averageUtilization}%</p>
                  <p className="text-[10px] text-slate-500 mt-1">{totalBooked} of {totalCapacity} Slots Allocated</p>
                </div>

                {/* Overloaded Alert Status */}
                <div className={`p-4 rounded-xl border flex gap-3 items-start transition-colors duration-300 ${
                  overloadedCount > 0
                    ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                }`}>
                  {overloadedCount > 0 ? (
                    <>
                      <AlertTriangle className="shrink-0 mt-0.5" size={18} />
                      <div>
                        <h4 className="font-bold text-xs">Overload Alert Status</h4>
                        <p className="text-[10px] leading-relaxed mt-1">
                          {overloadedCount} physician(s) are exceeding maximum safe booking workloads. High risk of queue delays and physician burnout.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="shrink-0 mt-0.5" size={18} />
                      <div>
                        <h4 className="font-bold text-xs">Queue Balance Status</h4>
                        <p className="text-[10px] leading-relaxed mt-1">
                          All providers are operating at safe limits. Patients are balanced.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={handleBalanceRoster}
                    disabled={isBalanced}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw size={13} className={isBalanced ? '' : 'animate-spin-slow'} /> Balance Clinic Roster
                  </button>
                  {isBalanced && (
                    <button 
                      onClick={handleReset}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Reset Simulation
                    </button>
                  )}
                </div>
              </div>
            </CardWrapper>
          </div>

          {/* RIGHT: Live Roster & Capacity Charts */}
          <div className="lg:col-span-2 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Physician Rosters</h3>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  <BarChart2 size={13} /> Live Load Trackers
                </span>
              </div>

              {/* Roster Cards list */}
              <div className="space-y-3">
                {doctorsList.map(doc => {
                  const percentage = Math.min((doc.appointments / doc.maxLoad) * 100, 100);
                  return (
                    <div 
                      key={doc.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-150 dark:border-slate-700/60 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{doc.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{doc.specialty}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            doc.status === 'Overloaded'
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {doc.status} ({doc.appointments}/{doc.maxLoad})
                          </span>
                        </div>
                      </div>

                      {/* Bar Gauge */}
                      <div className="w-full bg-slate-200 dark:bg-slate-750 h-2.5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${
                            doc.status === 'Overloaded' ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardWrapper>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
