# Role-Based Dashboard - Developer Quick Reference

## 📁 File Locations

```
frontend/src/
├── pages/Dashboard/
│   ├── Dashboard.jsx              # Main router (USE THIS)
│   ├── AdminDashboard.jsx         # Admin & Super Admin
│   ├── DoctorDashboard.jsx        # Doctors
│   ├── PatientDashboard.jsx       # Patients
│   ├── NurseDashboard.jsx         # Nurses
│   ├── ReceptionistDashboard.jsx  # Receptionists
│   └── index.js                   # Exports
│
└── components/Layout/
    └── Sidebar.jsx                # Role-based navigation

Documentation/
├── DASHBOARD_IMPLEMENTATION_SUMMARY.md  # Complete overview
├── ROLE_BASED_DASHBOARDS.md            # Detailed docs
├── TESTING_GUIDE.md                     # Testing guide
└── AWS_DEPLOYMENT_PLAN.md              # AWS deployment
```

## 🎭 Role Mapping

| Backend Role | Frontend Dashboard | Priority |
|--------------|-------------------|----------|
| `ROLE_SUPER_ADMIN` | AdminDashboard | 1 |
| `ROLE_ADMIN` | AdminDashboard | 2 |
| `ROLE_DOCTOR` | DoctorDashboard | 3 |
| `ROLE_NURSE` | NurseDashboard | 4 |
| `ROLE_RECEPTIONIST` | ReceptionistDashboard | 5 |
| `ROLE_PATIENT` | PatientDashboard | 6 |
| Others | PatientDashboard | 7 |

## 🔑 Key Code Snippets

### Get User Role
```javascript
const { user } = useSelector((state) => state.auth);
const userRole = user?.roles?.[0]?.name || 'ROLE_PATIENT';
```

### Check User Has Role
```javascript
const hasRole = (role) => {
  return user?.roles?.some(r => r.name === role || r === role);
};

// Usage
if (hasRole('ROLE_ADMIN')) {
  // Show admin features
}
```

### Add New Dashboard

1. **Create Component:**
```javascript
// src/pages/Dashboard/PharmacistDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const PharmacistDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="space-y-6">
      <h1>Pharmacist Dashboard</h1>
      {/* Your content */}
    </div>
  );
};

export default PharmacistDashboard;
```

2. **Update Router:**
```javascript
// Dashboard.jsx
import PharmacistDashboard from './PharmacistDashboard';

// Add to switch statement
case 'ROLE_PHARMACIST':
  return <PharmacistDashboard />;
```

3. **Update Navigation:**
```javascript
// Sidebar.jsx - Add to navigation config
const pharmacistNavigation = [
  { name: 'Prescriptions', href: '/prescriptions', icon: Icon, roles: ['ROLE_PHARMACIST'] },
  // ... more items
];
```

## 📊 Mock Data Pattern

```javascript
const [stats, setStats] = useState({
  stat1: 0,
  stat2: 0,
});

useEffect(() => {
  // TODO: Replace with API call
  setStats({
    stat1: 100,
    stat2: 200,
  });
}, []);
```

## 🔌 API Integration Pattern

```javascript
import { api } from '../../services/api';

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/role/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
      toast.error('Failed to load dashboard');
    }
  };
  
  fetchDashboardData();
}, []);
```

## 🎨 Common Components

### Stat Card
```jsx
<div className="bg-white overflow-hidden shadow rounded-lg">
  <div className="p-5">
    <div className="flex items-center">
      <div className="flex-shrink-0 rounded-md p-3 bg-blue-500">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">
            Label
          </dt>
          <dd className="text-2xl font-semibold text-gray-900">
            {value}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</div>
```

### Quick Action Button
```jsx
<Link
  to="/path"
  className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
>
  Action Text
</Link>
```

### Status Badge
```jsx
const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
  {status}
</span>
```

## 🧭 Navigation Configuration

