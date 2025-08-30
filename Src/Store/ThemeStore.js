
import { create } from "zustand";

const useThemeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setDarkMode: (value) => set({ darkMode: value }),
}));

export default useThemeStore;
