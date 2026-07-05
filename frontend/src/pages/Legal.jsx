import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Shield, FileText, Lock, HeartHandshake } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <h1 className="text-4xl font-bold mb-4">Legal & Policies</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Review our privacy, terms, and patient right policies below.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto">
          
          <div className="p-8 md:p-10 space-y-12">
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Privacy Policy</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We value your privacy and are committed to protecting your personal health information. Any data collected through our platform is encrypted and strictly used for facilitating your medical appointments and care. We do not sell or share your data with third parties without your explicit consent.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Terms of Service</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  By using MediSlot AI, you agree to our terms of service. Our platform provides a scheduling and directory service. Medical advice is provided directly by the healthcare professionals, not by MediSlot AI itself. Please ensure all information provided during booking is accurate to avoid cancellations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Cookie Policy</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We use cookies to improve your experience on our website, remember your preferences, and analyze site traffic. You can choose to disable cookies through your browser settings, though this may impact certain functionalities of the booking system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Patient Rights</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Every patient has the right to respectful care, confidentiality of their medical records, and the right to make informed decisions regarding their treatment. If you have any concerns about your rights or how your data is being handled, please contact our support team immediately.
                </p>
              </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </div>
  );
}
