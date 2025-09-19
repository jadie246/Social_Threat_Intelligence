import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['admin', 'analyst', 'user'] },
    { id: 'analysis', label: 'Content Analysis', icon: DocumentMagnifyingGlassIcon, roles: ['admin', 'analyst', 'user'] },
    { id: 'alerts', label: 'Alerts', icon: ExclamationTriangleIcon, roles: ['admin', 'analyst'] },
    { id: 'reports', label: 'Reports', icon: ChartBarIcon, roles: ['admin', 'analyst'] },
    { id: 'users', label: 'User Management', icon: UserGroupIcon, roles: ['admin'] },
    { id: 'logs', label: 'System Logs', icon: ShieldExclamationIcon, roles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, roles: ['admin'] },
  ];

  const visibleItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="bg-gray-900 w-64 h-full border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <ShieldExclamationIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ThreatWatch</h1>
            <p className="text-xs text-gray-400">Intelligence Platform</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={clsx(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        {user && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}