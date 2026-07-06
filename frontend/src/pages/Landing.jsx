import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, LayoutDashboard, ShieldCheck, ArrowRight, Activity, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden relative flex flex-col justify-between">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="text-blue-500 bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            MediSlot AI
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center py-12 z-10 w-full">
        
        {/* Title area */}
        <motion.div 
          className="text-center max-w-3xl mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-blue-500/20">
            <Activity size={14} className="animate-pulse" />
            Next-Gen Healthcare Management
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">MediSlot AI</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
            Experience AI-driven healthcare slot booking. Log in to your portal to request scheduling, discover hospitals, and manage clinic workflows.
          </p>
        </motion.div>

        {/* Portal Options Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Card 1: Patient Portal */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Patient Portal</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Request live location coordinates, locate nearby hospitals, view available doctor specializations, and schedule appointment slots.
              </p>
            </div>
            <button 
              onClick={() => navigate('/home')}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 text-sm"
            >
              Enter Patient Portal
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Card 2: Admin Portal */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">Admin Dashboard</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Access patient scheduling statistics, roster expert doctors, handle notifications, and manage incoming appointment requests.
              </p>
            </div>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 transition-all duration-300 text-sm"
            >
              Enter Admin Portal
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </motion.div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs text-slate-500">
        <div>© 2026 MediSlot AI. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure HIPAA Compliant Portals
          </div>
        </div>
      </footer>

    </div>
  );
}
