"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
 CalendarRange,
 ChevronLeft,
 LayoutDashboard,
 Library,
 List,
 Settings,
 Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { fadeIn, slideInFromLeft } from "@/lib/motion";

const SIDEBAR_COLLAPSED_KEY = "hma-sidebar-collapsed";

const navItems = [
 { href: "/library", label: "Library", icon: Library },
 { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
 { href: "/year-in-review", label: "Year in Review", icon: Trophy },
 { href: "/release-calendar", label: "Release Calendar", icon: CalendarRange },
 { href: "/watchlist", label: "Watchlist", icon: List },
 { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
 const pathname = usePathname();
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
 "relative flex h-full shrink-0 flex-col bg-black text-[#e9e3d4] transition-all duration-200 ease-in-out",
 collapsed ? "w-16" : "w-56"
 )}
 >
 <div
 className={cn(
 "flex items-center",
 collapsed ? "justify-center p-4" : "gap-3 px-4 py-5"
 )}
 >
 <Image
 src="/images/logo.png"
 alt="Retromax"
 width={collapsed ? 32 : 40}
 height={collapsed ? 32 : 40}
 className="shrink-0"
 />
 {!collapsed && (
 <motion.div variants={fadeIn}>
 <h1 className="archive-anton text-3xl uppercase leading-none text-[#e9e3d4]">
 Retromax
 </h1>
 </motion.div>
 )}
 </div>

 <nav
 className={cn(
 "flex flex-1 flex-col",
 collapsed ? "items-center gap-2 px-3 pt-3" : "gap-2 px-3"
 )}
 aria-label="Main"
 >
 {navItems.map(({ href, label, icon: Icon }) => {
 const active =
 pathname === href ||
 (href !== "/library" && pathname.startsWith(`${href}/`));

 return (
 <Link
 key={href}
 href={href}
 className={cn(
 "flex items-center transition-colors",
 collapsed
 ? "h-10 w-10 justify-center rounded-full"
 : "h-12 gap-3 rounded-full px-4 text-base",
 active
 ? "bg-[#d4b850] text-black"
 : "text-[#e9e3d4] hover:bg-[#e9e3d4]/8"
 )}
 title={collapsed ? label : undefined}
 >
 <Icon
 className={cn(
 "shrink-0",
 "h-5 w-5",
 !active && "opacity-90"
 )}
 strokeWidth={2.2}
 aria-hidden
 />
 {!collapsed && (
 <span className="font-sans font-medium leading-none">
 {label}
 </span>
 )}
 </Link>
 );
 })}
 </nav>

 <button
 type="button"
 onClick={toggleCollapsed}
 className={cn(
 "mb-6 flex items-center gap-2 rounded-full px-4 py-3 text-xs text-[#e9e3d4]/50 transition-colors hover:bg-[#e9e3d4]/8 hover:text-[#e9e3d4]",
 collapsed ? "self-center justify-center" : "ml-3 self-start"
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
