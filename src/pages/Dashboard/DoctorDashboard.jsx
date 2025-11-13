import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    upcomingAppointments: 0,
    completedToday: 0,
    totalPatients: 0,
    pendingReports: 0,
  });

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      todayAppointments: 12,
      upcomingAppointments: 8,
      completedToday: 4,
      totalPatients: 145,
      pendingReports: 3,
    });

    // Mock today's schedule
    setTodaySchedule([
      {
        id: 1,
        patientName: 'John Doe',
        time: '09:00 AM',
        type: 'Consultation',
        status: 'completed',
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        time: '10:30 AM',
        type: 'Follow-up',
        status: 'completed',
      },
      {
        id: 3,
        patientName: 'Robert Johnson',
        time: '11:00 AM',
        type: 'Check-up',
        status: 'in-progress',
      },
      {
        id: 4,
        patientName: 'Emily Davis',
        time: '02:00 PM',
        type: 'Consultation',
        status: 'scheduled',
      },
      {
        id: 5,
        patientName: 'Michael Brown',
        time: '03:30 PM',
        type: 'Follow-up',
        status: 'scheduled',
      },
    ]);

    // Mock recent patients
    setRecentPatients([
      { id: 1, name: 'Sarah Wilson', lastVisit: '2024-11-10', condition: 'Hypertension' },
      { id: 2, name: 'David Lee', lastVisit: '2024-11-09', condition: 'Diabetes' },
      { id: 3, name: 'Maria Garcia', lastVisit: '2024-11-08', condition: 'Asthma' },
    ]);

    // Mock notifications
    setNotifications([
      { id: 1, message: 'Lab results available for John Doe', time: '10 mins ago', type: 'info' },
      { id: 2, message: 'Emergency appointment request', time: '25 mins ago', type: 'urgent' },
      { id: 3, message: 'Schedule updated for tomorrow', time: '1 hour ago', type: 'info' },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Good morning, Dr. {user?.lastName}! You have {stats.todayAppointments} appointments today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-blue-500">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.todayAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-yellow-500">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.upcomingAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-green-500">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Today</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.completedToday}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-purple-500">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.totalPatients}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {todaySchedule.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{appointment.patientName}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {appointment.time}
                        <span className="mx-2">•</span>
                        {appointment.type}
                      </div>
                    </div>
                    {appointment.status === 'scheduled' && (
                      <Link
                        to={`/appointments/${appointment.id}`}
                        className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link
                to="/appointments"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all appointments →
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div key={notification.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex">
                    <BellAlertIcon className={`h-5 w-5 ${notification.type === 'urgent' ? 'text-red-500' : 'text-blue-500'}`} />
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reports */}
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pending Reports</h2>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-orange-500" />
                  <div className="ml-3">
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingReports}</p>
                    <p className="text-sm text-gray-500">Reports to complete</p>
                  </div>
                </div>
              </div>
              <Link
                to="/reports"
                className="mt-4 block w-full text-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Complete Reports
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/patients/${patient.id}`} className="text-blue-600 hover:text-blue-500">
                      View Record
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/appointments/book"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Schedule Appointment
          </Link>
          <Link
            to="/patients"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            View Patients
          </Link>
          <Link
            to="/reports"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Create Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

