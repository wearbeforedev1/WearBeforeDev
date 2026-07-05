import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center",
        className
      )}
    >
      {Icon && (
        <span className="text-muted-foreground mb-4 grid size-12 place-items-center rounded-2xl border bg-white/5">
          <Icon className="size-5" />
        </span>
      )}
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-sm text-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-center gap-2 py-16 text-sm",
        className
      )}
    >
      <Loader2 className="size-4 animate-spin" />
      {label}...
    </div>
  );
}
