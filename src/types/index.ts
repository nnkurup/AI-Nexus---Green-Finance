export interface Project {
  id: string;
  name: string;
  description: string;
  cost: number;
  carbonReduction: number;
  waterConservation: number;
  type: 'solar' | 'wind' | 'green-building';
  textReport: string;
  esgScore?: number;
  selected?: boolean;
}

export interface ProjectScores {
  [key: string]: number;
}