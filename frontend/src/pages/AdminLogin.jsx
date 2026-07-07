import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Mail, Lock } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
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
    /* Fixed full-screen root — completely independent of body/layout styles */
    <div
      data-login-page="true"
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      zIndex: 0,
      overflow: 'hidden',
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="https://res.cloudinary.com/de8opipom/video/upload/v1783343289/WhatsApp_Video_2026-07-06_at_6.16.41_PM_yjm2ng.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.42)',
        zIndex: 1,
      }} />

      {/* Centered card wrapper — scrollable on very small screens */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        padding: '20px 16px',
        boxSizing: 'border-box',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.04, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: 'tween', ease: 'anticipate', duration: 0.4 }}
          style={{
            width: '100%',
            maxWidth: '400px',
            background: 'rgba(255,255,255,0.1)',
            border: '1.5px solid rgba(255,255,255,0.22)',
            borderRadius: '20px',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            padding: '40px 32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            flexShrink: 0,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
            <AnimatedLogo height={64} />
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            margin: '0 0 24px 0',
            lineHeight: 1.2,
          }}>Admin Login</h2>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.2)',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: '1px solid rgba(239,68,68,0.3)',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div style={{ position: 'relative', marginBottom: '28px', borderBottom: '2px solid rgba(255,255,255,0.8)' }}>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder=" "
                style={{
                  width: '100%',
                  height: '48px',
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '0 36px 0 5px',
                  color: '#fff',
                  caretColor: '#fff',
                  WebkitTextFillColor: '#fff',
                  boxShadow: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <label htmlFor="email" style={{
                position: 'absolute',
                top: formData.email ? '-4px' : '50%',
                left: '5px',
                transform: formData.email ? 'none' : 'translateY(-50%)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: formData.email ? '0.8rem' : '1rem',
                pointerEvents: 'none',
                transition: 'all 0.25s ease',
              }}>Email</label>
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
                <Mail size={18} color="rgba(255,255,255,0.6)" />
              </span>
            </div>

            {/* Password Input */}
            <div style={{ position: 'relative', marginBottom: '24px', borderBottom: '2px solid rgba(255,255,255,0.8)' }}>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder=" "
                style={{
                  width: '100%',
                  height: '48px',
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '0 36px 0 5px',
                  color: '#fff',
                  caretColor: '#fff',
                  WebkitTextFillColor: '#fff',
                  boxShadow: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <label htmlFor="password" style={{
                position: 'absolute',
                top: formData.password ? '-4px' : '50%',
                left: '5px',
                transform: formData.password ? 'none' : 'translateY(-50%)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: formData.password ? '0.8rem' : '1rem',
                pointerEvents: 'none',
                transition: 'all 0.25s ease',
              }}>Password</label>
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
                <Lock size={18} color="rgba(255,255,255,0.6)" />
              </span>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#fff' }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Remember Me</span>
              </label>
              <Link
                to="/admin/forgot-password"
                style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textDecoration: 'none' }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '44px',
                background: '#fff',
                color: '#0f172a',
                fontWeight: 700,
                borderRadius: '40px',
                border: 'none',
                fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.25s ease',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: '20px', margin: '20px 0 0' }}>
            Don't have an account?{' '}
            <Link to="/admin/register" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
