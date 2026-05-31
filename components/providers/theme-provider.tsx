"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/store/theme-store";

function VisualThemeSync() {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-visual-theme", visualTheme);
  }, [visualTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <VisualThemeSync />
      {children}
    </NextThemesProvider>
  );
}
