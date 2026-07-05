import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ShieldCheck, Activity, Bell,
  User, Clock, LayoutTemplate, MessageSquare,
  CalendarCheck, ClipboardCheck
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl z-10">
              <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.15] mb-6 tracking-tight">
                Smart Healthcare Scheduling, <br />
                <span className="text-blue-600">Better for Everyone</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
                MediSlot AI helps clinics and patients connect seamlessly. Book appointments, manage schedules, reduce no-shows and improve healthcare efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/doctors">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg transition-colors shadow-sm text-[15px]">
                    Book an Appointment
                  </button>
                </Link>
                <Link to="/doctors">
                  <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-8 rounded-lg border border-slate-200 transition-colors shadow-sm text-[15px]">
                    View Doctors
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right Image Composition */}
            <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Background Blob 1 */}
              <div className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bg-blue-100 rounded-full blur-3xl -translate-y-4 translate-x-4"></div>
              {/* Background Blob 2 */}
              <div className="absolute w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] bg-blue-200/60 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>
              
              {/* Doctor Image (Cutout style) */}
              <div className="relative z-10 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]">
                <img 
                  src="https://res.cloudinary.com/de8opipom/image/upload/v1783233370/WhatsApp_Image_2026-07-05_at_12.03.42_PM_yh82us.jpg" 
                  alt="Friendly Doctor" 
                  className="w-full h-full object-contain object-bottom mix-blend-multiply"
                />
              </div>

              {/* Floating Icon 1 (Calendar) */}
              <div className="absolute z-20 top-[15%] left-[5%] lg:left-[10%] w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center transform -rotate-6">
                <Calendar className="text-blue-500" size={24} />
              </div>

              {/* Floating Icon 2 (User/ID) */}
              <div className="absolute z-20 bottom-[20%] left-[0%] lg:left-[5%] w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center transform rotate-12">
                <LayoutTemplate className="text-blue-500" size={20} />
              </div>

              {/* Floating Icon 3 (Clock) */}
              <div className="absolute z-20 top-[40%] right-[0%] lg:right-[5%] w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center transform rotate-6">
                <Clock className="text-blue-500" size={24} />
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section className="py-16 pb-24 relative z-20">
        <PageContainer>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Activity className="text-blue-600" size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">Smart Slot Recommendation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Get the best time slots based on availability and wait time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-blue-600" size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">No-Show Prediction</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                AI predicts no-show risk and helps clinics take proactive actions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <User className="text-blue-600" size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">Workload Balancer</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Distributes appointments evenly across doctors.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="text-blue-600" size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">Smart Reminders</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Automated reminders and follow-ups to reduce no-shows.
              </p>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* How It Works Section */}
      <section className="py-16 pb-24 relative z-20 bg-slate-50/50">
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

    </div>
  );
}
