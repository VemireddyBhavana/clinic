import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, CheckCircle, ArrowLeft, Calendar, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import { getHospitalById } from '../api/services';

export default function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const data = await getHospitalById(id);
        setHospital(data);
      } catch (err) {
        console.error("Failed to fetch hospital", err);
        setError("Hospital not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [id]);

  const handleBookHere = () => {
    navigate('/book', { state: { hospitalId: hospital.id || hospital._id, hospitalName: hospital.name } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{error}</h2>
        <Link to="/hospitals" className="text-blue-600 font-bold hover:underline">
          Return to Hospitals
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-10 pb-32 text-white relative">
        <div className="absolute inset-0 opacity-30">
          <img src={hospital.image} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
        
        <PageContainer className="relative z-10">
          <Link to="/hospitals" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-bold mb-8 transition-colors">
            <ArrowLeft size={18} /> Back to Hospitals
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <img 
              src={hospital.image} 
              alt={hospital.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-slate-800 shadow-2xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{hospital.name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{hospital.rating}</span>
                  <span>({hospital.reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Activity size={16} className="text-blue-400" />
                  <span className="text-white">Active</span>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="grid lg:grid-cols-3 gap-8 -mt-16 relative z-20">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" /> Departments & Specialties
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(hospital.departments || []).map((dept, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    {dept}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About this facility</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {hospital.description || `${hospital.name} is dedicated to providing high-quality healthcare services to the community. Equipped with modern facilities and experienced professionals, we ensure that every patient receives the best possible care.`}
              </p>
            </div>
          </div>

          {/* Sidebar Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Contact & Booking</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="text-blue-600 shrink-0 mt-0.5" size={20} />
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-blue-600 hover:underline transition-colors"
                  >
                    {hospital.address}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <Phone className="text-blue-600 shrink-0 mt-0.5" size={20} />
                  <a 
                    href={`tel:${hospital.phone || "+18000000000"}`}
                    className="text-sm font-medium hover:text-blue-600 hover:underline transition-colors"
                  >
                    {hospital.phone || "+1-800-MEDISLOT"}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-slate-600">
                  <Calendar className="text-blue-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-sm font-medium">{hospital.timings || "Open 24/7"}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Wait Time</span>
                  <span className="text-xs font-bold bg-white px-2 py-1 rounded text-blue-600 shadow-sm">&lt; 15 mins</span>
                </div>
                <p className="text-xs text-blue-600/80">AI Optimized scheduling is active for this hospital.</p>
              </div>

              <button 
                onClick={handleBookHere}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                <Calendar size={18} /> Book Appointment Here
              </button>
            </div>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
