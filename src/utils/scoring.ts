import { Project } from '../types';
import { calculateEnvironmentalScore } from './scoring/weightedScoring';
import { applyDiversificationRules } from './optimization/diversification';

export const optimizeProjects = (
  projects: Project[],
  budget: number
): Project[] => {
  // Calculate ESG scores
  const scoredProjects = projects.map(project => ({
    ...project,
    esgScore: calculateEnvironmentalScore(project)
  }));

  // Sort by ESG score per dollar invested
  const sortedProjects = [...scoredProjects].sort(
    (a, b) => ((b.esgScore || 0) / b.cost) - ((a.esgScore || 0) / a.cost)
  );

  // Initial selection based on budget
  let remainingBudget = budget;
  const selectedProjects = sortedProjects.map(project => {
    if (remainingBudget >= project.cost) {
      remainingBudget -= project.cost;
      return { ...project, selected: true };
    }
    return { ...project, selected: false };
  });

  // Apply diversification rules
  return applyDiversificationRules(selectedProjects);
};