# Quick Start Guide - Testing Role-Based Dashboards

## 🚀 Getting Started

This guide will help you test the newly implemented role-based dashboards in the Healthcare System.

## ✅ Prerequisites

1. **Backend Running:**
   ```bash
   # Make sure all microservices are running
   # Eureka Server (port 8761)
   # Gateway (port 8080)
   # User Service (port 8084)
   ```

2. **Frontend Setup:**
   ```bash
   cd D:\Health_care_system\frontend
   npm install
   npm start
   ```

## 🧪 Testing Each Dashboard

### Test 1: Admin Dashboard

**User Role:** ROLE_ADMIN or ROLE_SUPER_ADMIN

**Expected View:**
- System-wide statistics (Patients, Doctors, Appointments)
- Appointment trends chart
- Revenue distribution pie chart
- System health indicators
- Quick action buttons

**How to Test:**
1. Login with admin credentials
2. Should automatically redirect to `/dashboard`
3. Verify AdminDashboard renders
4. Check all statistics display correctly
5. Verify charts are visible (mock data)
6. Click quick action buttons to verify navigation

**Navigation Menu Should Show:**
- Dashboard
- Appointments
- Doctors
- Patients
- Reports
- Settings

---

### Test 2: Doctor Dashboard

**User Role:** ROLE_DOCTOR

**Expected View:**
- Today's appointment count
- Today's schedule with patient list
- Notifications panel
- Pending reports counter
- Recent patients table

**How to Test:**
1. Login with doctor credentials
2. Should redirect to `/dashboard`
3. Verify DoctorDashboard renders
4. Check today's schedule displays appointments
5. Verify status colors (green=completed, yellow=in-progress, blue=scheduled)
6. Check notifications panel

**Navigation Menu Should Show:**
- Dashboard
- My Appointments
- My Patients
- Reports
- Settings

---

### Test 3: Patient Dashboard

**User Role:** ROLE_PATIENT

**Expected View:**
- Personal health statistics
- Upcoming appointments list
- Health reminders
- Latest vital signs
- Recent medical reports table

**How to Test:**
1. Login with patient credentials
2. Should redirect to `/dashboard`
3. Verify PatientDashboard renders
4. Check upcoming appointments section
5. Verify health reminders display
6. Check vital signs panel
7. Verify reports table

**Navigation Menu Should Show:**
- Dashboard
- My Appointments
- Doctors
- My Reports
- Settings

---

### Test 4: Nurse Dashboard

**User Role:** ROLE_NURSE

**Expected View:**
- Assigned patients count
- Critical alerts (if any)
- Assigned patients list
- Medication schedule
- Daily tasks checklist

**How to Test:**
1. Login with nurse credentials
2. Should redirect to `/dashboard`
3. Verify NurseDashboard renders
4. Check critical alerts section (color-coded)
5. Verify assigned patients list
6. Check medication schedule
7. Verify tasks checklist

**Navigation Menu Should Show:**
- Dashboard
- My Patients
- Appointments
- Settings

---

### Test 5: Receptionist Dashboard

**User Role:** ROLE_RECEPTIONIST

**Expected View:**
- Today's appointment count
- Waiting queue
- Today's complete schedule
- Recent activities log
- Emergency contact information

**How to Test:**
1. Login with receptionist credentials
2. Should redirect to `/dashboard`
3. Verify ReceptionistDashboard renders
4. Check today's schedule section
5. Verify waiting queue updates
6. Check recent activities
7. Verify emergency contact info

**Navigation Menu Should Show:**
- Dashboard
- Appointments
- Doctors
- Patients
- Settings

---

## 🔍 Testing Checklist

### Functional Tests

- [ ] **Login & Redirect:** User logs in and sees correct dashboard for their role
- [ ] **Navigation Menu:** Only role-appropriate menu items are visible
- [ ] **Statistics Cards:** All stat cards display mock data correctly
- [ ] **Quick Actions:** All quick action buttons navigate to correct pages
- [ ] **Responsive Design:** Dashboard looks good on mobile, tablet, desktop
- [ ] **Logout:** Logout button works and redirects to login
- [ ] **Multiple Roles:** User with multiple roles sees highest priority dashboard

### Visual Tests

- [ ] **Colors:** Status indicators use correct colors
- [ ] **Icons:** All icons display correctly
- [ ] **Charts:** Recharts render properly (Admin dashboard)
- [ ] **Tables:** Tables are formatted and scrollable
- [ ] **Spacing:** Consistent spacing and padding
- [ ] **Font Sizes:** Text is readable at all screen sizes

### Navigation Tests

- [ ] **Sidebar:** Opens/closes on mobile
- [ ] **Active State:** Current page highlighted in sidebar
- [ ] **Links:** All navigation links work
- [ ] **Breadcrumbs:** (If implemented) Show correct path

