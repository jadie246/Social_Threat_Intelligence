import React, { useState } from 'react';
import { analyzeContent, highlightKeywords } from '../services/threatAnalysis';
import { ThreatAnalysis } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  DocumentTextIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { format } from 'date-fns';

export function AnalysisView() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<'text' | 'image'>('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ThreatAnalysis[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeContent({
        content,
        contentType,
        userId: user.id,
      });
      
      setResults(prev => [result, ...prev]);
      
      // Create alert if high risk
      if (result.riskLevel === 'high') {
        // In a real app, this would trigger an alert
        console.log('High risk content detected - alert generated');
      }
      
      setContent('');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContent(`[Image uploaded: ${file.name}]`);
      setContentType('image');
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Content Analysis</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Content Type Selection */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setContentType('text')}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                contentType === 'text'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              )}
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Text</span>
            </button>
            <button
              type="button"
              onClick={() => setContentType('image')}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors',
                contentType === 'image'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              )}
            >
              <PhotoIcon className="h-5 w-5" />
              <span>Image</span>
            </button>
          </div>

          {/* Content Input */}
          {contentType === 'text' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter text content to analyze
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste or type content here..."
                className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload image for analysis
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2 text-gray-400 hover:text-gray-300"
                >
                  <PhotoIcon className="h-12 w-12" />
                  <span className="text-sm">Click to upload image</span>
                </label>
                {content && (
                  <p className="mt-2 text-sm text-gray-300">{content}</p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!content.trim() || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <ClockIcon className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>Analyze Content</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Analysis Results */}
      {results.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Analysis History</h3>
          
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium border',
                      getRiskColor(result.riskLevel)
                    )}>
                      {result.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-gray-400 text-sm">
                      {result.confidence}% confidence
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {format(result.timestamp, 'MMM dd, HH:mm')}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-white text-sm mb-2">Content:</p>
                  <div 
                    className="text-gray-300 text-sm bg-gray-800 p-3 rounded border"
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(result.content, result.keywords)
                    }}
                  />
                </div>

                {result.detectedThreats.length > 0 && (
                  <div className="mb-3">
                    <p className="text-white text-sm mb-2">Detected Threats:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.detectedThreats.map((threat) => (
                        <span
                          key={threat}
                          className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs border border-red-500/20"
                        >
                          {threat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.keywords.length > 0 && (
                  <div>
                    <p className="text-white text-sm mb-2">Flagged Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-500/20"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}