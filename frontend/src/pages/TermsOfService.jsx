import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            The rules and guidelines for using MediSlot AI.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto p-8 md:p-12">
          <div className="prose prose-slate max-w-none space-y-6">
            <h3 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using MediSlot AI, you accept and agree to be bound by the terms and provision of this agreement. Our platform provides a scheduling and directory service.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8">2. Medical Advice Disclaimer</h3>
            <p className="text-slate-600 leading-relaxed">
              Medical advice is provided directly by the healthcare professionals, not by MediSlot AI itself. Our application is strictly a platform to facilitate the connection between patients and doctors.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8">3. User Responsibilities</h3>
            <p className="text-slate-600 leading-relaxed">
              You agree to provide accurate, current, and complete information during the booking process. Providing false information may result in the cancellation of your appointments and restriction of your account.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
