"use client";

import { motion } from "framer-motion";
import {
  CalendarRange,
  LayoutDashboard,
  Library,
  List,
  Settings,
  Skull,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeIn, slideInFromLeft } from "@/lib/motion";
import { useMovieStore } from "@/store/movie-store";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/year-in-review", label: "Year in Review", icon: CalendarRange },
  { href: "/lists", label: "Lists", icon: List },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const movieCount = useMovieStore((state) => state.movies.length);

  return (
    <motion.aside
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <Skull className="h-5 w-5 text-primary" aria-hidden />
        <motion.div variants={fadeIn}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Private Archive
          </p>
          <h1 className="text-sm font-semibold leading-tight">Horror Movie</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
          </p>
        </motion.div>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Main">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
