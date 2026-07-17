import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sun, Moon } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { registerWithEmail } from '../services/firebaseAuth';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';

export default function Register() {
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

  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { role: finalRole } = await registerWithEmail(formData.name, formData.email, formData.password, role);
      if (finalRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (finalRole === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-slate-900">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
      </video>

      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <label className="switch scale-75 origin-top-right cursor-pointer" title="Toggle Theme">
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
        <LanguageSelector dropdownPosition="bottom-left" />
      </div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-10 m-4 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <AnimatedLogo height={72} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
          {t('register.title')}
        </h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          {t('register.subtitle')}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
            <input
              id="name"
              type="text"
              required
              placeholder={t('register.name')}
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
            />
            <User size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Email */}
          <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
            <input
              id="email"
              type="email"
              required
              placeholder={t('register.email')}
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
            />
            <Mail size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Password */}
          <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
            <input
              id="password"
              type="password"
              required
              placeholder={t('register.password')}
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
            />
            <Lock size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>




          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Creating Account...' : t('register.signUpBtn')}
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          {t('register.hasAccount')}{' '}
          <Link to="/login" className="text-blue-400 font-bold hover:underline">
            {t('register.loginNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}
