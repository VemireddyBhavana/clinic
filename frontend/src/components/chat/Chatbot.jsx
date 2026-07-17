import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useLanguage } from '../../context/LanguageContext';

const chatLanguages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' }
];

function RobotAvatar({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 110" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>{`
          @keyframes robot-float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
          }
          @keyframes eye-blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          @keyframes shadow-scale {
            0%, 100% { transform: scale(1); opacity: 0.25; }
            50% { transform: scale(0.8); opacity: 0.12; }
          }
          .bot-container {
            animation: robot-float 3.5s ease-in-out infinite;
            transform-origin: center;
          }
          .bot-eye {
            animation: eye-blink 5s infinite;
            transform-origin: 37px 32px;
          }
          .bot-eye-right {
            animation: eye-blink 5s infinite;
            transform-origin: 63px 32px;
          }
          .bot-shadow {
            animation: shadow-scale 3.5s ease-in-out infinite;
            transform-origin: 50px 103px;
          }
        `}</style>
      </defs>

      {/* Ground Shadow */}
      <ellipse className="bot-shadow" cx="50" cy="103" rx="18" ry="2.5" fill="#000" />

      {/* Floating Robot Body Wrapper */}
      <g className="bot-container">
        {/* Left Arm */}
        <rect x="12" y="55" width="8" height="24" rx="4" fill="url(#bodyGrad)" transform="rotate(15 12 55)" />
        {/* Right Arm */}
        <rect x="80" y="55" width="8" height="24" rx="4" fill="url(#bodyGrad)" transform="rotate(-15 88 55)" />

        {/* Neck connector */}
        <rect x="44" y="52" width="12" height="8" rx="2" fill="#9ca3af" />

        {/* Torso */}
        <rect x="30" y="56" width="40" height="34" rx="17" fill="url(#bodyGrad)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="38" y="66" width="24" height="14" rx="4" fill="#cbd5e1" opacity="0.5" />
        <line x1="50" y1="70" x2="50" y2="76" stroke="#9ca3af" strokeWidth="1.5" />

        {/* Side Ears */}
        <rect x="16" y="28" width="6" height="14" rx="3" fill="#9ca3af" />
        <rect x="78" y="28" width="6" height="14" rx="3" fill="#9ca3af" />

        {/* Head */}
        <rect x="20" y="14" width="60" height="42" rx="18" fill="url(#headGrad)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Screen */}
        <rect x="25" y="19" width="50" height="32" rx="12" fill="url(#screenGrad)" />

        {/* Glowing Eyes */}
        <ellipse className="bot-eye" cx="37" cy="32" rx="4.5" ry="3.5" fill="#22d3ee" filter="url(#glow)" />
        <ellipse className="bot-eye-right" cx="63" cy="32" rx="4.5" ry="3.5" fill="#22d3ee" filter="url(#glow)" />

        {/* Mouth (Smile) */}
        <path d="M 44 42 Q 50 45 56 42" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow)" />
      </g>
    </svg>
  );
}

export default function Chatbot() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm MediBot. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsRecording(true);
      rec.onend = () => setIsRecording(false);
      rec.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // AI Integration
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const generateResponse = async (message) => {
    if (!genAI) {
      return "⚠️ **Configuration Needed:** Please add your VITE_GEMINI_API_KEY to the frontend .env file to enable the AI Symptom Checker. Without it, I can only provide limited help.\n\nTo book an appointment, please click 'Book Appointment' in the navigation bar.";
    }

    try {
      // Use gemini-flash-latest for fast responses
      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        systemInstruction: "You are MediBot, an expert AI symptom checker and clinic assistant for MediSlot AI. Your job is to listen to the user's symptoms, provide a *very brief* and polite analysis, and strongly recommend which specific medical specialist (e.g., Cardiologist, Dermatologist, General Physician) they should book an appointment with. Always remind them to click the 'Book Appointment' button on the navigation bar to schedule a visit. Do not provide dangerous medical diagnoses, but give helpful triage advice. Keep responses under 3 sentences and professional."
      });

      // Construct simple chat history context
      const chatHistory = messages.slice(1).map(m => `${m.sender === 'user' ? 'User' : 'MediBot'}: ${m.text}`).join('\n');
      const prompt = `Chat History:\n${chatHistory}\n\nUser: ${message}\nMediBot:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm currently experiencing technical difficulties connecting to my AI brain. Please try again later, or contact our clinic directly at (555) 123-4567.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get response from Gemini API
    const responseText = await generateResponse(userMessage.text);
    
    const botResponse = {
      id: Date.now() + 1,
      text: responseText,
      sender: 'bot'
    };
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-16 h-16 rounded-full flex items-center justify-center z-50 cursor-pointer select-none"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <RobotAvatar size={68} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-[380px] bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-slate-200 z-50 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <RobotAvatar size={42} className="translate-y-1.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MediBot</h3>
                  <p className="text-xs text-blue-200">Online | Automated Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Horizontal Language Tabs */}
            <div 
              className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap shrink-0"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {chatLanguages.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer select-none
                      ${isActive 
                        ? 'bg-emerald-700 text-white shadow-sm dark:bg-emerald-600' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                      }`}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 mt-auto border border-slate-200">
                      <RobotAvatar size={32} className="translate-y-1" />
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                  
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-auto">
                      <User size={16} className="text-slate-500" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 mt-auto border border-slate-200">
                    <RobotAvatar size={32} className="translate-y-1" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-bl-none shadow-sm flex items-center gap-1.5">
                    <motion.span 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block"
                    />
                    <motion.span 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block"
                    />
                    <motion.span 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full inline-block"
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 shrink-0 flex gap-2 items-center">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Type your message..."} 
                className={`flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${isRecording ? 'border-red-400 bg-red-50 text-red-700 animate-pulse' : ''}`}
              />
              {recognitionRef.current && (
                <div className="relative shrink-0">
                  {isRecording && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping" />
                      <span className="absolute -inset-2 rounded-full bg-red-300 opacity-40 animate-pulse" />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isRecording ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'}`}
                    title={isRecording ? "Stop Recording" : "Use Voice Booking"}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                </div>
              )}
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 disabled:bg-slate-300 transition-colors"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
