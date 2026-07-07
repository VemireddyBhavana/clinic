import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { 
  Calendar, ShieldCheck, Activity, Bell,
  User, Clock, 
  CalendarCheck, ClipboardCheck,
  TrendingUp, Users, Star, ArrowRight, Headset
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

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
  const [specialization, setSpecialization] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const handleBookSlot = () => {
    navigate('/hospitals', { state: { specialization, preferredDate } });
  };

  const handleBookDoctor = (doctorName) => {
    navigate('/hospitals', { state: { doctorName } });
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
              <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold text-slate-900 dark:text-white leading-[1.15] mb-4 tracking-tight">
                Smarter Appointments.<br />
                <span className="text-blue-600 dark:text-blue-500">Better Healthcare.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-7 leading-relaxed max-w-xl mx-auto lg:mx-0">
                MediSlot AI optimizes clinic scheduling, reduces no-shows, balances doctor workload, and helps you get the right care at the right time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
                <Link to="/hospitals" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-lg shadow-sm text-sm transition-colors"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
                <Link to="/doctors" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3 px-7 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-sm text-sm"
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input type="text" placeholder="Enter full name" className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                    <input type="text" placeholder="Enter mobile number" className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
                    <select 
                      className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    >
                      <option value="" disabled>Select specialization</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="general">General Medicine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer" 
                    />
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleBookSlot}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs mb-4 shadow-sm cursor-pointer transition-colors"
                >
                  Find Best Slots
                </motion.button>

                <div className="flex justify-between items-start border-t border-slate-100 dark:border-slate-800 pt-3">
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

      {/* ── Feature Cards ── */}
      <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 transition-colors duration-300">
        <PageContainer>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              { icon: CalendarCheck, title: 'Smart Slot Recommendation', desc: 'AI suggests the best available slots for you.' },
              { icon: TrendingUp, title: 'No-Show Risk Prediction', desc: 'We predict no-show risk and prepare better.' },
              { icon: Users, title: 'Workload Balancer', desc: 'Distributes appointments evenly across doctors.' },
              { icon: Bell, title: 'Automated Reminders', desc: 'Timely SMS & email reminders for appointments.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div 
                key={title}
                variants={fadeInUp} 
                {...cardMotion}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md hover:border-blue-100 dark:hover:border-blue-800 transition-colors duration-200 cursor-default"
              >
                <div className="w-11 h-11 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-blue-600 dark:text-blue-400" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-[13px] leading-tight mb-1">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-12 sm:py-16 bg-slate-50/70 dark:bg-slate-900/30 transition-colors duration-300">
        <PageContainer>
          <motion.div 
            className="text-center mb-10 sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Simple steps to book your appointment</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 dark:border-slate-700 -z-0 transform -translate-y-1/2" />

            {[
              { num: 1, icon: User, title: 'Choose Doctor', desc: 'Browse doctors by specialization or search.' },
              { num: 2, icon: CalendarCheck, title: 'Select Best Slot', desc: 'AI shows recommended slots with lower wait time.' },
              { num: 3, icon: ClipboardCheck, title: 'Confirm Booking', desc: 'Fill your details and confirm the appointment.' },
              { num: 4, icon: Bell, title: 'Get Reminders', desc: 'Receive timely reminders and follow-ups.' },
            ].map((step) => (
              <motion.div 
                key={step.num} 
                variants={fadeInUp}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-sm dark:shadow-slate-950/20 border border-slate-100 dark:border-slate-800 relative z-10 flex items-center gap-3 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-xs font-bold shrink-0">{step.num}</div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center shrink-0">
                  <step.icon className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{step.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{step.desc}</p>
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
