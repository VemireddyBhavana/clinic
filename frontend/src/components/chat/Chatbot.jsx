import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm MediBot. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:bg-blue-700 transition-colors z-50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-slate-200 z-50 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
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

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-auto">
                      <Bot size={16} className="text-blue-600" />
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
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-auto">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-bl-none shadow-sm flex items-center">
                    <Loader2 size={16} className="text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 shrink-0 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
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
