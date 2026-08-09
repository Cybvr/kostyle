"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { ChevronsUpDown, PanelLeftClose, PanelLeftOpen, Settings2 } from "lucide-react";
import type { NavItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import type { UserProfile } from "@/lib/user-profile";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SideNavProps {
  items: ReadonlyArray<NavItem>;
  /** Mobile drawer open state */
  open: boolean;
  onClose: () => void;
  /** Desktop collapsed (icon-only) state */
  collapsed: boolean;
  onToggleCollapse: () => void;
  user?: User | null;
  profile?: UserProfile | null;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
}

export function SideNav({ items, open, onClose, collapsed, onToggleCollapse, user, profile }: SideNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [darkMode, setDarkMode] = useState(false);
  const displayName = profile?.displayName || user?.displayName || "Account";
  const email = profile?.email || user?.email || "";
  const photoURL = profile?.photoURL || user?.photoURL || "";

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
          "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-border bg-background transition-[width,transform] duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-16" : "lg:w-56",
        )}
      >
        {/* Brand + collapse toggle */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center px-4",
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
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
              >
                {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</TooltipContent>
          </Tooltip>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
          {items.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => goToSection(e, id)}
                aria-current={isActive ? "location" : undefined}
                title={collapsed ? label : undefined}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                  collapsed && "lg:justify-center lg:px-0",
                  isActive ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-[18px] shrink-0 transition-colors",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground",
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "font-heading text-[13px] tracking-[.02em]",
                    collapsed && "lg:hidden",
                  )}
                >
                  {label}
                </span>
              </a>
            );
          })}
          <a
            href="/settings"
            title={collapsed ? "Settings" : undefined}
            className={cn(
              "group relative flex items-center gap-3 px-4 py-2.5 text-left text-muted-foreground transition-colors hover:text-foreground",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <Settings2 className="size-[18px] shrink-0" aria-hidden />
            <span className={cn("font-heading text-[13px] tracking-[.02em]", collapsed && "lg:hidden")}>Settings</span>
          </a>
        </div>

        {/* Profile */}
        <div className={cn("shrink-0 p-3", collapsed && "lg:px-2")}>
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
                <Avatar className="size-9 rounded-md">
                  {photoURL ? <AvatarImage src={photoURL} alt={displayName} /> : null}
                  <AvatarFallback className="rounded-md bg-accent font-heading text-sm font-semibold text-accent-foreground">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
                <span className={cn("min-w-0 flex-1", collapsed && "lg:hidden")}>
                  <span className="block truncate text-sm font-semibold text-foreground">{displayName}</span>
                  <span className="block truncate text-xs text-muted-foreground">{email}</span>
                </span>
                <ChevronsUpDown
                  className={cn("size-4 shrink-0 text-muted-foreground", collapsed && "lg:hidden")}
                  aria-hidden
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { window.location.href = "/settings"; }}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={darkMode} onCheckedChange={setTheme}>
                Dark mode
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem
                onSelect={async () => {
                  if (auth) await signOut(auth);
                  window.location.href = "/";
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
