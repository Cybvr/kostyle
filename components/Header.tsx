import Image from "next/image";

const navItems = [
  { label: "Overview", href: "#home" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Campaigns", href: "#drop-kit" },
  { label: "Articles", href: "#articles" },
  { label: "Results", href: "#results" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 h-16 flex items-center justify-between gap-4">
        <a
          href="#home"
          aria-label="Kostyle growth plan home"
          className="flex items-center gap-2 no-underline shrink-0"
        >
          <Image
            src="/kostyle-logo-dark.png"
            alt="Kostyle"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-heading text-xs sm:text-sm tracking-[.12em] uppercase text-muted-foreground hover:text-accent transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
