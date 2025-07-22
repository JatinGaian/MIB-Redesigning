import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchActiveSprints } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useActiveSprints = () => {
  const setSprints = useApiDataStore((state) => state.setSprints);

  const query = useQuery({
    queryKey: ['active-sprints'],
    queryFn: fetchActiveSprints,
  });

  // Handle successful data fetch and store in Zustand
  useEffect(() => {
    if (query.data && query.isSuccess) {
      console.log(' Active Sprints fetched:', query.data);
      setSprints(query.data); //  Store in Zustand
    }
  }, [query.data, query.isSuccess, setSprints]);

  // Handle errors
  useEffect(() => {
    if (query.error) {
      console.error(' Error fetching active sprints:', query.error);
    }
  }, [query.error]);

  return query;
};

