import { Project } from '../../types';

interface DiversificationRules {
  minProjectsPerType: number;
  maxProjectsPerType: number;
}

const DEFAULT_RULES: DiversificationRules = {
  minProjectsPerType: 1,
  maxProjectsPerType: 2,
};

export const applyDiversificationRules = (
  projects: Project[],
  rules: DiversificationRules = DEFAULT_RULES
): Project[] => {
  const projectsByType = projects.reduce((acc, project) => {
    acc[project.type] = (acc[project.type] || []).concat(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Ensure minimum projects per type
  Object.entries(projectsByType).forEach(([type, typeProjects]) => {
    const selectedCount = typeProjects.filter(p => p.selected).length;
    if (selectedCount < rules.minProjectsPerType) {
      // Select top projects by ESG score
      const unselected = typeProjects
        .filter(p => !p.selected)
        .sort((a, b) => (b.esgScore || 0) - (a.esgScore || 0));
      
      for (let i = 0; i < rules.minProjectsPerType - selectedCount && i < unselected.length; i++) {
        unselected[i].selected = true;
      }
    }
  });

  return projects;
};