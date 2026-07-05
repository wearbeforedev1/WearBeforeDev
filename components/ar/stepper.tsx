import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors",
                done && "bg-gradient-brand border-transparent text-black",
                active && "border-[var(--brand-via)] text-foreground",
                !done && !active && "text-muted-foreground border-border"
              )}
            >
              {done ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                active ? "text-foreground" : "text-muted-foreground",
                "hidden sm:inline"
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className={cn("h-px w-6 sm:w-8", done ? "bg-gradient-brand" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
