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
  action: string;
  details: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
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