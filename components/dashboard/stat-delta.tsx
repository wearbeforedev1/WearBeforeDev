import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiDelta } from "@/lib/types";

export function StatDelta({
  delta,
  invertColors = false,
  suffix = "vs prev",
  className,
}: {
  delta: KpiDelta;
  invertColors?: boolean;
  suffix?: string;
  className?: string;
}) {
  const positive = delta.direction === "up";
  const flat = delta.direction === "flat";
  const good = invertColors ? !positive : positive;
  const Icon = flat ? Minus : positive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        flat
          ? "text-muted-foreground"
          : good
            ? "text-[oklch(0.8_0.17_162)]"
            : "text-destructive",
        className
      )}
    >
      <Icon className="size-3.5" />
      {delta.value}%
      {suffix && <span className="text-muted-foreground font-normal">{suffix}</span>}
    </span>
  );
}
