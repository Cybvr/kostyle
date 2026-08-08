"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ChevronsUpDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { NavItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SideNavProps {
  items: ReadonlyArray<NavItem>;
  /** Mobile drawer open state */
  open: boolean;
  onClose: () => void;
  /** Desktop collapsed (icon-only) state */
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function SideNav({ items, open, onClose, collapsed, onToggleCollapse }: SideNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const enabled = window.localStorage.getItem("kostyle-theme") === "dark";
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  const setTheme = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
    window.localStorage.setItem("kostyle-theme", enabled ? "dark" : "light");
  };

  useEffect(() => {
    const onScroll = () => {
      const target = 120; // account for sticky top bar
      let closest = items[0]?.id ?? "";
      let minDist = Infinity;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - target);
        if (dist < minDist) {
          minDist = dist;
          closest = id;
        }
      }
      setActive(closest);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;
    window.history.replaceState(null, "", `#${id}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        aria-label="Dashboard sections"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-[width,transform] duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        {/* Brand + collapse toggle */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border px-4",
            collapsed ? "lg:justify-center lg:px-0" : "justify-between",
          )}
        >
          <Image
            src="/kostyle-logo-dark.png"
            alt="Kostyle"
            width={104}
            height={28}
            className={cn("h-7 w-auto object-contain dark:brightness-0 dark:invert", collapsed && "lg:hidden")}
            priority
          />
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
          {items.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => goToSection(e, id)}
                aria-current={isActive ? "location" : undefined}
                title={collapsed ? label : undefined}
                className={cn(
                  "group relative flex items-center gap-3 px-5 py-2.5 text-left transition-colors",
                  collapsed && "lg:justify-center lg:px-0",
                  isActive ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full bg-current transition-transform",
                    isActive ? "scale-125 text-accent" : "text-muted-foreground/50 group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "font-heading text-[13px] uppercase tracking-[.1em]",
                    collapsed && "lg:hidden",
                  )}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Profile */}
        <div className={cn("shrink-0 border-t border-border p-3", collapsed && "lg:px-2")}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Account menu"
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors outline-none hover:bg-muted",
                  collapsed && "lg:justify-center lg:px-0",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-semibold text-accent-foreground">
                  AH
                </span>
                <span className={cn("min-w-0 flex-1", collapsed && "lg:hidden")}>
                  <span className="block truncate text-sm font-semibold text-foreground">Ali Hamze</span>
                  <span className="block truncate text-xs text-muted-foreground">ali@kostyle.ae</span>
                </span>
                <ChevronsUpDown
                  className={cn("size-4 shrink-0 text-muted-foreground", collapsed && "lg:hidden")}
                  aria-hidden
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={darkMode} onCheckedChange={setTheme}>
                Dark mode
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
