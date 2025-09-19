import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockLogs, mockSettings } from '../services/mockData';
import { SystemSettings } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import {
  UserGroupIcon,
  CogIcon,
  DocumentTextIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
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
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  const filteredLogs = mockLogs.filter(log => {
    if (logFilter !== 'all' && log.level !== logFilter) return false;
    if (searchTerm && !log.action.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !log.details.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSettingsChange = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleUserAction = (userId: string, action: 'edit' | 'delete' | 'activate' | 'deactivate') => {
    console.log(`${action} user:`, userId);
    if (action === 'edit') {
      const user = mockUsers.find(u => u.id === userId);
      setSelectedUser(user);
      setShowUserModal(true);
    }
  };

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
              <button 
                onClick={() => setShowUserModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add New User
              </button>
            </div>

            {/* User Search and Filters */}
            <div className="mb-6 flex items-center space-x-4">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="analyst">Analyst</option>
                <option value="user">User</option>
              </select>
              <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
                          <button 
                            onClick={() => handleUserAction(user.id, 'edit')}
                            className="text-blue-400 hover:text-blue-300 p-1"
                            title="Edit User"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          {user.status === 'active' ? (
                            <button 
                              onClick={() => handleUserAction(user.id, 'deactivate')}
                              className="text-yellow-400 hover:text-yellow-300 p-1"
                              title="Deactivate User"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleUserAction(user.id, 'activate')}
                              className="text-green-400 hover:text-green-300 p-1"
                              title="Activate User"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete User"
                          >
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">System Logs</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={logFilter}
                  onChange={(e) => setLogFilter(e.target.value as any)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredLogs.map((log) => (
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
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{log.userName}</span>
                      <span>{format(log.timestamp, 'MMM dd, HH:mm:ss')}</span>
                    </div>
                  </div>
                  <p className="text-white font-medium text-sm">{log.action}</p>
                  <p className="text-gray-300 text-sm mt-1">{log.details}</p>
                  {log.ipAddress && (
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>IP: {log.ipAddress}</span>
                      {log.userAgent && (
                        <span className="truncate max-w-xs">UA: {log.userAgent}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">System Settings</h2>
            
            <div className="space-y-6">
              {/* AI Settings */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">AI Model Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Threat Detection Sensitivity
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={settings.ai.threatSensitivity}
                      onChange={(e) => handleSettingsChange('ai', 'threatSensitivity', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Low (1)</span>
                      <span className="text-white">{settings.ai.threatSensitivity}</span>
                      <span>High (10)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confidence Threshold (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.ai.confidenceThreshold}
                      onChange={(e) => handleSettingsChange('ai', 'confidenceThreshold', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.ai.autoAlertGeneration}
                        onChange={(e) => handleSettingsChange('ai', 'autoAlertGeneration', e.target.checked)}
                        className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-300 text-sm">
                        Automatically generate alerts for high-risk content
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Alert Settings */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Alert Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={settings.alerts.emailNotifications}
                        onChange={(e) => handleSettingsChange('alerts', 'emailNotifications', e.target.checked)}
                        className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-300 text-sm">Email Notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.alerts.smsNotifications}
                        onChange={(e) => handleSettingsChange('alerts', 'smsNotifications', e.target.checked)}
                        className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-300 text-sm">SMS Notifications</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Alert Retention (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={settings.alerts.retentionDays}
                      onChange={(e) => handleSettingsChange('alerts', 'retentionDays', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Webhook URL (optional)
                    </label>
                    <input
                      type="url"
                      value={settings.alerts.webhookUrl || ''}
                      onChange={(e) => handleSettingsChange('alerts', 'webhookUrl', e.target.value)}
                      placeholder="https://api.example.com/webhooks/alerts"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Security Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="480"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingsChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => handleSettingsChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.security.requireTwoFactor}
                        onChange={(e) => handleSettingsChange('security', 'requireTwoFactor', e.target.checked)}
                        className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-300 text-sm">
                        Require Two-Factor Authentication
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => console.log('Settings saved:', settings)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ''}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  defaultValue={selectedUser?.role || 'user'}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="user">User</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUserModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  {selectedUser ? 'Update' : 'Create'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}