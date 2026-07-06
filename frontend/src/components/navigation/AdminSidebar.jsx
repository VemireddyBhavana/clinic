import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Bell, LogOut } from 'lucide-react';
import clsx from 'clsx';

export default function AdminSidebar({ closeSidebar }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Add Doctor', path: '/admin/add-doctor', icon: Users },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link to="/admin/dashboard" onClick={closeSidebar} className="text-xl font-bold flex items-center gap-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm">M</span>
          Admin Panel
        </Link>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname.includes(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={closeSidebar}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium',
                active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon size={20} className={active ? 'text-white' : 'text-slate-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <Link to="/home" onClick={closeSidebar} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors font-medium">
          <LogOut size={20} />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}