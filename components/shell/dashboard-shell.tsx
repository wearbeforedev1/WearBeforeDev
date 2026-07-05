"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ADMIN_NAV } from "./nav-config";

interface DashboardShellProps {
  variant: "business" | "admin";
  children: React.ReactNode;
}

export function DashboardShell({ variant, children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const items = ADMIN_NAV;

  return (
    <div className="min-h-dvh">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="bg-gradient-brand absolute -left-40 -top-40 size-[34rem] rounded-full opacity-[0.08] blur-[120px]" />
        <div className="bg-gradient-brand absolute -right-40 top-1/3 size-[28rem] rounded-full opacity-[0.06] blur-[120px]" />
      </div>

      <Sidebar
        items={items}
        variant={variant}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
