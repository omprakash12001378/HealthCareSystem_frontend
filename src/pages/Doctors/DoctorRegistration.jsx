import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    specialization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    qualification: '',
    department: '',
    consultationFee: '',
    about: '',
    available: true
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await doctorAPI.register(formData);
      if (response.data.success || response.status === 201) {
        toast.success('Doctor registered successfully!');
        navigate('/doctors');
      }
    } catch (error) {
      console.error('Error registering doctor:', error);
      toast.error(error.response?.data?.message || 'Failed to register doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register New Doctor</h1>
        <p className="mt-2 text-gray-600">Fill in doctor information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-900">Professional Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization *</label>
              <select
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select Specialization</option>
                <option value="CARDIOLOGY">Cardiology</option>
                <option value="NEUROLOGY">Neurology</option>
                <option value="ORTHOPEDICS">Orthopedics</option>
                <option value="PEDIATRICS">Pediatrics</option>
                <option value="DERMATOLOGY">Dermatology</option>
                <option value="GENERAL_PRACTICE">General Practice</option>
                <option value="SURGERY">Surgery</option>
                <option value="GYNECOLOGY">Gynecology</option>
                <option value="PSYCHIATRY">Psychiatry</option>
                <option value="OPHTHALMOLOGY">Ophthalmology</option>
                <option value="ENT">ENT</option>
                <option value="RADIOLOGY">Radiology</option>
                <option value="ANESTHESIOLOGY">Anesthesiology</option>
                <option value="ENDOCRINOLOGY">Endocrinology</option>
                <option value="PULMONOLOGY">Pulmonology</option>
                <option value="GASTROENTEROLOGY">Gastroenterology</option>
                <option value="UROLOGY">Urology</option>
                <option value="NEPHROLOGY">Nephrology</option>
                <option value="ONCOLOGY">Oncology</option>
                <option value="RHEUMATOLOGY">Rheumatology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
              <input
                type="number"
                name="yearsOfExperience"
                required
                min="0"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification *</label>
              <input
                type="text"
                name="qualification"
                required
                placeholder="e.g., MBBS, MD"
                value={formData.qualification}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
              <input
                type="number"
                name="consultationFee"
                min="0"
                step="0.01"
                value={formData.consultationFee}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-900">Additional Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleChange}
                placeholder="Brief description about the doctor..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Available for appointments
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => navigate('/doctors')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegistration;