---

## 🧩 Test Scenarios

### Scenario 1: Admin Managing System
```
1. Login as admin
2. View system statistics
3. Click "Register Patient" → Navigate to patient registration
4. Click "Add Doctor" → Navigate to doctor registration
5. View appointment trends
6. Check system health metrics
```

### Scenario 2: Doctor's Daily Workflow
```
1. Login as doctor
2. View today's schedule
3. Check notification for lab results
4. Click on appointment to view details
5. Navigate to patient list
6. Click "Create Report"
```

### Scenario 3: Patient Checking Health
```
1. Login as patient
2. View upcoming appointments
3. Check latest vital signs
4. Review health reminders
5. Click "View" on medical report
6. Click "Book Appointment"
```

### Scenario 4: Nurse Shift Tasks
```
1. Login as nurse
2. Check critical alerts (if any)
3. View assigned patients
4. Check medication schedule
5. Mark tasks as completed
6. Record vital signs
```

### Scenario 5: Reception Check-in Flow
```
1. Login as receptionist
2. View today's schedule
3. Find patient appointment
4. Click "Check In" button
5. View waiting queue update
6. Check recent activities log
```

---

## 🐛 Common Issues & Solutions

### Issue: Dashboard not loading
**Solution:**
- Check Redux store has user data
- Verify user.roles array exists
- Check browser console for errors

### Issue: Wrong dashboard displayed
**Solution:**
- Check user.roles array format
- Verify role names match backend exactly (e.g., "ROLE_DOCTOR")
- Clear localStorage and login again

### Issue: Navigation menu empty
**Solution:**
- Verify user.roles is populated
- Check Sidebar.jsx navigation configuration
- Ensure role names match

### Issue: Charts not rendering
**Solution:**
- Verify recharts is installed: `npm list recharts`
- Check browser console for errors
- Ensure data format matches Recharts requirements

### Issue: Mock data not showing
**Solution:**
- Check useEffect is running (add console.log)
- Verify state initialization
- Check for JavaScript errors

---

## 📊 Expected Mock Data

### Admin Dashboard
- Total Patients: 1,250
- Total Doctors: 45
- Total Appointments: 3,420
- Pending Appointments: 28

### Doctor Dashboard
- Today's Appointments: 12
- Upcoming: 8
- Completed Today: 4
- Total Patients: 145

### Patient Dashboard
- Upcoming Appointments: 2
- Completed: 15
- Medical Reports: 8
- Prescriptions: 3

### Nurse Dashboard
- Assigned Patients: 12
- Vitals to Record: 8
- Medications Scheduled: 15
- Critical Alerts: 2

### Receptionist Dashboard
- Today's Appointments: 45
- Waiting Patients: 8
- Check-ins Today: 32
- New Registrations: 5

---

## 🔄 Next Steps After Testing

1. **Report Issues:** Document any bugs or unexpected behavior
2. **User Feedback:** Gather feedback from each user role
3. **API Integration:** Connect to backend endpoints (replace mock data)
4. **Real-time Updates:** Implement WebSocket connections
5. **Additional Dashboards:** Create dashboards for remaining roles

---

## 📝 Testing Log Template

Use this template to document your testing:

```
Date: ___________
Tester: ___________
Role Tested: ___________

Dashboard Loads: [ ] Yes [ ] No
Navigation Correct: [ ] Yes [ ] No
Data Displays: [ ] Yes [ ] No
Quick Actions Work: [ ] Yes [ ] No
Responsive Design: [ ] Yes [ ] No

Issues Found:
1. ___________
2. ___________
3. ___________

Screenshots: (Attach if needed)

Notes:
___________
```

---

## 🎯 Success Criteria

The implementation is successful if:

✅ Each role sees their appropriate dashboard  
✅ Navigation menu is filtered by role  
✅ All mock data displays correctly  
✅ Quick actions navigate properly  
✅ Responsive design works on all devices  
✅ No console errors  
✅ Smooth transitions and interactions  
✅ Professional appearance and UX  

---

## 🆘 Need Help?

1. **Check Documentation:**
   - `DASHBOARD_IMPLEMENTATION_SUMMARY.md` - Complete overview
   - `ROLE_BASED_DASHBOARDS.md` - Detailed documentation

2. **Review Code:**
   - `Dashboard.jsx` - Main routing logic
   - `Sidebar.jsx` - Navigation configuration
   - Individual dashboard components

3. **Browser DevTools:**
   - Console: Check for errors
   - Network: Verify API calls (when integrated)
   - Redux DevTools: Inspect state

4. **Contact Team:**
   - Frontend team for UI issues
   - Backend team for role/auth issues
   - DevOps for deployment questions

---

**Happy Testing! 🎉**

Last Updated: November 13, 2025

