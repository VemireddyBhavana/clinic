import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Star, Phone, Activity, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { getNearbyHospitals } from '../api/services';

export default function Hospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // If we have coordinates stored in sessionStorage from Home page, use them
    const storedLat = sessionStorage.getItem('userLat');
    const storedLng = sessionStorage.getItem('userLng');

    if (storedLat && storedLng) {
      fetchHospitals(storedLat, storedLng);
    } else {
      // Fallback to fetch all hospitals if no location
      fetchHospitals();
      setLocationError("Location not provided. Showing all available hospitals.");
    }
  }, []);

  const fetchHospitals = async (lat, lng) => {
    try {
      setLoading(true);
      const data = await getNearbyHospitals(lat, lng);
      
      // If user provided location but no hospitals are within the 50km radius, fallback to all
      if (lat && lng && data.length === 0) {
        setLocationError("No hospitals found within 50km of your location. Showing all available hospitals.");
        const allData = await getNearbyHospitals(); // Fetch all without lat/lng
        setHospitals(allData);
      } else {
        setHospitals(data);
      }
    } catch (error) {
      console.error("Failed to fetch hospitals", error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 10, mass: 1 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-400">
            <Activity size={14} />
            Network of Care
          </div>
          <h1 className="text-4xl font-bold mb-4">Select a Hospital</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            {locationError 
              ? "Showing all partnered hospitals across our network."
              : "Here are the top-rated hospitals near your current location."}
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 p-8 min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {hospitals.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <p>No hospitals found nearby.</p>
                </div>
              ) : (
                hospitals.map(hospital => (
                  <motion.div 
                    key={hospital.id || hospital._id} 
                    variants={fadeInUp}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative overflow-hidden group">
                      <img 
                        src={hospital.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"} 
                        alt={hospital.name} 
                        className="w-full h-48 object-cover"
                      />
                      {hospital.distance != null && (
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Navigation size={12} className="text-blue-600" />
                          {(hospital.distance / 1000).toFixed(1)} km away
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{hospital.name}</h3>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-blue-700 text-xs font-bold shrink-0">
                          <Star size={12} className="mr-1 fill-blue-700" />
                          {hospital.rating || "4.0"}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-slate-500 text-xs">
                          <MapPin size={14} className="shrink-0 mt-0.5 text-blue-500" />
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-blue-600 hover:underline transition-colors"
                          >
                            {hospital.address}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-slate-500 text-xs">
                          <Phone size={14} className="shrink-0 mt-0.5 text-blue-500" />
                          <a 
                            href={`tel:${hospital.phone || "+18000000000"}`} 
                            className="hover:text-blue-600 hover:underline transition-colors"
                          >
                            {hospital.phone || "+1 (800) MEDISLOT"}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-slate-500 text-xs">
                          <Clock size={14} className="shrink-0 mt-0.5 text-blue-500" />
                          <span className="line-clamp-1">{hospital.timings || "24/7 Emergency"}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                        {(hospital.departments || []).slice(0, 3).map((dept, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-wide text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            {dept}
                          </span>
                        ))}
                        {(hospital.departments || []).length > 3 && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            +{(hospital.departments || []).length - 3} More
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
                        <Link to={`/hospital/${hospital.id || hospital._id}`} className="flex-1">
                          <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg transition-colors text-sm border border-slate-200 shadow-sm">
                            View Details
                          </button>
                        </Link>
                        <button 
                          onClick={() => navigate('/book', { state: { hospitalId: hospital.id || hospital._id, hospitalName: hospital.name } })}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-sm"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
