import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">
            Threat Intelligence Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-white text-sm font-medium">{user?.name}</span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-700' : ''
                    } flex items-center space-x-2 px-4 py-2 text-sm text-white w-full text-left`}
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-gray-700' : ''
                    } flex items-center space-x-2 px-4 py-2 text-sm text-white w-full text-left`}
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
}