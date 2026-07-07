import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationAPI } from '../../services/api';
import gsap from 'gsap';

export default function PatientNavbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const navRef = useRef(null);
  const activeElementRef = useRef(null);
  const linkRefs = useRef([]);
  const prevIndexRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchNotifications();
    // Poll notifications every 10 seconds for real-time updates
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationAPI.getAll();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load navbar notifications', err);
    }
  };

  const handleHowItWorksClick = () => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById('how-it-works'); 
    if (el) el.scrollIntoView({ behavior: 'smooth' }); 
    else window.location.href = '/home#how-it-works';
  };

  const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'How it works', path: '#how-it-works', isButton: true },
    { label: 'About us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
    { label: 'Appointments', path: '/appointments' },
  ];

  const activeIndex = navItems.findIndex(item => !item.isButton && location.pathname === item.path);

  useEffect(() => {
    const activeIndicator = activeElementRef.current;
    const navContainer = navRef.current;

    if (!activeIndicator || !navContainer) return;

    // Helper to compute element offset
    const getOffsetLeft = (element) => {
      const elementRect = element.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();
      // Element width minus active line width (36px in CSS)
      return (
        elementRect.left -
        navRect.left +
        (elementRect.width - 36) / 2
      );
    };

    // Helper to align indicator instantly
    const alignIndicator = () => {
      if (activeIndex === -1) {
        gsap.set(activeIndicator, {
          "--active-element-show": 0,
        });
        return;
      }
      const activeBtn = linkRefs.current[activeIndex];
      if (activeBtn) {
        gsap.set(activeIndicator, {
          x: getOffsetLeft(activeBtn),
          "--active-element-show": 1,
        });
      }
    };

    // If route doesn't match any navbar link, hide indicator
    if (activeIndex === -1) {
      gsap.to(activeIndicator, {
        "--active-element-show": 0,
        duration: 0.2,
      });
      prevIndexRef.current = null;
      
      window.addEventListener('resize', alignIndicator);
      return () => {
        window.removeEventListener('resize', alignIndicator);
      };
    }

    const activeBtn = linkRefs.current[activeIndex];
    if (!activeBtn) return;

    const x = getOffsetLeft(activeBtn);

    // Initial mount alignment (when previous index is null)
    if (prevIndexRef.current === null) {
      alignIndicator();
      prevIndexRef.current = activeIndex;

      // Handle cases where fonts/styles load later and shift text width
      if (document.fonts) {
        document.fonts.ready.then(alignIndicator);
      }
      const t1 = setTimeout(alignIndicator, 50);
      const t2 = setTimeout(alignIndicator, 300);

      window.addEventListener('resize', alignIndicator);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('resize', alignIndicator);
      };
    }

    const prevIndex = prevIndexRef.current;
    if (prevIndex === activeIndex) {
      window.addEventListener('resize', alignIndicator);
      return () => {
        window.removeEventListener('resize', alignIndicator);
      };
    }

    const prevBtn = linkRefs.current[prevIndex];
    if (!prevBtn) {
      alignIndicator();
      prevIndexRef.current = activeIndex;
      window.addEventListener('resize', alignIndicator);
      return () => {
        window.removeEventListener('resize', alignIndicator);
      };
    }

    // Run active laser strike GSAP animation
    const direction = activeIndex > prevIndex ? "after" : "before";
    const oldX = getOffsetLeft(prevBtn);
    const spacing = Math.abs(x - oldX);

    navContainer.classList.add(direction);

    gsap.set(activeIndicator, {
      rotateY: direction === "before" ? "180deg" : "0deg",
    });

    const maxSpacing = navContainer.offsetWidth - 60;
    const targetWidth = spacing > maxSpacing ? maxSpacing : spacing;

    gsap.killTweensOf(activeIndicator);

    gsap.to(activeIndicator, {
      keyframes: [
        {
          "--active-element-width": `${targetWidth}px`,
          duration: 0.3,
          ease: "none",
          onStart: () => {
            createSVG(activeIndicator);
            gsap.to(activeIndicator, {
              "--active-element-opacity": 1,
              duration: 0.1,
            });
          },
        },
        {
          "--active-element-scale-x": "0",
          "--active-element-scale-y": ".25",
          "--active-element-width": "0px",
          duration: 0.3,
          onStart: () => {
            gsap.to(activeIndicator, {
              "--active-element-mask-position": "40%",
              duration: 0.5,
            });
            gsap.to(activeIndicator, {
              "--active-element-opacity": 0,
              delay: 0.45,
              duration: 0.25,
            });
          },
          onComplete: () => {
            activeIndicator.innerHTML = "";
            navContainer.classList.remove("before", "after");
            activeIndicator.removeAttribute("style");
            gsap.set(activeIndicator, {
              x: x,
              "--active-element-show": "1",
            });
          },
        },
      ],
    });

    gsap.to(activeIndicator, {
      x: x,
      "--active-element-strike-x": "-50%",
      duration: 0.6,
      ease: "none",
    });

    prevIndexRef.current = activeIndex;

    window.addEventListener('resize', alignIndicator);
    return () => {
      window.removeEventListener('resize', alignIndicator);
    };
  }, [activeIndex]);

  const createSVG = (element) => {
    const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
    const beamStartColor = isDark ? '#00fffc' : '#2563eb';
    const beamEndColor = isDark ? '#ffffff' : '#60a5fa';
    const strokeColor = isDark ? '#ffffff' : '#2563eb';

    element.innerHTML = `
      <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
        <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
        <defs>
          <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="${beamStartColor}"/>
            <stop offset="1" stop-color="${beamEndColor}" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="strike">
        <svg viewBox="0 0 114 12" preserveAspectRatio="none">
          <g fill="none" stroke="${strokeColor}" stroke-width="1.2" stroke-linecap="round">
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          </g>
        </svg>
      </div>
    `;
  };

  const pendingNotifications = notifications.filter(n => n.status === 'pending');

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-lg">
            <HeartPulse size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold text-blue-700 dark:text-blue-400">MediSlot AI</span>
        </Link>
        
        {/* Desktop Nav Links */}
        <nav ref={navRef} className="hidden md:flex items-center space-x-4 lg:space-x-6 relative pb-1 -mb-1">
          {navItems.map((item, index) => {
            if (item.isButton) {
              return (
                <button
                  key={item.label}
                  ref={el => { linkRefs.current[index] = el; }}
                  onClick={handleHowItWorksClick}
                  className="text-xs font-bold transition-colors text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                >
                  {item.label}
                </button>
              );
            }
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                ref={el => { linkRefs.current[index] = el; }}
                className={`text-xs font-bold transition-colors ${
                  active 
                    ? 'text-blue-600 dark:text-blue-400 active' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          <div className="active-element" ref={activeElementRef} />
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3 relative" ref={dropdownRef}>
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="p-2 text-gray-500 hover:text-blue-600 bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all relative border border-gray-100 dark:border-slate-700"
            >
              <Bell size={18} />
              {pendingNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 pb-2 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white text-xs">Alerts</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">No notifications.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex gap-2">
                        <div className="mt-0.5 shrink-0">
                          <span className={`w-2 h-2 rounded-full inline-block ${notif.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`} />
                        </div>
                        <p className="text-[11px] text-gray-700 dark:text-slate-300">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/hospitals">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all">
              Book Now
            </button>
          </Link>

          {/* Theme Toggle */}
          <label className="switch scale-[0.8] origin-right cursor-pointer shrink-0" title="Toggle Theme">
            <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme}/>
            <span className="slider">
              <div className="moons-hole">
                <div className="moon-hole"></div>
                <div className="moon-hole"></div>
                <div className="moon-hole"></div>
              </div>
              <div className="black-clouds">
                <div className="black-cloud"></div>
                <div className="black-cloud"></div>
                <div className="black-cloud"></div>
              </div>
              <div className="clouds">
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
              </div>
              <div className="stars">
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              </div>
            </span>
          </label>
        </div>

        {/* Mobile Actions Bar */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          {/* Mobile Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-blue-600 relative"
            >
              <Bell size={18} />
              {pendingNotifications.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 pb-2 border-b border-gray-100 dark:border-slate-700">
                  <h3 className="font-bold text-gray-900 dark:text-white text-xs">Alerts</h3>
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">No notifications.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1 shrink-0 inline-block ${notif.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`} />
                        <p className="text-[11px] text-gray-700 dark:text-slate-300">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <Link to="/hospitals" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg">
            Book
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 dark:text-slate-400 p-1.5"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map(item =>
                item.isButton ? (
                  <button key={item.label} onClick={handleHowItWorksClick} className="text-sm font-bold text-gray-700 dark:text-slate-300 text-left">
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.label} to={item.path} onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-bold ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-slate-300'}`}>
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Theme</span>
                <label className="switch scale-[0.8] cursor-pointer shrink-0">
                  <input type="checkbox" checked={theme === 'light'} onChange={toggleTheme}/>
                  <span className="slider">
                    <div className="moons-hole"><div className="moon-hole"></div><div className="moon-hole"></div><div className="moon-hole"></div></div>
                    <div className="black-clouds"><div className="black-cloud"></div><div className="black-cloud"></div><div className="black-cloud"></div></div>
                    <div className="clouds"><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div><div className="cloud"></div></div>
                    <div className="stars">
                      <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                      <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                      <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                      <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                      <svg className="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
                    </div>
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
