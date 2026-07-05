import React, { useState } from 'react';
import { UserPlus, Save, Image as ImageIcon } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/layout/SectionHeader';
import CardWrapper from '../components/layout/CardWrapper';
import TextInput from '../components/forms/TextInput';
import SelectInput from '../components/forms/SelectInput';
import TimeInput from '../components/forms/TimeInput';
import Checkbox from '../components/forms/Checkbox';
import FileUploadInput from '../components/forms/FileUploadInput';
import PrimaryButton from '../components/ui/PrimaryButton';
import { doctorAPI } from '../services/api';

export default function AdminAddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: 'Cardiology',
    experience: '',
    fee: '',
    startTime: '09:00',
    endTime: '17:00',
    slotDuration: '30',
    roomNumber: '',
    isActive: true
  });
  
  const [availableDays, setAvailableDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleDayToggle = (day) => {
    setAvailableDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Transform days object to array
    const selectedDays = Object.keys(availableDays).filter(day => availableDays[day]);

    const payload = {
      ...formData,
      experienceYears: formData.experience ? parseInt(formData.experience) : 0,
      fee: formData.fee ? parseInt(formData.fee) : 0,
      slotDuration: parseInt(formData.slotDuration),
      availableDays: selectedDays
    };

    try {
      await doctorAPI.add(payload);
      setSuccess(true);
      // Optional: reset form here
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <SectionHeader 
        title="Add New Doctor" 
        description="Register a new specialist into the MediSlot scheduling system."
      />

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg font-medium">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg font-medium">Doctor added successfully!</div>}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column - Main Details (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <CardWrapper className="border-t-4 border-t-blue-600">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4 flex items-center gap-2">
              <UserPlus className="text-blue-600" size={20} />
              Doctor Profile
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <TextInput 
                id="name"
                label="Full Name"
                placeholder="e.g. Dr. Jane Smith"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <SelectInput 
                id="specialization"
                label="Specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                options={[
                  { value: 'Cardiology', label: 'Cardiology' },
                  { value: 'Neurology', label: 'Neurology' },
                  { value: 'Pediatrics', label: 'Pediatrics' },
                  { value: 'Orthopedics', label: 'Orthopedics' },
                  { value: 'General Practice', label: 'General Practice' },
                ]}
              />
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <TextInput 
                id="experience"
                label="Experience (Years)"
                type="number"
                placeholder="e.g. 10"
                min="0"
                value={formData.experience}
                onChange={handleChange}
              />
              <TextInput 
                id="fee"
                label="Consultation Fee (₹)"
                type="number"
                placeholder="e.g. 150"
                min="0"
                required
                value={formData.fee}
                onChange={handleChange}
              />
              <TextInput 
                id="roomNumber"
                label="Room Number"
                placeholder="e.g. 101-A"
                required
                value={formData.roomNumber}
                onChange={handleChange}
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Scheduling Settings</h3>
            
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Available Working Days</label>
              <div className="flex flex-wrap gap-4">
                {Object.keys(availableDays).map(day => (
                  <Checkbox 
                    key={day}
                    id={`day-${day}`}
                    label={day}
                    checked={availableDays[day]}
                    onChange={() => handleDayToggle(day)}
                  />
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <TimeInput 
                id="startTime"
                label="Daily Start Time"
                required
                value={formData.startTime}
                onChange={handleChange}
              />
              <TimeInput 
                id="endTime"
                label="Daily End Time"
                required
                value={formData.endTime}
                onChange={handleChange}
              />
              <SelectInput 
                id="slotDuration"
                label="Slot Duration (Mins)"
                required
                value={formData.slotDuration}
                onChange={handleChange}
                options={[
                  { value: '15', label: '15 minutes' },
                  { value: '20', label: '20 minutes' },
                  { value: '30', label: '30 minutes' },
                  { value: '45', label: '45 minutes' },
                  { value: '60', label: '60 minutes' }
                ]}
              />
            </div>
          </CardWrapper>
        </div>

        {/* Right Column - Media & Settings (Span 1) */}
        <div className="lg:col-span-1 space-y-6">
          <CardWrapper>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <ImageIcon className="text-slate-500" size={18} />
              Profile Image
            </h3>
            <p className="text-sm text-gray-500 mb-4">Upload a professional headshot for the patient directory.</p>
            <FileUploadInput id="profileImage" />
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Account Status</h3>
            <Checkbox 
              id="isActive"
              label="Active Profile (Visible to patients)"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-2 ml-6">
              If unchecked, this doctor will not appear in the booking flow and cannot receive new appointments.
            </p>
          </CardWrapper>

          <div className="pt-4">
            <PrimaryButton type="submit" disabled={loading} className="w-full py-3 flex justify-center items-center gap-2 shadow-lg">
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Doctor Profile'}
            </PrimaryButton>
          </div>
        </div>

      </form>
    </div>
  );
}