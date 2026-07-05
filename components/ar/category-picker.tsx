"use client";

import { cn } from "@/lib/utils";
import type { GarmentCategory } from "@/lib/types";

const CATEGORIES: { name: GarmentCategory; emoji: string }[] = [
  { name: "Saree", emoji: "🥻" },
  { name: "Kurti", emoji: "👚" },
  { name: "Shirt", emoji: "👔" },
  { name: "Blazer", emoji: "🧥" },
  { name: "Suit", emoji: "🤵" },
  { name: "Sherwani", emoji: "👘" },
  { name: "Indo-Western", emoji: "✨" },
];

export function CategoryPicker({
  value,
  onChange,
}: {
  value: GarmentCategory | null;
  onChange: (c: GarmentCategory) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORIES.map((cat) => {
        const active = value === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => onChange(cat.name)}
            className={cn(
              "relative flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              active
                ? "border-gradient-brand bg-white/5"
                : "bg-card/40 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <span className="grid size-10 place-items-center rounded-xl border bg-white/5 text-lg">
              {cat.emoji}
            </span>
            <span className="text-sm font-medium">{cat.name}</span>
            {active && <span className="bg-gradient-brand absolute right-3 top-3 size-2 rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}
