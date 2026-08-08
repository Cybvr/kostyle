"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  onMenu: () => void;
  done: number;
  total: number;
}

export default function Header({ onMenu, done, total }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
        className="-ml-1 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading text-base font-medium tracking-tight text-foreground sm:text-sm">
          Marketing Deliverables Growth Pack
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span className="font-heading text-xs font-semibold uppercase tracking-[.08em] text-foreground">
          {done}/{total}
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">delivered</span>
      </div>
    </header>
  );
}
