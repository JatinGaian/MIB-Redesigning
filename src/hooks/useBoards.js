import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchBoards } from '../services/api';
import { useApiDataStore } from '../stores/apiDataStore';

export const useBoards = () => {
  const setBoards = useApiDataStore((state) => state.setBoards);

  const query = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  // Handle successful data fetch and store in Zustand
  useEffect(() => {
    if (query.data && query.isSuccess) {
      console.log(' Boards fetched:', query.data);
      setBoards(query.data); //  Set in Zustand
      console.log(' Zustand after setBoards:', useApiDataStore.getState().boards);
    }
  }, [query.data, query.isSuccess, setBoards]);

  // Handle errors
  useEffect(() => {
    if (query.error) {
      console.error(' Failed to fetch boards:', query.error);
    }
  }, [query.error]);

  return query;
};

