import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, KeyRound, ArrowRight, ChevronLeft } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { signInWithGoogle, sendOtp, verifyOtp, getAuthMode } from '../services/firebaseAuth';

export default function Login() {
  const navigate = useNavigate();
  const authMode = getAuthMode();

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

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-slate-900">
      {/* Background Video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      >
        <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
      </video>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl bg-slate-950/75 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
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
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
                  Welcome to MediSlot AI
                </h1>
                <p className="text-slate-400 text-xs text-center mb-8 leading-relaxed">
                  AI-powered smart scheduling for patients, doctors &amp; hospitals.
                </p>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-semibold mb-5 text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  {/* Continue with Google */}
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3.02h3.87c2.26-2.09 3.58-5.17 3.58-8.5z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.32 14.27a7.22 7.22 0 0 1 0-4.54V6.62H1.21a11.94 11.94 0 0 0 0 10.76l4.11-3.11z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.62l4.11 3.11c.94-2.85 3.57-4.98 6.68-4.98z"/>
                    </svg>
                    {loading ? 'Signing in...' : 'Continue with Google'}
                  </button>

                  {/* Continue with Phone */}
                  <button
                    onClick={() => { setError(null); setScreen('phone'); }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl text-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Phone size={18} className="shrink-0 text-blue-400" />
                    Continue with Phone Number
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-slate-600 text-[11px] font-medium">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Demo quick-login hint */}
                {authMode === 'MOCK' && (
                  <div className="bg-blue-500/8 border border-blue-400/15 rounded-2xl p-4 text-center mb-6">
                    <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-2">Demo Mode</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Use <span className="text-white font-bold">patient@medislot.ai</span>,&nbsp;
                      <span className="text-white font-bold">doctor@medislot.ai</span>, or&nbsp;
                      <span className="text-white font-bold">admin@medislot.ai</span>
                      <br />Password: <span className="text-blue-400 font-bold">medislot</span>
                    </p>
                    <button
                      onClick={() => { setError(null); setScreen('email'); }}
                      className="mt-3 text-[11px] text-blue-400 hover:text-blue-300 font-bold underline underline-offset-2 cursor-pointer"
                    >
                      Sign in with Email instead →
                    </button>
                  </div>
                )}

                <p className="text-center text-[11px] text-slate-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold">
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
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-extrabold text-white mb-1">Enter your phone</h2>
                <p className="text-slate-400 text-xs mb-6">We'll send a one-time verification code.</p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone number (e.g. +91 98765 43210)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
                    />
                    <Phone size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
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
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-extrabold text-white mb-1">Verify your number</h2>
                <p className="text-slate-400 text-xs mb-6">
                  Enter the 6-digit code sent to <span className="text-white font-semibold">{phone}</span>.
                  {authMode === 'MOCK' && <span className="text-blue-400"> (Demo: use 123456)</span>}
                </p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit OTP code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-transparent outline-none text-xl tracking-[0.5em] text-white placeholder-slate-500 pl-1 pr-8 font-bold text-center"
                    />
                    <KeyRound size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
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

            {/* ── EMAIL: hidden demo-only screen ── */}
            {screen === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => { setScreen('idle'); setError(null); }}
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h2 className="text-xl font-extrabold text-white mb-1">Sign in with Email</h2>
                <p className="text-slate-400 text-xs mb-6">Demo accounts only — password is <span className="text-blue-400 font-bold">medislot</span></p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}

                <EmailLoginForm redirectUser={redirectUser} />

                <p className="text-center text-[11px] text-slate-500 mt-5">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold">
                    Register
                  </Link>
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ── Inline Email Form ─────────────────────────────────────────────────────────
import { loginWithEmail } from '../services/firebaseAuth';
import { Mail, Lock } from 'lucide-react';

function EmailLoginForm({ redirectUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { role: finalRole } = await loginWithEmail(email, password, role);
      redirectUser(finalRole);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-semibold text-center">
          {error}
        </div>
      )}

      {/* Role pills */}
      <div className="grid grid-cols-3 gap-2">
        {['patient', 'doctor', 'admin'].map(r => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${
              role === r
                ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {r === 'admin' ? 'Admin' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
        <input
          type="email" required placeholder="Email Address"
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
        />
        <Mail size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>

      <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
        <input
          type="password" required placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
        />
        <Lock size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={15} />
      </button>
    </form>
  );
}
