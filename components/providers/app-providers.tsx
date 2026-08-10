"use client";

import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DatabaseBootstrap } from "@/components/providers/database-bootstrap";
import { StremioStartupSync } from "@/components/stremio/stremio-startup-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
 const isLogin = pathname === "/login";

 return (
 <ThemeProvider>
 <TooltipProvider delayDuration={300}>
 {!isLogin && <DatabaseBootstrap />}
 {!isLogin && <StremioStartupSync />}
 {children}
 </TooltipProvider>
 </ThemeProvider>
 );
}
