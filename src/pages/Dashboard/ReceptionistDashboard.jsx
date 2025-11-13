import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  UserPlusIcon,
  ClockIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const ReceptionistDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    waitingPatients: 0,
    checkIns: 0,
    newRegistrations: 0,
  });

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [waitingQueue, setWaitingQueue] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      todayAppointments: 45,
      waitingPatients: 8,
      checkIns: 32,
      newRegistrations: 5,
    });

    // Mock today's appointments
    setTodayAppointments([
      {
        id: 1,
        patientName: 'John Doe',
        doctorName: 'Dr. Sarah Johnson',
        time: '09:00 AM',
        status: 'checked-in',
        phone: '+1-555-0123',
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        doctorName: 'Dr. Michael Chen',
        time: '09:30 AM',
        status: 'waiting',
        phone: '+1-555-0124',
      },
      {
        id: 3,
        patientName: 'Robert Johnson',
        doctorName: 'Dr. Sarah Johnson',
        time: '10:00 AM',
        status: 'scheduled',
        phone: '+1-555-0125',
      },
      {
        id: 4,
        patientName: 'Emily Davis',
        doctorName: 'Dr. David Lee',
        time: '10:30 AM',
        status: 'scheduled',
        phone: '+1-555-0126',
      },
      {
        id: 5,
        patientName: 'Michael Brown',
        doctorName: 'Dr. Maria Garcia',
        time: '11:00 AM',
        status: 'scheduled',
        phone: '+1-555-0127',
      },
    ]);

    // Mock waiting queue
    setWaitingQueue([
      { id: 1, name: 'Alice Cooper', doctor: 'Dr. Sarah Johnson', waitTime: '15 mins' },
      { id: 2, name: 'Bob Williams', doctor: 'Dr. Michael Chen', waitTime: '22 mins' },
      { id: 3, name: 'Carol Martinez', doctor: 'Dr. David Lee', waitTime: '8 mins' },
    ]);

    // Mock recent activities
    setRecentActivities([
      { id: 1, action: 'New patient registered', patient: 'John Smith', time: '5 mins ago' },
      { id: 2, action: 'Appointment checked in', patient: 'Mary Johnson', time: '12 mins ago' },
      { id: 3, action: 'Appointment rescheduled', patient: 'David Lee', time: '25 mins ago' },
      { id: 4, action: 'New appointment booked', patient: 'Sarah Wilson', time: '35 mins ago' },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckIn = (appointmentId) => {
    // TODO: Implement check-in logic
    console.log('Check in appointment:', appointmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reception Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Good morning, {user?.firstName}! Managing front desk operations.
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Waiting Patients</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.waitingPatients}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Check-ins Today</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.checkIns}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-purple-500">
                <UserPlusIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">New Registrations</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.newRegistrations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">{appointment.patientName}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <UserPlusIcon className="h-4 w-4 mr-2" />
                          {appointment.doctorName}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      {appointment.status === 'scheduled' && (
                        <button
                          onClick={() => handleCheckIn(appointment.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                        >
                          Check In
                        </button>
                      )}
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Waiting Queue & Activities */}
        <div className="lg:col-span-1 space-y-6">
          {/* Waiting Queue */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Waiting Queue</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {waitingQueue.length > 0 ? (
                waitingQueue.map((patient) => (
                  <div key={patient.id} className="px-6 py-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.doctor}</p>
                      </div>
                      <span className="text-xs font-medium text-orange-600">{patient.waitTime}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-sm text-gray-500">
                  No patients waiting
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-3">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.patient} • {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/patients/register"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Register Patient
          </Link>
          <Link
            to="/appointments/book"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Book Appointment
          </Link>
          <Link
            to="/appointments"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Manage Schedule
          </Link>
          <Link
            to="/patients"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Patient Records
          </Link>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <PhoneIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Emergency Hotline</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>For medical emergencies, call: <strong>911</strong></p>
              <p>Hospital Emergency: <strong>+1-555-EMERGENCY</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;

