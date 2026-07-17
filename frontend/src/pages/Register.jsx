import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { registerWithEmail } from '../services/firebaseAuth';

export default function Register() {
  const navigate = useNavigate();
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

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-10 m-4 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <AnimatedLogo height={72} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          Join the MediSlot AI clinical optimization network.
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
              placeholder="Full Name"
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
              placeholder="Email Address"
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
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 pl-1 pr-8"
            />
            <Lock size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Role selector */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
              I am joining as:
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Register'}
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
