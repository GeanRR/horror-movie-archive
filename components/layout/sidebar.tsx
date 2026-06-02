"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarRange,
  ChevronLeft,
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

const SIDEBAR_COLLAPSED_KEY = "hma-sidebar-collapsed";

const navItems = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/year-in-review", label: "Year in Review", icon: CalendarRange },
  { href: "/lists", label: "Lists", icon: List },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const movieCount = useMovieStore((state) => state.movies.length);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  return (
    <motion.aside
      variants={slideInFromLeft}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200 ease-in-out",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          collapsed ? "justify-center px-2 py-5" : "px-4 py-5"
        )}
      >
        <Skull className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        {!collapsed && (
          <motion.div variants={fadeIn}>
            <h1 className="text-sm font-semibold leading-tight">
              Horror Movie
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {movieCount} {movieCount === 1 ? "Movie" : "Movies"}
            </p>
          </motion.div>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      <nav
        className="flex flex-1 flex-col gap-0.5 p-2"
        aria-label="Main"
      >
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            {!collapsed && label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={toggleCollapsed}
        className={cn(
          "flex items-center gap-2 border-t border-sidebar-border p-3 text-xs text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "justify-center p-3"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            collapsed && "rotate-180"
          )}
          aria-hidden
        />
        {!collapsed && "Collapse"}
      </button>
    </motion.aside>
  );
}
