import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import PatientRights from './pages/PatientRights';
import Hospitals from './pages/Hospitals';
import HospitalDetails from './pages/HospitalDetails';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import AppointmentsHistory from './pages/AppointmentsHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import SmartScheduling from './pages/features/SmartScheduling';
import NoShowPrediction from './pages/features/NoShowPrediction';
import WorkloadBalancer from './pages/features/WorkloadBalancer';
import Reminders from './pages/features/Reminders';
import SymptomChecker from './pages/features/SymptomChecker';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/legal" element={<Navigate to="/privacy-policy" replace />} />
      
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Patient Routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<AppointmentsHistory />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/patient-rights" element={<PatientRights />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        
        {/* Interactive Features */}
        <Route path="/features/smart-scheduling" element={<SmartScheduling />} />
        <Route path="/features/no-show-prediction" element={<NoShowPrediction />} />
        <Route path="/features/workload-balancer" element={<WorkloadBalancer />} />
        <Route path="/features/reminders" element={<Reminders />} />
        <Route path="/features/symptom-checker" element={<SymptomChecker />} />
      </Route>
      
      {/* Protected Doctor Routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
      
      {/* Catch-all Redirect for old Admin paths */}
      <Route path="/admin/*" element={<Navigate to="/home" replace />} />
      <Route path="/hospital/*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;