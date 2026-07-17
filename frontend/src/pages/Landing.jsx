import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, Activity, ShieldCheck, Zap, Navigation, BellRing, Sun, Moon } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { motion } from 'framer-motion';
import './LandingFlowers.css';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
      darkColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      lightColor: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      title: "Nearby Hospital Locator",
      description: "Detect live coordinates automatically and map nearby clinics sorted by real-time calculated distance.",
      icon: Navigation,
      darkColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      lightColor: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Google Street View",
      description: "Preview hospital surroundings, street details, and route coordinates in full 3D directly in a new tab.",
      icon: Activity,
      darkColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      lightColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      title: "System Alerts & Reminders",
      description: "Automate patient follow-ups, cancellations, and notifications across WhatsApp and system alert feeds.",
      icon: BellRing,
      darkColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      lightColor: "text-purple-600 bg-purple-50 border-purple-200"
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-screen relative landing-page-outer transition-colors duration-500"
      style={{
        '--dark-color': isDark ? '#000' : '#eff6ff',
      }}
    >
      {/* Night sky — only in dark mode */}
      {isDark && <div className="night" style={{ position: 'fixed', zIndex: 0 }}></div>}
      {/* Light mode gradient background */}
      {!isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at top left, #bfdbfe 0%, #eff6ff 50%, #e0f2fe 100%)'
        }} />
      )}
      {/* Flowers — visible in both modes */}
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
        className="min-h-screen font-sans overflow-x-hidden relative flex flex-col justify-between landing-root transition-colors duration-500"
        style={{ zIndex: 2, color: isDark ? '#fff' : '#0f172a' }}
      >

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <AnimatedLogo height={64} />
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
          <label className="switch scale-[0.7] origin-right cursor-pointer shrink-0" title="Toggle Theme">
            <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme}/>
            <span className="slider">
              <div className="moons-hole">
                <div className="moon-hole"></div>
                <div className="moon-hole"></div>
                <div className="moon-hole"></div>
              </div>
              <div className="black-clouds">
                <div className="black-cloud"></div>
                <div className="black-cloud"></div>
                <div className="black-cloud"></div>
              </div>
              <div className="clouds">
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
              <div className="stars">
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              </div>
            </span>
          </label>
          <LanguageSelector dropdownPosition="bottom-right" />

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{
              background: isDark ? 'rgba(15,23,42,0.8)' : 'rgba(219,234,254,0.8)',
              border: isDark ? '1px solid #1e293b' : '1px solid #bfdbfe',
              color: isDark ? '#94a3b8' : '#1d4ed8'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('landing.systemLive')}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 flex items-start lg:items-center justify-start py-4 lg:py-8 z-10 w-full">
        <div
          className="w-full md:w-[52%] lg:w-[48%] lg:max-w-[550px] p-5 lg:p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-5 relative z-10 transition-all duration-500"
          style={{
            background: isDark ? 'rgba(2,6,23,0.65)' : 'rgba(255,255,255,0.85)',
            border: isDark ? '1px solid rgba(30,41,59,0.5)' : '1px solid rgba(191,219,254,0.8)'
          }}
        >
          {/* Hero Content */}
          <motion.div 
            className="text-left space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
              style={{
                background: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(219,234,254,0.8)',
                color: isDark ? '#60a5fa' : '#1d4ed8',
                border: isDark ? '1px solid rgba(59,130,246,0.2)' : '1px solid #bfdbfe'
              }}
            >
              <Activity size={14} className="animate-pulse" />
              {t('landing.badge')}
            </div>

            <h1
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-b from-white via-slate-200 to-slate-400'
                  : 'bg-gradient-to-b from-slate-900 via-blue-950 to-blue-800'
              }`}
            >
              {t('landing.title1')}<br />
              <span
                className={`bg-clip-text text-transparent ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400'
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600'
                }`}
              >
                {t('landing.title2')}
              </span>
            </h1>

            <p className="text-sm leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              {t('landing.desc')}
            </p>

            <div className="pt-2">
              <button 
                id="get-started-btn"
                onClick={() => navigate('/login')}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 text-sm hover:-translate-y-0.5"
              >
                {t('landing.getStarted').toUpperCase()}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Key Features Grid inside the same card */}
          <motion.div
            className="w-full pt-6 animate-in fade-in"
            style={{ borderTop: isDark ? '1px solid rgba(30,41,59,0.6)' : '1px solid rgba(191,219,254,0.6)' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: isDark ? '#64748b' : '#64748b' }}>{t('landing.whyChoose')}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, index) => {
                const IconComp = feat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="rounded-xl p-4 backdrop-blur-sm transition-all flex flex-col gap-2"
                    style={{
                      background: isDark ? 'rgba(15,23,42,0.3)' : 'rgba(239,246,255,0.8)',
                      border: isDark ? '1px solid rgba(30,41,59,0.5)' : '1px solid rgba(191,219,254,0.6)'
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${isDark ? feat.darkColor : feat.lightColor}`}>
                      <IconComp size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs mb-1" style={{ color: isDark ? '#fff' : '#0f172a' }}>{feat.title}</h3>
                      <p className="text-[10px] leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#475569' }}>{feat.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs backdrop-blur-sm transition-colors duration-500"
        style={{
          borderTop: isDark ? '1px solid rgba(15,23,42,0.5)' : '1px solid rgba(191,219,254,0.6)',
          color: isDark ? '#64748b' : '#475569'
        }}
      >
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
