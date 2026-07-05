import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, Phone } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';

export default function PatientNavbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <div className="text-blue-600 bg-blue-50 p-1.5 rounded-lg">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-blue-700">MediSlot AI</span>
        </Link>
        
        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/home" className={`text-sm font-bold transition-colors ${isActive('/home') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Home</Link>
          <Link to="/doctors" className={`text-sm font-bold transition-colors ${isActive('/doctors') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Doctors</Link>
          <button onClick={() => { const el = document.getElementById('how-it-works'); if (el) el.scrollIntoView({ behavior: 'smooth' }); else window.location.href = '/home#how-it-works'; }} className="text-sm font-bold transition-colors text-gray-500 hover:text-gray-900 text-left">How it works</button>
          <Link to="/about" className={`text-sm font-bold transition-colors ${isActive('/about') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>About us</Link>
          <Link to="/services" className={`text-sm font-bold transition-colors ${isActive('/services') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Services</Link>
          <Link to="/contact" className={`text-sm font-bold transition-colors ${isActive('/contact') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Contact</Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-3 lg:space-x-5">
          <div className="hidden lg:flex items-center text-gray-700 space-x-1.5 mr-2">
            <Phone size={18} className="text-blue-600" />
            <span className="text-sm font-semibold">+91 98765 43210</span>
          </div>
          <Link to="/doctors">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
              Book Appointment
            </button>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
