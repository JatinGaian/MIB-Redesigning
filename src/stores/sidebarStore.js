import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  selected: 'operational',
  setSelected: (key) => set({ selected: key }),
})); 