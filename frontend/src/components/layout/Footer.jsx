import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link to="/home" className="flex items-center gap-2 mb-6">
              <div className="text-blue-600 bg-white p-1.5 rounded-lg">
                <HeartPulse size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">MediSlot AI</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Revolutionizing healthcare scheduling with AI. Find the right doctor, reduce wait times, and experience seamless care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                IN
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/home" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link to="/doctors" className="text-slate-400 hover:text-white transition-colors text-sm">Our Doctors</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
              <li><Link to="/patient-rights" className="text-slate-400 hover:text-white transition-colors text-sm">Patient Rights</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">123 Healthcare Ave, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm text-slate-400">support@medislotai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} MediSlot AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Built with <HeartPulse size={14} className="text-red-500 fill-red-500" /> for Better Healthcare
          </div>
        </div>
      </div>
    </footer>
  );
}
