import { useState, useEffect } from 'react';
import { Project } from '../types';
import { ClimateDataService, ClimateMetrics } from '../services/data/ClimateDataService';
import { ESGDataService, ESGMetrics } from '../services/data/ESGDataService';

export interface RealTimeData {
  climate: ClimateMetrics;
  esg: ESGMetrics;
  lastUpdated: Date;
}

export const useRealTimeData = (project: Project) => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const climateService = ClimateDataService.getInstance();
        const esgService = ESGDataService.getInstance();

        const [climateMetrics, esgMetrics] = await Promise.all([
          climateService.fetchLatestData(),
          esgService.getProjectMetrics(project)
        ]);

        setData({
          climate: climateMetrics,
          esg: esgMetrics,
          lastUpdated: new Date()
        });
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [project.id]);

  return { data, loading, error };
};