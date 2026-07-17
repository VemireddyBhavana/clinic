import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, MessageSquare, Mail, AlertCircle, Smartphone, Send, CheckCircle2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import CardWrapper from '../../components/layout/CardWrapper';

export default function Reminders() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState({
    whatsapp: true,
    sms: true,
    email: false
  });
  const [selectedTimeline, setSelectedTimeline] = useState('booked');
  const [sentSuccess, setSentSuccess] = useState(false);

  const toggleChannel = (channel) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const timelineMessages = {
    booked: {
      title: 'Booking Confirmed',
      interval: 'Instant',
      icon: MessageSquare,
      whatsapp: '✅ Hello Alice! Your appointment with Dr. Sarah Jenkins is booked at City General Hospital on Tuesday, July 21 at 10:30 AM. Reply CANCEL or RESCHEDULE to manage.',
      sms: 'MediSlot Alert: Appointment with Dr. Sarah Jenkins confirmed for Tuesday, July 21 at 10:30 AM.',
      email: 'Subject: Appointment Confirmation - MediSlot AI\n\nDear Alice,\nYour clinical visit with Dr. Sarah Jenkins is scheduled...'
    },
    '48h': {
      title: 'Pre-Visit Check-In',
      interval: '48 Hours Prior',
      icon: AlertCircle,
      whatsapp: '⏰ Hi Alice, your visit is in 2 days. AI wait metrics show low queues. Reply CONFIRM to secure your fast-track slot or RESCHEDULE.',
      sms: 'MediSlot Check-In: Confirm your visit on July 21 at 10:30 AM. Reply C to confirm, R to reschedule.',
      email: 'Subject: Pre-Registration & Roster Check-In\n\nDear Alice,\nPlease complete your clinical pre-registration ahead of...'
    },
    '2h': {
      title: 'Just-in-Time Queue Update',
      interval: '2 Hours Prior',
      icon: Smartphone,
      whatsapp: '⚡ City General Update: Dr. Jenkins is on schedule. Estimated wait time is currently 5 minutes. Tap to check-in early.',
      sms: 'MediSlot Update: Live wait time for Dr. Sarah Jenkins is 5 mins. Arrive at Room 102 by 10:20 AM.',
      email: 'Subject: Live Wait Time Alert & Clinical Path\n\nDear Alice,\nYour provider is on track. Room 102 has a wait time of...'
    }
  };

  const currentMessage = timelineMessages[selectedTimeline];

  const handleTriggerTest = () => {
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 pt-10 pb-24 text-white relative overflow-hidden">
        <PageContainer>
          <button 
            onClick={() => navigate('/home')} 
            className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 mb-8 transition-all font-bold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 mb-4">
              <Bell size={12} /> Automated Engagement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">AI Smart Reminders</h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg">
              MediSlot AI automatically contacts patients over SMS, WhatsApp, or email, adjusting timing and frequency based on their predicted no-show risk.
            </p>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="-mt-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Channel Configuration Toggles */}
          <div className="lg:col-span-4 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Notification Channels</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Toggle delivery platforms to simulate patient preference profiles.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'whatsapp', label: 'WhatsApp Messenger', desc: 'Pre-visit confirmation & live delays.', icon: MessageSquare },
                  { id: 'sms', label: 'SMS Carrier Texting', desc: 'Fallback check-ins & urgent notifications.', icon: Smartphone },
                  { id: 'email', label: 'Clinical Email Statements', desc: 'Intake documents & discharge statements.', icon: Mail }
                ].map(channel => (
                  <div 
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      channels[channel.id]
                        ? 'border-blue-500 bg-blue-500/5 text-slate-950 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-400'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center">
                      <channel.icon size={18} className={channels[channel.id] ? 'text-blue-500' : 'text-slate-400'} />
                      <div>
                        <h4 className="font-bold text-xs">{channel.label}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{channel.desc}</p>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${
                      channels[channel.id] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 transform ${
                        channels[channel.id] ? 'translate-x-3.5' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>
          </div>

          {/* MIDDLE: Timeline Selector */}
          <div className="lg:col-span-4 space-y-6">
            <CardWrapper className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Notification Timeline</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Click intervals to select active message payloads.</p>

              <div className="space-y-3 relative pl-4">
                <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                
                {[
                  { id: 'booked', label: 'Booking Confirmation', sub: 'Dispatched immediately' },
                  { id: '48h', label: '48-Hour Confirmation', sub: 'Risk score review & call protocols' },
                  { id: '2h', label: 'Just-in-Time Delay Updates', sub: 'Roster check-ins & queue time' }
                ].map(step => (
                  <div 
                    key={step.id}
                    onClick={() => setSelectedTimeline(step.id)}
                    className={`relative p-3 rounded-xl cursor-pointer border transition-all ${
                      selectedTimeline === step.id
                        ? 'border-blue-500 bg-blue-500/5 text-blue-900 dark:text-blue-300'
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <div className={`absolute -left-[14px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border ${
                      selectedTimeline === step.id
                        ? 'bg-blue-600 border-white dark:border-slate-900 scale-125'
                        : 'bg-slate-300 dark:bg-slate-700 border-slate-50 dark:border-slate-950'
                    }`} />
                    <h4 className="font-bold text-xs">{step.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{step.sub}</p>
                  </div>
                ))}
              </div>
            </CardWrapper>
          </div>

          {/* RIGHT: Phone Mockup / Live Preview */}
          <div className="lg:col-span-4 space-y-6">
            <CardWrapper className="bg-slate-950 text-white border-slate-800 p-5 relative overflow-hidden rounded-3xl min-h-[380px] flex flex-col justify-between">
              
              {/* Phone Head Speaker bar */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-4 bg-slate-900 rounded-full border border-white/5" />
              </div>

              {/* Live Preview Container */}
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold text-center">
                  Live Mobile Simulator ({currentMessage.interval})
                </p>

                {/* WhatsApp preview */}
                {channels.whatsapp && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`wa-${selectedTimeline}`}
                    className="p-3 bg-emerald-950/80 border border-emerald-500/25 rounded-2xl text-xs text-emerald-100 max-w-[90%]"
                  >
                    <span className="block text-[8px] font-bold text-emerald-400 uppercase tracking-wide mb-1">WhatsApp Chat</span>
                    <p className="leading-snug">{currentMessage.whatsapp}</p>
                  </motion.div>
                )}

                {/* SMS preview */}
                {channels.sms && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`sms-${selectedTimeline}`}
                    className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs text-slate-100 max-w-[90%] self-end"
                  >
                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-1">Carrier SMS Message</span>
                    <p className="leading-snug">{currentMessage.sms}</p>
                  </motion.div>
                )}

                {/* Email preview */}
                {channels.email && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`email-${selectedTimeline}`}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] text-slate-300 font-mono whitespace-pre-line"
                  >
                    <span className="block text-[8px] font-bold text-blue-400 uppercase tracking-wide mb-1">Email client</span>
                    {currentMessage.email}
                  </motion.div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                <button 
                  onClick={handleTriggerTest}
                  disabled={sentSuccess}
                  className={`w-full py-2.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    sentSuccess 
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {sentSuccess ? (
                    <>
                      <CheckCircle2 size={13} /> Simulation Messages Transmitted!
                    </>
                  ) : (
                    <>
                      <Send size={13} /> Trigger Simulated Blast
                    </>
                  )}
                </button>
              </div>

            </CardWrapper>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}
