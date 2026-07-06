import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin, Calendar as CalendarIcon, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { getDoctors } from '../api/services';

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to load doctors', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = selectedSpecialization === 'All' || doc.specialization === selectedSpecialization;
    return matchesSearch && matchesSpec;
  });

  const handleBookDoctor = (doctorId) => {
    navigate('/book', { state: { doctorId } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 pt-12 pb-20 sm:pt-16 sm:pb-24 text-white text-center">
        <PageContainer>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Find Your Doctor</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Browse our extensive list of highly qualified specialists and book your appointment instantly.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        {/* Search & Filter Bar */}
        <div className="-mt-10 sm:-mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-slate-950/40 p-4 sm:p-6 mb-8 sm:mb-12 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search doctors by name..." 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="sm:w-56 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 z-10" size={18} />
              <select 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer text-sm text-slate-700 dark:text-slate-200"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">Loading doctors...</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredDoctors.map(doctor => (
              <motion.div 
                variants={itemVariants} 
                key={doctor._id} 
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-slate-950/40 transition-all duration-300 flex flex-col group"
              >
                <div className="p-5 pb-0 flex gap-4">
                  <img 
                    src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=eff6ff&color=2563eb`} 
                    alt={doctor.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1 leading-tight truncate">{doctor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{doctor.specialization}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={13} />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">4.9</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">(120 Reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 pt-4 flex-1 flex flex-col">
                  <div className="space-y-2.5 mb-5 flex-1">
                    {[
                      { icon: Clock, text: `${doctor.experienceYears} Years Experience` },
                      { icon: MapPin, text: `Room ${doctor.roomNumber}` },
                      { icon: CalendarIcon, text: `Available: ${doctor.availableDays?.slice(0,3).join(', ')}...` },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          <Icon size={15} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <span className="truncate">{text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Consultation Fee</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">₹{doctor.fee}</p>
                    </div>
                    <button 
                      onClick={() => handleBookDoctor(doctor._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-sm shrink-0"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <UserCircle size={56} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No doctors found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}

      </PageContainer>
    </div>
  );
}