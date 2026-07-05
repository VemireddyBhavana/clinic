import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, ShieldCheck, Activity, Bell,
  User, Clock, LayoutTemplate, MessageSquare,
  CalendarCheck, ClipboardCheck, Lock,
  TrendingUp, Users, Star, ArrowRight, Headset
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

export default function Home() {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const handleBookSlot = () => {
    navigate('/book', { state: { specialization, preferredDate } });
  };

  const handleBookDoctor = (doctorName) => {
    navigate('/book', { state: { doctorName } });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-visible bg-white">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-5 z-10 pr-0 lg:pr-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-100">
                <Activity size={14} />
                AI-Powered Smart Scheduling
              </div>
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.1] mb-5 tracking-tight">
                Smarter Appointments.<br />
                <span className="text-blue-600">Better Healthcare.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
                MediSlot AI optimizes clinic scheduling, reduces no-shows, balances doctor workload, and helps you get the right care at the right time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/book">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-lg transition-colors shadow-sm text-sm">
                    Book Appointment
                  </button>
                </Link>
                <Link to="/doctors">
                  <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 rounded-lg border border-slate-200 transition-colors shadow-sm text-sm">
                    View Doctors
                  </button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 sm:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg leading-none mb-1">250+</div>
                    <div className="text-xs text-slate-500 font-medium">Doctors</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <CalendarCheck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg leading-none mb-1">15K+</div>
                    <div className="text-xs text-slate-500 font-medium">Appointments</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <ShieldCheck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg leading-none mb-1">98%</div>
                    <div className="text-xs text-slate-500 font-medium">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Content */}
            <motion.div 
              className="lg:col-span-7 relative flex justify-end mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 lg:gap-8">
                
                {/* Doctor Image Group */}
                <div className="relative w-full lg:w-1/2 max-w-[400px]">
                  <div className="absolute bottom-4 right-0 left-4 h-[80%] bg-blue-50/50 rounded-[40px] -z-10"></div>
                  <img 
                    src="https://res.cloudinary.com/de8opipom/image/upload/v1783233370/WhatsApp_Image_2026-07-05_at_12.03.42_PM_yh82us.jpg" 
                    alt="Doctor" 
                    className="relative z-10 w-full h-auto object-contain"
                  />
                </div>
                
                {/* Embedded Booking Form - Positioned strictly beside */}
                <div className="w-full lg:w-[420px] shrink-0 z-30 bg-white p-6 rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Book Your Appointment</h3>
                  <p className="text-[13px] text-slate-500 mb-5">Get AI-recommended slots based on availability & lower wait time.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input type="text" placeholder="Enter your full name" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Mobile Number</label>
                      <input type="text" placeholder="Enter mobile number" className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Select Specialization</label>
                      <select 
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 bg-white cursor-pointer"
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
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Preferred Date</label>
                      <input 
                        type="date" 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 cursor-pointer" 
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleBookSlot}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm mb-5 shadow-sm"
                  >
                    Find Best Slots
                  </button>

                  {/* Form Trust Indicators */}
                  <div className="flex justify-between items-start border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-1.5">
                      <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900 leading-tight mb-0.5">Lower Wait Time</div>
                        <div className="text-[10px] text-slate-500">AI finds the best slot</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900 leading-tight mb-0.5">No-Show Reduction</div>
                        <div className="text-[10px] text-slate-500">Smart reminders</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white relative z-20 -mt-10 lg:-mt-16">
        <PageContainer>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUp} className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <CalendarCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Smart Slot Recommendation</h3>
                <p className="text-slate-500 text-[11px] leading-tight">AI suggests the best available slots for you.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeInUp} className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">No-Show Risk Prediction</h3>
                <p className="text-slate-500 text-[11px] leading-tight">We predict no-show risk and prepare better.</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeInUp} className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Workload Balancer</h3>
                <p className="text-slate-500 text-[11px] leading-tight">Distributes appointments evenly across doctors.</p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={fadeInUp} className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Bell className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Automated Reminders</h3>
                <p className="text-slate-500 text-[11px] leading-tight">Timely SMS & email reminders for appointments.</p>
              </div>
            </motion.div>
          </motion.div>
        </PageContainer>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 pb-24 relative z-20 bg-slate-50/50">
        <PageContainer>
          <motion.div 
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
            <p className="text-slate-500 text-sm">Simple steps to book your appointment</p>
          </motion.div>

          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 lg:gap-6 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Connecting Dotted Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-slate-300 -z-0 transform -translate-y-1/2"></div>

            {/* Steps */}
            {[
              { num: 1, icon: User, title: "Choose Doctor", desc: "Browse doctors by specialization or search." },
              { num: 2, icon: CalendarCheck, title: "Select Best Slot", desc: "AI shows recommended slots with lower wait time." },
              { num: 3, icon: ClipboardCheck, title: "Confirm Booking", desc: "Fill your details and confirm the appointment." },
              { num: 4, icon: Bell, title: "Get Reminders", desc: "Receive timely reminders and follow-ups." },
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative z-10 flex items-center gap-3.5">
                <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-[13px] font-bold shrink-0">{step.num}</div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <step.icon className="text-blue-600" size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">{step.title}</h3>
                  <p className="text-[12px] text-slate-500 leading-snug">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>

      {/* Our Top Doctors Section */}
      <section className="py-16 pb-24 bg-white relative z-20">
        <PageContainer>
          <motion.div 
            className="flex justify-between items-end mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Top Doctors</h2>
              <p className="text-slate-500 text-sm">Experienced specialists across multiple departments</p>
            </div>
            <Link to="/doctors" className="hidden sm:flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors">
              View All Doctors <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { name: "Dr. Sarah Johnson", spec: "Cardiologist", exp: "10+ Years", rating: "4.9", reviews: "120", avail: "Available Today", color: "green", img: "Sarah+Johnson" },
              { name: "Dr. Amit Verma", spec: "Neurologist", exp: "12+ Years", rating: "4.3", reviews: "98", avail: "Next Slot: 11:00 AM", color: "orange", img: "Amit+Verma" },
              { name: "Dr. Priya Sharma", spec: "Dermatologist", exp: "8+ Years", rating: "4.7", reviews: "85", avail: "Available Today", color: "green", img: "Priya+Sharma" },
              { name: "Dr. Rajesh Patel", spec: "Orthopedic", exp: "15+ Years", rating: "4.9", reviews: "110", avail: "Next Slot: 10:30 AM", color: "orange", img: "Rajesh+Patel" },
              { name: "Dr. Neha Gupta", spec: "Pediatrician", exp: "9+ Years", rating: "4.8", reviews: "95", avail: "Available Today", color: "green", img: "Neha+Gupta", hiddenLg: true }
            ].map((doc, idx) => (
              <motion.div key={idx} variants={fadeInUp} className={`bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300 ${doc.hiddenLg ? 'hidden lg:block' : ''}`}>
                <div className="flex gap-4 mb-4 items-center">
                  <img src={`https://ui-avatars.com/api/?name=${doc.img}&background=eff6ff&color=2563eb`} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{doc.name}</h3>
                    <p className="text-slate-500 text-[11px] mb-1.5">{doc.spec}</p>
                    <p className="text-slate-400 text-[10px] font-medium">{doc.exp} Exp.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                     <Star key={i} className={i <= Math.floor(parseFloat(doc.rating)) ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} size={14} />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{doc.rating}</span>
                  <span className="text-[10px] text-slate-400">({doc.reviews})</span>
                </div>
                <div className={`text-center mb-4 text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 ${doc.color === 'green' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                  {doc.color === 'green' ? <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> : <Clock size={12} />} {doc.avail}
                </div>
                <button 
                  onClick={() => handleBookDoctor(doc.name)}
                  className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/doctors" className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors">
              View All Doctors <ArrowRight size={16} />
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Footer Banner */}
      <section className="bg-blue-600 py-10 mt-auto w-full border-t border-blue-700">
        <PageContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Clock className="text-blue-200 shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Easy & Fast Booking</h4>
                <p className="text-blue-100 text-xs leading-relaxed">Book in less than 2 minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-blue-200 shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Secure & Confidential</h4>
                <p className="text-blue-100 text-xs leading-relaxed">Your data is safe with us</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Headset className="text-blue-200 shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">24/7 Support</h4>
                <p className="text-blue-100 text-xs leading-relaxed">We are always here to help</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="text-blue-200 shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Trusted by Thousands</h4>
                <p className="text-blue-100 text-xs leading-relaxed">15K+ happy patients</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

    </div>
  );
}
