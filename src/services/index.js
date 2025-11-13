import api from './api';

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Patient Service
export const patientService = {
  getAllPatients: async () => {
    const response = await api.get('/api/patients');
    return response.data.data || response.data; // Handle both response structures
  },

  getPatientById: async (id) => {
    const response = await api.get(`/api/patients/${id}`);
    return response.data.data || response.data; // Handle both response structures
  },

  getPatientByUserId: async (userId) => {
    const response = await api.get(`/api/patients/user/${userId}`);
    return response.data.data || response.data; // Handle both response structures
  },

  createPatient: async (patientData) => {
    const response = await api.post('/api/patients', patientData);
    return response.data.data || response.data; // Handle both response structures
  },

  updatePatient: async (id, patientData) => {
    const response = await api.put(`/api/patients/${id}`, patientData);
    return response.data.data || response.data; // Handle both response structures
  },

  deletePatient: async (id) => {
    await api.delete(`/api/patients/${id}`);
  },
};

// Appointment Service
export const appointmentService = {
  getAllAppointments: async () => {
    const response = await api.get('/api/appointments');
    return response.data.data; // Extract appointments array from {success, data, count}
  },

  getAppointmentById: async (id) => {
    const response = await api.get(`/api/appointments/${id}`);
    return response.data.data; // Extract appointment object from {success, data}
  },

  getAppointmentsByPatientId: async (patientId) => {
    const response = await api.get(`/api/appointments/patient/${patientId}`);
    return response.data.data; // Extract appointments array from {success, data, count}
  },

  getAppointmentsByDoctorId: async (doctorId) => {
    const response = await api.get(`/api/appointments/doctor/${doctorId}`);
    return response.data.data; // Extract appointments array from {success, data, count}
  },

  createAppointment: async (appointmentData) => {
    const response = await api.post('/api/appointments', appointmentData);
    return response.data.data; // Extract created appointment from {success, data}
  },

  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/api/appointments/${id}`, appointmentData);
    return response.data.data; // Extract updated appointment from {success, data}
  },

  updateAppointmentStatus: async (id, status) => {
    const response = await api.patch(`/api/appointments/${id}/status?status=${status}`);
    return response.data.data; // Extract updated appointment from {success, data}
  },

  deleteAppointment: async (id) => {
    await api.delete(`/api/appointments/${id}`);
  },
};

