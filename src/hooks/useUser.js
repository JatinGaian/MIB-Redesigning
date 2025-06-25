import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../services/api';

export const useUser = (userId = 1) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};