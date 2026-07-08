import api from './axios';

export const getDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments/book', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

export const getNearbyHospitals = async (lat, lng) => {
  try {
    // If no lat/lng provided, backend will return all hospitals
    const query = (lat && lng) ? `?lat=${lat}&lng=${lng}` : '';
    const response = await api.get(`/hospitals/nearby${query}`);
    return response.data;
  } catch (error) {
    console.warn('Error fetching nearby hospitals, retrying without location:', error.message);
    // Fallback: fetch all hospitals without location filter
    try {
      const response = await api.get('/hospitals/nearby');
      return response.data;
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError.message);
      throw fallbackError;
    }
  }
};

export const getHospitalById = async (id) => {
  try {
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hospital by ID:', error);
    throw error;
  }
};

export const getRecommendedSlots = async (hospitalId, date) => {
  try {
    const response = await api.get(`/hospitals/${hospitalId}/recommended-slots?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended slots:', error);
    throw error;
  }
};

export const getWorkloadSummary = async (hospitalId, date) => {
  try {
    const response = await api.get(`/hospitals/${hospitalId}/workload-summary?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workload summary:', error);
    throw error;
  }
};
