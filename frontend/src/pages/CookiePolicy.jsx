import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Lock } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-blue-600 pt-16 pb-24 text-white text-center">
        <PageContainer>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Information about how we use cookies on our platform.
          </p>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="-mt-12 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto p-8 md:p-12">
          <div className="prose prose-slate max-w-none space-y-6">
            <h3 className="text-xl font-bold text-slate-900">1. What Are Cookies</h3>
            <p className="text-slate-600 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8">2. How We Use Cookies</h3>
            <p className="text-slate-600 leading-relaxed">
              We use cookies to improve your experience on our website, remember your preferences, and analyze site traffic. This includes authentication cookies to keep you logged in and preferences cookies to remember your display choices.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8">3. Managing Cookies</h3>
            <p className="text-slate-600 leading-relaxed">
              You can choose to disable cookies through your browser settings, though this may impact certain functionalities of the booking system. By continuing to use our site without changing your settings, you consent to our use of cookies.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
