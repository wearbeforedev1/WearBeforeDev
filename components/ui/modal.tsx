"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "bg-card relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl shadow-black/60",
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-muted-foreground hover:text-foreground absolute right-4 top-4"
        >
          <X className="size-5" />
        </button>
        {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
        <div className={cn(title && "mt-4")}>{children}</div>
      </div>
    </div>
  );
}

export function Drawer({ open, onClose, title, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "bg-card absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto border-l p-6 shadow-2xl",
          className
        )}
      >
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
