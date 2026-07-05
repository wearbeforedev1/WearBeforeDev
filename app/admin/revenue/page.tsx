"use client";

import { DollarSign, Percent, TrendingUp, Wallet } from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getAdminCharts, getAdminMetrics, getBusinessesTable } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/ui/glass-panel";
import { AreaTrend, Donut, LineTrend } from "@/components/charts/charts";
import { LoadingState } from "@/components/feedback/states";
import { inr, num, pct } from "@/lib/format";

export default function AdminRevenuePage() {
  const metrics = useAsync(getAdminMetrics);
  const charts = useAsync(getAdminCharts);
  const table = useAsync(getBusinessesTable);

  if (metrics.loading || !metrics.data || charts.loading || !charts.data)
    return <LoadingState label="Loading revenue" />;

  const m = metrics.data;
  const c = charts.data;

  const planDist = Object.values(
    (table.data ?? []).reduce<Record<string, { date: string; value: number }>>((acc, b) => {
      acc[b.planName] ??= { date: b.planName, value: 0 };
      acc[b.planName].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Revenue" description="Subscription and credit revenue across the platform." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="MRR" value={inr(m.business.mrr, true)} icon={DollarSign} delta={m.deltas.mrr} accent />
        <KpiCard label="ARR" value={inr(m.business.arr, true)} icon={TrendingUp} />
        <KpiCard label="Revenue Growth" value={pct(m.business.revenueGrowth)} icon={Wallet} delta={m.deltas.mrr} />
        <KpiCard label="Churn Rate" value={pct(m.business.churnRate)} icon={Percent} delta={m.deltas.churn} deltaInvert />
      </div>

      <SectionCard title="Revenue Growth" description="MRR vs one-time credit purchases">
        <AreaTrend
          data={c.revenue}
          series={[{ key: "mrr", color: "var(--color-chart-2)" }, { key: "credits", color: "var(--color-chart-3)" }]}
          height={300}
          format={(v) => inr(Number(v), true)}
        />
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Plan Distribution" description="Businesses per plan">
          <Donut data={planDist} format={(v) => `${num(Number(v))} businesses`} />
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
            {planDist.map((p, i) => (
              <span key={p.date} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: `var(--color-chart-${i + 1})` }} />
                {p.date}
              </span>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Business Growth" description="Cumulative active businesses">
          <LineTrend data={c.businessGrowth} series={[{ key: "total", color: "var(--color-chart-4)" }]} />
        </SectionCard>
      </div>
    </div>
  );
}
