import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import NurseDashboard from './NurseDashboard';
import ReceptionistDashboard from './ReceptionistDashboard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Get user's primary role
  const getUserRole = () => {
    if (!user || !user.roles || user.roles.length === 0) {
      return 'ROLE_PATIENT'; // Default role
    }

    // If user has multiple roles, prioritize in this order
    const rolePriority = [
      'ROLE_SUPER_ADMIN',
      'ROLE_ADMIN',
      'ROLE_DOCTOR',
      'ROLE_NURSE',
      'ROLE_RECEPTIONIST',
      'ROLE_PATIENT',
      'ROLE_PHARMACIST',
      'ROLE_LAB_TECHNICIAN',
      'ROLE_RADIOLOGIST',
      'ROLE_ACCOUNTANT',
    ];

    // Find the highest priority role
    for (const role of rolePriority) {
      if (user.roles.some(r => r.name === role || r === role)) {
        return role;
      }
    }

    return 'ROLE_PATIENT'; // Default fallback
  };

  const userRole = getUserRole();

  // Route to appropriate dashboard based on role
  const renderDashboard = () => {
    switch (userRole) {
      case 'ROLE_SUPER_ADMIN':
      case 'ROLE_ADMIN':
        return <AdminDashboard />;

      case 'ROLE_DOCTOR':
        return <DoctorDashboard />;

      case 'ROLE_NURSE':
        return <NurseDashboard />;

      case 'ROLE_RECEPTIONIST':
        return <ReceptionistDashboard />;

      case 'ROLE_PATIENT':
        return <PatientDashboard />;

      // For other roles, show patient dashboard as default
      case 'ROLE_PHARMACIST':
      case 'ROLE_LAB_TECHNICIAN':
      case 'ROLE_RADIOLOGIST':
      case 'ROLE_ACCOUNTANT':
      default:
        return <PatientDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;

