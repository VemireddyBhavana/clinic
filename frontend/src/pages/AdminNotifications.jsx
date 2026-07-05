import React, { useState, useEffect } from 'react';
import { Bell, Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/layout/SectionHeader';
import CardWrapper from '../components/layout/CardWrapper';
import SelectInput from '../components/forms/SelectInput';
import LoadingState from '../components/layout/LoadingState';
import EmptyState from '../components/layout/EmptyState';
import clsx from 'clsx';
import { notificationAPI } from '../services/api';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationAPI.getAll();
      setNotifications(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
      case 'follow_up': return <CheckCircle2 size={16} className="text-purple-500" />;
      case 'reminder': return <Clock size={16} className="text-yellow-500" />;
      case 'booking_confirmation': return <CheckCircle2 size={16} className="text-emerald-500" />;
      default: return <Bell size={16} className="text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'sent') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Sent</span>;
    if (status === 'failed') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">Failed</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">Pending</span>;
  };

  const filteredNotifications = notifications.filter(n => typeFilter === 'all' || n.type === typeFilter);

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader 
        title="System Notifications" 
        description="Monitor automated patient reminders and system alerts."
      />

      {/* Toolbar */}
      <CardWrapper className="bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Bell size={18} className="text-blue-600" />
            Total Active Notifications: {filteredNotifications.length}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-400" />
            <SelectInput 
              id="typeFilter"
              className="w-full sm:w-48"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'alert', label: 'Alerts' },
                { value: 'reminder', label: 'Reminders' },
                { value: 'follow_up', label: 'Follow-ups' },
                { value: 'booking_confirmation', label: 'Confirmations' }
              ]}
            />
          </div>
        </div>
      </CardWrapper>

      {/* Notifications Table */}
      {loading ? (
        <LoadingState text="Loading notifications..." />
      ) : error ? (
        <EmptyState title="Error" description={error} />
      ) : (
        <CardWrapper className="overflow-hidden" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold w-1/4">Notification Details</th>
                  <th className="px-6 py-4 font-semibold w-1/3">Message Context</th>
                  <th className="px-6 py-4 font-semibold">Scheduled For</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
                  <tr key={notif._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          notif.type === 'alert' ? 'bg-red-50' : 
                          notif.type === 'follow_up' ? 'bg-purple-50' : 
                          notif.type === 'reminder' ? 'bg-yellow-50' :
                          notif.type === 'booking_confirmation' ? 'bg-emerald-50' : 'bg-blue-50'
                        )}>
                          {getTypeIcon(notif.type)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 capitalize flex items-center gap-2">
                            {notif.type.replace('_', ' ')}
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase">
                              {notif.channel || 'System'}
                            </span>
                          </p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            {notif.patientName ? `Patient: ${notif.patientName}` : `Ref: ${notif.appointmentId?._id ? notif.appointmentId._id.substring(0,8).toUpperCase() : notif.appointmentId}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={clsx(
                        'text-sm truncate max-w-sm whitespace-normal',
                        notif.type === 'alert' ? 'text-red-700 font-medium' : 'text-gray-600'
                      )}>
                        {notif.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {notif.scheduledFor ? (
                        <div className="flex flex-col">
                          <span className="text-slate-800 text-sm font-medium">
                            {new Date(notif.scheduledFor).toLocaleDateString()}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {new Date(notif.scheduledFor).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 flex items-center gap-1.5 text-xs font-medium">
                          Immediate
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {getStatusBadge(notif.status)}
                      {notif.status === 'pending' && (
                        <button className="block ml-auto mt-2 text-xs font-medium text-blue-600 hover:underline">
                          Force Send
                        </button>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No notifications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardWrapper>
      )}
    </div>
  );
}