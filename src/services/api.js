import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://gateway-service-production-57d7.up.railway.app';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Include cookies for session management
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Add JWT token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/api/users/register', data),
  login: (credentials) => apiClient.post('/api/users/login', credentials),
  getCurrentUser: () => apiClient.get('/api/users/me'),
  logout: () => apiClient.post('/api/users/logout'),
};

// User API
export const userAPI = {
  getProfile: () => apiClient.get('/api/users/me'),
  updateProfile: (data) => apiClient.put('/api/users/me', data),
  changePassword: (data) => apiClient.post('/api/users/change-password', data),
  getAllUsers: () => apiClient.get('/api/users'),
  getUserById: (id) => apiClient.get(`/api/users/${id}`),
};

// Patient API
export const patientAPI = {
  register: (data) => apiClient.post('/api/patients/register', data),
  getAll: () => apiClient.get('/api/patients'),
  getById: (id) => apiClient.get(`/api/patients/${id}`),
  getByUserId: (userId) => apiClient.get(`/api/patients/user/${userId}`),
  update: (id, data) => apiClient.put(`/api/patients/${id}`, data),
  search: (query) => apiClient.get(`/api/patients/search?query=${query}`),
  activate: (id) => apiClient.patch(`/api/patients/${id}/activate`),
  deactivate: (id) => apiClient.patch(`/api/patients/${id}/deactivate`),
  delete: (id) => apiClient.delete(`/api/patients/${id}`),
};

// Doctor API
export const doctorAPI = {
  register: (data) => apiClient.post('/api/doctors/register', data),
  getAll: () => apiClient.get('/api/doctors'),
  getActive: () => apiClient.get('/api/doctors/active'),
  getAvailable: () => apiClient.get('/api/doctors/available'),
  getById: (id) => apiClient.get(`/api/doctors/${id}`),
  getByUserId: (userId) => apiClient.get(`/api/doctors/user/${userId}`),
  getBySpecialization: (specialization) =>
    apiClient.get(`/api/doctors/specialization/${specialization}`),
  getByDepartment: (department) =>
    apiClient.get(`/api/doctors/department/${department}`),
  update: (id, data) => apiClient.put(`/api/doctors/${id}`, data),
  search: (query) => apiClient.get(`/api/doctors/search?query=${query}`),
  setAvailability: (id, isAvailable) =>
    apiClient.patch(`/api/doctors/${id}/availability?isAvailable=${isAvailable}`),
  activate: (id) => apiClient.patch(`/api/doctors/${id}/activate`),
  deactivate: (id) => apiClient.patch(`/api/doctors/${id}/deactivate`),
  delete: (id) => apiClient.delete(`/api/doctors/${id}`),
};

