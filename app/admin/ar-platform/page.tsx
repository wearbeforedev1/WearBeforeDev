"use client";

import { Clock, Percent, Sparkles, Zap } from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getAdminCharts, getAdminMetrics } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/ui/glass-panel";
import { AreaTrend, BarSeries } from "@/components/charts/charts";
import { Heatmap } from "@/components/charts/heatmap";
import { LoadingState } from "@/components/feedback/states";
import { duration, num, pct } from "@/lib/format";

export default function AdminARPlatformPage() {
  const metrics = useAsync(getAdminMetrics);
  const charts = useAsync(getAdminCharts);

  if (metrics.loading || !metrics.data || charts.loading || !charts.data)
    return <LoadingState label="Loading AR platform" />;

  const m = metrics.data;
  const c = charts.data;

  return (
    <div className="space-y-6">
      <PageHeader title="AR Platform" description="AR generation performance across all tenants." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Total Previews" value={num(m.ar.total)} icon={Sparkles} delta={m.deltas.ar} accent />
        <KpiCard label="Previews Today" value={num(m.ar.today)} icon={Zap} hint={`${num(m.ar.week)} this week`} />
        <KpiCard label="Avg Session" value={duration(m.ar.avgSessionDuration)} icon={Clock} />
        <KpiCard label="Avg Conversion" value={pct(m.ar.avgConversion)} icon={Percent} />
      </div>

      <SectionCard title="AR Usage Trend" description="Generated vs viewed, last 30 days">
        <AreaTrend
          data={c.arUsage}
          series={[{ key: "generated", color: "var(--color-chart-1)" }, { key: "viewed", color: "var(--color-chart-3)" }]}
          height={300}
          format={(v) => num(Number(v))}
        />
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Category Performance" description="AR views by garment category">
          <BarSeries data={c.category} series={[{ key: "views", color: "var(--color-chart-3)" }]} layout="vertical" format={(v) => num(Number(v))} />
        </SectionCard>
        <SectionCard title="Activity Heatmap" description="Sessions by day & hour">
          <Heatmap cells={c.heatmap} />
        </SectionCard>
      </div>
    </div>
  );
}
