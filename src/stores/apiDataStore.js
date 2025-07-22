import { createWithEqualityFn } from 'zustand/traditional';

export const useApiDataStore = createWithEqualityFn((set) => ({
  projects: [],
  boards: [],
  sprints: [],
  issues: [],

  setProjects: (projects) => set({ projects }),
  setBoards: (boards) => set({ boards }),
  setSprints: (sprints) => set({ sprints }),
  setIssues: (issues) => set({ issues }),
}));
