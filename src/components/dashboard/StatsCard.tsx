import React from 'react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-400',
    ring: 'ring-blue-500/20',
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-400',
    ring: 'ring-red-500/20',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-400',
    ring: 'ring-green-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-400',
    ring: 'ring-yellow-500/20',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-400',
    ring: 'ring-purple-500/20',
  },
};

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={clsx(
                  'text-xs font-medium px-2 py-1 rounded-full',
                  change.type === 'increase'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                )}
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-gray-500 text-xs ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={clsx('p-3 rounded-full', colors.bg, colors.ring, 'ring-4')}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}