"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function FixedThemeSync() {
 useEffect(() => {
 document.documentElement.setAttribute("data-visual-theme", "horror-archive");
 }, []);

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
 <FixedThemeSync />
 {children}
 </NextThemesProvider>
 );
}
