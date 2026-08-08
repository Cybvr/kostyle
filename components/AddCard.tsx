import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Empty-state tile matching MediaCard's footprint — click to add a new item. */
export function AddCard({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 text-center transition-colors hover:border-accent hover:bg-muted/50",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors group-hover:bg-accent/25">
        <Plus className="size-5" />
      </span>
      <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground">
        {label}
      </span>
    </button>
  );
}
