import { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MediaCard({
  image,
  eyebrow,
  title,
  titleClassName,
  onClick,
  children,
}: {
  image: ReactNode;
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
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
      <div className="aspect-square w-full overflow-hidden bg-muted/50 flex items-center justify-center">
        {image}
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
