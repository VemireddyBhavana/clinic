import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Loader, AlertCircle, RefreshCw } from 'lucide-react';

export default function LocationPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Check if we already have location stored or if we already prompted in this session
  useEffect(() => {
    const hasLocation = sessionStorage.getItem('userLat') && sessionStorage.getItem('userLng');
    const hasPrompted = sessionStorage.getItem('locationPrompted');
    
    if (!hasLocation && !hasPrompted) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('locationPrompted', 'true');
    setIsOpen(false);
  };

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus('error');
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        sessionStorage.setItem('userLat', position.coords.latitude);
        sessionStorage.setItem('userLng', position.coords.longitude);
        sessionStorage.setItem('locationPrompted', 'true');
        setStatus('success');
        
        // Auto close after brief success message
        setTimeout(() => {
          setIsOpen(false);
        }, 1500);
      },
      (error) => {
        setStatus('error');
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage("Location access was denied. We need it to show nearby hospitals.");
        } else {
          setErrorMessage("Unable to retrieve your location. Please try again.");
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="p-8 text-center">
            
            {status === 'idle' && (
              <>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Find Nearby Hospitals</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Allow MediSlot AI to access your location to show you the best healthcare facilities in your immediate area.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={requestLocation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    Allow Location Access
                  </button>
                  <button 
                    onClick={handleClose}
                    className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-3 px-4 rounded-xl transition-colors border border-slate-200"
                  >
                    Not Now
                  </button>
                </div>
              </>
            )}

            {status === 'loading' && (
              <div className="py-8">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                  <MapPin size={24} className="absolute inset-0 m-auto text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Locating you...</h3>
                <p className="text-slate-500 text-sm">Please wait while we find your coordinates.</p>
              </div>
            )}

            {status === 'success' && (
              <div className="py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Location Found!</h3>
                <p className="text-slate-500 text-sm">We'll use this to find the best hospitals near you.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="py-4">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  {errorMessage}
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={requestLocation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} /> Try Again
                  </button>
                  <button 
                    onClick={handleClose}
                    className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-3 px-4 rounded-xl transition-colors border border-slate-200"
                  >
                    Continue without location
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
