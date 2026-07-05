"use client";

import { useRouter } from "next/navigation";
import {
  Activity,
  Building2,
  DollarSign,
  Percent,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getAdminCharts, getAdminMetrics, getBusinessesTable, getPlatformActivity } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/ui/glass-panel";
import { DataTable, type Column } from "@/components/tables/data-table";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AreaTrend, BarSeries, LineTrend } from "@/components/charts/charts";
import { Heatmap } from "@/components/charts/heatmap";
import { LoadingState } from "@/components/feedback/states";
import { inr, num, pct } from "@/lib/format";
import type { Business } from "@/lib/types";

type BizRow = Business & { planName: string };

export default function AdminOverviewPage() {
  const router = useRouter();
  const metrics = useAsync(getAdminMetrics);
  const charts = useAsync(getAdminCharts);
  const table = useAsync(getBusinessesTable);
  const activity = useAsync(getPlatformActivity);

  if (metrics.loading || !metrics.data || charts.loading || !charts.data)
    return <LoadingState label="Loading platform metrics" />;

  const m = metrics.data;
  const c = charts.data;

  const columns: Column<BizRow>[] = [
    { key: "name", header: "Business", sortable: true, sortValue: (r) => r.name, render: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-muted-foreground text-xs">{r.region}</p>
      </div>
    ) },
    { key: "industry", header: "Industry", render: (r) => <span className="text-muted-foreground">{r.industry}</span> },
    { key: "planName", header: "Plan", render: (r) => <Badge tone="brand">{r.planName}</Badge> },
    { key: "creditsRemaining", header: "Credits", align: "right", sortable: true, sortValue: (r) => r.creditsRemaining, render: (r) => num(r.creditsRemaining) },
    { key: "arGenerated", header: "AR Gen", align: "right", sortable: true, sortValue: (r) => r.arGenerated, render: (r) => num(r.arGenerated) },
    { key: "conversionRate", header: "Conv %", align: "right", sortable: true, sortValue: (r) => r.conversionRate, render: (r) => pct(r.conversionRate * 100) },
    { key: "revenueGenerated", header: "Revenue", align: "right", sortable: true, sortValue: (r) => r.revenueGenerated, render: (r) => inr(r.revenueGenerated, true) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Platform Overview" description="Executive view across all WearBefore businesses." />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Total Businesses" value={num(m.business.total)} icon={Building2} delta={m.deltas.businesses} accent />
        <KpiCard label="Active Businesses" value={num(m.business.active)} icon={UserCheck} hint={`${m.business.newThisWeek} new this week`} />
        <KpiCard label="MRR" value={inr(m.business.mrr, true)} icon={DollarSign} delta={m.deltas.mrr} accent />
        <KpiCard label="ARR" value={inr(m.business.arr, true)} icon={TrendingUp} hint={`${m.business.revenueGrowth}% growth`} />
        <KpiCard label="Trial Accounts" value={num(m.business.trial)} icon={Users} />
        <KpiCard label="Paid Accounts" value={num(m.business.paid)} icon={UserCheck} />
        <KpiCard label="Churn Rate" value={pct(m.business.churnRate)} icon={Percent} delta={m.deltas.churn} deltaInvert />
        <KpiCard label="AR Previews (mo)" value={num(m.ar.month)} icon={Sparkles} delta={m.deltas.ar} />
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Revenue Growth" description="MRR vs one-time credit revenue">
          <AreaTrend
            data={c.revenue}
            series={[{ key: "mrr", color: "var(--color-chart-2)" }, { key: "credits", color: "var(--color-chart-3)" }]}
            format={(v) => inr(Number(v), true)}
          />
        </SectionCard>
        <SectionCard title="AR Usage" description="Previews generated per day">
          <BarSeries data={c.arUsage.slice(-14)} series={[{ key: "generated", color: "var(--color-chart-1)" }]} format={(v) => num(Number(v))} />
        </SectionCard>
        <SectionCard title="Business Growth" description="Cumulative active businesses">
          <LineTrend data={c.businessGrowth} series={[{ key: "total", color: "var(--color-chart-4)" }]} />
        </SectionCard>
        <SectionCard title="Conversion Trends" description="Platform-wide preview-to-order rate">
          <LineTrend data={c.conversion} series={[{ key: "rate", color: "var(--color-chart-3)" }, { key: "target", color: "var(--color-chart-5)" }]} format={(v) => pct(Number(v), 0)} />
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Category Performance" description="AR views by garment category">
          <BarSeries data={c.category} series={[{ key: "views", color: "var(--color-chart-3)" }]} layout="vertical" format={(v) => num(Number(v))} />
        </SectionCard>
        <SectionCard title="Customer Activity Heatmap" description="Sessions by day & hour">
          <Heatmap cells={c.heatmap} />
        </SectionCard>
      </div>

      {/* Performance table + activity */}
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="text-muted-foreground size-4" />
            <h2 className="text-sm font-semibold">Business Performance</h2>
          </div>
          {table.data && (
            <DataTable
              columns={columns}
              rows={table.data}
              rowKey={(r) => r.id}
              searchKeys={["name", "industry", "region"]}
              searchPlaceholder="Search businesses..."
              onRowClick={(r) => router.push(`/admin/businesses/${r.id}`)}
            />
          )}
        </div>

        <SectionCard title="Live Activity" bodyClassName="p-3">
          {activity.data && <ActivityFeed items={activity.data.slice(0, 10)} />}
        </SectionCard>
      </div>
    </div>
  );
}
