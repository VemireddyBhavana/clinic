import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Shield size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            How we protect and manage your personal health information.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto p-8 md:p-12">
          <div className="prose prose-slate max-w-none space-y-6">
            <h3 className="text-xl font-bold text-slate-900">1. Information Collection</h3>
            <p className="text-slate-600 leading-relaxed">
              We value your privacy and are committed to protecting your personal health information. When you use MediSlot AI, we collect information you provide directly to us, such as when you create an account, update your profile, or book an appointment.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8">2. Use of Information</h3>
            <p className="text-slate-600 leading-relaxed">
              Any data collected through our platform is encrypted and strictly used for facilitating your medical appointments and care. We use the information we collect to provide, maintain, and improve our services.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8">3. Data Sharing</h3>
            <p className="text-slate-600 leading-relaxed">
              We do not sell, rent, or share your personal data with third parties without your explicit consent, except as required by law or to facilitate your medical care with your chosen healthcare providers.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
