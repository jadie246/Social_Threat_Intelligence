import React from 'react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ThreatChart } from '../components/dashboard/ThreatChart';
import { AlertsList } from '../components/dashboard/AlertsList';
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import {
  mockDashboardStats,
  mockAlerts,
  riskDistributionData,
  threatTypesData,
  timelineData,
} from '../services/mockData';

interface DashboardViewProps {
  onAcknowledgeAlert: (alertId: string) => void;
}

export function DashboardView({ onAcknowledgeAlert }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Analyses"
          value={mockDashboardStats.totalAnalyses}
          change={{ value: 12, type: 'increase' }}
          icon={ChartBarIcon}
          color="blue"
        />
        <StatsCard
          title="High Risk Detected"
          value={mockDashboardStats.highRiskDetected}
          change={{ value: 8, type: 'decrease' }}
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatsCard
          title="Active Users"
          value={mockDashboardStats.activeUsers}
          change={{ value: 5, type: 'increase' }}
          icon={UserGroupIcon}
          color="green"
        />
        <StatsCard
          title="Alerts Today"
          value={mockDashboardStats.alertsToday}
          icon={ShieldExclamationIcon}
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatChart
          type="doughnut"
          title="Risk Level Distribution"
          data={riskDistributionData}
        />
        <ThreatChart
          type="bar"
          title="Threat Types Detected"
          data={threatTypesData}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <div className="lg:col-span-2">
          <ThreatChart
            type="line"
            title="Threat Detection Timeline"
            data={timelineData}
          />
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-1">
          <AlertsList
            alerts={mockAlerts}
            onAcknowledge={onAcknowledgeAlert}
          />
        </div>
      </div>
    </div>
  );
}