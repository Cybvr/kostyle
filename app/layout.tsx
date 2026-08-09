import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "KOStyle — Welcome",
  description: "Welcome to KOStyle.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/kostyle-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/kostyle-icon-192.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ background: "var(--background)" }}>
        {/*
          THESIS: KOStyle is an arrival, not a catalogue; this refuses the default content-heavy fashion homepage.
          OWN-WORLD: ink-black ground, bright foreground type, coral-primary signal, and an architectural two-column frame.
          STORY: the visitor recognizes the name, feels the point of view, and has one clear action to continue.
          FIRST VIEWPORT: logo in the upper-left, small index marker on the right, oversized welcome statement left, signal panel right.
          FORM: assigned grounded direction 6 from the persuade surface seed; high-contrast editorial arrival screen.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
