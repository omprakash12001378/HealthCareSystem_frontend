# Role-Based Dashboard Segregation

## 📋 Overview

The Healthcare System now features role-based dashboards that provide customized views and functionalities based on user roles. Each dashboard is optimized for the specific needs and workflows of different healthcare professionals and patients.

## 🎭 User Roles

The system supports the following roles (from backend `RoleName.java`):

1. **ROLE_SUPER_ADMIN** - Full system access
2. **ROLE_ADMIN** - Administrative access
3. **ROLE_DOCTOR** - Doctor specific access
4. **ROLE_NURSE** - Nurse specific access
5. **ROLE_PATIENT** - Patient specific access
6. **ROLE_RECEPTIONIST** - Front desk access
7. **ROLE_PHARMACIST** - Pharmacy access
8. **ROLE_LAB_TECHNICIAN** - Laboratory access
9. **ROLE_RADIOLOGIST** - Radiology access
10. **ROLE_ACCOUNTANT** - Financial access

## 📊 Dashboard Components

### 1. Admin Dashboard (`AdminDashboard.jsx`)

**Purpose:** System-wide overview and management for administrators

**Features:**
- **Statistics:**
  - Total Patients (1,250)
  - Total Doctors (45)
  - Total Appointments (3,420)
  - Pending Appointments (28)

- **Visualizations:**
  - Appointment Trends (Line Chart) - 6-month view
  - Revenue Distribution (Pie Chart) - by service type
  - Appointment Status Summary - Completed/Pending/Cancelled

- **Quick Actions:**
  - Register Patient
  - Add Doctor
  - Book Appointment
  - Generate Report

- **System Health Monitoring:**
  - Database Performance
  - API Response Time
  - Server Load

**Access:** ROLE_ADMIN, ROLE_SUPER_ADMIN

---

### 2. Doctor Dashboard (`DoctorDashboard.jsx`)

**Purpose:** Clinical workflow management for doctors

**Features:**
- **Statistics:**
  - Today's Appointments (12)
  - Upcoming Appointments (8)
  - Completed Today (4)
  - Total Patients (145)

- **Today's Schedule:**
  - Patient name and appointment time
  - Appointment type (Consultation/Follow-up/Check-up)
  - Status tracking (completed/in-progress/scheduled)
  - Quick access to patient details

- **Notifications:**
  - Lab results availability
  - Emergency appointment requests
  - Schedule changes

- **Pending Reports:**
  - Count of reports to complete
  - Quick link to report creation

- **Recent Patients Table:**
  - Patient name
  - Last visit date
  - Current condition
  - Quick access to medical records

- **Quick Actions:**
  - Schedule Appointment
  - View Patients
  - Create Report

**Access:** ROLE_DOCTOR

---

### 3. Patient Dashboard (`PatientDashboard.jsx`)

**Purpose:** Personal health management for patients

**Features:**
- **Statistics:**
  - Upcoming Appointments (2)
  - Completed Appointments (15)
  - Medical Reports (8)
  - Active Prescriptions (3)

- **Upcoming Appointments:**
  - Doctor name and specialty
  - Date, time, and location
  - Appointment type
  - Empty state with "Book Appointment" CTA

- **Health Reminders:**
  - Medication reminders with icons
  - Wellness tasks (water intake, exercise)
  - Scheduled times

- **Latest Vital Signs:**
  - Blood Pressure (120/80)
  - Heart Rate (72 bpm)
  - Temperature (98.6°F)
  - Weight (70 kg)
  - Last updated timestamp

- **Recent Medical Reports Table:**
  - Report type (Blood Test, X-Ray, ECG)
  - Date
  - Attending doctor
  - Status
  - View and Download actions

- **Quick Actions:**
  - Book Appointment
  - Find Doctors
  - View Reports

**Access:** ROLE_PATIENT

---

### 4. Receptionist Dashboard (`ReceptionistDashboard.jsx`)

**Purpose:** Front desk operations and patient flow management

**Features:**
- **Statistics:**
  - Today's Appointments (45)
  - Waiting Patients (8)
  - Check-ins Today (32)
  - New Registrations (5)

- **Today's Schedule:**
  - Patient and doctor information
  - Appointment time
  - Contact phone number
  - Status with color coding
  - Check-in button for scheduled appointments
  - Details button for all appointments

- **Waiting Queue:**
  - Patient name
  - Assigned doctor
  - Wait time tracking
  - Real-time updates

- **Recent Activities Log:**
  - New patient registrations
  - Appointment check-ins
  - Rescheduling events
  - Timestamps

- **Quick Actions:**
  - Register Patient
  - Book Appointment
  - Manage Schedule
  - Patient Records

- **Emergency Contact Information:**
  - Emergency hotline numbers
  - Hospital emergency contact

**Access:** ROLE_RECEPTIONIST

---

### 5. Nurse Dashboard (`NurseDashboard.jsx`)

**Purpose:** Patient care and clinical task management

