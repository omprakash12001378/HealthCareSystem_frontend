import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  DocumentTextIcon,
  HeartIcon,
  ClockIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { format, addDays } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    completedAppointments: 0,
    medicalReports: 0,
    prescriptions: 0,
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [healthReminders, setHealthReminders] = useState([]);
  const [vitalSigns, setVitalSigns] = useState({});

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      upcomingAppointments: 2,
      completedAppointments: 15,
      medicalReports: 8,
      prescriptions: 3,
    });

    // Mock upcoming appointments
    setUpcomingAppointments([
      {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        time: '10:00 AM',
        type: 'Follow-up',
        location: 'Cardiology Dept, 3rd Floor',
      },
      {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'General Physician',
        date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
        time: '02:30 PM',
        type: 'Consultation',
        location: 'OPD, 1st Floor',
      },
    ]);

    // Mock recent reports
    setRecentReports([
      { id: 1, type: 'Blood Test', date: '2024-11-08', doctor: 'Dr. Sarah Johnson', status: 'Available' },
      { id: 2, type: 'X-Ray', date: '2024-11-05', doctor: 'Dr. Michael Chen', status: 'Available' },
      { id: 3, type: 'ECG', date: '2024-10-28', doctor: 'Dr. Sarah Johnson', status: 'Available' },
    ]);

    // Mock health reminders
    setHealthReminders([
      { id: 1, title: 'Take Blood Pressure Medication', time: '8:00 AM', type: 'medication' },
      { id: 2, title: 'Drink Water - 2L Goal', time: 'Throughout the day', type: 'wellness' },
      { id: 3, title: 'Evening Walk - 30 minutes', time: '6:00 PM', type: 'exercise' },
    ]);

    // Mock vital signs
    setVitalSigns({
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '70 kg',
      lastUpdated: '2024-11-10',
    });
  }, []);

  const getReminderIcon = (type) => {
    switch (type) {
      case 'medication':
        return '💊';
      case 'wellness':
        return '💧';
      case 'exercise':
        return '🏃';
      default:
        return '📌';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Health Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.firstName}! Here's your health overview.
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
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Reports</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.medicalReports}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-purple-500">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.completedAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-orange-500">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Prescriptions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.prescriptions}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link
                to="/appointments/book"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-1" />
                Book New
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-500 mt-1">{appointment.specialty}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {format(new Date(appointment.date), 'MMMM dd, yyyy')}
                          <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                          {appointment.time}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">📍 {appointment.location}</p>
                      </div>
                      <span className="ml-4 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {appointment.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No upcoming appointments</p>
                  <Link
                    to="/appointments/book"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Book Appointment
                  </Link>
                </div>
              )}
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

        {/* Health Reminders & Vital Signs */}
        <div className="lg:col-span-1 space-y-6">
          {/* Health Reminders */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Reminders</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {healthReminders.map((reminder) => (
                <div key={reminder.id} className="px-6 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{getReminderIcon(reminder.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <ClockIcon className="inline h-3 w-3 mr-1" />
                        {reminder.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Signs */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Latest Vital Signs</h2>
              <p className="text-xs text-gray-500 mt-1">Last updated: {vitalSigns.lastUpdated}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Blood Pressure</span>
                <span className="text-sm font-semibold text-gray-900">{vitalSigns.bloodPressure}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Heart Rate</span>
                <span className="text-sm font-semibold text-gray-900">{vitalSigns.heartRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Temperature</span>
                <span className="text-sm font-semibold text-gray-900">{vitalSigns.temperature}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-semibold text-gray-900">{vitalSigns.weight}</span>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Update Vitals →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Medical Reports */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Medical Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/reports/${report.id}`} className="text-blue-600 hover:text-blue-500 mr-3">
                      View
                    </Link>
                    <button className="text-blue-600 hover:text-blue-500">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <Link
            to="/reports"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all reports →
          </Link>
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
            Book Appointment
          </Link>
          <Link
            to="/doctors"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Find Doctors
          </Link>
          <Link
            to="/reports"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

