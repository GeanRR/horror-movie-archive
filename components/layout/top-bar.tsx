"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export function TopBar() {
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex h-14 shrink-0 items-center border-b border-border bg-card/40 px-6 backdrop-blur-sm"
    >
      <motion.div variants={fadeIn}>
        <p className="text-xs text-muted-foreground">Archive workspace</p>
        <p className="text-sm font-medium">Horror Movie Archive</p>
      </motion.div>
    </motion.header>
  );
}