**Features:**
- **Statistics:**
  - Assigned Patients (12)
  - Vitals to Record (8)
  - Medications Scheduled (15)
  - Critical Alerts (2)

- **Critical Alerts:**
  - High-priority patient alerts
  - Vital sign warnings (elevated heart rate, low oxygen)
  - Color-coded severity levels
  - Quick response buttons

- **Assigned Patients:**
  - Patient name and room number
  - Current condition
  - Vitals status (recorded/pending)
  - Last vitals timestamp
  - Quick actions: Record Vitals, View Chart

- **Medication Schedule:**
  - Patient and room information
  - Medication name
  - Scheduled time
  - Status (pending/completed)
  - Administer button for pending medications

- **Tasks Checklist:**
  - Daily task list with checkboxes
  - Priority indicators (high/medium/low)
  - Task descriptions
  - Completion tracking

- **Quick Actions:**
  - Record Vital Signs
  - Administer Medication
  - View Patient Charts

**Access:** ROLE_NURSE

---

## 🗺️ Navigation Structure

### Role-Based Navigation Menu

The sidebar navigation is dynamically generated based on user roles:

#### Admin/Super Admin
- Dashboard
- Appointments
- Doctors
- Patients
- Reports
- Settings

#### Doctor
- Dashboard
- My Appointments
- My Patients
- Reports
- Settings

#### Nurse
- Dashboard
- My Patients
- Appointments
- Settings

#### Receptionist
- Dashboard
- Appointments
- Doctors
- Patients
- Settings

#### Patient
- Dashboard
- My Appointments
- Doctors
- My Reports
- Settings

## 🔧 Implementation Details

### File Structure

```
frontend/src/pages/Dashboard/
├── Dashboard.jsx              # Main router component
├── AdminDashboard.jsx         # Admin/Super Admin dashboard
├── DoctorDashboard.jsx        # Doctor dashboard
├── PatientDashboard.jsx       # Patient dashboard
├── NurseDashboard.jsx         # Nurse dashboard
└── ReceptionistDashboard.jsx  # Receptionist dashboard
```

### Main Dashboard Router (`Dashboard.jsx`)

```javascript
const getUserRole = () => {
  // Prioritizes roles in order:
  // SUPER_ADMIN > ADMIN > DOCTOR > NURSE > RECEPTIONIST > PATIENT
  
  // Returns the highest priority role for the user
}

const renderDashboard = () => {
  // Routes to appropriate dashboard based on role
  switch (userRole) {
    case 'ROLE_SUPER_ADMIN':
    case 'ROLE_ADMIN':
      return <AdminDashboard />;
    case 'ROLE_DOCTOR':
      return <DoctorDashboard />;
    // ... etc
  }
}
```

### Sidebar Navigation (`Sidebar.jsx`)

```javascript
const getNavigationByRole = (userRoles) => {
  // Filters navigation items based on user's roles
  // Each nav item has a 'roles' array
  // Returns only items accessible to current user
}
```

## 🎨 Design Patterns

### Color Coding

**Status Indicators:**
- 🟢 Green: Completed, Available, Healthy
- 🟡 Yellow: Pending, Waiting, Moderate
- 🔵 Blue: Scheduled, In-Progress, Info
- 🔴 Red: Critical, Cancelled, Alert
- ⚫ Gray: Inactive, Unknown

