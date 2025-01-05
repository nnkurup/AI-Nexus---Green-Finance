import { Project } from '../../types';

const ENVIRONMENTAL_WEIGHTS = {
  carbonReduction: 0.4,
  waterConservation: 0.3,
  textAnalysis: 0.3,
};

export const calculateEnvironmentalScore = (project: Project): number => {
  const structuredScore = 
    (project.carbonReduction * ENVIRONMENTAL_WEIGHTS.carbonReduction) +
    (project.waterConservation * ENVIRONMENTAL_WEIGHTS.waterConservation);
  
  const textScore = analyzeTextReport(project.textReport);
  
  return (
    structuredScore * (1 - ENVIRONMENTAL_WEIGHTS.textAnalysis) +
    textScore * ENVIRONMENTAL_WEIGHTS.textAnalysis
  );
};

const analyzeTextReport = (text: string): number => {
  const keywords = {
    positive: ['reduces', 'saves', 'efficient', 'renewable', 'sustainable'],
    negative: ['waste', 'emissions', 'pollution'],
  };
  
  const lowerText = text.toLowerCase();
  const positiveCount = keywords.positive.filter(word => lowerText.includes(word)).length;
  const negativeCount = keywords.negative.filter(word => lowerText.includes(word)).length;
  
  return (positiveCount / keywords.positive.length) * 0.7 +
         (1 - negativeCount / keywords.negative.length) * 0.3;
};