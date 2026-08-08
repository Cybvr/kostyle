"use client";

import { useEffect, useState, type MouseEvent } from "react";

const NAV_ITEMS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "home",       label: "Home" },
  { id: "problem",    label: "The Problem" },
  { id: "roadmap",    label: "Roadmap" },
  { id: "drop-kit",   label: "Drop Kit" },
  { id: "whatsapp",   label: "WhatsApp" },
  { id: "win-back",   label: "Win-back" },
  { id: "seo",        label: "SEO Pass" },
  { id: "articles",   label: "Articles" },
  { id: "founder-story", label: "Founder Story" },
  { id: "press-kit",  label: "Press Kit" },
  { id: "outreach",   label: "Outreach" },
  { id: "as-seen-in", label: "As Seen In" },
  { id: "results",    label: "Results" },
] as const;

export function SideNav() {
  const [active, setActive] = useState<string>(NAV_ITEMS[0].id);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const target = window.innerHeight * 0.25;
      let closest = NAV_ITEMS[0].id;
      let minDist = Infinity;
      for (const { id } of NAV_ITEMS) {
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
  }, []);

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    window.history.replaceState(null, "", `#${id}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-2 top-1/2 -translate-y-1/2 z-[200] bg-foreground/85 backdrop-blur-sm border border-accent/20 py-3 hidden lg:flex flex-col"
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;

        return (
          <a
            key={id}
            onClick={(event) => goToSection(event, id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            href={`#${id}`}
            aria-current={isActive ? "location" : undefined}
            aria-label={`Go to ${label}`}
            className={`flex items-center gap-2.5 cursor-pointer px-4 py-[7px] text-left transition-colors duration-150 ${
              isHovered ? "bg-accent/10" : "bg-transparent"
            }`}
          >
            {/* dot */}
            <span
              className={`w-[5px] h-[5px] rounded-full shrink-0 transition-colors duration-200 ${
                isActive
                  ? "bg-accent"
                  : isHovered
                  ? "bg-accent/55"
                  : "bg-background/25"
              }`}
            />

            {/* label */}
            <span
              className={`text-[10.5px] tracking-[.1em] uppercase whitespace-nowrap transition-colors duration-200 ${
                isActive
                  ? "text-accent font-bold"
                  : isHovered
                  ? "text-background/80 font-normal"
                  : "text-background/40 font-normal"
              }`}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
