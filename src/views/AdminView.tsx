import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockLogs } from '../services/mockData';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import {
  UserGroupIcon,
  CogIcon,
  DocumentTextIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

const mockUsers = [
  {
    id: '1',
    email: 'admin@threat-intel.com',
    name: 'System Administrator',
    role: 'admin',
    status: 'active',
    lastLogin: new Date('2025-01-15T08:00:00'),
    analyses: 45,
  },
  {
    id: '2',
    email: 'analyst@threat-intel.com',
    name: 'Security Analyst',
    role: 'analyst',
    status: 'active',
    lastLogin: new Date('2025-01-15T07:30:00'),
    analyses: 78,
  },
  {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    status: 'active',
    lastLogin: new Date('2025-01-14T16:45:00'),
    analyses: 12,
  },
  {
    id: '4',
    email: 'inactive@example.com',
    name: 'Inactive User',
    role: 'user',
    status: 'inactive',
    lastLogin: new Date('2025-01-10T10:00:00'),
    analyses: 3,
  },
];

export function AdminView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'logs' | 'settings'>('users');

  if (user?.role !== 'admin') {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
        <p className="text-red-400">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'users', label: 'User Management', icon: UserGroupIcon },
    { id: 'logs', label: 'System Logs', icon: DocumentTextIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-gray-800 rounded-xl p-1 border border-gray-700">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">User Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Add New User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-300">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Analyses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={clsx(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          user.role === 'admin'
                            ? 'bg-purple-500/10 text-purple-400'
                            : user.role === 'analyst'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-gray-500/10 text-gray-400'
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={clsx(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          user.status === 'active'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {format(user.lastLogin, 'MMM dd, HH:mm')}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {user.analyses}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 p-1">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300 p-1">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">System Logs</h2>
            
            <div className="space-y-3">
              {mockLogs.map((log) => (
                <div
                  key={log.id}
                  className={clsx(
                    'p-4 rounded-lg border',
                    log.level === 'error'
                      ? 'bg-red-500/10 border-red-500/20'
                      : log.level === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-blue-500/10 border-blue-500/20'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={clsx(
                      'text-xs font-medium px-2 py-1 rounded-full',
                      log.level === 'error'
                        ? 'bg-red-500/20 text-red-400'
                        : log.level === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    )}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {format(log.timestamp, 'MMM dd, HH:mm:ss')}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm">{log.action}</p>
                  <p className="text-gray-300 text-sm mt-1">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">AI Model Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Threat Detection Sensitivity
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="7"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confidence Threshold
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum confidence level for alerts (0-100%)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Auto-Alert Generation
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                  />
                  <span className="ml-2 text-gray-300 text-sm">
                    Automatically generate alerts for high-risk content
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}