import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { HeartHandshake } from 'lucide-react';

export default function PatientRights() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <HeartHandshake size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Patient Rights</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Understanding your rights and responsibilities.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto p-8 md:p-12">
          <div className="prose prose-slate max-w-none space-y-6">
            <h3 className="text-xl font-bold text-slate-900">1. Right to Respectful Care</h3>
            <p className="text-slate-600 leading-relaxed">
              Every patient has the right to respectful care given by competent personnel that reflects consideration of their cultural and personal values, beliefs, and preferences.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8">2. Right to Privacy</h3>
            <p className="text-slate-600 leading-relaxed">
              You have the right to confidentiality of your medical records and to have discussions about your healthcare conducted in a private setting.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8">3. Right to Information</h3>
            <p className="text-slate-600 leading-relaxed">
              You have the right to receive information about your diagnosis, treatment, and prognosis in terms that you can understand. You also have the right to make informed decisions regarding your treatment.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
