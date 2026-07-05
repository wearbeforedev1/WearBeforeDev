import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass rounded-2xl", className)} {...props}>
      {children}
    </div>
  );
}

interface SectionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  description,
  actions,
  className,
  bodyClassName,
  children,
  ...props
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-card/50 rounded-2xl border backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold tracking-tight">{title}</h3>}
            {description && (
              <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}
