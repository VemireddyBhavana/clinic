import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ShieldCheck, Activity, Bell,
  User, Clock, LayoutTemplate, MessageSquare,
  CalendarCheck, ClipboardCheck, Lock,
  TrendingUp, Users, Star, ArrowRight, Headset
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-visible bg-white">
        <PageContainer>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 z-10 pr-0 lg:pr-8">
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
                <Link to="/doctors">
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Activity className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg leading-none mb-1">25+</div>
                    <div className="text-xs text-slate-500 font-medium">Specializations</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="lg:col-span-7 relative flex justify-end mt-12 lg:mt-0">
              {/* Container for Doctor and Form */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-6 lg:gap-8">
                
                {/* Doctor Image Group */}
                <div className="relative w-full lg:w-1/2 max-w-[400px]">
                  {/* Gray rounded background behind doctor */}
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
                      <select className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 bg-white cursor-pointer">
                        <option value="" disabled selected>Select specialization</option>
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
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700 cursor-pointer" 
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm mb-5 shadow-sm">
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
                    <div className="flex items-start gap-1.5">
                      <Lock size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900 leading-tight mb-0.5">Secure Booking</div>
                        <div className="text-[10px] text-slate-500">100% safe & secure</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white relative z-20 -mt-10 lg:-mt-16">
        <PageContainer>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <CalendarCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Smart Slot Recommendation</h3>
                <p className="text-slate-500 text-[11px] leading-tight">
                  AI suggests the best available slots for you.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">No-Show Risk Prediction</h3>
                <p className="text-slate-500 text-[11px] leading-tight">
                  We predict no-show risk and help clinics prepare better.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Workload Balancer</h3>
                <p className="text-slate-500 text-[11px] leading-tight">
                  Distributes appointments evenly across doctors.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Bell className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">Automated Reminders</h3>
                <p className="text-slate-500 text-[11px] leading-tight">
                  Timely SMS & email reminders for every appointment.
                </p>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 pb-24 relative z-20 bg-slate-50/50">
        <PageContainer>
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
            <p className="text-slate-500 text-sm">Simple steps to book your appointment</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 lg:gap-6 relative">
            {/* Connecting Dotted Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-slate-300 -z-0 transform -translate-y-1/2"></div>

            {/* Step 1 */}
            <div className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative z-10 flex items-center gap-3.5">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-[13px] font-bold shrink-0">1</div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <User className="text-blue-600" size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Choose Doctor</h3>
                <p className="text-[12px] text-slate-500 leading-snug">Browse doctors by specialization or search.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative z-10 flex items-center gap-3.5">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-[13px] font-bold shrink-0">2</div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <CalendarCheck className="text-blue-600" size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Select Best Slot</h3>
                <p className="text-[12px] text-slate-500 leading-snug">AI shows recommended slots with lower wait time.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative z-10 flex items-center gap-3.5">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-[13px] font-bold shrink-0">3</div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <ClipboardCheck className="text-blue-600" size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Confirm Booking</h3>
                <p className="text-[12px] text-slate-500 leading-snug">Fill your details and confirm the appointment.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="w-full lg:w-1/4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative z-10 flex items-center gap-3.5">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full text-[13px] font-bold shrink-0">4</div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Bell className="text-blue-600" size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-[15px] mb-0.5">Get Reminders</h3>
                <p className="text-[12px] text-slate-500 leading-snug">Receive timely reminders and follow-ups.</p>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* Our Top Doctors Section */}
      <section className="py-16 pb-24 bg-white relative z-20">
        <PageContainer>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Our Top Doctors</h2>
              <p className="text-slate-500 text-sm">Experienced specialists across multiple departments</p>
            </div>
            <Link to="/doctors" className="hidden sm:flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors">
              View All Doctors <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Doctor 1 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 mb-4 items-center">
                <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=eff6ff&color=2563eb" alt="Dr. Sarah Johnson" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Dr. Sarah Johnson</h3>
                  <p className="text-slate-500 text-[11px] mb-1.5">Cardiologist</p>
                  <p className="text-slate-400 text-[10px] font-medium">10+ Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-xs font-bold text-slate-700 ml-1">4.9</span>
                <span className="text-[10px] text-slate-400">(120)</span>
              </div>
              <div className="text-center mb-4 text-[11px] font-bold text-green-600 bg-green-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Available Today
              </div>
              <button className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>

            {/* Doctor 2 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 mb-4 items-center">
                <img src="https://ui-avatars.com/api/?name=Amit+Verma&background=eff6ff&color=2563eb" alt="Dr. Amit Verma" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Dr. Amit Verma</h3>
                  <p className="text-slate-500 text-[11px] mb-1.5">Neurologist</p>
                  <p className="text-slate-400 text-[10px] font-medium">12+ Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-slate-200 fill-slate-200" size={14} />
                <span className="text-xs font-bold text-slate-700 ml-1">4.3</span>
                <span className="text-[10px] text-slate-400">(98)</span>
              </div>
              <div className="text-center mb-4 text-[11px] font-bold text-orange-600 bg-orange-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                <Clock size={12} /> Next Slot: 11:00 AM
              </div>
              <button className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>

            {/* Doctor 3 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 mb-4 items-center">
                <img src="https://ui-avatars.com/api/?name=Priya+Sharma&background=eff6ff&color=2563eb" alt="Dr. Priya Sharma" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Dr. Priya Sharma</h3>
                  <p className="text-slate-500 text-[11px] mb-1.5">Dermatologist</p>
                  <p className="text-slate-400 text-[10px] font-medium">8+ Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-xs font-bold text-slate-700 ml-1">4.7</span>
                <span className="text-[10px] text-slate-400">(85)</span>
              </div>
              <div className="text-center mb-4 text-[11px] font-bold text-green-600 bg-green-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Available Today
              </div>
              <button className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>

            {/* Doctor 4 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4 mb-4 items-center">
                <img src="https://ui-avatars.com/api/?name=Rajesh+Patel&background=eff6ff&color=2563eb" alt="Dr. Rajesh Patel" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Dr. Rajesh Patel</h3>
                  <p className="text-slate-500 text-[11px] mb-1.5">Orthopedic</p>
                  <p className="text-slate-400 text-[10px] font-medium">15+ Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-xs font-bold text-slate-700 ml-1">4.9</span>
                <span className="text-[10px] text-slate-400">(110)</span>
              </div>
              <div className="text-center mb-4 text-[11px] font-bold text-orange-600 bg-orange-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                <Clock size={12} /> Next Slot: 10:30 AM
              </div>
              <button className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>

            {/* Doctor 5 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-blue-100 hover:shadow-lg transition-all duration-300 hidden lg:block">
              <div className="flex gap-4 mb-4 items-center">
                <img src="https://ui-avatars.com/api/?name=Neha+Gupta&background=eff6ff&color=2563eb" alt="Dr. Neha Gupta" className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">Dr. Neha Gupta</h3>
                  <p className="text-slate-500 text-[11px] mb-1.5">Pediatrician</p>
                  <p className="text-slate-400 text-[10px] font-medium">9+ Years Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                <span className="text-xs font-bold text-slate-700 ml-1">4.8</span>
                <span className="text-[10px] text-slate-400">(95)</span>
              </div>
              <div className="text-center mb-4 text-[11px] font-bold text-green-600 bg-green-50 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Available Today
              </div>
              <button className="w-full py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>
          </div>
          
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
