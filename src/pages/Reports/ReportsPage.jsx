import React, { useState } from 'react';
import { reportAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ReportsPage = () => {
  const [loadingReport, setLoadingReport] = useState(null); // Track which report is loading
  const [reportType, setReportType] = useState('');
  const [format, setFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleGenerateReport = async (type) => {
    setLoadingReport(type); // Set which report is loading
    try {
      let response;
      const config = {
        responseType: 'blob'
      };

      switch (type) {
        case 'all-patients':
          response = await reportAPI.generatePatientsReport(format, config);
          break;
        case 'all-doctors':
          response = await reportAPI.generateDoctorsReport(format, config);
          break;
        case 'all-appointments':
          response = await reportAPI.generateAppointmentsReport(format, config);
          break;
        case 'revenue':
          if (!dateRange.startDate || !dateRange.endDate) {
            toast.error('Please select date range for revenue report');
            return;
          }
          response = await reportAPI.generateRevenueReport(
            dateRange.startDate,
            dateRange.endDate,
            format,
            config
          );
          break;
        default:
          toast.error('Invalid report type');
          return;
      }

      // Download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const extension = format.toLowerCase();
      link.setAttribute('download', `${type}-report-${new Date().getTime()}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error(error.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoadingReport(null); // Clear loading state
    }
  };

  const reports = [
    {
      id: 'all-patients',
      title: 'All Patients Report',
      description: 'Complete list of all registered patients',
      icon: '👥',
      color: 'blue'
    },
    {
      id: 'all-doctors',
      title: 'All Doctors Report',
      description: 'Complete list of all doctors with their specializations',
      icon: '👨‍⚕️',
      color: 'green'
    },
    {
      id: 'all-appointments',
      title: 'Appointments Report',
      description: 'All scheduled appointments',
      icon: '📅',
      color: 'purple'
    },
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Financial summary and revenue statistics',
      icon: '💰',
      color: 'yellow',
      requiresDateRange: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">Generate and download various reports</p>
      </div>

      <div className="mb-6 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Report Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
              <option value="CSV">CSV</option>
              <option value="HTML">HTML</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date (for Revenue)</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date (for Revenue)</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          // Define color classes for each report type
          const getColorClasses = (color) => {
            const colorMap = {
              blue: {
                bg: 'bg-blue-100',
                btnBg: 'bg-blue-600',
                btnHover: 'hover:bg-blue-700',
                ring: 'focus:ring-blue-500'
              },
              green: {
                bg: 'bg-green-100',
                btnBg: 'bg-green-600',
                btnHover: 'hover:bg-green-700',
                ring: 'focus:ring-green-500'
              },
              purple: {
                bg: 'bg-purple-100',
                btnBg: 'bg-purple-600',
                btnHover: 'hover:bg-purple-700',
                ring: 'focus:ring-purple-500'
              },
              yellow: {
                bg: 'bg-yellow-100',
                btnBg: 'bg-yellow-600',
                btnHover: 'hover:bg-yellow-700',
                ring: 'focus:ring-yellow-500'
              }
            };
            return colorMap[color] || colorMap.blue;
          };

          const colors = getColorClasses(report.color);

          return (
            <div
              key={report.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 rounded-full ${colors.bg} p-3`}>
                  <span className="text-3xl">{report.icon}</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                  {report.requiresDateRange && (
                    <p className="mt-2 text-xs text-amber-600">* Requires date range selection</p>
                  )}
                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={loadingReport === report.id}
                    className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${colors.btnBg} ${colors.btnHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.ring} disabled:opacity-50`}
                  >
                    {loadingReport === report.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        Generate {format}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">📋 Report Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Reports are generated using JasperReports for professional formatting</li>
          <li>• Available formats: PDF, Excel, CSV, and HTML</li>
          <li>• Revenue reports require a date range selection</li>
          <li>• Reports include company branding and professional templates</li>
          <li>• All data is exported with proper formatting and styling</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;

