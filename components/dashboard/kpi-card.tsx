import * as React from "react";
import { cn } from "@/lib/utils";
import type { KpiDelta } from "@/lib/types";
import { StatDelta } from "./stat-delta";

interface KpiCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  delta?: KpiDelta;
  deltaInvert?: boolean;
  hint?: string;
  accent?: boolean;
  children?: React.ReactNode; // sparkline slot
  className?: string;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  deltaInvert,
  hint,
  accent,
  children,
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "group bg-card/50 relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-colors hover:border-white/15",
        className
      )}
    >
      {accent && (
        <div className="bg-gradient-brand absolute -right-10 -top-10 size-28 rounded-full opacity-15 blur-2xl" />
      )}
      <div className="flex items-start justify-between">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        {Icon && (
          <span className="text-muted-foreground/80 grid size-8 place-items-center rounded-lg border bg-white/5">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums md:text-[1.75rem]">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {delta && <StatDelta delta={delta} invertColors={deltaInvert} />}
        {hint && !delta && <span className="text-muted-foreground text-xs">{hint}</span>}
      </div>
      {children && <div className="mt-3 h-12">{children}</div>}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-muted/30 rounded-xl border p-4", className)}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1.5 text-xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="text-muted-foreground mt-0.5 text-[11px]">{hint}</p>}
    </div>
  );
}
