import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, Activity, ShieldCheck, Zap, Navigation, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const features = [
    {
      title: "Smart AI Scheduling",
      description: "Optimize rosters, balance doctor workloads, and decrease queue wait times using smart slot recommendations.",
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Nearby Hospital Locator",
      description: "Detect live coordinates automatically and map nearby clinics sorted by real-time calculated distance.",
      icon: Navigation,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Google Street View",
      description: "Preview hospital surroundings, street details, and route coordinates in full 3D directly in a new tab.",
      icon: Activity,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "System Alerts & Reminders",
      description: "Automate patient follow-ups, cancellations, and notifications across WhatsApp and system alert feeds.",
      icon: BellRing,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    }
  ];

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
      <main className="flex-1 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-16 py-12 z-10 w-full">
        
        {/* Left Column: Hero Text & Get Started */}
        <motion.div 
          className="flex-1 text-left max-w-xl space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20">
            <Activity size={14} className="animate-pulse" />
            AI-Powered Smart Scheduling
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
            Smarter Appointments.<br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Better Healthcare.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            MediSlot AI bridges the gap between patient slots booking and clinic administration. Discover nearby hospitals using live location mapping, preview directions with integrated Street View, and optimize medical resources in real-time.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/admin/login')}
              className="py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 text-sm hover:-translate-y-0.5"
            >
              GET STARTED
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Site Details & Key Features Grid */}
        <motion.div 
          className="flex-1 w-full max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Why Choose MediSlot AI?</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/60 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${feat.color}`}>
                    <IconComp size={20} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs text-slate-500">
        <div>© 2026 MediSlot AI. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure HIPAA Compliant Platform
          </div>
        </div>
      </footer>

    </div>
  );
}
