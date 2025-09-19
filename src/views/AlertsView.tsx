import React, { useState } from 'react';
import { mockAlerts } from '../services/mockData';
import { Alert } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import {
  ExclamationTriangleIcon,
  FireIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BellSlashIcon,
} from '@heroicons/react/24/outline';

const severityConfig = {
  low: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: ExclamationTriangleIcon,
  },
  medium: {
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: ExclamationTriangleIcon,
  },
  high: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: FireIcon,
  },
  critical: {
    color: 'text-red-500',
    bg: 'bg-red-600/10',
    border: 'border-red-600/20',
    icon: ShieldExclamationIcon,
  },
};

export function AlertsView() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unacknowledged' | 'acknowledged'>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleBulkAcknowledge = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'acknowledged' && !alert.acknowledged) return false;
    if (filter === 'unacknowledged' && alert.acknowledged) return false;
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
    if (searchTerm && !alert.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alert Management</h1>
          <p className="text-gray-400 mt-1">
            Monitor and manage security alerts ({unacknowledgedCount} unacknowledged)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBulkAcknowledge}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
          >
            <CheckCircleIcon className="h-4 w-4" />
            <span>Acknowledge All</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            <option value="all">All Alerts</option>
            <option value="unacknowledged">Unacknowledged</option>
            <option value="acknowledged">Acknowledged</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            <option value="all">All Types</option>
            <option value="violence">Violence</option>
            <option value="extremism">Extremism</option>
            <option value="suicide">Suicide</option>
            <option value="terrorism">Terrorism</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Alerts ({filteredAlerts.length})
            </h2>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Filtered Results</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <BellSlashIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No alerts match your current filters</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  className={clsx(
                    'p-6 hover:bg-gray-700/50 transition-colors',
                    alert.acknowledged ? 'opacity-60' : ''
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={clsx('p-2 rounded-lg', config.bg, config.border, 'border')}>
                        <Icon className={clsx('h-5 w-5', config.color)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={clsx(
                            'px-2 py-1 rounded-full text-xs font-medium uppercase',
                            config.color,
                            config.bg
                          )}>
                            {alert.severity}
                          </span>
                          <span className="text-gray-400 text-sm capitalize">
                            {alert.type}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {format(alert.timestamp, 'MMM dd, yyyy HH:mm')}
                          </span>
                          {alert.acknowledged && (
                            <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                              Acknowledged
                            </span>
                          )}
                        </div>
                        <p className="text-white font-medium mb-2">{alert.message}</p>
                        <p className="text-gray-400 text-sm">
                          Analysis ID: {alert.analysisId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!alert.acknowledged ? (
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium flex items-center space-x-1"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>Acknowledge</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-1 text-green-400">
                          <CheckCircleIcon className="h-4 w-4" />
                          <span className="text-sm">Acknowledged</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}