"use client";

import { cn } from "@/lib/utils";

interface FilterBarProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  className,
}: FilterBarProps<T>) {
  return (
    <div className={cn("bg-muted/40 inline-flex items-center gap-1 rounded-lg p-1", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
