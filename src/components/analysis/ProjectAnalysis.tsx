import React from 'react';
import { Project } from '../../types';
import { BarChart, LineChart } from 'lucide-react';
import { ImpactMetric } from './ImpactMetric';

interface ProjectAnalysisProps {
  project: Project;
}

export const ProjectAnalysis: React.FC<ProjectAnalysisProps> = ({ project }) => {
  const impactMetrics = [
    { label: 'Carbon Reduction', value: project.carbonReduction, icon: BarChart },
    { label: 'Water Conservation', value: project.waterConservation, icon: LineChart },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
      
      <div className="space-y-4">
        {impactMetrics.map(({ label, value, icon }) => (
          <ImpactMetric
            key={label}
            label={label}
            value={value}
            Icon={icon}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Impact Report</h4>
        <p className="text-sm text-gray-600">{project.textReport}</p>
      </div>
    </div>
  );
};