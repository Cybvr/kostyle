"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Click-or-drag image upload field. Keeps a local preview; the editor uploads the file to Firebase Storage on save. */
export function ImageDropField({
  value,
  onChange,
  onGenerate,
  generating = false,
  className,
}: {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  onGenerate?: () => void | Promise<void>;
  generating?: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const readFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    readFile(event.dataTransfer.files?.[0]);
  };

  if (value) {
    return (
      <div className="space-y-2">
        <div className={cn("relative aspect-square w-full max-w-40 overflow-hidden rounded-md border border-border bg-muted/20", className)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="size-full object-cover" />
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            onClick={() => onChange(undefined)}
            aria-label="Remove image"
            className="absolute right-1 top-1"
          >
            <X className="size-3.5" />
          </Button>
        </div>
        {onGenerate ? (
          <Button type="button" variant="outline" size="sm" onClick={() => void onGenerate()} disabled={generating}>
            {generating ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
            {generating ? "Generating…" : "Regenerate with Seedream"}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex aspect-square w-full max-w-40 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-muted/30 text-center transition-colors hover:border-accent hover:bg-muted/50",
          dragOver && "border-accent bg-muted/50",
          className,
        )}
      >
        <ImagePlus className="size-5 text-muted-foreground" aria-hidden />
        <span className="px-2 text-[11px] leading-snug text-muted-foreground">
          Click or drop image
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => readFile(event.target.files?.[0])}
        />
      </div>
      {onGenerate ? (
        <Button type="button" variant="outline" size="sm" onClick={() => void onGenerate()} disabled={generating}>
          {generating ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
          {generating ? "Generating…" : "Generate with Seedream"}
        </Button>
      ) : null}
    </div>
  );
}
