import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'te', name: 'తెలుగు', short: 'TE' },
  { code: 'hi', name: 'हिन्दी', short: 'HI' },
  { code: 'mr', name: 'मराठी', short: 'MR' },
  { code: 'gu', name: 'ગુજરાતી', short: 'GU' }
];

export default function LanguageSelector({ dropdownPosition = 'bottom-right' }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLang = languages.find(l => l.code === language) || languages[0];

  // Map dropdown position props to styling classes
  const positionClasses = {
    'bottom-right': 'top-full right-0 mt-2 origin-top-right',
    'bottom-left': 'top-full left-0 mt-2 origin-top-left',
    'top-right': 'bottom-full right-0 mb-2 origin-bottom-right',
    'top-left': 'bottom-full left-0 mb-2 origin-bottom-left'
  };

  const currentPositionClass = positionClasses[dropdownPosition] || positionClasses['bottom-right'];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all duration-300 border backdrop-blur-md cursor-pointer select-none
          bg-white/70 dark:bg-slate-900/70 
          border-gray-200 dark:border-slate-800 
          text-slate-700 dark:text-slate-300 
          hover:bg-gray-100 dark:hover:bg-slate-800/80 
          shadow-sm hover:shadow-md active:scale-95"
        style={{ minWidth: '85px' }}
      >
        <Languages size={14} className="shrink-0 text-blue-500 dark:text-cyan-400" />
        <span className="grow text-left">{activeLang.short}</span>
        <ChevronDown 
          size={12} 
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: dropdownPosition.startsWith('bottom') ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: dropdownPosition.startsWith('bottom') ? -10 : 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute ${currentPositionClass} z-[55] w-40 rounded-2xl border shadow-xl backdrop-blur-xl overflow-hidden
              bg-white/90 dark:bg-slate-950/90 
              border-slate-100 dark:border-slate-900`}
          >
            <div className="p-1.5 space-y-0.5 max-h-60 overflow-y-auto">
              {languages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer text-left
                      ${isSelected 
                        ? 'bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60 font-mono w-4">{lang.short}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isSelected && (
                      <Check size={12} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
