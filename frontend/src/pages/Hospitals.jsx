import React, { useState, useEffect, Component } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import HospitalMap from '../components/location/HospitalMap';
import { MapPin, Navigation, Star, Phone, Activity, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { getNearbyHospitals } from '../api/services';

// Error boundary to prevent Google Maps crashes from hiding the hospital list
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('Google Maps failed to load, hiding map:', error.message);
  }
  render() {
    if (this.state.hasError) return null; // Map fails silently — hospital cards still show
    return this.props.children;
  }
}

export default function Hospitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationError, setLocationError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const storedLat = sessionStorage.getItem("userLat");
    const storedLng = sessionStorage.getItem("userLng");

    if (storedLat && storedLng) {
      const lat = Number(storedLat);
      const lng = Number(storedLng);
      setUserLocation({ lat, lng });
      fetchNearbyHospitals(lat, lng);
    } else {
      // Prompt for geolocation if not in sessionStorage
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            sessionStorage.setItem("userLat", lat);
            sessionStorage.setItem("userLng", lng);
            setUserLocation({ lat, lng });
            fetchNearbyHospitals(lat, lng);
          },
          (error) => {
            console.warn("Geolocation access denied or failed:", error);
            setLocationError("Location access not granted. Showing all hospitals.");
            fetchNearbyHospitals(); // Fetch all
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser. Showing all hospitals.");
        fetchNearbyHospitals(); // Fetch all
      }
    }
  }, []);

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await getNearbyHospitals(lat, lng);
      const list = data.hospitals || data || [];
      setHospitals(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Error fetching nearby hospitals:", error);
      setFetchError("Could not load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 75, damping: 14 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      <div className="bg-blue-600 dark:bg-blue-700 pt-12 pb-20 sm:pt-16 sm:pb-24 text-white text-center">
        <PageContainer>
          <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-5 border border-blue-400">
            <Activity size={14} />
            Network of Care
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Select a Hospital</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            {locationError 
              ? 'Showing all partnered hospitals across our network.'
              : 'Here are the top-rated hospitals near your current location.'}
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-10 sm:-mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-slate-950/40 border border-slate-100 dark:border-slate-800 p-4 sm:p-8 min-h-[400px]">
            {userLocation && hospitals.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <MapErrorBoundary>
                  <HospitalMap userLocation={userLocation} hospitals={hospitals} />
                </MapErrorBoundary>
              </div>
            )}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {fetchError ? (
                <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Could not load hospitals</p>
                  <p className="text-sm mb-4">{fetchError}</p>
                  <button
                    onClick={() => fetchNearbyHospitals(userLocation?.lat, userLocation?.lng)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : hospitals.length === 0 ? (
                <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400">
                  <div className="text-4xl mb-4">🏥</div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">No hospitals found</p>
                  <p className="text-sm mb-4">We couldn't find any hospitals in your area. Try expanding the search.</p>
                  <button
                    onClick={() => fetchNearbyHospitals()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors"
                  >
                    Show All Hospitals
                  </button>
                </div>
              ) : (
                hospitals.map(hospital => (
                  <motion.div 
                    key={hospital.id || hospital._id} 
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-slate-950/40 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative overflow-hidden group">
                      <img 
                        src={hospital.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"} 
                        alt={hospital.name} 
                        className="w-full h-48 object-cover"
                      />

                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight">{hospital.name}</h3>
                        <div className="flex items-center bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded text-blue-700 dark:text-blue-400 text-xs font-bold shrink-0 ml-2">
                          <Star size={12} className="mr-1 fill-blue-700 dark:fill-blue-400" />
                          {hospital.rating || '4.0'}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs">
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
                        <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs">
                          <Phone size={14} className="shrink-0 mt-0.5 text-blue-500" />
                          <a 
                            href={`tel:${hospital.phone || '+18000000000'}`} 
                            className="hover:text-blue-600 hover:underline transition-colors"
                          >
                            {hospital.phone || '+1 (800) MEDISLOT'}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs">
                          <Clock size={14} className="shrink-0 mt-0.5 text-blue-500" />
                          <span className="line-clamp-1">{hospital.timings || '24/7 Emergency'}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                        {(hospital.departments || []).slice(0, 3).map((dept, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                            {dept}
                          </span>
                        ))}
                        {(hospital.departments || []).length > 3 && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                            +{(hospital.departments || []).length - 3} More
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Link to={`/hospital/${hospital.id || hospital._id}`} state={location.state} className="flex-1">
                          <button className="w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold py-2.5 rounded-lg transition-colors text-sm border border-slate-200 dark:border-slate-600 shadow-sm">
                            View Details
                          </button>
                        </Link>
                        <button 
                          onClick={() => navigate('/book', { state: { hospitalId: hospital.id || hospital._id, hospitalName: hospital.name, ...(location.state || {}) } })}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-sm"
                        >
                          Book Now
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
