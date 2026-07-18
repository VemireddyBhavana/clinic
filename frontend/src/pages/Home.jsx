import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, MotionConfig, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ShieldCheck, Activity, Bell,
  User, Clock, 
  CalendarCheck, ClipboardCheck,
  TrendingUp, Users, Star, ArrowRight, Headset,
  AlertTriangle, Stethoscope
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { doctorAPI } from '../services/api';
import { analyzeSymptoms } from '../services/gemini';

// ── Animation Variants ────────────────────────────────────────────────────────
// Reduced y-distance so animations feel smooth on all screen sizes
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 70, damping: 14 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

// Viewport config — margin helps trigger IntersectionObserver early enough on mobile
// (iOS Safari fires IO events late, so we add a generous rootMargin)
const viewport = { once: true, amount: 0.1, margin: '0px 0px -50px 0px' };

// Card hover/tap — whileTap for touch devices, whileHover for desktop
const cardMotion = {
  whileHover: { y: -5, scale: 1.02 },
  whileTap:   { scale: 0.97 },
  transition: { type: 'spring', stiffness: 350, damping: 20 }
};

export default function Home() {
  const navigate = useNavigate();
  const getISTDateStr = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now);
  };
  const istTodayStr = getISTDateStr();

  const [preferredDate, setPreferredDate] = useState(istTodayStr);
  const [triageLoading, setTriageLoading] = useState(false);
  const [triageResult, setTriageResult] = useState(null);
  const [dbDoctors, setDbDoctors] = useState([]);

  useEffect(() => {
    // Fetch actual doctors from DB for matching
    const fetchDoctors = async () => {
      try {
        const docs = await doctorAPI.getAll();
        setDbDoctors(docs);
      } catch (err) {
        console.error("Failed to load doctor listings on Home page", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleAnalyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    setTriageLoading(true);
    setTriageResult(null);
    try {
      const result = await analyzeSymptoms(symptoms);
      // Filter db doctors that match the specialization
      const matched = dbDoctors.filter(
        d => d.specialization.toLowerCase() === result.specialization.toLowerCase() && d.isActive
      );
      setTriageResult({
        ...result,
        recommendedDoctors: matched.slice(0, 2)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTriageLoading(false);
    }
  };

  const handleBookSlot = (spec) => {
    navigate('/hospitals', { state: { specialization: spec.toLowerCase(), preferredDate, symptoms } });
  };

  const handleBookDoctor = (doctorId, spec) => {
    navigate('/hospitals', { state: { doctorId, specialization: spec.toLowerCase(), preferredDate, symptoms } });
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* ── Hero ── */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 bg-white dark:bg-slate-950 transition-colors duration-300">
        <PageContainer>
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left — Text */}
            <motion.div 
              className="w-full lg:col-span-5 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold mb-5 border border-blue-100 dark:border-blue-900/50">
                <Activity size={13} />
                AI-Powered Smart Scheduling
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 dark:text-white leading-[1.15] mb-4 tracking-tight">
                Find the Right Doctor with AI.<br />
                <span className="text-blue-600 dark:text-blue-500">Book Smarter. Get Care Faster.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-7 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Describe your symptoms, let AI recommend the right specialist, compare available doctors, reduce waiting time, and book your appointment in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
                <Link to="/hospitals" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-lg shadow-sm text-sm transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
                <Link to="/doctors" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3 px-7 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-sm text-sm cursor-pointer"
                  >
                    View Doctors
                  </motion.button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10">
                {[
                  { icon: User, value: '250+', label: 'Doctors' },
                  { icon: CalendarCheck, value: '15K+', label: 'Appointments' },
                  { icon: ShieldCheck, value: '98%', label: 'Satisfaction' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                      <Icon className="text-blue-600 dark:text-blue-400" size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-base leading-none mb-0.5">{value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Middle — Doctor Image (hidden on xs) */}
            <motion.div 
              className="hidden sm:flex lg:col-span-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 shrink-0">
                <div className="absolute bottom-4 right-0 left-4 h-[80%] bg-blue-50/50 dark:bg-blue-950/20 rounded-[32px] -z-10" />
                <img 
                  src="https://res.cloudinary.com/de8opipom/image/upload/v1783233370/WhatsApp_Image_2026-07-05_at_12.03.42_PM_yh82us.jpg" 
                  alt="Doctor" 
                  className="relative z-10 w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
            </motion.div>

            {/* Right — Booking Form */}
            <motion.div 
              className="w-full lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full max-w-[420px] mx-auto lg:ml-auto lg:mr-0 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.07)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Book Your Appointment</h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-4">Get AI-recommended slots based on availability &amp; wait time.</p>
                
                <AnimatePresence mode="wait">
                  {!triageResult ? (
                    <motion.div 
                      key="step1" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Describe Symptoms (Step 1)</label>
                        <textarea 
                          rows={3}
                          placeholder="e.g. I have chest pain and shortness of breath"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-500 resize-none font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                        <input 
                          type="date" 
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          min={istTodayStr}
                          className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer" 
                        />
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={handleAnalyzeSymptoms}
                        disabled={triageLoading || !symptoms.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs mb-1 shadow-sm cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {triageLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-left"
                    >
                      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 p-3 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">Recommended Specialty</span>
                          <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">{triageResult.confidence}% Confidence</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Stethoscope size={16} className="text-blue-500" />
                          {triageResult.specialization}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{triageResult.explanation}</p>
                      </div>

                      {triageResult.emergencyWarning && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold flex gap-2 items-start">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <p>{triageResult.emergencyWarning}</p>
                        </div>
                      )}

                      {triageResult.recommendedDoctors && triageResult.recommendedDoctors.length > 0 ? (
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Recommended Specialist Matches</label>
                          {triageResult.recommendedDoctors.map(doc => (
                            <div key={doc._id} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-150 dark:border-slate-700/60">
                              <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</p>
                                <p className="text-[10px] text-slate-400">{doc.experienceYears} Years Exp. | Room {doc.roomNumber}</p>
                              </div>
                              <button 
                                onClick={() => handleBookDoctor(doc._id, triageResult.specialization)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                              >
                                Book Now
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-slate-500 dark:text-slate-400">No specific {triageResult.specialization} doctors available today.</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setTriageResult(null)}
                          className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Change Symptoms
                        </button>
                        <button 
                          onClick={() => handleBookSlot(triageResult.specialization)}
                          className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-sm"
                        >
                          Find Hospitals
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-start border-t border-slate-100 dark:border-slate-800 pt-3 mt-4">
                  {[
                    { icon: Clock, title: 'Lower Wait Time', sub: 'AI finds best slot' },
                    { icon: ShieldCheck, title: 'No-Show Reduction', sub: 'Smart reminders' },
                  ].map(({ icon: Icon, title, sub }) => (
                    <div key={title} className="flex items-start gap-1.5">
                      <Icon size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-bold text-slate-900 dark:text-slate-200 leading-tight mb-0.5">{title}</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* 🌟🌟 Feature Cards 🌟🌟 */}
      <section className="py-14 sm:py-20 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300">
        <PageContainer>
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border border-blue-100 dark:border-blue-900/50">
              <Activity size={13} /> Powered by Gemini AI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Platform Features</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              MediSlot AI uses state-of-the-art machine learning to make healthcare smarter, faster, and more accessible.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              { icon: CalendarCheck, title: 'AI Smart Scheduling', desc: 'AI suggests the best available time slots for you based on doctor availability and wait time predictions.', path: '/features/smart-scheduling', color: 'blue' },
              { icon: TrendingUp, title: 'AI No-Show Prediction', desc: 'Machine learning predicts patient no-show likelihood so clinics can optimise their rosters proactively.', path: '/features/no-show-prediction', color: 'purple' },
              { icon: Users, title: 'Doctor Workload Balancer', desc: 'Intelligently distributes appointments across doctors to prevent burnout and reduce patient wait times.', path: '/features/workload-balancer', color: 'green' },
              { icon: Bell, title: 'Smart Reminders', desc: 'Automated multi-channel SMS, email, and WhatsApp reminders to reduce missed appointments.', path: '/features/reminders', color: 'orange' },
              { icon: Stethoscope, title: 'AI Symptom Checker', desc: 'Describe symptoms in plain English — our Gemini-powered triage engine recommends the right specialist instantly.', path: '/features/symptom-checker', color: 'red' },
              { icon: ShieldCheck, title: 'Secure Health Records', desc: 'Your medical history and appointments are encrypted and available securely across all devices.', path: '/patient/dashboard', color: 'teal' },
            ].map(({ icon: Icon, title, desc, path }) => (
              <Link to={path} key={title} className="h-full block group">
                <motion.div 
                  variants={fadeInUp} 
                  {...cardMotion}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800 flex flex-col gap-4 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 h-full cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <Icon className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-2">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold mt-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={13} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </PageContainer>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-14 sm:py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <PageContainer>
          <motion.div 
            className="text-center mb-10 sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Book your appointment in 5 simple steps</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              { num: 1, icon: Stethoscope, title: 'Describe Symptoms', desc: 'Tell our AI-powered assistant what you are experiencing in plain language.' },
              { num: 2, icon: CalendarCheck, title: 'AI Finds Specialist', desc: 'Gemini analyses your symptoms and recommends the right medical specialty.' },
              { num: 3, icon: User, title: 'Pick Your Doctor', desc: 'Choose from a workload-balanced list of available doctors near you.' },
              { num: 4, icon: ClipboardCheck, title: 'Book Appointment', desc: 'Confirm your preferred date and time slot at the nearest hospital.' },
              { num: 5, icon: Bell, title: 'Receive Reminders', desc: 'Get automated SMS, email, and WhatsApp reminders so you never miss a visit.' },
            ].map((step) => (
              <motion.div 
                key={step.num} 
                variants={fadeInUp}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl shadow-sm dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800 relative z-10 flex flex-col gap-4 transition-colors duration-200 hover:shadow-md hover:border-blue-100 dark:hover:border-blue-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-extrabold tracking-wider uppercase shrink-0">
                    Step {step.num}
                  </div>
                  <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center">
                    <step.icon className="text-blue-600 dark:text-blue-400" size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>

      {/* ── Our Top Doctors ── */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <PageContainer>
          <motion.div 
            className="flex flex-wrap justify-between items-end gap-3 mb-8 sm:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">Our Top Doctors</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Experienced specialists across multiple departments</p>
            </div>
            <Link to="/doctors" className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-sm hover:text-blue-700 transition-colors">
              View All <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              { name: 'Dr. Sarah Johnson', spec: 'Cardiologist', exp: '10+ Years', rating: '4.9', reviews: '120', avail: 'Available Today', color: 'green', img: 'Sarah+Johnson' },
              { name: 'Dr. Amit Verma', spec: 'Neurologist', exp: '12+ Years', rating: '4.3', reviews: '98', avail: 'Next: 11:00 AM', color: 'orange', img: 'Amit+Verma' },
              { name: 'Dr. Priya Sharma', spec: 'Dermatologist', exp: '8+ Years', rating: '4.7', reviews: '85', avail: 'Available Today', color: 'green', img: 'Priya+Sharma' },
              { name: 'Dr. Rajesh Patel', spec: 'Orthopedic', exp: '15+ Years', rating: '4.9', reviews: '110', avail: 'Next: 10:30 AM', color: 'orange', img: 'Rajesh+Patel' },
            ].map((doc, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-800 transition-colors duration-200"
              >
                <div className="flex gap-3 mb-3 items-center">
                  <img src={`https://ui-avatars.com/api/?name=${doc.img}&background=eff6ff&color=2563eb`} alt={doc.name} className="w-14 h-14 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-0.5 truncate">{doc.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">{doc.spec}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium">{doc.exp} Exp.</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={i <= Math.floor(parseFloat(doc.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200 dark:text-slate-700 dark:fill-slate-700'} size={13} />
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">{doc.rating}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">({doc.reviews})</span>
                </div>
                <div className={`text-center mb-3 text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 ${doc.color === 'green' ? 'text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400' : 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400'}`}>
                  {doc.color === 'green' ? <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> : <Clock size={11} />}
                  {doc.avail}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookDoctor(doc.name)}
                  className="w-full py-2 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
                >
                  Book Now
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>

      {/* ── Trust Banner ── */}
      <section className="bg-blue-600 py-8 sm:py-10 mt-auto w-full border-t border-blue-700">
        <PageContainer>
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              { icon: Clock, title: 'Easy & Fast Booking', desc: 'Book in less than 2 minutes' },
              { icon: ShieldCheck, title: 'Secure & Confidential', desc: 'Your data is safe with us' },
              { icon: Headset, title: '24/7 Support', desc: 'We are always here to help' },
              { icon: Users, title: 'Trusted by Thousands', desc: '15K+ happy patients' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeInUp} className="flex items-start gap-3">
                <Icon className="text-blue-200 shrink-0 mt-0.5" size={22} />
                <div>
                  <h4 className="text-white font-bold text-xs sm:text-sm mb-0.5">{title}</h4>
                  <p className="text-blue-100 text-[11px] sm:text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>

    </div>
    </MotionConfig>
  );
}
