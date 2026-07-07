import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PatientNavbar from '../components/navigation/PatientNavbar';
import Footer from '../components/layout/Footer';
import Chatbot from '../components/chat/Chatbot';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <PatientNavbar />

      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}