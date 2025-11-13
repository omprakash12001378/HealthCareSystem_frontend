import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI, doctorAPI, patientAPI } from '../../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    reasonForVisit: '', // Changed from 'reason' to match backend DTO
    symptoms: '', // Changed from 'notes' to match backend DTO
    appointmentType: 'CONSULTATION',
    isEmergency: false,
    durationMinutes: 30,
    consultationFee: null // Add consultation fee field
  });

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getActive();
      setDoctors(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    if (e.target.name === 'doctorId') {
      const doctor = doctors.find(d => d.id === value);
      setSelectedDoctor(doctor);
      // Set consultation fee from doctor's information
      if (doctor && doctor.consultationFee) {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: value,
          consultationFee: doctor.consultationFee
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await appointmentAPI.book(formData);
      if (response.data.success || response.status === 201) {
        toast.success('Appointment booked successfully!');
        navigate('/appointments');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        <p className="mt-2 text-gray-600">Schedule a new appointment</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Patient *</label>
          <select
            name="patientId"
            required
            value={formData.patientId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName} - {patient.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Doctor *</label>
          <select
            name="doctorId"
            required
            value={formData.doctorId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {selectedDoctor && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-900">Doctor Information</h3>
            <dl className="mt-2 text-sm text-blue-700">
              <div className="flex justify-between py-1">
                <dt>Specialization:</dt>
                <dd className="font-medium">{selectedDoctor.specialization}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt>Department:</dt>
                <dd className="font-medium">{selectedDoctor.department || 'N/A'}</dd>
              </div>
              {selectedDoctor.consultationFee && (
                <div className="flex justify-between py-1">
                  <dt>Consultation Fee:</dt>
                  <dd className="font-medium">${selectedDoctor.consultationFee}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Appointment Date & Time *</label>
          <input
            type="datetime-local"
            name="appointmentDateTime"
            required
            value={formData.appointmentDateTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Appointment Type *</label>
          <select
            name="appointmentType"
            required
            value={formData.appointmentType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="CONSULTATION">Consultation</option>
            <option value="FOLLOW_UP">Follow-up</option>
            <option value="EMERGENCY">Emergency</option>
            <option value="ROUTINE_CHECKUP">Routine Checkup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes) *</label>
          <select
            name="durationMinutes"
            required
            value={formData.durationMinutes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Visit *</label>
          <textarea
            name="reasonForVisit"
            required
            rows={3}
            value={formData.reasonForVisit}
            onChange={handleChange}
            placeholder="Describe the reason for this appointment..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Symptoms / Additional Notes</label>
          <textarea
            name="symptoms"
            rows={2}
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Any symptoms or additional information..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isEmergency"
            checked={formData.isEmergency}
            onChange={handleChange}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Mark as Emergency
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/appointments')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;

