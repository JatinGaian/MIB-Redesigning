import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useProjects = () => {
  const setAllData = useApiDataStore((state) => state.setAllData);

  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(import.meta.env.VITE_PROJECTS_LEADS_SCHEMA), // ✅ Correct: Function reference
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onSuccess: (data) => {
      console.log("✅ Projects:", data);
      setAllData('projects', data);
    },
    onError: (err) => console.error("❌ Projects fetch error:", err),
  });
};
