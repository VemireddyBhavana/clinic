import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Mail, Lock } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await adminAPI.login({
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('adminToken', res.token);
      localStorage.setItem('adminInfo', JSON.stringify(res.admin));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans"
    >
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/45 -z-10" />

      {/* Glassmorphic Form Box */}
      <div className="relative w-[400px] bg-transparent border-2 border-white/20 rounded-[20px] backdrop-blur-[20px] flex justify-center items-center py-10 px-8 shadow-2xl z-10">
        <div className="w-full">
          <form onSubmit={handleLogin}>
            
            {/* Logo inside form box */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="text-white bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10">
                <HeartPulse size={22} strokeWidth={2.5} />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">MediSlot AI</span>
            </div>

            <h2 className="text-3xl font-semibold text-white text-center mb-6">Admin Login</h2>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-md text-red-200 p-3 rounded-lg mb-4 text-xs font-semibold border border-red-500/30 text-center">
                {error}
              </div>
            )}
            
            {/* Email Input */}
            <div className="glass-inputbox">
              <input 
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <span className="icon">
                <Mail size={18} className="text-white/60" />
              </span>
            </div>
            
            {/* Password Input */}
            <div className="glass-inputbox">
              <input 
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <span className="icon">
                <Lock size={18} className="text-white/60" />
              </span>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm text-white mb-6">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4.5 h-4.5 rounded bg-transparent border-white/40 checked:bg-white checked:border-white focus:ring-0 cursor-pointer transition-colors"
                />
                <span className="text-xs font-semibold text-white/90">Remember Me</span>
              </label>
              
              <Link to="/admin/forgot-password" className="text-xs font-semibold text-white hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full h-11 bg-white text-slate-900 font-bold rounded-[40px] hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <p className="text-center text-xs text-white/80 mt-6">
            Don't have an account? <Link to="/admin/register" className="text-white font-bold hover:underline ml-1">Create one</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
