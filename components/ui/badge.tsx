import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted/50 text-muted-foreground",
        success: "border-transparent bg-[oklch(0.72_0.17_162/0.15)] text-[oklch(0.8_0.17_162)]",
        warning: "border-transparent bg-[oklch(0.82_0.16_84/0.15)] text-[oklch(0.86_0.16_84)]",
        danger: "border-transparent bg-destructive/15 text-destructive",
        info: "border-transparent bg-[oklch(0.7_0.16_250/0.15)] text-[oklch(0.78_0.16_250)]",
        brand: "border-transparent bg-[color-mix(in_oklch,var(--brand-via)_18%,transparent)] text-[var(--brand-from)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, tone, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const STATUS_TONE: Record<string, BadgeProps["tone"]> = {
  active: "success",
  paid: "success",
  completed: "success",
  trial: "info",
  open: "info",
  pending: "warning",
  draft: "warning",
  past_due: "warning",
  suspended: "danger",
  refunded: "danger",
  void: "neutral",
  archived: "neutral",
  invited: "info",
  disabled: "neutral",
};

const STATUS_LABEL: Record<string, string> = {
  past_due: "Past Due",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "neutral";
  const label = STATUS_LABEL[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge tone={tone} dot>
      {label}
    </Badge>
  );
}
