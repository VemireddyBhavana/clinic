import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { notificationAPI } from '../../services/api';

export default function AdminTopbar({ title = 'Overview', onMenuClick }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

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
      console.error('Failed to load admin topbar notifications', err);
    }
  };

  const pendingNotifications = notifications.filter(n => n.status === 'pending');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={14} className="text-red-500 shrink-0" />;
      case 'follow_up': return <CheckCircle2 size={14} className="text-purple-500 shrink-0" />;
      case 'reminder': return <Clock size={14} className="text-yellow-500 shrink-0" />;
      default: return <Bell size={14} className="text-blue-500 shrink-0" />;
    }
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-gray-500 hover:text-blue-600">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-50 focus:bg-white transition-all w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          {/* Interactive Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-gray-400 hover:text-blue-600 transition-colors relative p-1 rounded-full hover:bg-slate-50"
              title="Notifications"
            >
              <Bell size={22} />
              {pendingNotifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                  {pendingNotifications.length}
                </span>
              )}
            </button>

            {/* Dropdown Overlay */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Admin Alerts</h3>
                  <span className="text-xs bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full">
                    {pendingNotifications.length} Pending
                  </span>
                </div>
                
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No system notifications.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className="p-3.5 hover:bg-slate-50/80 transition-colors flex gap-3">
                        <div className="mt-0.5">
                          {getTypeIcon(notif.type)}
                        </div>
                        <div className="space-y-1">
                          <p className={clsx(
                            "text-xs font-medium leading-relaxed",
                            notif.status === 'pending' ? "text-slate-800 font-semibold" : "text-slate-500"
                          )}>
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">
                              {notif.scheduledFor === 'Immediate' || !notif.scheduledFor 
                                ? 'Immediate' 
                                : new Date(notif.scheduledFor).toLocaleDateString()}
                            </span>
                            <span className={clsx(
                              "text-[9px] font-bold px-1.5 py-0.5 rounded",
                              notif.status === 'sent' 
                                ? 'bg-green-50 text-green-600 border border-green-100' 
                                : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                            )}>
                              {notif.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 pt-3 border-t border-slate-100 text-center">
                  <Link 
                    to="/admin/notifications" 
                    onClick={() => setShowDropdown(false)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700 leading-none">Admin User</p>
              <p className="text-xs text-gray-500 mt-1">Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}