// Appointment API
export const appointmentAPI = {
  book: (data) => apiClient.post('/api/appointments/book', data),
  getAll: () => apiClient.get('/api/appointments'),
  getById: (id) => apiClient.get(`/api/appointments/${id}`),
  getByPatient: (patientId) => apiClient.get(`/api/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => apiClient.get(`/api/appointments/doctor/${doctorId}`),
  getUpcoming: (patientId) => apiClient.get(`/api/appointments/patient/${patientId}/upcoming`),
  getDoctorUpcoming: (doctorId) => apiClient.get(`/api/appointments/doctor/${doctorId}/upcoming`),
  getToday: () => apiClient.get('/api/appointments/today'),
  getEmergency: () => apiClient.get('/api/appointments/emergency'),
  getAvailableSlots: (doctorId, date) =>
    apiClient.get(`/api/appointments/doctor/${doctorId}/available-slots?date=${date}`),
  update: (id, data) => apiClient.put(`/api/appointments/${id}`, data),
  reschedule: (id, newDateTime) =>
    apiClient.patch(`/api/appointments/${id}/reschedule?newDateTime=${newDateTime}`),
  confirm: (id) => apiClient.patch(`/api/appointments/${id}/confirm`),
  checkIn: (id) => apiClient.patch(`/api/appointments/${id}/check-in`),
  start: (id) => apiClient.patch(`/api/appointments/${id}/start`),
  complete: (id) => apiClient.patch(`/api/appointments/${id}/complete`),
  cancel: (id, reason, cancelledBy) =>
    apiClient.patch(`/api/appointments/${id}/cancel?reason=${reason}&cancelledBy=${cancelledBy}`),
  updatePayment: (id, status, paymentMethod, transactionId) =>
    apiClient.patch(`/api/appointments/${id}/payment?status=${status}&paymentMethod=${paymentMethod}&transactionId=${transactionId || ''}`),
  delete: (id) => apiClient.delete(`/api/appointments/${id}`),
};

// Report API
export const reportAPI = {
  generateAppointment: (appointmentId, format = 'PDF') =>
    apiClient.get(`/api/reports/appointment/${appointmentId}?format=${format}`, {
      responseType: 'blob'
    }),
  generateDailyAppointments: (date, format = 'PDF') =>
    apiClient.get(`/api/reports/daily-appointments?date=${date}&format=${format}`, {
      responseType: 'blob'
    }),
  generateMonthlyAppointments: (month, year, format = 'PDF') =>
    apiClient.get(`/api/reports/monthly-appointments?month=${month}&year=${year}&format=${format}`, {
      responseType: 'blob'
    }),
  generateDoctorSchedule: (doctorId, startDate, endDate, format = 'PDF') =>
    apiClient.get(`/api/reports/doctor-schedule/${doctorId}?startDate=${startDate}&endDate=${endDate}&format=${format}`, {
      responseType: 'blob'
    }),
  generatePatient: (patientId, format = 'PDF') =>
    apiClient.get(`/api/reports/patient/${patientId}?format=${format}`, {
      responseType: 'blob'
    }),
  generateAllPatients: (format = 'PDF') =>
    apiClient.get(`/api/reports/all-patients?format=${format}`, {
      responseType: 'blob'
    }),
  generatePatientHistory: (patientId, format = 'PDF') =>
    apiClient.get(`/api/reports/patient-history/${patientId}?format=${format}`, {
      responseType: 'blob'
    }),
  generateDoctor: (doctorId, format = 'PDF') =>
    apiClient.get(`/api/reports/doctor/${doctorId}?format=${format}`, {
      responseType: 'blob'
    }),
  generateAllDoctors: (format = 'PDF') =>
    apiClient.get(`/api/reports/all-doctors?format=${format}`, {
      responseType: 'blob'
    }),
  generateRevenue: (startDate, endDate, format = 'PDF') =>
    apiClient.get(`/api/reports/revenue?startDate=${startDate}&endDate=${endDate}&format=${format}`, {
      responseType: 'blob'
    }),
  generateInvoice: (appointmentId, format = 'PDF') =>
    apiClient.get(`/api/reports/invoice/${appointmentId}?format=${format}`, {
      responseType: 'blob'
    }),
  generateAnalytics: (startDate, endDate, format = 'PDF') =>
    apiClient.get(`/api/reports/analytics?startDate=${startDate}&endDate=${endDate}&format=${format}`, {
      responseType: 'blob'
    }),
  // Aliases for ReportsPage compatibility
  generatePatientsReport: (format = 'PDF', config = {}) =>
    apiClient.get(`/api/reports/all-patients?format=${format}`, {
      ...config,
      responseType: 'blob'
    }),
  generateDoctorsReport: (format = 'PDF', config = {}) =>
    apiClient.get(`/api/reports/all-doctors?format=${format}`, {
      ...config,
      responseType: 'blob'
    }),
  generateAppointmentsReport: (format = 'PDF', config = {}) =>
    apiClient.get(`/api/reports/all-appointments?format=${format}`, {
      ...config,
      responseType: 'blob'
    }),
  generateRevenueReport: (startDate, endDate, format = 'PDF', config = {}) =>
    apiClient.get(`/api/reports/revenue?startDate=${startDate}&endDate=${endDate}&format=${format}`, {
      ...config,
      responseType: 'blob'
    }),
};

// Helper function to download blob
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default apiClient;

