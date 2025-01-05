import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { optimizeProjects } from '../utils/scoring';
import { CircleDollarSign, PiggyBank } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
}

export const Dashboard: React.FC<DashboardProps> = ({ projects }) => {
  const [budget, setBudget] = useState(1000000);
  const [optimizedProjects, setOptimizedProjects] = useState<Project[]>([]);
  const [totalInvestment, setTotalInvestment] = useState(0);

  useEffect(() => {
    const result = optimizeProjects(projects, budget);
    setOptimizedProjects(result);
    setTotalInvestment(
      result.reduce((sum, p) => sum + (p.selected ? p.cost : 0), 0)
    );
  }, [budget, projects]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Green Finance Optimization Platform
        </h1>
        <p className="text-gray-600">
          Optimize your ESG investments based on impact and budget constraints
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <CircleDollarSign className="w-6 h-6 text-green-600" />
          <div className="flex-1">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Investment Budget
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              min="0"
              step="100000"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PiggyBank className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-lg font-semibold">${totalInvestment.toLocaleString()}</p>
          </div>
          <div className="ml-8">
            <p className="text-sm text-gray-600">Remaining Budget</p>
            <p className="text-lg font-semibold">${(budget - totalInvestment).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {optimizedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};