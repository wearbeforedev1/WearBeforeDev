"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/tables/filter-bar";
import { BrandGradientText, GlowBackdrop } from "@/components/brand/brand";
import { PLANS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { inr, num } from "@/lib/format";

const CYCLES = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual (save 17%)" },
] as const;

export default function PricingPage() {
  const [cycle, setCycle] = React.useState<"monthly" | "annual">("monthly");

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <HeroHeader />
      <GlowBackdrop />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="text-center">
          <Badge tone="brand" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Plans that scale with <BrandGradientText>your business</BrandGradientText>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Every plan includes AR try-on generation, analytics and conversion tracking. Upgrade as you grow.
          </p>
          <div className="mt-8 flex justify-center">
            <FilterBar options={CYCLES as never} value={cycle} onChange={setCycle} />
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => {
            const price = cycle === "monthly" ? p.priceMonthly : p.priceAnnual;
            return (
              <div
                key={p.id}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7",
                  p.highlighted ? "border-gradient-brand glow-brand bg-card/60" : "bg-card/40"
                )}
              >
                {p.highlighted && (
                  <span className="bg-gradient-brand absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-black">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-semibold tabular-nums">{inr(price)}</span>
                  <span className="text-muted-foreground text-sm">/{cycle === "monthly" ? "mo" : "yr"}</span>
                </p>
                <p className="text-muted-foreground mt-1 text-sm">{num(p.creditAllotment)} AR credits / month</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand-to)]" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn("mt-7", p.highlighted && "bg-gradient-brand text-black")}
                  variant={p.highlighted ? undefined : "outline"}
                  render={<Link href="/signup" />}
                  nativeButton={false}
                >
                  Get started
                </Button>
              </div>
            );
          })}
        </div>

        <div className="bg-card/40 mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-semibold">Enterprise</h3>
            <p className="text-muted-foreground mt-1 text-sm">Custom volume, white-label AR viewer, SSO and dedicated support.</p>
          </div>
          <Button variant="outline" render={<Link href="/contact" />} nativeButton={false}>
            Contact sales
          </Button>
        </div>
      </main>
    </div>
  );
}
