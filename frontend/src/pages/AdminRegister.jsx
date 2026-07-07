import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import adminDoctorImg from '../assets/admin_doctor.png';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { adminAPI } from '../services/api';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target; setFormData(prev => ({ ...prev, [id]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await adminAPI.register({ name: formData.name, email: formData.email, password: formData.password });
      localStorage.setItem('adminToken', res.token);
      localStorage.setItem('adminInfo', JSON.stringify(res.admin));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SIDE - Light Blue Background with Illustration */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#f4f7fe] flex-col relative px-12 py-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-auto z-10">
          <AnimatedLogo height={64} />
        </div>
        
        {/* Illustration Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto">
          {/* Doctor Image */}
          <div className="relative w-full flex items-center justify-center mb-8">
            {/* Subtle glow blobs behind image */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>

            <img
              src={adminDoctorImg}
              alt="Doctor with secure admin access"
              className="relative z-10 w-full max-w-[420px] object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(59,130,246,0.18))', transform: 'scaleX(-1)' }}
            />
          </div>

          {/* Text Below Illustration */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-700 mb-3">Secure Admin Access</h2>
            <p className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
              Manage doctors, appointments and clinic operations in one place.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Register Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 bg-white">
        <div className="w-full max-w-[420px] mx-auto">
          
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Registration</h2>
              <p className="text-sm text-slate-500">Create a new admin account to access the portal</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}
            
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                <input id="name" type="text" placeholder="Dr. John Doe" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <input 
                  id="email"
                  type="email"
                  placeholder="admin@medislot.ai"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                <input 
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm tracking-widest placeholder:tracking-normal"
                />
              </div>

              

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-sm shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>
            </form>
            
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account? <Link to="/admin/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

