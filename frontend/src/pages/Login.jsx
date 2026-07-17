import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { signInWithGoogle, loginWithEmail } from '../services/firebaseAuth';
import '../components/navigation/PatientNavbar.css';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/ui/LanguageSelector';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isDark = theme === 'dark';

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

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]       = useState(null);

  const redirectUser = (role) => {
    if (role === 'doctor') navigate('/doctor/dashboard');
    else navigate('/home');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { role } = await loginWithEmail(email, password, 'patient');
      redirectUser(role);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { role } = await signInWithGoogle('patient');
      redirectUser(role);
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputStyle = {
    background:   isDark ? 'rgba(255,255,255,0.05)' : '#f8faff',
    border:       isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #bfdbfe',
    color:        isDark ? '#ffffff' : '#0f172a',
    borderRadius: '14px',
    padding:      '12px 40px 12px 14px',
    width:        '100%',
    outline:      'none',
    fontSize:     '14px',
  };

  const placeholderClass = isDark
    ? 'placeholder-slate-500'
    : 'placeholder-slate-400';

  return (
    <div
      className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden transition-colors duration-500"
      style={{ background: isDark ? '#0f172a' : '#eff6ff' }}
    >
      {isDark && (
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-25 z-0">
          <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
        </video>
      )}
      {!isDark && (
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at top left, #bfdbfe 0%, #eff6ff 40%, #e0f2fe 100%)' }} />
      )}

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <label className="switch scale-75 origin-top-right cursor-pointer" title="Toggle Theme">
          <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme}/>
          <span className="slider">
            <div className="moons-hole"><div className="moon-hole"></div><div className="moon-hole"></div><div className="moon-hole"></div></div>
            <div className="black-clouds"><div className="black-cloud"></div><div className="black-cloud"></div><div className="black-cloud"></div></div>
            <div className="clouds"><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div></div>
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
        style={{
          background:     isDark ? 'rgba(2,6,23,0.82)' : 'rgba(255,255,255,0.92)',
          border:         isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(59,130,246,0.15)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <AnimatedLogo height={68} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-1 tracking-tight"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
            {t('login.title')}
          </h1>
          <p className="text-xs text-center mb-7 leading-relaxed"
             style={{ color: isDark ? '#94a3b8' : '#475569' }}>
            {t('login.subtitle')}
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-xs font-semibold mb-5 text-center">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-5">
            <div className="relative">
              <input id="login-email" type="email" required placeholder={t('login.email')}
                value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle} autoComplete="email"
                className={placeholderClass} />
              <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: isDark ? '#475569' : '#94a3b8' }} />
            </div>

            <div className="relative">
              <input id="login-password" type={showPw ? 'text' : 'password'} required placeholder={t('login.password')}
                value={password} onChange={e => setPassword(e.target.value)}
                style={inputStyle} autoComplete="current-password"
                className={placeholderClass} />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: isDark ? '#475569' : '#94a3b8' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:-translate-y-0.5 active:scale-[0.98]">
              {loading ? 'Signing in...' : t('login.signInBtn')} <ArrowRight size={15} />
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }} />
            <span className="text-[11px] font-semibold" style={{ color: isDark ? '#475569' : '#94a3b8' }}>or</span>
            <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }} />
          </div>

          {/* Continue with Google */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 cursor-pointer hover:-translate-y-0.5"
            style={{ background: '#ffffff', color: '#1e293b', border: isDark ? 'none' : '1px solid #e2e8f0' }}>
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3.02h3.87c2.26-2.09 3.58-5.17 3.58-8.5z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.32 14.27a7.22 7.22 0 0 1 0-4.54V6.62H1.21a11.94 11.94 0 0 0 0 10.76l4.11-3.11z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.62l4.11 3.11c.94-2.85 3.57-4.98 6.68-4.98z"/>
            </svg>
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Footer */}
          <p className="text-center text-[11px] mt-6" style={{ color: isDark ? '#64748b' : '#94a3b8' }}>
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-bold">{t('login.registerNow')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
