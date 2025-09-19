import React, { useState } from 'react';
import { mockReports } from '../services/mockData';
import { Report } from '../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import {
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  CpuChipIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  PlusIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const reportTypeConfig = {
  'threat-summary': {
    icon: ChartBarIcon,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    label: 'Threat Summary',
  },
  'user-activity': {
    icon: UserGroupIcon,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    label: 'User Activity',
  },
  'system-health': {
    icon: CpuChipIcon,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    label: 'System Health',
  },
  'custom': {
    icon: DocumentTextIcon,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    label: 'Custom Report',
  },
};

export function ReportsView() {
  const [reports] = useState<Report[]>(mockReports);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleDownload = (report: Report) => {
    // Simulate download
    const blob = new Blob([JSON.stringify(report.data, null, 2)], {
      type: report.format === 'pdf' ? 'application/pdf' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}.${report.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = (type: string) => {
    // Simulate report generation
    console.log('Generating report of type:', type);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">
            Generate and download comprehensive reports
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-gray-400 text-sm">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <ArrowDownTrayIcon className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-gray-400 text-sm">Downloads</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">7</p>
              <p className="text-gray-400 text-sm">This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-gray-400 text-sm">Scheduled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-700">
          {reports.map((report) => {
            const config = reportTypeConfig[report.type];
            const Icon = config.icon;

            return (
              <div key={report.id} className="p-6 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={clsx('p-3 rounded-lg', config.bg)}>
                      <Icon className={clsx('h-6 w-6', config.color)} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{report.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={clsx('text-xs px-2 py-1 rounded-full', config.bg, config.color)}>
                          {config.label}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {format(report.dateRange.start, 'MMM dd')} - {format(report.dateRange.end, 'MMM dd, yyyy')}
                        </span>
                        <span className="text-gray-400 text-sm">
                          by {report.generatedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                      title="View Report"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(report)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      <span>{report.format.toUpperCase()}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Generate New Report</h3>
            <div className="space-y-3">
              {Object.entries(reportTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={type}
                    onClick={() => handleGenerateReport(type)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    <div className={clsx('p-2 rounded-lg', config.bg)}>
                      <Icon className={clsx('h-5 w-5', config.color)} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">{config.label}</p>
                      <p className="text-gray-400 text-sm">
                        {type === 'threat-summary' && 'Comprehensive threat analysis and statistics'}
                        {type === 'user-activity' && 'User engagement and behavior patterns'}
                        {type === 'system-health' && 'System performance and health metrics'}
                        {type === 'custom' && 'Create a custom report with specific parameters'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedReport.title}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{reportTypeConfig[selectedReport.type].label}</span>
                </div>
                <div>
                  <span className="text-gray-400">Generated:</span>
                  <span className="text-white ml-2">{format(selectedReport.generatedAt, 'MMM dd, yyyy HH:mm')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Period:</span>
                  <span className="text-white ml-2">
                    {format(selectedReport.dateRange.start, 'MMM dd')} - {format(selectedReport.dateRange.end, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white ml-2">{selectedReport.format.toUpperCase()}</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Report Data Preview</h4>
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  {JSON.stringify(selectedReport.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}