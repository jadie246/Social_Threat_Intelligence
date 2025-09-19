export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'user';
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface ThreatAnalysis {
  id: string;
  userId: string;
  content: string;
  contentType: 'text' | 'image';
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  detectedThreats: string[];
  keywords: string[];
  timestamp: Date;
  processed: boolean;
}

export interface Alert {
  id: string;
  analysisId: string;
  type: 'violence' | 'extremism' | 'suicide' | 'terrorism';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface SystemLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  ipAddress?: string;
  userAgent?: string;
}

export interface DashboardStats {
  totalAnalyses: number;
  highRiskDetected: number;
  activeUsers: number;
  alertsToday: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  threatTypes: {
    violence: number;
    extremism: number;
    suicide: number;
    terrorism: number;
  };
}

export interface Report {
  id: string;
  title: string;
  type: 'threat-summary' | 'user-activity' | 'system-health' | 'custom';
  dateRange: {
    start: Date;
    end: Date;
  };
  generatedBy: string;
  generatedAt: Date;
  data: any;
  format: 'pdf' | 'csv' | 'json';
}

export interface SystemSettings {
  ai: {
    threatSensitivity: number;
    confidenceThreshold: number;
    autoAlertGeneration: boolean;
    modelVersion: string;
  };
  alerts: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    webhookUrl?: string;
    retentionDays: number;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    requireTwoFactor: boolean;
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      requireUppercase: boolean;
    };
  };
  system: {
    logLevel: 'debug' | 'info' | 'warning' | 'error';
    dataRetentionDays: number;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    maintenanceMode: boolean;
  };
}