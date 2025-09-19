import { ThreatAnalysis } from '../types';

interface AnalysisRequest {
  content: string;
  contentType: 'text' | 'image';
  userId: string;
}

const highRiskKeywords = [
  'kill', 'murder', 'bomb', 'explosive', 'weapon', 'gun', 'knife', 'attack',
  'terrorist', 'terrorism', 'jihad', 'extremist', 'radical',
  'suicide', 'end my life', 'kill myself', 'don\'t want to live',
  'hate', 'destroy', 'revenge', 'hurt', 'harm', 'violence'
];

const mediumRiskKeywords = [
  'angry', 'frustrated', 'planning', 'government', 'corrupt', 'system',
  'cause', 'revolution', 'fight', 'struggle', 'meaningless', 'hopeless',
  'depressed', 'sad', 'alone', 'nobody cares'
];

export async function analyzeContent(request: AnalysisRequest): Promise<ThreatAnalysis> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const content = request.content.toLowerCase();
  const detectedThreats: string[] = [];
  const keywords: string[] = [];
  
  let riskScore = 0;
  let confidence = 0;

  // Analyze for high-risk keywords
  highRiskKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      keywords.push(keyword);
      riskScore += 30;
      confidence += 15;
    }
  });

  // Analyze for medium-risk keywords
  mediumRiskKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      keywords.push(keyword);
      riskScore += 15;
      confidence += 8;
    }
  });

  // Determine threat types based on keywords
  if (keywords.some(k => ['kill', 'murder', 'attack', 'hurt', 'harm', 'violence', 'weapon', 'gun', 'knife'].includes(k))) {
    detectedThreats.push('violence');
  }
  if (keywords.some(k => ['bomb', 'terrorist', 'terrorism', 'jihad', 'explosive'].includes(k))) {
    detectedThreats.push('terrorism');
  }
  if (keywords.some(k => ['suicide', 'end my life', 'kill myself', 'don\'t want to live'].includes(k))) {
    detectedThreats.push('suicide');
  }
  if (keywords.some(k => ['extremist', 'radical', 'revolution', 'cause', 'corrupt', 'system'].includes(k))) {
    detectedThreats.push('extremism');
  }

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (riskScore >= 60) {
    riskLevel = 'high';
  } else if (riskScore >= 25) {
    riskLevel = 'medium';
  }

  // Ensure confidence doesn't exceed 100%
  confidence = Math.min(confidence + Math.random() * 20, 100);

  // For images, simulate basic analysis
  if (request.contentType === 'image') {
    riskScore += Math.random() * 40;
    confidence = Math.random() * 100;
    
    if (Math.random() > 0.7) {
      detectedThreats.push('violence');
      keywords.push('weapon detected', 'suspicious object');
    }
  }

  return {
    id: Date.now().toString(),
    userId: request.userId,
    content: request.content,
    contentType: request.contentType,
    riskLevel,
    confidence: Math.round(confidence),
    detectedThreats,
    keywords,
    timestamp: new Date(),
    processed: true,
  };
}

export function highlightKeywords(text: string, keywords: string[]): string {
  if (keywords.length === 0) return text;

  let highlightedText = text;
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlightedText = highlightedText.replace(
      regex,
      `<mark class="bg-red-500/20 text-red-300 px-1 rounded">$&</mark>`
    );
  });

  return highlightedText;
}