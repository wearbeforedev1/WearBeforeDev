"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import type { NavItem } from "./nav-config";

interface SidebarProps {
  items: NavItem[];
  variant: "business" | "admin";
  mobileOpen: boolean;
  onClose: () => void;
}

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { can } = useAuth();
  const visible = items.filter((i) => !i.capability || can(i.capability));

  return (
    <nav className="flex flex-col gap-1 px-3">
      {visible.map((item) => {
        const active = isActive(pathname, item);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            {active && (
              <span className="bg-gradient-brand absolute inset-0 -z-10 rounded-xl opacity-15" />
            )}
            {active && (
              <span className="bg-gradient-brand absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full" />
            )}
            <Icon className="size-4.5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ items, variant, mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="bg-card/40 fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r py-5 lg:flex">
        <div className="flex items-center justify-between px-5 pb-6">
          <Link href={variant === "admin" ? "/admin" : "/app"} className="flex items-center">
            <Logo />
          </Link>
          {variant === "admin" && (
            <span className="bg-gradient-brand rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-black">
              ADMIN
            </span>
          )}
        </div>
        <NavList items={items} />
        <div className="mt-auto px-5 pt-4">
          <div className="glass rounded-xl p-3 text-xs text-muted-foreground">
            <p className="text-foreground font-medium">Prototype</p>
            <p className="mt-1">Mock data. Switch roles from the top bar.</p>
          </div>
        </div>
      </aside>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <aside className="bg-card absolute inset-y-0 left-0 flex w-72 flex-col border-r py-5">
            <div className="flex items-center justify-between px-5 pb-6">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavList items={items} onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
