import React from 'react';
import { Alert } from '../../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import {
  ExclamationTriangleIcon,
  FireIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface AlertsListProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

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

export function AlertsList({ alerts, onAcknowledge }: AlertsListProps) {
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
        <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
          {unacknowledgedAlerts.length} unacknowledged
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No alerts to display</p>
        ) : (
          alerts.slice(0, 10).map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={clsx(
                  'p-4 rounded-lg border',
                  config.bg,
                  config.border,
                  alert.acknowledged ? 'opacity-60' : ''
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={clsx('h-5 w-5 mt-0.5', config.color)} />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={clsx('text-xs font-medium uppercase', config.color)}>
                          {alert.severity}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {format(alert.timestamp, 'MMM dd, HH:mm')}
                        </span>
                        <span className="text-gray-400 text-xs capitalize">
                          {alert.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button
                      onClick={() => onAcknowledge(alert.id)}
                      className="text-gray-400 hover:text-white p-1 rounded"
                      title="Acknowledge alert"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}