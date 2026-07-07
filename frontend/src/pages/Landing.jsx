import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, Activity, ShieldCheck, Zap, Navigation, BellRing } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { motion } from 'framer-motion';
import './LandingFlowers.css';

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
    <div className="min-h-screen relative landing-page-outer" style={{ background: '#000' }}>
      {/* Flower CSS Background Animation — outside motion.div so position:fixed works correctly */}
      <div className="night" style={{ position: 'fixed', zIndex: 0 }}></div>
      <div className="flowers-wrapper">
        <div className="flowers">
          {/* Flower 1 */}
          <div className="flower flower--1">
            <div className="flower__leafs flower__leafs--1">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
              <div className="flower__line__leaf flower__line__leaf--5"></div>
              <div className="flower__line__leaf flower__line__leaf--6"></div>
            </div>
          </div>

          {/* Flower 2 */}
          <div className="flower flower--2">
            <div className="flower__leafs flower__leafs--2">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          {/* Flower 3 */}
          <div className="flower flower--3">
            <div className="flower__leafs flower__leafs--3">
              <div className="flower__leaf flower__leaf--1"></div>
              <div className="flower__leaf flower__leaf--2"></div>
              <div className="flower__leaf flower__leaf--3"></div>
              <div className="flower__leaf flower__leaf--4"></div>
              <div className="flower__white-circle"></div>

              <div className="flower__light flower__light--1"></div>
              <div className="flower__light flower__light--2"></div>
              <div className="flower__light flower__light--3"></div>
              <div className="flower__light flower__light--4"></div>
              <div className="flower__light flower__light--5"></div>
              <div className="flower__light flower__light--6"></div>
              <div className="flower__light flower__light--7"></div>
              <div className="flower__light flower__light--8"></div>
            </div>
            <div className="flower__line">
              <div className="flower__line__leaf flower__line__leaf--1"></div>
              <div className="flower__line__leaf flower__line__leaf--2"></div>
              <div className="flower__line__leaf flower__line__leaf--3"></div>
              <div className="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          {/* Growing Elements & Grass */}
          <div className="grow-ans" style={{ '--d': '1.2s' }}>
            <div className="flower__g-long">
              <div className="flower__g-long__top"></div>
              <div className="flower__g-long__bottom"></div>
            </div>
          </div>

          <div className="growing-grass">
            <div className="flower__grass flower__grass--1">
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              <div className="flower__grass__leaf flower__grass__leaf--1"></div>
              <div className="flower__grass__leaf flower__grass__leaf--2"></div>
              <div className="flower__grass__leaf flower__grass__leaf--3"></div>
              <div className="flower__grass__leaf flower__grass__leaf--4"></div>
              <div className="flower__grass__leaf flower__grass__leaf--5"></div>
              <div className="flower__grass__leaf flower__grass__leaf--6"></div>
              <div className="flower__grass__leaf flower__grass__leaf--7"></div>
              <div className="flower__grass__leaf flower__grass__leaf--8"></div>
              <div className="flower__grass__overlay"></div>
            </div>
          </div>

          <div className="growing-grass">
            <div className="flower__grass flower__grass--2">
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              <div className="flower__grass__leaf flower__grass__leaf--1"></div>
              <div className="flower__grass__leaf flower__grass__leaf--2"></div>
              <div className="flower__grass__leaf flower__grass__leaf--3"></div>
              <div className="flower__grass__leaf flower__grass__leaf--4"></div>
              <div className="flower__grass__leaf flower__grass__leaf--5"></div>
              <div className="flower__grass__leaf flower__grass__leaf--6"></div>
              <div className="flower__grass__leaf flower__grass__leaf--7"></div>
              <div className="flower__grass__leaf flower__grass__leaf--8"></div>
              <div className="flower__grass__overlay"></div>
            </div>
          </div>

          <div className="grow-ans" style={{ '--d': '2.4s' }}>
            <div className="flower__g-right flower__g-right--1">
              <div className="leaf"></div>
            </div>
          </div>

          <div className="grow-ans" style={{ '--d': '2.8s' }}>
            <div className="flower__g-right flower__g-right--2">
              <div className="leaf"></div>
            </div>
          </div>

          <div className="grow-ans" style={{ '--d': '2.8s' }}>
            <div className="flower__g-front">
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                <div className="flower__g-front__leaf"></div>
              </div>
              <div className="flower__g-front__line"></div>
            </div>
          </div>

          <div className="grow-ans" style={{ '--d': '3.2s' }}>
            <div className="flower__g-fr">
              <div className="leaf"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
              <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
            </div>
          </div>

          {/* Long Grass Elements */}
          <div className="long-g long-g--0">
            <div className="grow-ans" style={{ '--d': '3s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '2.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.4s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--1">
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.8s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--2">
            <div className="grow-ans" style={{ '--d': '4s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.4s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--3">
            <div className="grow-ans" style={{ '--d': '4s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--4">
            <div className="grow-ans" style={{ '--d': '4s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--5">
            <div className="grow-ans" style={{ '--d': '4s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--6">
            <div className="grow-ans" style={{ '--d': '4.2s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.4s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.6s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '4.8s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>

          <div className="long-g long-g--7">
            <div className="grow-ans" style={{ '--d': '3s' }}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.2s' }}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.5s' }}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={{ '--d': '3.6s' }}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content inside its own motion.div for fade-in, on top of fixed flowers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.96 }}
        transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
        className="min-h-screen text-white font-sans overflow-x-hidden relative flex flex-col justify-between landing-root"
        style={{ zIndex: 2 }}
      >

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <AnimatedLogo height={64} />
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </div>
        </div>
      </header>

      {/* Main Content inside a stunning dark glassmorphic box aligned to the left */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 flex items-start lg:items-center justify-start py-4 lg:py-8 z-10 w-full">
        <div className="w-full md:w-[52%] lg:w-[48%] lg:max-w-[550px] p-5 lg:p-8 rounded-3xl bg-slate-950/40 md:bg-slate-950/60 lg:bg-slate-950/65 backdrop-blur-xl border border-slate-900/50 shadow-2xl flex flex-col gap-5 relative z-10">
          {/* Hero Content */}
          <motion.div 
            className="text-left space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20 backdrop-blur-md">
              <Activity size={14} className="animate-pulse" />
              AI-Powered Smart Scheduling
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
              Smarter Appointments.<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Better Healthcare.</span>
            </h1>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              MediSlot AI bridges the gap between patient slots booking and clinic administration. Discover nearby hospitals using live location mapping and preview directions in 3D.
            </p>

            <div className="pt-2">
              <button 
                id="get-started-btn"
                onClick={() => navigate('/admin/login')}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 text-sm hover:-translate-y-0.5"
              >
                GET STARTED
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Key Features Grid inside the same card */}
          <motion.div 
            className="w-full border-t border-slate-900/60 pt-6 animate-in fade-in"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Why Choose MediSlot AI?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, index) => {
                const IconComp = feat.icon;
                return (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-4 backdrop-blur-sm hover:border-slate-700/40 transition-colors flex flex-col gap-2"
                  >
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${feat.color}`}>
                      <IconComp size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs mb-1">{feat.title}</h3>
                      <p className="text-slate-400 text-[10px] leading-relaxed">{feat.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs text-slate-500 backdrop-blur-sm">
        <div>© 2026 MediSlot AI. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secure HIPAA Compliant Platform
          </div>
        </div>
      </footer>
    </motion.div>
    </div>
  );
}
