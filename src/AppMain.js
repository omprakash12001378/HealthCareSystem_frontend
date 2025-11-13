import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { store, persistor } from './redux/configureStore';

// Layout
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import PatientDashboard from './pages/Dashboard/PatientDashboard';

// Appointments
import AppointmentList from './pages/Appointments/AppointmentList';
import BookAppointment from './pages/Appointments/BookAppointment';
import AppointmentDetails from './pages/Appointments/AppointmentDetails';
import MyAppointments from './pages/Appointments/MyAppointments';

// Patients
import PatientList from './pages/Patients/PatientList';
import PatientDetails from './pages/Patients/PatientDetails';
import PatientRegistration from './pages/Patients/PatientRegistration';

// Doctors
import DoctorList from './pages/Doctors/DoctorList';
import DoctorDetails from './pages/Doctors/DoctorDetails';
import DoctorRegistration from './pages/Doctors/DoctorRegistration';

// Reports
import ReportsPage from './pages/Reports/ReportsPage';

// Profile
import Profile from './pages/Profile/Profile';

// 404
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />

            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
                <Route path="/dashboard/patient" element={<PatientDashboard />} />

                {/* Appointments */}
                <Route path="/appointments" element={<AppointmentList />} />
                <Route path="/appointments/book" element={<BookAppointment />} />
                <Route path="/appointments/:id" element={<AppointmentDetails />} />
                <Route path="/my-appointments" element={<MyAppointments />} />

                {/* Patients */}
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/register" element={<PatientRegistration />} />
                <Route path="/patients/:id" element={<PatientDetails />} />

                {/* Doctors */}
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/register" element={<DoctorRegistration />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />

                {/* Reports */}
                <Route path="/reports" element={<ReportsPage />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

