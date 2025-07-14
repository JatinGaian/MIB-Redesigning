import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchIssues } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useIssues = () => {
  const setIssues = useApiDataStore((state) => state.setIssues);

  const query = useQuery({
    queryKey: ['issues'],
    queryFn: fetchIssues,
  });

  // Handle successful data fetch and store in Zustand
  useEffect(() => {
    if (query.data && query.isSuccess) {
      console.log(' Issues fetched:', query.data);
      setIssues(query.data); //  Update Zustand store
    }
  }, [query.data, query.isSuccess, setIssues]);

  // Handle errors
  useEffect(() => {
    if (query.error) {
      console.error(' Error fetching issues:', query.error);
    }
  }, [query.error]);

  return query;
};

