"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { ROLE_LABEL } from "@/lib/auth/capabilities";
import type { Role } from "@/lib/types";

const BUSINESS_ROLES: Role[] = ["owner", "manager", "operator", "analyst"];

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user, role, setRole, businessName } = useAuth();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-background/70 sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-xl lg:px-6">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="text-muted-foreground hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 items-center sm:flex">
        <Search className="text-muted-foreground absolute left-3 size-4" />
        <input
          type="search"
          placeholder="Search businesses, products, customers..."
          className="bg-muted/40 placeholder:text-muted-foreground/70 focus-visible:ring-ring/40 h-9 w-full rounded-lg border border-transparent pl-9 pr-3 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/app"
          className="text-muted-foreground hover:text-foreground hidden rounded-lg px-3 py-1.5 text-xs font-medium md:block"
        >
          Business App
        </Link>
        <Link
          href="/admin"
          className="text-muted-foreground hover:text-foreground hidden rounded-lg px-3 py-1.5 text-xs font-medium md:block"
        >
          Admin Console
        </Link>

        <button
          aria-label="Notifications"
          className="text-muted-foreground hover:text-foreground relative rounded-lg p-2 hover:bg-white/5"
        >
          <Bell className="size-4.5" />
          <span className="bg-gradient-brand absolute right-1.5 top-1.5 size-1.5 rounded-full" />
        </button>

        {/* Role switcher */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass hover:bg-white/8 flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 text-sm transition-colors"
          >
            <span
              className="grid size-7 place-items-center rounded-lg text-xs font-semibold text-black"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name.slice(0, 1)}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-medium">{user.name}</span>
              <span className="text-muted-foreground block text-[11px]">{ROLE_LABEL[role]}</span>
            </span>
            <ChevronDown className="text-muted-foreground size-4" />
          </button>

          {open && (
            <div className="bg-popover absolute right-0 mt-2 w-60 rounded-xl border p-1.5 shadow-2xl shadow-black/50">
              <p className="text-muted-foreground px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide">
                {businessName}
              </p>
              <p className="text-muted-foreground px-2.5 pb-1 text-[11px]">Switch role (demo)</p>
              {BUSINESS_ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-white/5",
                    role === r ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {ROLE_LABEL[r]}
                  {role === r && <span className="bg-gradient-brand size-2 rounded-full" />}
                </button>
              ))}
              <div className="my-1 h-px bg-border" />
              <button
                onClick={() => {
                  setRole("super_admin");
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-white/5",
                  role === "super_admin" ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Super Admin
                {role === "super_admin" && <span className="bg-gradient-brand size-2 rounded-full" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
