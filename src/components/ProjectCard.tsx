import React from 'react';
import { Project } from '../types';
import { Battery, Droplets } from 'lucide-react';
import { ProjectAnalysis } from './analysis/ProjectAnalysis';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showAnalysis, setShowAnalysis] = React.useState(false);

  return (
    <div className={`
      p-6 rounded-lg shadow-md transition-all
      ${project.selected ? 'bg-green-50 border-2 border-green-500' : 'bg-white'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
          {project.type}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-green-600" />
          <span className="text-sm">
            {(project.carbonReduction * 100).toFixed(0)}% reduction
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <span className="text-sm">
            {(project.waterConservation * 100).toFixed(0)}% saved
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <span className="font-semibold">
          ${project.cost.toLocaleString()}
        </span>
        {project.esgScore && (
          <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">
            ESG Score: {project.esgScore.toFixed(2)}
          </span>
        )}
      </div>

      <button
        onClick={() => setShowAnalysis(!showAnalysis)}
        className="mt-4 w-full py-2 text-sm text-green-600 hover:text-green-700 focus:outline-none"
      >
        {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
      </button>

      {showAnalysis && (
        <div className="mt-4">
          <ProjectAnalysis project={project} />
        </div>
      )}
    </div>
  );
};