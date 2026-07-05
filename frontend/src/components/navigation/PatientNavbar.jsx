import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X } from 'lucide-react';

export default function PatientNavbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const handleHowItWorksClick = () => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById('how-it-works'); 
    if (el) el.scrollIntoView({ behavior: 'smooth' }); 
    else window.location.href = '/home#how-it-works';
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="text-blue-600 bg-blue-50 p-1.5 rounded-lg">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-blue-700">MediSlot AI</span>
        </Link>
        
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/home" className={`text-sm font-bold transition-colors ${isActive('/home') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Home</Link>
          <Link to="/doctors" className={`text-sm font-bold transition-colors ${isActive('/doctors') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Doctors</Link>
          <button onClick={handleHowItWorksClick} className="text-sm font-bold transition-colors text-gray-500 hover:text-gray-900 text-left">How it works</button>
          <Link to="/about" className={`text-sm font-bold transition-colors ${isActive('/about') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>About us</Link>
          <Link to="/services" className={`text-sm font-bold transition-colors ${isActive('/services') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Services</Link>
          <Link to="/contact" className={`text-sm font-bold transition-colors ${isActive('/contact') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Contact</Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
          <Link to="/book">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
              Book Appointment
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/book" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
            Book
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col space-y-4 z-40">
          <Link to="/home" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive('/home') ? 'text-blue-600' : 'text-gray-700'}`}>Home</Link>
          <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive('/doctors') ? 'text-blue-600' : 'text-gray-700'}`}>Doctors</Link>
          <button onClick={handleHowItWorksClick} className="text-base font-bold text-gray-700 text-left">How it works</button>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive('/about') ? 'text-blue-600' : 'text-gray-700'}`}>About us</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive('/services') ? 'text-blue-600' : 'text-gray-700'}`}>Services</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-bold ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700'}`}>Contact</Link>
        </div>
      )}
    </header>
  );
}
