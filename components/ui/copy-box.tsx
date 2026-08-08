"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Standalone copy-to-clipboard icon button — reusable in table action columns. */
export function CopyButton({
  value,
  className,
  ...props
}: { value: string } & Omit<React.ComponentProps<typeof Button>, "value">) {
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
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn("text-foreground/40 hover:text-accent", copied && "text-accent", className)}
      {...props}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

interface CopyBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The text placed on the clipboard. Defaults to the rendered children as a string. */
  value: string;
  /** Optional small label shown above the text (e.g. "TEASER · 3–5 DAYS OUT"). */
  label?: string;
  /** Extra classes for the text node itself, e.g. "line-clamp-7" to truncate long copy. */
  textClassName?: string;
}

export function CopyBox({ value, label, className, textClassName, children, ...props }: CopyBoxProps) {
  return (
    <div
      className={cn(
        "group relative rounded-md border border-current/15 p-2 pr-8 text-foreground",
        className,
      )}
      {...props}
    >
      {label && (
        <div className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[.08em] text-accent">
          {label}
        </div>
      )}

      <div className={cn("text-xs leading-snug text-foreground/80 whitespace-pre-line", textClassName)}>
        {children ?? value}
      </div>

      <CopyButton value={value} className="absolute right-1 top-1 size-6" />
    </div>
  );
}
