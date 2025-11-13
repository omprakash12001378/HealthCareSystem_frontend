import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { store, persistor } from './redux/store';

// Auth Pages
import Login from './pages/Auth/LoginNew';
import Register from './pages/Auth/Register';

// Layout
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';

// Appointments
import AppointmentList from './pages/Appointments/AppointmentList';
import BookAppointment from './pages/Appointments/BookAppointment';

// Patients
import PatientList from './pages/Patients/PatientList';
import PatientRegistration from './pages/Patients/PatientRegistration';
import PatientDetails from './pages/Patients/PatientDetails';

// Doctors
import DoctorList from './pages/Doctors/DoctorList';
import DoctorRegistration from './pages/Doctors/DoctorRegistration';
import DoctorDetails from './pages/Doctors/DoctorDetails';

// Reports
import ReportsPage from './pages/Reports/ReportsPage';
import Profile from "./pages/Profile/Profile";

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/appointments" element={<AppointmentList />} />
                <Route path="/appointments/book" element={<BookAppointment />} />

                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/register" element={<PatientRegistration />} />
                <Route path="/patients/:id" element={<PatientDetails />} />

                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/register" element={<DoctorRegistration />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />

                <Route path="/reports" element={<ReportsPage />} />

                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

