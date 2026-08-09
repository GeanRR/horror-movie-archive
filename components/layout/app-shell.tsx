"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
 children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
 return (
 <motion.div
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 className="relative flex h-screen w-full overflow-hidden bg-background"
 >
 <Sidebar />
 <motion.div
 className="relative flex min-w-0 flex-1 flex-col"
 variants={staggerContainer}
 >
 <main className="archive-scrollbar flex-1 overflow-auto p-6">{children}</main>
 </motion.div>
 </motion.div>
 );
}
