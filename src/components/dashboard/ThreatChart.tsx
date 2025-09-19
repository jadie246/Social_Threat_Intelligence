import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ThreatChartProps {
  type: 'bar' | 'doughnut' | 'line';
  title: string;
  data: any;
}

export function ThreatChart({ type, title, data }: ThreatChartProps) {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
  };

  const chartOptions = {
    bar: {
      ...commonOptions,
      scales: {
        x: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
          },
        },
        y: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
          },
        },
      },
    },
    doughnut: {
      ...commonOptions,
      cutout: '60%',
    },
    line: {
      ...commonOptions,
      scales: {
        x: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
          },
        },
        y: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
          },
        },
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={chartOptions.bar} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions.doughnut} />;
      case 'line':
        return <Line data={data} options={chartOptions.line} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-80">
        {renderChart()}
      </div>
    </div>
  );
}