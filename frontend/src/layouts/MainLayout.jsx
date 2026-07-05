import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientNavbar from '../components/navigation/PatientNavbar';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <PatientNavbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}