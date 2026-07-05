import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';
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
        console.error("Failed to load doctors", error);
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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <h1 className="text-4xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Browse our extensive list of highly qualified specialists and book your appointment instantly.
          </p>
        </PageContainer>
      </div>

      {/* Search and Filter Container */}
      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg p-6 mb-12 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search doctors by name..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-4 relative">
              <Filter className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <select 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-700"
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDoctors.map(doctor => (
              <motion.div variants={itemVariants} key={doctor._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="p-6 pb-0 flex gap-5">
                  <img 
                    src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=eff6ff&color=2563eb`} 
                    alt={doctor.name} 
                    className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-2">{doctor.specialization}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-sm font-bold text-slate-700">4.9</span>
                      <span className="text-xs text-slate-400">(120 Reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-4 flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-slate-400" />
                      </div>
                      <span>{doctor.experienceYears} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-slate-400" />
                      </div>
                      <span>Room {doctor.roomNumber}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <CalendarIcon size={16} className="text-slate-400" />
                      </div>
                      <span>Available: {doctor.availableDays?.slice(0,3).join(', ')}...</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Consultation Fee</p>
                      <p className="text-lg font-bold text-slate-900">₹{doctor.fee}</p>
                    </div>
                    <button 
                      onClick={() => handleBookDoctor(doctor._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm shadow-sm"
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">No doctors found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

      </PageContainer>
    </div>
  );
}