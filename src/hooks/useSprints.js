import { useQuery } from '@tanstack/react-query';
import { fetchSprints } from '../services/api';

export const useSprints = () => {
  return useQuery({
    queryKey: ['sprints'],
    queryFn: fetchSprints,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}; 