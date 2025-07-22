import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useProjects = () => {
  const setProjects = useApiDataStore((state) => state.setProjects);

  const query = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Handle successful data fetch and store in Zustand 
  useEffect(() => {
    if (query.data && query.isSuccess) {
      console.log(' Projects fetched:', query.data);
      setProjects(query.data); //  Save to Zustand store
    }
  }, [query.data, query.isSuccess, setProjects]);

  // Handle errors
  useEffect(() => {
    if (query.error) {
      console.error(' Error fetching projects:', query.error);
    }
  }, [query.error]);

  return query;
};

