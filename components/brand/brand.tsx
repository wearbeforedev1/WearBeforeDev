import * as React from "react";
import { cn } from "@/lib/utils";

export function BrandGradientText({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-gradient-brand", className)} {...props}>
      {children}
    </span>
  );
}

export function GlowBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div className="bg-gradient-brand absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]" />
    </div>
  );
}
