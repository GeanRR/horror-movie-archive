"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StremioStartupSync } from "@/components/stremio/stremio-startup-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
 return (
 <ThemeProvider>
 <TooltipProvider delayDuration={300}>
 <StremioStartupSync />
 {children}
 </TooltipProvider>
 </ThemeProvider>
 );
}
