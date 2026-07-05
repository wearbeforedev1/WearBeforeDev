"use client";

import * as React from "react";
import { ImagePlus, RefreshCw, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  label: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  className?: string;
}

export function UploadDropzone({ label, value, onChange, className }: UploadDropzoneProps) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  if (value) {
    return (
      <div className={cn("group relative aspect-[3/4] overflow-hidden rounded-2xl border", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt={label} className="size-full object-cover" />
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-xs font-medium">{label}</span>
          <button
            onClick={() => inputRef.current?.click()}
            className="glass flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs"
          >
            <RefreshCw className="size-3.5" /> Replace
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className={cn(
        "flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-colors",
        dragging ? "border-[var(--brand-via)] bg-white/5" : "hover:border-white/25 hover:bg-white/5",
        className
      )}
    >
      <span className="bg-gradient-brand mb-4 grid size-12 place-items-center rounded-2xl opacity-90">
        {dragging ? <ImagePlus className="size-5 text-black" /> : <UploadCloud className="size-5 text-black" />}
      </span>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-muted-foreground mt-1 text-xs">Drag & drop or click to upload</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </button>
  );
}
