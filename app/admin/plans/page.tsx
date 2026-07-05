"use client";

import { Check, Pencil } from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getBusinessesTable, getPlans } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { SectionCard } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/states";
import { inr, num } from "@/lib/format";

export default function AdminPlansPage() {
  const plans = useAsync(getPlans);
  const table = useAsync(getBusinessesTable);

  if (plans.loading || !plans.data) return <LoadingState label="Loading plans" />;

  const subscriberCount = (name: string) =>
    (table.data ?? []).filter((b) => b.planName === name).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans"
        description="Manage subscription tiers offered to businesses."
        actions={<Button className="bg-gradient-brand text-black">New plan</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.data.map((p) => (
          <SectionCard
            key={p.id}
            title={p.name}
            actions={
              <Button size="sm" variant="outline">
                <Pencil className="size-3.5" /> Edit
              </Button>
            }
          >
            <p className="text-2xl font-semibold tabular-nums">
              {inr(p.priceMonthly)}
              <span className="text-muted-foreground text-sm font-normal">/mo</span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Badge tone="brand">{num(p.creditAllotment)} credits</Badge>
              <Badge tone="info">{subscriberCount(p.name)} subscribers</Badge>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand-to)]" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