```javascript
// Sidebar.jsx
const navigationConfig = {
  baseNavigation: [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['all'] },
  ],
  
  adminNav: [
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon, roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] },
    // ... more
  ],
  
  // Combine based on role
};
```

## 📱 Responsive Grid Classes

```jsx
// 1 column on mobile, 2 on tablet, 4 on desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"

// 1 column on mobile, 2 on desktop
className="grid grid-cols-1 lg:grid-cols-2 gap-6"

// 1 column on mobile, 3 columns on desktop  
className="grid grid-cols-1 lg:grid-cols-3 gap-6"
```

## 🎨 Color Palette

```javascript
// Primary colors
bg-blue-500, bg-blue-600, bg-blue-700      // Blue
bg-green-500, bg-green-600, bg-green-700   // Green
bg-purple-500, bg-purple-600, bg-purple-700 // Purple
bg-yellow-500, bg-yellow-600, bg-yellow-700 // Yellow
bg-red-500, bg-red-600, bg-red-700         // Red

// Status colors
bg-green-100 text-green-800   // Success/Completed
bg-yellow-100 text-yellow-800 // Warning/Pending
bg-red-100 text-red-800       // Error/Cancelled
bg-blue-100 text-blue-800     // Info/Scheduled
```

## 🔍 Debugging Tips

### Check User Object
```javascript
console.log('User:', user);
console.log('Roles:', user?.roles);
```

### Check Redux State
```javascript
// Use Redux DevTools browser extension
// Or log manually:
const state = store.getState();
console.log('Auth State:', state.auth);
```

### Test Role Detection
```javascript
const getUserRole = () => {
  console.log('User roles:', user?.roles);
  // ... role detection logic
  console.log('Selected role:', selectedRole);
  return selectedRole;
};
```

## 📊 Chart Configuration (Recharts)

### Line Chart
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

### Pie Chart
```jsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

## ⚠️ Common Pitfalls

1. **Role Name Mismatch:**
   - Backend: `ROLE_DOCTOR`
   - Frontend: `ROLE_DOCTOR` ✅ (must match exactly)
   - Frontend: `doctor` ❌ (wrong)

2. **Missing Roles Array:**
   ```javascript
   // Wrong
   const role = user.role;
   
   // Correct
   const role = user?.roles?.[0]?.name;
   ```

3. **Hardcoded Navigation:**
   ```javascript
   // Wrong - shows to everyone
   const navigation = [{ name: 'Admin Panel', ... }];
   
   // Correct - filtered by role
   const navigation = getNavigationByRole(user.roles);
   ```

4. **Forgetting Loading States:**
   ```javascript
   // Add loading state
   const [loading, setLoading] = useState(true);
   
   if (loading) return <LoadingSpinner />;
   ```

## 🚀 Performance Tips

1. **Lazy Load Charts:**
   ```javascript
   const LineChart = lazy(() => import('recharts').then(m => ({ default: m.LineChart })));
   ```

2. **Memoize Expensive Calculations:**
   ```javascript
   const filteredData = useMemo(() => {
     return data.filter(/* ... */);
   }, [data]);
   ```

3. **Debounce Search:**
   ```javascript
   const debouncedSearch = useCallback(
     debounce((value) => performSearch(value), 300),
     []
   );
   ```

## 📝 Code Standards

- Use **functional components** with hooks
- Use **Tailwind CSS** for styling
- Use **Heroicons** for icons
- Follow **existing patterns** in codebase
- Add **TODO comments** for API integration points
- Use **meaningful variable names**
- Keep components **under 400 lines**
- Extract **reusable components**

## 🔗 Useful Links

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [React Hooks](https://react.dev/reference/react)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 📞 Need Help?

1. Check `ROLE_BASED_DASHBOARDS.md` for detailed docs
2. Check `TESTING_GUIDE.md` for testing scenarios
3. Review existing dashboard components
4. Ask team in Slack/Teams
5. Create issue in project tracker

---

**Quick Reference v1.0** | Last Updated: Nov 13, 2025

