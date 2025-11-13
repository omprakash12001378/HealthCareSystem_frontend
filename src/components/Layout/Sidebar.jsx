import React, { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UsersIcon,
  DocumentChartBarIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { logout } from '../../redux/slices/authSlice';

// Role-based navigation configuration
const getNavigationByRole = (userRoles) => {
  const baseNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['all'] },
  ];

  // Admin navigation
  const adminNavigation = [
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon, roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_RECEPTIONIST'] },
    { name: 'Doctors', href: '/doctors', icon: UserGroupIcon, roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_RECEPTIONIST'] },
    { name: 'Patients', href: '/patients', icon: UsersIcon, roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_RECEPTIONIST'] },
    { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon, roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_DOCTOR'] },
  ];

  // Doctor navigation
  const doctorNavigation = [
    { name: 'My Appointments', href: '/appointments', icon: CalendarIcon, roles: ['ROLE_DOCTOR'] },
    { name: 'My Patients', href: '/patients', icon: UsersIcon, roles: ['ROLE_DOCTOR'] },
    { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon, roles: ['ROLE_DOCTOR'] },
  ];

  // Nurse navigation
  const nurseNavigation = [
    { name: 'My Patients', href: '/patients', icon: UsersIcon, roles: ['ROLE_NURSE'] },
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon, roles: ['ROLE_NURSE'] },
  ];

  // Patient navigation
  const patientNavigation = [
    { name: 'My Appointments', href: '/appointments', icon: CalendarIcon, roles: ['ROLE_PATIENT'] },
    { name: 'Doctors', href: '/doctors', icon: UserGroupIcon, roles: ['ROLE_PATIENT'] },
    { name: 'My Reports', href: '/reports', icon: DocumentChartBarIcon, roles: ['ROLE_PATIENT'] },
  ];

  // Settings for all
  const settingsNavigation = [
    { name: 'Settings', href: '/profile', icon: Cog6ToothIcon, roles: ['all'] },
  ];

  // Combine all navigation items
  const allNavItems = [
    ...baseNavigation,
    ...adminNavigation,
    ...doctorNavigation,
    ...nurseNavigation,
    ...patientNavigation,
    ...settingsNavigation,
  ];

  // Filter navigation based on user roles
  if (!userRoles || userRoles.length === 0) {
    return baseNavigation.concat(patientNavigation).concat(settingsNavigation);
  }

  const roleNames = userRoles.map(r => r.name || r);

  return allNavItems.filter(item => {
    if (item.roles.includes('all')) return true;
    return item.roles.some(role => roleNames.includes(role));
  }).reduce((acc, current) => {
    // Remove duplicates based on href
    const exists = acc.find(item => item.href === current.href);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);
};

const navigation = getNavigationByRole;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const SidebarContent = () => {
    // Get navigation items based on user's roles
    const userNavigation = navigation(user?.roles || []);

    return (
    <div className="flex h-full flex-col bg-primary-800">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-primary-700 px-6">
        <h1 className="text-2xl font-bold text-white">HealthCare</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {userNavigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={classNames(
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white',
                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-all duration-150'
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive ? 'text-white' : 'text-primary-300 group-hover:text-white',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-primary-700 p-4">
        <div className="flex items-center gap-x-3 rounded-md bg-primary-700 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-semibold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-primary-300 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 w-full rounded-md bg-danger-600 px-3 py-2 text-sm font-semibold text-white hover:bg-danger-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )};


  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;

