import { create } from 'zustand';

export const useSprintStore = create((set) => ({
  sprints: [],
  setSprints: (sprints) => set({ sprints }),
  // Placeholder actions for later
  addSprint: (sprint) => set((state) => ({ sprints: [...state.sprints, sprint] })),
  updateSprint: (id, updated) => set((state) => ({
    sprints: state.sprints.map((s) => (s.id === id ? { ...s, ...updated } : s)),
  })),
  deleteSprint: (id) => set((state) => ({
    sprints: state.sprints.filter((s) => s.id !== id),
  })),
})); 