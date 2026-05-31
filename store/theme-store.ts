import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VisualTheme } from "@/types/theme";
import { VISUAL_THEMES } from "@/types/theme";

type ThemeState = {
  visualTheme: VisualTheme;
  setVisualTheme: (theme: VisualTheme) => void;
};

function isVisualTheme(value: string): value is VisualTheme {
  return VISUAL_THEMES.includes(value as VisualTheme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      visualTheme: "horror-archive",
      setVisualTheme: (visualTheme) => set({ visualTheme }),
    }),
    {
      name: "hma-visual-theme",
      partialize: (state) => ({ visualTheme: state.visualTheme }),
      onRehydrateStorage: () => (state) => {
        if (state && !isVisualTheme(state.visualTheme)) {
          state.visualTheme = "horror-archive";
        }
      },
    }
  )
);
