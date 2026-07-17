import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Phone, Shield, ArrowRight, CheckCircle2, AlertTriangle, KeyRound } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { loginWithEmail, signInWithGoogle, sendOtp, verifyOtp, getAuthMode } from '../services/firebaseAuth';

export default function Login() {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'phone', 'google'
  const [role, setRole] = useState('patient'); // 'patient', 'doctor', 'admin'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState(null);
  const authMode = getAuthMode();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (authMethod === 'email') {
        const { role: finalRole } = await loginWithEmail(formData.email, formData.password, role);
        redirectUser(finalRole);
      } else if (authMethod === 'phone') {
        if (!otpSent) {
          // Send OTP
          await sendOtp(formData.phone, 'recaptcha-container');
          setOtpSent(true);
          setOtpMessage('Verification code 123456 sent (Demo Mode)');
        } else {
          // Verify OTP
          const { role: finalRole } = await verifyOtp(formData.otp, role);
          redirectUser(finalRole);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { role: finalRole } = await signInWithGoogle(role);
      redirectUser(finalRole);
    } catch (err) {
      setError(err.message || 'Google Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const redirectUser = (selectedRole) => {
    if (selectedRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (selectedRole === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-slate-900">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
      </video>

      {/* Glassmorphic card container */}
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-10 m-4 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <AnimatedLogo height={72} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
          Welcome to MediSlot AI
        </h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          Authentication Mode: <span className="text-blue-400 font-bold">{authMode}</span>
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        {otpMessage && (
          <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 p-3.5 rounded-xl text-xs font-semibold mb-4 text-center">
            {otpMessage}
          </div>
        )}

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-2 bg-white/5 border border-white/5 p-1 rounded-2xl mb-6">
          {[
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'phone', label: 'Phone SMS', icon: Phone },
            { id: 'google', label: 'Google', icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setAuthMethod(tab.id);
                setError(null);
                setOtpSent(false);
                setOtpMessage(null);
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMethod === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
            Select Your Workspace Role
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'patient', label: 'Patient' },
              { id: 'doctor', label: 'Doctor' },
              { id: 'admin', label: 'Hospital Admin' }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-2 px-3 border rounded-xl text-xs font-bold text-center transition-all ${
                  role === r.id
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forms block */}
        <AnimatePresence mode="wait">
          {authMethod !== 'google' ? (
            <motion.form
              key={authMethod}
              onSubmit={handleLoginSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {authMethod === 'email' && (
                <>
                  <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
                    />
                    <Mail size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>

                  <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
                    />
                    <Lock size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </>
              )}

              {authMethod === 'phone' && (
                <>
                  {!otpSent ? (
                    <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Phone Number (e.g. +15550199)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
                      />
                      <Phone size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                  ) : (
                    <div className="relative border-b-2 border-white/20 focus-within:border-blue-500 transition-colors py-2">
                      <input
                        id="otp"
                        type="text"
                        required
                        placeholder="Enter 6-digit OTP code"
                        value={formData.otp}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
                      />
                      <KeyRound size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                  )}
                  {/* Recaptcha container target */}
                  <div id="recaptcha-container"></div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Processing...' : (authMethod === 'phone' && !otpSent ? 'Send Verification OTP' : 'Sign In')}
                <ArrowRight size={14} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="google"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3.02h3.87c2.26-2.09 3.58-5.17 3.58-8.5z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.32 14.27a7.22 7.22 0 0 1 0-4.54V6.62H1.21a11.94 11.94 0 0 0 0 10.76l4.11-3.11z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 6.62l4.11 3.11c.94-2.85 3.57-4.98 6.68-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 font-bold hover:underline">
            Register Workspace
          </Link>
        </p>
      </div>
    </div>
  );
}
