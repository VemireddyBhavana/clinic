import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/layout/SectionHeader';
import CardWrapper from '../components/layout/CardWrapper';
import TextInput from '../components/forms/TextInput';
import SelectInput from '../components/forms/SelectInput';
import AppointmentStatusBadge from '../components/ui/AppointmentStatusBadge';
import LoadingState from '../components/layout/LoadingState';
import EmptyState from '../components/layout/EmptyState';
import { appointmentAPI } from '../services/api';

export default function AppointmentsHistory() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentAPI.getAll();
      setAppointments(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load appointments history.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await appointmentAPI.updateStatus(id, { status: 'cancelled' });
      setAppointments(prev => 
        prev.map(apt => apt._id === id ? { ...apt, status: 'cancelled' } : apt)
      );
    } catch (err) {
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-6 sm:py-8 transition-colors duration-300">
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
              className="p-2 bg-white rounded-lg border border-slate-200/80 text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <SectionHeader 
              title="Appointments & History" 
              description="View your booked slot status, hospital information, and manage your schedule."
            />
          </div>

          {/* Search & Filter bar */}
          <CardWrapper className="bg-white dark:bg-slate-900 p-4 border dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <TextInput 
                  id="search"
                  placeholder="Search by Doctor, Hospital name, or Booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              
              <div className="w-full lg:w-56 flex items-center gap-2">
                <Filter size={18} className="text-slate-400" />
                <SelectInput 
                  id="statusFilter"
                  className="flex-1"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'booked', label: 'Upcoming' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'no-show', label: 'No-Show' },
                    { value: 'cancelled', label: 'Cancelled' }
                  ]}
                />
              </div>
            </div>
          </CardWrapper>

          {/* Loader or Content */}
          {loading ? (
            <LoadingState message="Loading your appointments history..." />
          ) : error ? (
            <CardWrapper className="bg-red-50 border border-red-100 p-6 text-center text-red-600">
              {error}
            </CardWrapper>
          ) : filteredAppointments.length === 0 ? (
            <EmptyState 
              title="No Appointments Found" 
              description={searchTerm || statusFilter !== 'all' ? "Try adjusting your filters or search terms." : "You haven't booked any slots yet. Start your healthcare journey today."}
              actionText={searchTerm || statusFilter !== 'all' ? null : "Book Appointment"}
              onAction={() => navigate('/hospitals')}
            />
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {filteredAppointments.map((apt) => (
                <CardWrapper 
                  key={apt._id} 
                  className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4 sm:p-6 border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Hospital & Status */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight">
                          {apt.hospitalName || 'MediSlot Affiliated Clinic'}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate max-w-[180px]">Booking ID: {apt._id}</p>
                      </div>
                      <AppointmentStatusBadge status={apt.status} />
                    </div>

                    {/* Roster & Doctor details */}
                    <div className="grid gap-3 pt-2 border-t border-slate-100">
                      <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <User size={15} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                        <span><strong className="text-slate-700 dark:text-slate-300">Doctor:</strong> {apt.doctorName} ({apt.specialization})</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar size={15} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                        <span><strong className="text-slate-700 dark:text-slate-300">Date:</strong> {new Date(apt.appointmentDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Clock size={15} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <span><strong className="text-slate-700 dark:text-slate-300">Time Slot:</strong> {apt.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Metadata & Cancel Button */}
                  <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      Booked for: <strong className="text-slate-600 dark:text-slate-300">{apt.patientName}</strong>
                    </span>

                    {apt.status === 'booked' && (
                      <button
                        onClick={() => handleCancelAppointment(apt._id)}
                        className="text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 py-1.5 px-3 rounded-lg border border-red-200 transition-colors"
                      >
                        Cancel Slot
                      </button>
                    )}
                  </div>
                </CardWrapper>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
