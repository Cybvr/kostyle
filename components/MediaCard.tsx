import { useState, type DragEvent, type ReactNode } from "react";
import { ImagePlus } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MediaCard({
  image,
  eyebrow,
  title,
  titleClassName,
  onClick,
  onImageDrop,
  imageDropBusy = false,
  children,
}: {
  image: ReactNode;
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  onClick?: () => void;
  onImageDrop?: (file: File) => void | Promise<void>;
  imageDropBusy?: boolean;
  children: ReactNode;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!onImageDrop) return;
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void onImageDrop(file);
  };

  return (
    <Card
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "w-full gap-0 overflow-hidden border-border bg-background/40 py-0 transition-shadow hover:ring-2 hover:ring-accent",
        onClick && "cursor-pointer",
      )}
    >
      <div
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden bg-muted/50",
          dragOver && "bg-accent/10 ring-2 ring-inset ring-accent",
        )}
        onDragOver={onImageDrop ? (event) => { event.preventDefault(); event.stopPropagation(); setDragOver(true); } : undefined}
        onDragLeave={onImageDrop ? () => setDragOver(false) : undefined}
        onDrop={onImageDrop ? handleDrop : undefined}
      >
        {image}
        {onImageDrop ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 text-center text-xs font-medium text-foreground opacity-0 transition-opacity",
              (dragOver || imageDropBusy) && "opacity-100",
            )}
          >
            <ImagePlus className="size-6 text-accent" aria-hidden />
            <span>{imageDropBusy ? "Uploading image…" : "Drop image to replace"}</span>
          </div>
        ) : null}
      </div>
      {eyebrow ? (
        <span className="block px-4 pt-4 font-heading text-[11px] font-semibold uppercase tracking-[.12em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <CardTitle className={cn("truncate px-4 pt-1 font-heading text-sm font-semibold tracking-tight text-foreground", titleClassName)}>
        {title}
      </CardTitle>
      {/* Stop propagation so clicking the copy button doesn't also open the edit sheet. */}
      <CardContent className="px-4 pb-4 pt-3" onClick={(event) => event.stopPropagation()}>
        {children}
      </CardContent>
    </Card>
  );
}
