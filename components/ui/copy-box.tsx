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
}

export function CopyBox({ value, label, className, children, ...props }: CopyBoxProps) {
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

      <CopyButton value={value} className="absolute right-2 top-2 size-7" />
    </div>
  );
}
