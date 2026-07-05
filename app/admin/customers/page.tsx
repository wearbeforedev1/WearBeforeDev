"use client";

import { Repeat, Users, Zap } from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getAdminCharts, getAdminMetrics } from "@/lib/api";
import { retentionSeries } from "@/lib/mock/series";
import { PageHeader } from "@/components/shell/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/ui/glass-panel";
import { Donut, LineTrend } from "@/components/charts/charts";
import { LoadingState } from "@/components/feedback/states";
import { num, pct } from "@/lib/format";

export default function AdminCustomersPage() {
  const metrics = useAsync(getAdminMetrics);
  const charts = useAsync(getAdminCharts);

  if (metrics.loading || !metrics.data) return <LoadingState label="Loading customers" />;
  const m = metrics.data;

  const returningPct = (m.customer.returning / m.customer.totalReached) * 100;
  const split = [
    { date: "Returning", value: m.customer.returning },
    { date: "New", value: m.customer.totalReached - m.customer.returning },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Aggregate end-customer reach across all businesses." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Customers Reached" value={num(m.customer.totalReached)} icon={Users} accent />
        <KpiCard label="Returning Customers" value={num(m.customer.returning)} icon={Repeat} hint={`${returningPct.toFixed(0)}% of total`} />
        <KpiCard label="Active Sessions Now" value={num(m.customer.activeSessions)} icon={Zap} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="New vs Returning" description="Customer composition">
          <Donut data={split} format={(v) => num(Number(v))} />
          <div className="mt-3 flex justify-center gap-3 text-xs">
            {split.map((s, i) => (
              <span key={s.date} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: `var(--color-chart-${i + 1})` }} />
                {s.date}
              </span>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Retention" description="Weekly cohort return rate">
          <LineTrend data={retentionSeries()} series={[{ key: "retention", color: "var(--color-chart-2)" }]} format={(v) => pct(Number(v), 0)} />
        </SectionCard>
      </div>
    </div>
  );
}
