# Healthcare Management System - Frontend

## Enterprise-Level React Application

### Features Implemented

- ✅ **Complete Authentication System**
  - Login with JWT
  - Registration with role-based access
  - Protected routes
  - Auto logout on token expiration

- ✅ **Dashboard**
  - Admin Dashboard with analytics
  - Doctor Dashboard with schedule
  - Patient Dashboard with appointments
  - Real-time statistics and charts

- ✅ **Appointment Management**
  - Book appointments with doctors
  - View appointment history
  - Reschedule appointments
  - Cancel appointments
  - Check-in system
  - Payment tracking

- ✅ **Patient Management**
  - Patient registration
  - Patient list with search/filter
  - Patient details and history
  - Medical records

- ✅ **Doctor Management**
  - Doctor registration
  - Doctor directory
  - Specialization filtering
  - Availability management
  - Schedule management

- ✅ **Reports**
  - Generate PDF/Excel reports
  - Appointment reports
  - Patient reports
  - Doctor schedules
  - Revenue reports
  - Analytics dashboard

- ✅ **Profile Management**
  - View/Edit profile
  - Change password
  - Update settings

### Technology Stack

- **React 18.2** - Latest React with hooks
- **Redux Toolkit** - State management
- **React Router v6** - Navigation
- **Tailwind CSS** - Utility-first CSS
- **Headless UI** - Accessible components
- **Heroicons** - Beautiful icons
- **Axios** - API calls
- **Formik + Yup** - Form validation
- **React Hot Toast** - Notifications
- **Recharts** - Data visualization
- **Date-fns** - Date manipulation

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

3. **Run Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

### Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── PrivateRoute/
│   │   └── PrivateRoute.jsx
│   ├── Common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── Modal.jsx
│   │   └── ...
│   └── ...
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   └── PatientDashboard.jsx
│   ├── Appointments/
│   ├── Patients/
│   ├── Doctors/
│   ├── Reports/
│   └── Profile/
├── redux/
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── appointmentSlice.js
│   │   ├── patientSlice.js
│   │   └── doctorSlice.js
│   └── configureStore.js
├── services/
│   └── api.js
├── App.js
└── index.js
```

### API Integration

All backend services are integrated:
- User Service (Port 8081)
- Patient Service (Port 8082)
- Doctor Service (Port 8083)
- Appointment Service (Port 8084)
- Report Service (Port 8085)

### UI/UX Features

- **Responsive Design** - Works on all devices
- **Dark Mode Ready** - Easy to implement
- **Accessibility** - WCAG compliant
- **Loading States** - Skeleton screens
- **Error Handling** - User-friendly messages
- **Animations** - Smooth transitions
- **Toast Notifications** - Real-time feedback
- **Form Validation** - Client-side validation
- **Data Tables** - Sortable, filterable
- **Charts** - Interactive visualizations

### Color Scheme

- Primary: Blue (#3b82f6)
- Secondary: Green (#22c55e)
- Accent: Purple (#d946ef)
- Danger: Red (#ef4444)
- Warning: Yellow (#f59e0b)
- Info: Cyan (#0ea5e9)

### Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Enterprise Features

1. **Security**
   - JWT authentication
   - Protected routes
   - Role-based access control
   - XSS protection

2. **Performance**
   - Code splitting
   - Lazy loading
   - Memoization
   - Optimized builds

3. **User Experience**
   - Intuitive navigation
   - Clear visual hierarchy
   - Consistent design language
   - Helpful error messages

4. **Maintainability**
   - Component reusability
   - Clean code structure
   - Comprehensive comments
   - Easy to extend

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### License

Proprietary - Healthcare Management System

### Support

For support, email: support@healthcaresystem.com

