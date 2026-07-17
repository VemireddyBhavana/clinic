import React, { createContext, useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Languages } from 'lucide-react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.doctors': 'Doctors',
    'nav.howItWorks': 'How it works',
    'nav.about': 'About us',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.appointments': 'Appointments',
    'nav.sosEmergency': 'SOS Emergency',
    'nav.bookNow': 'Book Now',
    'nav.theme': 'Theme',
    'nav.language': 'Language',
    'nav.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    
    // Landing Page
    'landing.title1': 'Smarter Appointments.',
    'landing.title2': 'Better Healthcare.',
    'landing.badge': 'AI-Powered Smart Scheduling',
    'landing.desc': 'MediSlot AI bridges the gap between patient slots booking and clinic administration. Discover nearby hospitals using live location mapping and preview directions in 3D.',
    'landing.getStarted': 'Get Started',
    'landing.login': 'Login',
    'landing.register': 'Register',
    'landing.features': 'Interactive Features',
    'landing.whyChoose': 'Why Choose MediSlot AI?',
    'landing.systemLive': 'System Live',

    // Login Page
    'login.title': 'Sign In to MediSlot AI',
    'login.subtitle': 'Welcome back! Access your personalized health dashboard and AI predictions.',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.signInBtn': 'Sign In',
    'login.noAccount': "Don't have an account?",
    'login.registerNow': 'Register here',

    // Register Page
    'register.title': 'Create Account',
    'register.subtitle': 'Join MediSlot AI for intelligent slot booking, symptom analysis and smart predictions.',
    'register.name': 'Full Name',
    'register.email': 'Email Address',
    'register.password': 'Password',
    'register.signUpBtn': 'Register',
    'register.hasAccount': 'Already have an account?',
    'register.loginNow': 'Login here'
  },
  te: {
    // Navbar
    'nav.home': 'హోమ్',
    'nav.doctors': 'వైద్యులు',
    'nav.howItWorks': 'ఇది ఎలా పనిచేస్తుంది',
    'nav.about': 'మా గురించి',
    'nav.services': 'సేవలు',
    'nav.contact': 'సంప్రదించండి',
    'nav.appointments': 'నియామకాలు',
    'nav.sosEmergency': 'SOS అత్యవసర',
    'nav.bookNow': 'ఇప్పుడే బుక్ చేయండి',
    'nav.theme': 'థీమ్',
    'nav.language': 'భాషా',
    'nav.logout': 'లాగ్ అవుట్',
    'nav.dashboard': 'డ్యాష్‌బోర్డ్',

    // Landing Page
    'landing.title1': 'తెలివైన నియామకాలు.',
    'landing.title2': 'మెరుగైన వైద్యం.',
    'landing.badge': 'AI ఆధారిత స్మార్ట్ షెడ్యూలింగ్',
    'landing.desc': 'మెడిస్లాట్ AI రోగి స్లాట్ బుకింగ్ మరియు క్లినిక్ నిర్వహణ మధ్య ఖाళీని పూడుస్తుంది. లైవ్ లొకేషన్ మ్యాపింగ్ ఉపయోగించి సమీపంలోని ఆసుపత్రులను కనుగొనండి మరియు 3D లో దిశలను ప్రివ्यू చేయండి.',
    'landing.getStarted': 'ప్రారంభించండి',
    'landing.login': 'లాగిన్',
    'landing.register': 'నమోదు చేసుకోండి',
    'landing.features': 'ఇంటరాక్టివ్ ఫీచర్లు',
    'landing.whyChoose': 'మెడిస్లాట్ AI ని ఎందుకు ఎంచుకోవాలి?',
    'landing.systemLive': 'సిస్టమ్ లైవ్',

    // Login Page
    'login.title': 'మెడిస్లాట్ AI కి సైన్ ఇన్ చేయండి',
    'login.subtitle': 'తిరిగి స్వాగతం! మీ వ్యక్తిగతీకరించిన ఆరోగ్య డ్యాష్‌బోర్డ్ మరియు AI అంచనాలను యాక్సెస్ చేయండి.',
    'login.email': 'ఇమెయిల్ చిరునామా',
    'login.password': 'పాస్‌వర్డ్',
    'login.remember': 'నన్ను గుర్తుంచుకో',
    'login.signInBtn': 'సైన్ ఇన్',
    'login.noAccount': 'ఖాతా లేదా?',
    'login.registerNow': 'ఇక్కడ నమోదు చేసుకోండి',

    // Register Page
    'register.title': 'ఖాతాను సృష్టించండి',
    'register.subtitle': 'తెలివైన స్లాట్ బుకింగ్, లక్షణాల విశ్લેషణ మరియు స్మార్ట్ అంచనాల కోసం మెడిస్లాట్ AI లో చేరండి.',
    'register.name': 'పూర్తి పేరు',
    'register.email': 'ఇమెయిల్ చిరునామా',
    'register.password': 'పాస్‌వర్డ్',
    'register.signUpBtn': 'నమోదు చేయండి',
    'register.hasAccount': 'ఇప్పటికే ఖాతా ఉందా?',
    'register.loginNow': 'ఇక్కడ లాగిన్ అవ్వండి'
  },
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.doctors': 'डॉक्टर',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.contact': 'संपर्क करें',
    'nav.appointments': 'अपॉइंटमेंट्स',
    'nav.sosEmergency': 'एसओएस आपातकाल',
    'nav.bookNow': 'अभी बुक करें',
    'nav.theme': 'थीम',
    'nav.language': 'भाषा',
    'nav.logout': 'लॉग आउट',
    'nav.dashboard': 'डैशबोर्ड',

    // Landing Page
    'landing.title1': 'बेहतर नियुक्तियाँ।',
    'landing.title2': 'बेहतर स्वास्थ्य सेवा।',
    'landing.badge': 'एआई-संचालित स्मार्ट शेड्यूलिंग',
    'landing.desc': 'मेडिस्लॉट एआई रोगी स्लॉट बुकिंग और क्लिनिक प्रशासन के बीच की दूरी को पाटता है। लाइव लोकेशन मैपिंग का उपयोग करके पास के अस्पतालों की खोज करें और 3डी में दिशा-निर्देश देखें।',
    'landing.getStarted': 'शुरू करें',
    'landing.login': 'लॉग इन',
    'landing.register': 'रजिस्टर करें',
    'landing.features': 'इंटरैक्टिव विशेषताएं',
    'landing.whyChoose': 'मेडिस्लॉट एआई क्यों चुनें?',
    'landing.systemLive': 'प्रणाली सक्रिय',

    // Login Page
    'login.title': 'मेडिस्लॉट एआई में साइन इन करें',
    'login.subtitle': 'आपका स्वागत है! अपने व्यक्तिगत स्वास्थ्य डैशबोर्ड और एआई भविष्यवाणियों तक पहुंचें।',
    'login.email': 'ईमेल पता',
    'login.password': 'पासवर्ड',
    'login.remember': 'मुझे याद रखें',
    'login.signInBtn': 'साइन इन',
    'login.noAccount': 'क्या आपके पास खाता नहीं है?',
    'login.registerNow': 'यहाँ रजिस्टर करें',

    // Register Page
    'register.title': 'खाता बनाएं',
    'register.subtitle': 'बुद्धिमान स्लॉट बुकिंग, लक्षण विश्लेषण और स्मार्ट भविष्यवाणियों के लिए मेडिस्लॉट एआई में शामिल हों।',
    'register.name': 'पूरा नाम',
    'register.email': 'ईमेल पता',
    'register.password': 'पासवर्ड',
    'register.signUpBtn': 'रजिस्टर करें',
    'register.hasAccount': 'क्या आपके पास पहले से एक खाता है?',
    'register.loginNow': 'यहाँ लॉग इन करें'
  },
  mr: {
    // Navbar
    'nav.home': 'होम',
    'nav.doctors': 'डॉक्टर',
    'nav.howItWorks': 'हे कसे कार्य करते',
    'nav.about': 'आमच्याबद्दल',
    'nav.services': 'सेवा',
    'nav.contact': 'संपर्क',
    'nav.appointments': 'अपॉइंटमेंट्स',
    'nav.sosEmergency': 'एसओएस आणीबाणी',
    'nav.bookNow': 'आता बुक करा',
    'nav.theme': 'थीम',
    'nav.language': 'भाषा',
    'nav.logout': 'लॉग आउट',
    'nav.dashboard': 'डॅशबोर्ड',

    // Landing Page
    'landing.title1': 'स्मार्ट अपॉइंटमेंट्स.',
    'landing.title2': 'उत्तम आरोग्य सेवा.',
    'landing.badge': 'एआय-चालित स्मार्ट शेड्यूलिंग',
    'landing.desc': 'मेडिस्लॉट एआय रुग्णांचे स्लॉट बुकिंग आणि क्लिनिक प्रशासन यामधील दरी कमी करते. थेट स्थान मॅपिंग वापरून जवळील रुग्णालये शोधा आणि 3D मध्ये दिशा पहा.',
    'landing.getStarted': 'सुरू करा',
    'landing.login': 'लॉग इन',
    'landing.register': 'नोंदणी करा',
    'landing.features': 'परस्परसंवादी वैशिष्ट्ये',
    'landing.whyChoose': 'मेडिस्लॉट एआय का निवडावे?',
    'landing.systemLive': 'सिस्टम लाइव्ह',

    // Login Page
    'login.title': 'मेडिस्लॉट एआय मध्ये साइन इन करा',
    'login.subtitle': 'पुन्हा स्वागत आहे! आपल्या वैयक्तिकृत आरोग्य डॅशबोर्ड आणि एआय अंदाजांमध्ये प्रवेश करा.',
    'login.email': 'ईमेल पत्ता',
    'login.password': 'पासवर्ड',
    'login.remember': 'माझी आठवण ठेवा',
    'login.signInBtn': 'साइन इन करा',
    'login.noAccount': 'खाते नाही का?',
    'login.registerNow': 'येथे नोंदणी करा',

    // Register Page
    'register.title': 'खाते तयार करा',
    'register.subtitle': 'बुद्धिमान स्लॉट बुकिंग, लक्षण विश्लेषण आणि स्मार्ट अंदाजांसाठी मेडिस्लॉट एआय मध्ये सामील व्हा.',
    'register.name': 'पूर्ण नाव',
    'register.email': 'ईमेल पत्ता',
    'register.password': 'पासवर्ड',
    'register.signUpBtn': 'नोंदणी करा',
    'register.hasAccount': 'आधीच खाते आहे का?',
    'register.loginNow': 'येथे लॉग इन करा'
  },
  gu: {
    // Navbar
    'nav.home': 'હોમ',
    'nav.doctors': 'ડોક્ટરો',
    'nav.howItWorks': 'તે કેવી રીતે કામ કરે છે',
    'nav.about': 'અમારા વિશે',
    'nav.services': 'સેવાઓ',
    'nav.contact': 'સંપર્ક',
    'nav.appointments': 'અપોઇન્ટમેન્ટ્સ',
    'nav.sosEmergency': 'એસઓએસ કટોકટી',
    'nav.bookNow': 'હમણાં બુક કરો',
    'nav.theme': 'થીમ',
    'nav.language': 'ભાષા',
    'nav.logout': 'લૉગ આઉટ',
    'nav.dashboard': 'ડેશબોર્ડ',

    // Landing Page
    'landing.title1': 'સ્માર્ટ એપોઇન્ટમેન્ટ્સ.',
    'landing.title2': 'બહેતર આરોગ્ય સંભાળ.',
    'landing.badge': 'AI-સંચાલિત સ્માર્ટ શેડ્યુલિંગ',
    'landing.desc': 'મેડીસ્લોટ AI દર્દીના સ્લોટ બુકિંગ અને ક્લિનિક વહીવટ વચ્ચેના અંતરને દૂર કરે છે. લાઇવ લોકેશન મેપિંગનો ઉપયોગ કરીને નજીકની હોસ્પિટલો શોધો અને 3D માં દિશાઓનું પૂર્વાવલોકન કરો.',
    'landing.getStarted': 'શરૂ કરો',
    'landing.login': 'લૉગ ઇન',
    'landing.register': 'નોંધણી કરો',
    'landing.features': 'ઇન્ટરેક્ટિવ સુવિધાઓ',
    'landing.whyChoose': 'શા માટે મેડીસ્લોટ AI પસંદ કરો?',
    'landing.systemLive': 'સિસ્ટમ લાઇવ',

    // Login Page
    'login.title': 'મેડીસ્લોટ AI માં લોગ ઇન કરો',
    'login.subtitle': 'સ્વાગત છે! તમારા વ્યક્તિગત હેલ્થ ડેશબોર્ડ અને AI આગાહીઓ મેળવો.',
    'login.email': 'ઈમેલ સરનામું',
    'login.password': 'પાસવર્ડ',
    'login.remember': 'મને યાદ રાખો',
    'login.signInBtn': 'સાઇન ઇન કરો',
    'login.noAccount': 'ખાતું નથી?',
    'login.registerNow': 'અહીં નોંધણી કરો',

    // Register Page
    'register.title': 'ખાતું બનાવો',
    'register.subtitle': 'બુદ્ધિશાળી સ્લોટ બુકિંગ, લક્ષણ વિશ્લેષણ અને સ્માર્ટ આગાહીઓ માટે મેડીસ્લોટ AI માં જોડાઓ.',
    'register.name': 'પૂરું નામ',
    'register.email': 'ઈમેલ સરનામું',
    'register.password': 'પાસવર્ડ',
    'register.signUpBtn': 'નોંધણી કરો',
    'register.hasAccount': 'પહેલેથી જ ખાતું છે?',
    'register.loginNow': 'અહીં લૉગ ઇન કરો'
  }
};

