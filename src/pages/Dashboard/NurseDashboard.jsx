import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const NurseDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    assignedPatients: 0,
    vitalsToRecord: 0,
    medicationsScheduled: 0,
    criticalAlerts: 0,
  });

  const [assignedPatients, setAssignedPatients] = useState([]);
  const [medicationSchedule, setMedicationSchedule] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      assignedPatients: 12,
      vitalsToRecord: 8,
      medicationsScheduled: 15,
      criticalAlerts: 2,
    });

    // Mock assigned patients
    setAssignedPatients([
      {
        id: 1,
        name: 'John Doe',
        room: '301',
        condition: 'Post-surgery recovery',
        vitalsStatus: 'pending',
        lastVitals: '2 hours ago',
      },
      {
        id: 2,
        name: 'Jane Smith',
        room: '302',
        condition: 'Cardiac monitoring',
        vitalsStatus: 'completed',
        lastVitals: '30 mins ago',
      },
      {
        id: 3,
        name: 'Robert Johnson',
        room: '305',
        condition: 'Diabetes management',
        vitalsStatus: 'pending',
        lastVitals: '3 hours ago',
      },
      {
        id: 4,
        name: 'Emily Davis',
        room: '308',
        condition: 'Respiratory infection',
        vitalsStatus: 'completed',
        lastVitals: '1 hour ago',
      },
    ]);

    // Mock medication schedule
    setMedicationSchedule([
      {
        id: 1,
        patient: 'John Doe',
        room: '301',
        medication: 'Antibiotics',
        time: '10:00 AM',
        status: 'pending',
      },
      {
        id: 2,
        patient: 'Jane Smith',
        room: '302',
        medication: 'Blood thinner',
        time: '10:30 AM',
        status: 'completed',
      },
      {
        id: 3,
        patient: 'Robert Johnson',
        room: '305',
        medication: 'Insulin',
        time: '11:00 AM',
        status: 'pending',
      },
      {
        id: 4,
        patient: 'Emily Davis',
        room: '308',
        medication: 'Pain reliever',
        time: '11:30 AM',
        status: 'pending',
      },
    ]);

    // Mock critical alerts
    setCriticalAlerts([
      {
        id: 1,
        patient: 'Jane Smith',
        room: '302',
        alert: 'Elevated heart rate - 115 bpm',
        time: '5 mins ago',
        severity: 'high',
      },
      {
        id: 2,
        patient: 'John Doe',
        room: '301',
        alert: 'Low oxygen saturation - 92%',
        time: '12 mins ago',
        severity: 'medium',
      },
    ]);

    // Mock tasks
    setTasks([
      { id: 1, task: 'Wound dressing change - Room 301', completed: false, priority: 'high' },
      { id: 2, task: 'Blood sample collection - Room 302', completed: true, priority: 'medium' },
      { id: 3, task: 'IV fluid replacement - Room 305', completed: false, priority: 'high' },
      { id: 4, task: 'Patient discharge prep - Room 310', completed: false, priority: 'low' },
    ]);
  }, []);

  const getVitalsStatusColor = (status) => {
    return status === 'completed' ? 'text-green-600' : 'text-orange-600';
  };

  const getMedicationStatusColor = (status) => {
    return status === 'completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-400 text-red-800';
      case 'medium':
        return 'bg-orange-100 border-orange-400 text-orange-800';
      default:
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nurse Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Good morning, {user?.firstName}! You have {stats.assignedPatients} patients assigned.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-blue-500">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Assigned Patients</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.assignedPatients}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-green-500">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Vitals to Record</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.vitalsToRecord}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-purple-500">
                <ClipboardDocumentListIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Medications Due</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.medicationsScheduled}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md p-3 bg-red-500">
                <BellAlertIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Critical Alerts</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.criticalAlerts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded ${getAlertSeverityColor(alert.severity)}`}>
              <div className="flex items-start">
                <BellAlertIcon className="h-5 w-5 mt-0.5 mr-3" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      {alert.patient} - Room {alert.room}
                    </h3>
                    <span className="text-xs">{alert.time}</span>
                  </div>
                  <p className="mt-1 text-sm">{alert.alert}</p>
                  <button className="mt-2 text-sm font-medium underline hover:no-underline">
                    Respond to Alert
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Assigned Patients */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Patients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {assignedPatients.map((patient) => (
              <div key={patient.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-xs text-gray-500">Room {patient.room}</p>
                  </div>
                  <span className={`text-xs font-medium ${getVitalsStatusColor(patient.vitalsStatus)}`}>
                    {patient.vitalsStatus === 'completed' ? '✓ Vitals recorded' : '⚠ Vitals pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{patient.condition}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Last vitals: {patient.lastVitals}</span>
                  <div className="space-x-2">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
                      Record Vitals
                    </button>
                    <Link
                      to={`/patients/${patient.id}`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Chart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Medication Schedule</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {medicationSchedule.map((med) => (
              <div key={med.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900">{med.patient}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMedicationStatusColor(med.status)}`}>
                        {med.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{med.medication}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {med.time}
                      <span className="mx-2">•</span>
                      Room {med.room}
                    </div>
                  </div>
                  {med.status === 'pending' && (
                    <button className="ml-4 px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700">
                      Administer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Checklist */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div key={task.id} className="px-6 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.task}
                  </p>
                </div>
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority} priority
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Record Vital Signs
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
            Administer Medication
          </button>
          <Link
            to="/patients"
            className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            View Patient Charts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;

