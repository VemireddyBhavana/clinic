import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
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
            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-[360px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Defs for gradients and shadow */}
              <defs>
                <linearGradient id="shieldGrad" x1="120" y1="40" x2="280" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4dabf7" />
                  <stop offset="100%" stopColor="#228be6" />
                </linearGradient>
                <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1c7ed6" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Background soft circles */}
              <circle cx="150" cy="130" r="70" fill="#e7f5ff" opacity="0.8" />
              <circle cx="250" cy="110" r="90" fill="#e7f5ff" opacity="0.6" />
              <circle cx="200" cy="160" r="50" fill="#d0ebff" opacity="0.5" />

              {/* The Shield */}
              <g filter="url(#dropShadow)">
                <path d="M 230 60 C 270 60, 290 50, 300 40 C 310 90, 290 150, 230 190 C 170 150, 150 90, 160 40 C 170 50, 190 60, 230 60 Z" fill="url(#shieldGrad)" />
                {/* White Lock on Shield */}
                <rect x="215" y="95" width="30" height="25" rx="4" fill="white" />
                <path d="M 221 95 V 87 C 221 80, 239 80, 239 87 V 95" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                {/* Keyhole */}
                <circle cx="230" cy="105" r="3.5" fill="#228be6" />
                <polygon points="228,105 232,105 233,115 227,115" fill="#228be6" />
              </g>

              {/* Desk Line */}
              <line x1="50" y1="210" x2="350" y2="210" stroke="#d0ebff" strokeWidth="4" strokeLinecap="round" />

              {/* Potted Plant on Desk */}
              <polygon points="310,210 325,210 321,192 314,192" fill="#74c0fc" />
              <ellipse cx="317.5" cy="192" rx="3.5" ry="1.5" fill="#5c7cfa" />
              <path d="M 317.5 192 Q 310 170, 305 175 Q 312 185, 317.5 192 Z" fill="#2b8a3e" />
              <path d="M 317.5 192 Q 325 170, 330 175 Q 323 185, 317.5 192 Z" fill="#2b8a3e" />
              <path d="M 317.5 192 Q 317.5 160, 312 165 Q 317.5 180, 317.5 192 Z" fill="#40c057" />

              {/* Doctor Character */}
              {/* Chair Back */}
              <rect x="90" y="140" width="35" height="50" rx="6" fill="#74c0fc" />
              <line x1="107" y1="190" x2="107" y2="210" stroke="#495057" strokeWidth="4" />

              {/* Doctor Body */}
              {/* Blue Shirt/Tie */}
              <path d="M 125 155 L 155 155 L 150 180 L 130 180 Z" fill="#1864ab" />
              <polygon points="137,155 143,155 145,175 135,175" fill="#1c7ed6" />
              <polygon points="138,155 142,155 140,170" fill="#e6fcff" />
              
              {/* White Coat */}
              <path d="M 115 150 C 115 135, 165 135, 165 150 L 175 210 L 105 210 Z" fill="white" />
              {/* Lapels */}
              <path d="M 125 150 L 135 175 L 125 190" stroke="#dee2e6" strokeWidth="2" fill="none" />
              <path d="M 155 150 L 145 175 L 155 190" stroke="#dee2e6" strokeWidth="2" fill="none" />
              
              {/* Stethoscope */}
              <path d="M 128 142 C 128 160, 152 160, 152 142" stroke="#adb5bd" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 148 156 L 148 172 Q 148 178, 140 178" stroke="#adb5bd" strokeWidth="2.5" fill="none" />
              <circle cx="138" cy="178" r="3.5" fill="#868e96" />

              {/* Head */}
              <circle cx="140" cy="115" r="16" fill="#ffd8a8" />
              <path d="M 122 112 C 122 95, 158 95, 158 112 C 158 102, 122 102, 122 112 Z" fill="#212529" />
              <circle cx="123" cy="115" r="3.5" fill="#ffd8a8" />
              <circle cx="157" cy="115" r="3.5" fill="#ffd8a8" />
              <circle cx="134" cy="114" r="1.5" fill="#212529" />
              <circle cx="146" cy="114" r="1.5" fill="#212529" />
              <path d="M 135 122 Q 140 126, 145 122" stroke="#e03131" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Laptop on Desk */}
              <polygon points="160,210 205,210 200,200 165,200" fill="#1c7ed6" />
              <polygon points="167,208 198,208 196,202 169,202" fill="#102a43" />
              <polygon points="195,200 220,165 210,160 185,195" fill="#2b2d42" />
              <polygon points="197,198 217,167 211,163 190,195" fill="#4dabf7" />

              {/* Doctor's Arms/Hands */}
              <path d="M 115 165 Q 140 175, 175 204" stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" />
              <circle cx="175" cy="204" r="4.5" fill="#ffd8a8" />
            </svg>
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
    </div>
  );
}
