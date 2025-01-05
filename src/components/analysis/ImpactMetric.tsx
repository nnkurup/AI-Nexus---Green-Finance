import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ImpactMetricProps {
  label: string;
  value: number;
  Icon: LucideIcon;
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({ label, value, Icon }) => (
  <div className="flex items-center gap-4">
    <Icon className="w-5 h-5 text-green-600" />
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 rounded-full h-2"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  </div>
);