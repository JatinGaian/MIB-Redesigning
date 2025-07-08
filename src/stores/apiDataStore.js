// src/stores/apiDataStore.js
import { create } from 'zustand';

export const useApiDataStore = create((set) => ({
  projects: [],
  issues: [],
  sprints: [],
  boards: [],
  isLoading: false,
  isFetched: false,
  setProjects: (projects) => set({ projects }),
  setIssues: (issues) => set({ issues }),
  setSprints: (sprints) => set({ sprints }),
  setBoards: (boards) => set({ boards }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsFetched: (isFetched) => set({ isFetched }),
  setAllData: (key, data) => set((state) => ({ ...state, [key]: data })),
}));

// export default useApiDataStore;