const titles = {
  en: 'MediSlot AI - Smart Clinical Scheduling',
  te: 'మెడిస్లాట్ AI - స్మార్ట్ వైద్య నియామకాలు',
  hi: 'मेडिस्लॉट एआई - स्मार्ट क्लिनिकल अपॉइंटमेंट',
  mr: 'मेडिस्लॉट एआई - स्मार्ट क्लिनिकल अपॉइंटमेंट्स',
  gu: 'મેડીસ્લોટ AI - સ્માર્ટ ક્લિનિકલ એપોઇન્ટમેન્ટ'
};

const translatingMessages = {
  en: 'Translating page...',
  te: 'పేజీని అనువదిస్తోంది...',
  hi: 'पृष्ठ का अनुवाद किया जा रहा है...',
  mr: 'पृष्ठाचे भाषांतर करत आहे...',
  gu: 'પૃષ્ઠનું ભાષાંતર થઈ રહ્યું છે...'
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // Sync browser tab title
  useEffect(() => {
    document.title = titles[language] || titles.en;
  }, [language]);

  // Sync state with Google Translate combo box on load and language changes
  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(() => {
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl) {
        if (language && selectEl.value !== language) {
          selectEl.value = language;
          selectEl.dispatchEvent(new Event('change'));
        }
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 40) { // check for 20 seconds
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [language]);

  const setLanguage = (lang) => {
    if (lang !== language) {
      setIsTranslating(true);
      setTimeout(() => setIsTranslating(false), 900);
    }
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event('change'));
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center backdrop-blur-md bg-slate-950/50 text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl backdrop-blur-2xl max-w-xs text-center text-slate-800 dark:text-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 flex items-center justify-center">
                <Languages size={24} className="text-blue-600 dark:text-cyan-400 animate-bounce" />
              </div>
              <p className="text-xs font-bold tracking-wide">
                {translatingMessages[language] || translatingMessages.en}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
