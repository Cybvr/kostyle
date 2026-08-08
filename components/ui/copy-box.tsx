"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text placed on the clipboard. Defaults to the rendered children as a string. */
  value: string;
  /** Optional small label shown above the text (e.g. "TEASER · 3–5 DAYS OUT"). */
  label?: string;
}

export function CopyBox({ value, label, className, children, ...props }: CopyBoxProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }, [value]);

  return (
    <div
      className={cn(
        "group relative border border-current/15 p-4 pr-10 text-foreground",
        className,
      )}
      {...props}
    >
      {label && (
        <div className="font-heading font-semibold text-xs tracking-[.08em] uppercase text-accent mb-2">
          {label}
        </div>
      )}

      <div className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
        {children ?? value}
      </div>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className={cn(
          "absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md",
          "text-foreground/40 transition-colors hover:text-accent hover:bg-accent/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          copied && "text-accent",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
