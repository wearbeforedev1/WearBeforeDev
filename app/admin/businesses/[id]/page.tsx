"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, DollarSign, Pause, Sparkles, TrendingUp, Wallet } from "lucide-react";
import { useAsync } from "@/hooks/use-async";
import { getBusinessById } from "@/lib/api";
import { arUsageSeries, revenueGrowthSeries } from "@/lib/mock/series";
import { PageHeader } from "@/components/shell/page-header";
import { SectionCard } from "@/components/ui/glass-panel";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaTrend } from "@/components/charts/charts";
import { EmptyState, LoadingState } from "@/components/feedback/states";
import { inr, num, pct, shortDate } from "@/lib/format";

export default function AdminBusinessDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, loading } = useAsync(() => getBusinessById(params.id), [params.id]);

  if (loading) return <LoadingState label="Loading business" />;
  if (!data) return <EmptyState title="Business not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.name}
        description={`${data.industry} · ${data.region} · joined ${shortDate(data.createdAt)}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" render={<Link href="/admin/businesses" />} nativeButton={false}>
              <ArrowLeft className="size-4" /> All businesses
            </Button>
            <Button variant="outline" size="sm">Impersonate</Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Pause className="size-4" /> Suspend
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={data.status} />
        <Badge tone="brand">{data.industry}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="MRR" value={inr(data.mrr, true)} icon={DollarSign} accent />
        <KpiCard label="AR Generated" value={num(data.arGenerated)} icon={Sparkles} />
        <KpiCard label="Conversion" value={pct(data.conversionRate * 100)} icon={TrendingUp} />
        <KpiCard label="Credits Left" value={num(data.creditsRemaining)} icon={Wallet} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Revenue Contribution" description="Last 12 months">
          <AreaTrend data={revenueGrowthSeries()} series={[{ key: "mrr", color: "var(--color-chart-2)" }]} format={(v) => inr(Number(v), true)} />
        </SectionCard>
        <SectionCard title="AR Usage" description="Last 30 days">
          <AreaTrend data={arUsageSeries()} series={[{ key: "generated", color: "var(--color-chart-1)" }]} format={(v) => num(Number(v))} />
        </SectionCard>
      </div>
    </div>
  );
}
