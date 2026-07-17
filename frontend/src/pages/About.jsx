import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { HeartPulse, Target, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col min-h-screen bg-white font-sans"
    >
      {/* Hero Section */}
      <motion.section variants={fadeInUp} className="relative pt-16 pb-20 bg-blue-50/50">
        <PageContainer>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6">
              <HeartPulse size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              About <span className="text-blue-600">MediSlot AI</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              We are on a mission to transform healthcare by making appointment scheduling smarter, faster, and more accessible for everyone. 
              By leveraging Artificial Intelligence, we help clinics eliminate no-shows and patients find the care they need without the wait.
            </p>
          </div>
        </PageContainer>
      </motion.section>

      {/* Our Mission & Vision */}
      <motion.section variants={fadeInUp} className="py-20 relative z-20">
        <PageContainer>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Medical Team" 
                className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
              />
            </div>
            
            <div className="pl-0 md:pl-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Bridging the Gap Between Patients and Doctors</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                MediSlot AI was born out of a simple observation: both patients and healthcare providers were frustrated with traditional booking systems. Long wait times, double bookings, and sudden cancellations disrupted the flow of care.
              </p>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Today, our intelligent scheduling engine analyzes clinic patterns, predicts peak times, and offers dynamic slot recommendations to ensure a seamless healthcare experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Target className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Our Mission</h4>
                    <p className="text-sm text-slate-500">To optimize healthcare operations so doctors can focus on what they do best: treating patients.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Patient-Centric</h4>
                    <p className="text-sm text-slate-500">We prioritize patient convenience, ensuring they find the right doctor at the right time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </motion.section>

      {/* Core Values */}
      <motion.section variants={fadeInUp} className="py-20 bg-slate-50 border-t border-slate-100">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">The principles that guide us every day in building better healthcare solutions.</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center transition-colors duration-300 hover:border-blue-200 cursor-default"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <HeartPulse size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Empathy</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We understand the anxiety of seeking medical care, and design our systems to be as reassuring and simple as possible.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center transition-colors duration-300 hover:border-blue-200 cursor-default"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Trust & Security</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Medical data is highly sensitive. We maintain the highest standards of privacy and security to protect your information.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center transition-colors duration-300 hover:border-blue-200 cursor-default"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Accessibility</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Healthcare should be accessible to everyone. Our platform is designed to be inclusive and easy to use for all demographics.</p>
            </motion.div>
          </div>
        </PageContainer>
      </motion.section>

    </motion.div>
  );
}
