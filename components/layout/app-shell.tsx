"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/motion";
import { useThemeStore } from "@/store/theme-store";
import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const visualTheme = useThemeStore((s) => s.visualTheme);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-screen w-full overflow-hidden bg-background",
        visualTheme === "vhs" && "vhs-scanlines"
      )}
    >
      <Sidebar />
      <motion.div
        className="relative flex min-w-0 flex-1 flex-col"
        variants={staggerContainer}
      >
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </motion.div>
    </motion.div>
  );
}
