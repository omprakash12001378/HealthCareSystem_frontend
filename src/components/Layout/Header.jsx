import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import NotificationBell from '../NotificationBell';

const Header = ({ setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, {user?.firstName}!
          </h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notification Bell */}
          <NotificationBell />

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* Profile badge */}
          <div className="flex items-center gap-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-semibold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.roles?.[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