**Dashboard Themes:**
- Admin: Blue primary (#3b82f6)
- Doctor: Green accents (#10b981)
- Patient: Purple accents (#8b5cf6)
- Nurse: Teal accents (#14b8a6)
- Receptionist: Indigo accents (#6366f1)

### Icons

Using Heroicons 24/outline:
- CalendarIcon: Appointments
- UserGroupIcon: Doctors/Groups
- UsersIcon: Patients
- DocumentChartBarIcon: Reports
- HeartIcon: Health/Vitals
- ClockIcon: Time/Schedule
- CheckCircleIcon: Completed
- BellAlertIcon: Alerts/Notifications

## 📊 Data Integration

### Current State (Mock Data)

All dashboards currently use mock data with `useState` and `useEffect`. 

### Future Integration (TODO)

Replace mock data with API calls:

```javascript
// Example for Doctor Dashboard
useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/doctors/dashboard');
      setStats(response.data.stats);
      setTodaySchedule(response.data.schedule);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };
  
  fetchDashboardData();
}, []);
```

### Required API Endpoints

#### Admin Dashboard
- `GET /api/admin/dashboard/stats` - Overall system statistics
- `GET /api/admin/dashboard/trends` - Appointment and revenue trends
- `GET /api/admin/dashboard/system-health` - System performance metrics

#### Doctor Dashboard
- `GET /api/doctors/dashboard/stats` - Doctor's statistics
- `GET /api/doctors/dashboard/schedule` - Today's appointments
- `GET /api/doctors/dashboard/patients/recent` - Recent patients
- `GET /api/doctors/dashboard/notifications` - Notifications

#### Patient Dashboard
- `GET /api/patients/dashboard/stats` - Patient's statistics
- `GET /api/patients/dashboard/appointments` - Upcoming appointments
- `GET /api/patients/dashboard/reports` - Medical reports
- `GET /api/patients/dashboard/vitals` - Latest vital signs
- `GET /api/patients/dashboard/reminders` - Health reminders

#### Nurse Dashboard
- `GET /api/nurses/dashboard/stats` - Nurse's statistics
- `GET /api/nurses/dashboard/patients` - Assigned patients
- `GET /api/nurses/dashboard/medications` - Medication schedule
- `GET /api/nurses/dashboard/alerts` - Critical alerts
- `GET /api/nurses/dashboard/tasks` - Daily tasks

#### Receptionist Dashboard
- `GET /api/reception/dashboard/stats` - Reception statistics
- `GET /api/reception/dashboard/schedule` - Today's schedule
- `GET /api/reception/dashboard/waiting-queue` - Current queue
- `GET /api/reception/dashboard/activities` - Recent activities
- `POST /api/reception/checkin/:appointmentId` - Check-in patient

## 🔐 Security & Access Control

### Role Verification

1. **Frontend Validation:** 
   - Checks user roles from Redux store
   - Routes to appropriate dashboard
   - Shows/hides navigation items

2. **Backend Validation (Required):**
   - Verify roles on all API endpoints
   - Use Spring Security annotations:
     ```java
     @PreAuthorize("hasRole('ROLE_DOCTOR')")
     @GetMapping("/api/doctors/dashboard/stats")
     public ResponseEntity<?> getDashboardStats() {
         // Implementation
     }
     ```

### Protected Routes

The `PrivateRoute` component ensures authentication:

```javascript
<Route element={<PrivateRoute><Layout /></PrivateRoute>}>
  <Route path="/dashboard" element={<Dashboard />} />
  // ... other routes
</Route>
```

## 📱 Responsive Design

All dashboards are fully responsive:

- **Mobile (< 640px):** Single column layout
- **Tablet (640px - 1024px):** 2-column grid for stats
- **Desktop (> 1024px):** Full multi-column layouts

Grid breakpoints:
```javascript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

## 🚀 Getting Started

### 1. Install Dependencies

The dashboards use Recharts for visualizations:

```bash
cd frontend
npm install recharts
```

### 2. Verify User Roles

Ensure your backend returns user roles in the login response:

```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "userId": "...",
    "username": "john.doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "roles": [
      {
        "id": "...",
        "name": "ROLE_DOCTOR"
      }
    ]
  }
}
```

### 3. Test Role-Based Access

1. Login with different user roles
2. Verify correct dashboard is displayed
3. Check navigation menu shows appropriate items
4. Test quick action buttons

### 4. Connect to Backend APIs

Replace mock data in each dashboard component with actual API calls to your backend services.

## 🎯 Future Enhancements

### Phase 1 (Current)
- ✅ Role-based dashboard routing
- ✅ Mock data visualization
- ✅ Responsive layouts
- ✅ Dynamic navigation

### Phase 2 (Next Steps)
- [ ] Connect to real backend APIs
- [ ] Real-time data updates via WebSocket
- [ ] Interactive charts with drill-down
- [ ] Export reports functionality
- [ ] Advanced filtering and search

### Phase 3 (Advanced)
- [ ] Customizable dashboard widgets
- [ ] User preferences for dashboard layout
- [ ] Mobile app integration
- [ ] Push notifications
- [ ] Advanced analytics and insights

### Additional Dashboards Needed

For complete role coverage:

1. **Pharmacist Dashboard**
   - Prescription queue
   - Medication inventory
   - Drug interactions alerts

2. **Lab Technician Dashboard**
   - Pending lab tests
   - Sample tracking
   - Result entry interface

3. **Radiologist Dashboard**
   - Imaging queue
   - DICOM viewer integration
   - Report generation

4. **Accountant Dashboard**
   - Financial overview
   - Billing and payments
   - Revenue reports

## 📝 Best Practices

1. **Always check user authentication** before rendering dashboards
2. **Validate roles on backend** - never trust frontend-only validation
3. **Use loading states** while fetching data
4. **Handle errors gracefully** with user-friendly messages
5. **Keep dashboards performant** - lazy load heavy components
6. **Test with real user scenarios** - different roles, permissions
7. **Maintain consistency** across all dashboards in design and UX

## 🐛 Troubleshooting

### Dashboard not showing
- Check if user is authenticated
- Verify user object has roles property
- Check Redux store state
- Ensure role names match backend exactly

### Navigation items missing
- Verify role names in navigation configuration
- Check user roles array structure
- Ensure navigation filtering logic is correct

### Data not loading
- Check API endpoint connectivity
- Verify authentication token is valid
- Look for CORS issues
- Check browser console for errors

## 📚 References

- **Icons:** [Heroicons](https://heroicons.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router](https://reactrouter.com/)

---

**Document Version:** 1.0  
**Last Updated:** November 13, 2025  
**Author:** Development Team  

For questions or issues, please contact the development team or create an issue in the project repository.

