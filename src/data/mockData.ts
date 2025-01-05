import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Solar Plant Alpha',
    description: 'Large-scale solar installation in desert region',
    cost: 500000,
    carbonReduction: 0.85,
    waterConservation: 0.7,
    type: 'solar',
    textReport: 'This project reduces carbon emissions by 80% and saves significant water.'
  },
  {
    id: '2',
    name: 'Coastal Wind Farm',
    description: 'Offshore wind energy installation',
    cost: 750000,
    carbonReduction: 0.9,
    waterConservation: 0.6,
    type: 'wind',
    textReport: 'Wind energy reduces reliance on fossil fuels and lowers emissions.'
  },
  {
    id: '3',
    name: 'Eco Office Complex',
    description: 'LEED-certified commercial building',
    cost: 400000,
    carbonReduction: 0.6,
    waterConservation: 0.8,
    type: 'green-building',
    textReport: 'Eco-friendly construction reduces energy usage and promotes recycling.'
  }
];