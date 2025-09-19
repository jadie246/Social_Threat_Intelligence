import { ThreatAnalysis, Alert, SystemLog, DashboardStats } from '../types';

// Mock data for demonstration
export const mockAnalyses: ThreatAnalysis[] = [
  {
    id: '1',
    userId: '1',
    content: 'I hate everyone and want to hurt them all',
    contentType: 'text',
    riskLevel: 'high',
    confidence: 95,
    detectedThreats: ['violence', 'hatred'],
    keywords: ['hate', 'hurt'],
    timestamp: new Date('2025-01-15T10:30:00'),
    processed: true,
  },
  {
    id: '2',
    userId: '2',
    content: 'Planning something big for the government building',
    contentType: 'text',
    riskLevel: 'high',
    confidence: 88,
    detectedThreats: ['terrorism', 'threat'],
    keywords: ['planning', 'government', 'building'],
    timestamp: new Date('2025-01-15T09:15:00'),
    processed: true,
  },
  {
    id: '3',
    userId: '3',
    content: 'I cannot take it anymore, life is meaningless',
    contentType: 'text',
    riskLevel: 'medium',
    confidence: 76,
    detectedThreats: ['suicide', 'depression'],
    keywords: ['cannot take', 'meaningless'],
    timestamp: new Date('2025-01-15T08:45:00'),
    processed: true,
  },
  {
    id: '4',
    userId: '1',
    content: 'Join our cause against the corrupt system',
    contentType: 'text',
    riskLevel: 'medium',
    confidence: 65,
    detectedThreats: ['extremism'],
    keywords: ['cause', 'corrupt', 'system'],
    timestamp: new Date('2025-01-14T16:20:00'),
    processed: true,
  },
  {
    id: '5',
    userId: '2',
    content: 'Having a great day with friends!',
    contentType: 'text',
    riskLevel: 'low',
    confidence: 12,
    detectedThreats: [],
    keywords: [],
    timestamp: new Date('2025-01-14T14:10:00'),
    processed: true,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    analysisId: '1',
    type: 'violence',
    severity: 'high',
    message: 'High-risk violent content detected in user communication',
    timestamp: new Date('2025-01-15T10:31:00'),
    acknowledged: false,
  },
  {
    id: '2',
    analysisId: '2',
    type: 'terrorism',
    severity: 'critical',
    message: 'Potential terrorist threat identified - immediate review required',
    timestamp: new Date('2025-01-15T09:16:00'),
    acknowledged: false,
  },
  {
    id: '3',
    analysisId: '3',
    type: 'suicide',
    severity: 'medium',
    message: 'Suicide risk indicators found in content analysis',
    timestamp: new Date('2025-01-15T08:46:00'),
    acknowledged: false,
  },
  {
    id: '4',
    analysisId: '4',
    type: 'extremism',
    severity: 'medium',
    message: 'Extremist language patterns detected',
    timestamp: new Date('2025-01-14T16:21:00'),
    acknowledged: true,
  },
];

export const mockLogs: SystemLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'Content Analysis',
    details: 'Analyzed text content with high-risk classification',
    timestamp: new Date('2025-01-15T10:30:00'),
    level: 'warning',
  },
  {
    id: '2',
    userId: '1',
    action: 'User Login',
    details: 'Successful admin login from IP 192.168.1.100',
    timestamp: new Date('2025-01-15T08:00:00'),
    level: 'info',
  },
  {
    id: '3',
    userId: '2',
    action: 'Alert Generated',
    details: 'Critical threat alert created for analysis ID 2',
    timestamp: new Date('2025-01-15T09:16:00'),
    level: 'error',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalAnalyses: 156,
  highRiskDetected: 23,
  activeUsers: 42,
  alertsToday: 8,
  riskDistribution: {
    low: 89,
    medium: 44,
    high: 23,
  },
  threatTypes: {
    violence: 12,
    extremism: 8,
    suicide: 5,
    terrorism: 3,
  },
};

// Chart data
export const riskDistributionData = {
  labels: ['Low Risk', 'Medium Risk', 'High Risk'],
  datasets: [
    {
      data: [
        mockDashboardStats.riskDistribution.low,
        mockDashboardStats.riskDistribution.medium,
        mockDashboardStats.riskDistribution.high,
      ],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderColor: ['#059669', '#D97706', '#DC2626'],
      borderWidth: 2,
    },
  ],
};

export const threatTypesData = {
  labels: ['Violence', 'Extremism', 'Suicide', 'Terrorism'],
  datasets: [
    {
      label: 'Detected Threats',
      data: [
        mockDashboardStats.threatTypes.violence,
        mockDashboardStats.threatTypes.extremism,
        mockDashboardStats.threatTypes.suicide,
        mockDashboardStats.threatTypes.terrorism,
      ],
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
      borderWidth: 1,
    },
  ],
};

export const timelineData = {
  labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
  datasets: [
    {
      label: 'High Risk Detections',
      data: [2, 5, 3, 8, 4, 6],
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Medium Risk Detections',
      data: [8, 12, 6, 15, 10, 14],
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4,
    },
  ],
};