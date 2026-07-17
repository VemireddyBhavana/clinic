import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, KeyRound, ArrowRight, ChevronLeft } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { signInWithGoogle, sendOtp, verifyOtp } from '../services/firebaseAuth';
import '../components/navigation/PatientNavbar.css';

export default function Login() {
  const navigate = useNavigate();
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

  // 'idle' | 'phone' | 'otp'
  const [screen, setScreen] = useState('idle');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirectUser = (role) => {
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'doctor') navigate('/doctor/dashboard');
    else navigate('/home');
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { role } = await signInWithGoogle('patient');
      redirectUser(role);
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await sendOtp(phone, 'recaptcha-container');
      setScreen('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { role } = await verifyOtp(otp, 'patient');
      redirectUser(role);
    } catch (err) {
      setError(err.message || 'Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden transition-colors duration-500"
      style={{ background: isDark ? '#0f172a' : '#eff6ff' }}
    >
      {/* Background Video — only visible in dark mode */}
      {isDark && (
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25 z-0"
        >
          <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
        </video>
      )}

      {/* Light mode gradient background */}
      {!isDark && (
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at top left, #bfdbfe 0%, #eff6ff 40%, #e0f2fe 100%)'
        }} />
      )}

      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
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
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
        style={{
          background: isDark ? 'rgba(2,6,23,0.82)' : 'rgba(255,255,255,0.92)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(59,130,246,0.15)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <AnimatedLogo height={68} />
          </div>

          <AnimatePresence mode="wait">

            {/* ── IDLE: main buttons ── */}
            {screen === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h1 style={{ color: isDark ? '#ffffff' : '#0f172a' }} className="text-2xl sm:text-3xl font-extrabold text-center mb-2 tracking-tight transition-colors duration-300">
                  Welcome to MediSlot AI
                </h1>
                <p style={{ color: isDark ? '#94a3b8' : '#475569' }} className="text-xs text-center mb-8 leading-relaxed transition-colors duration-300">
                  AI-powered smart scheduling for patients, doctors &amp; hospitals.
                </p>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-xs font-semibold mb-5 text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  {/* Continue with Google */}
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                    style={{
                      background: isDark ? '#ffffff' : '#ffffff',
                      color: '#1e293b',
                      border: isDark ? 'none' : '1px solid #e2e8f0'
                    }}
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3.02h3.87c2.26-2.09 3.58-5.17 3.58-8.5z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.32 14.27a7.22 7.22 0 0 1 0-4.54V6.62H1.21a11.94 11.94 0 0 0 0 10.76l4.11-3.11z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.62l4.11 3.11c.94-2.85 3.57-4.98 6.68-4.98z"/>
                    </svg>
                    {loading ? 'Signing in...' : 'Continue with Google'}
                  </button>
                </div>

                <p className="text-center text-[11px] mt-6" style={{ color: isDark ? '#64748b' : '#94a3b8' }}>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-500 hover:text-blue-400 font-bold">
                    Register
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ── PHONE: enter phone number ── */}
            {screen === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => { setScreen('idle'); setError(null); }}
                  className="flex items-center gap-1 text-xs mb-6 transition-colors cursor-pointer"
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-extrabold mb-1 transition-colors" style={{ color: isDark ? '#fff' : '#0f172a' }}>Enter your phone</h2>
                <p className="text-xs mb-6" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>We'll send a one-time verification code.</p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div
                    className="relative py-2 transition-colors"
                    style={{ borderBottom: `2px solid ${isDark ? 'rgba(255,255,255,0.2)' : '#bfdbfe'}` }}
                  >
                    <input
                      type="tel"
                      required
                      placeholder="Phone number (e.g. +91 98765 43210)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm pl-1 pr-8"
                      style={{ color: isDark ? '#fff' : '#0f172a' }}
                    />
                    <Phone size={16} className="absolute right-2 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#64748b' : '#94a3b8' }} />
                  </div>
                  <div id="recaptcha-container" />
                  <button
                    type="submit"
                    disabled={loading || !phone.trim()}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send OTP'} <ArrowRight size={15} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── OTP: verify code ── */}
            {screen === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => { setScreen('phone'); setError(null); }}
                  className="flex items-center gap-1 text-xs mb-6 transition-colors cursor-pointer"
                  style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-extrabold mb-1" style={{ color: isDark ? '#fff' : '#0f172a' }}>Verify your number</h2>
                <p className="text-xs mb-6" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  Enter the 6-digit code sent to <span className="font-semibold" style={{ color: isDark ? '#fff' : '#1e40af' }}>{phone}</span>.
                </p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div
                    className="relative py-2"
                    style={{ borderBottom: `2px solid ${isDark ? 'rgba(255,255,255,0.2)' : '#bfdbfe'}` }}
                  >
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit OTP code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-transparent outline-none text-xl tracking-[0.5em] pl-1 pr-8 font-bold text-center"
                      style={{ color: isDark ? '#fff' : '#0f172a' }}
                    />
                    <KeyRound size={16} className="absolute right-2 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#64748b' : '#94a3b8' }} />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || otp.length < 4}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Sign In'} <ArrowRight size={15} />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
