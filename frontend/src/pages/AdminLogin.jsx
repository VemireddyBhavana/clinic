import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
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
      initial={{ opacity: 0, x: 50, scale: 1.02 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.98 }}
      transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
      className="min-h-screen flex bg-slate-50 font-sans"
    >
      
      {/* LEFT SIDE - Light Blue Background with Illustration */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#f4f7fe] flex-col relative px-10 py-10 border-r border-slate-200/60 justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 z-10 shrink-0">
          <div className="text-blue-600 bg-blue-100/80 p-2 rounded-xl">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold text-blue-700 tracking-tight">MediSlot AI</span>
        </div>
        
        {/* Illustration Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto py-8">
          <div className="relative w-full flex items-center justify-center mb-8">
            <img 
              src="/admin-login-illustration.png" 
              alt="Admin Access" 
              className="w-full h-auto max-w-[340px] object-contain" 
            />
          </div>
          
          {/* Text Below Illustration */}
          <div className="text-center mt-2 px-6">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Secure Admin Access</h2>
            <p className="text-slate-500 text-sm max-w-[320px] mx-auto leading-relaxed">
              Manage doctors, appointments and clinic operations in one place.
            </p>
          </div>
        </div>
        
        {/* Placeholder spacer */}
        <div className="h-8 hidden lg:block"></div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-20 bg-white">
        <div className="w-full max-w-[440px] mx-auto">
          
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-200/80">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Login</h2>
              <p className="text-sm text-slate-500">Enter your credentials to access admin panel</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100">{error}</div>}
            
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                <input 
                  id="email"
                  type="email"
                  placeholder="admin@medislot.ai"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
                <input 
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm tracking-widest placeholder:tracking-normal"
                />
              </div>

              <div className="flex items-center justify-between pt-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox"
                      id="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="peer appearance-none w-4.5 h-4.5 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"></path>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">Remember Me</span>
                </label>
                
                <Link to="/admin/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-md shadow-blue-600/10 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <p className="text-center text-sm text-slate-500 mt-6">
              Don't have an account? <Link to="/admin/register" className="text-blue-600 font-bold hover:underline">Create one</Link>
            </p>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
