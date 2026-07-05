"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAsync } from "@/hooks/use-async";
import { getBusinessesTable } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { DataTable, type Column } from "@/components/tables/data-table";
import { FilterBar } from "@/components/tables/filter-bar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { LoadingState } from "@/components/feedback/states";
import { inr, num, pct } from "@/lib/format";
import type { Business } from "@/lib/types";

type BizRow = Business & { planName: string };

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "trial", label: "Trial" },
  { value: "past_due", label: "Past Due" },
  { value: "suspended", label: "Suspended" },
] as const;

export default function AdminBusinessesPage() {
  const router = useRouter();
  const { data, loading } = useAsync(getBusinessesTable);
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]["value"]>("all");

  if (loading || !data) return <LoadingState label="Loading businesses" />;
  const rows = filter === "all" ? data : data.filter((b) => b.status === filter);

  const columns: Column<BizRow>[] = [
    { key: "name", header: "Business", sortable: true, sortValue: (r) => r.name, render: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-muted-foreground text-xs">{r.region}</p>
      </div>
    ) },
    { key: "industry", header: "Industry", render: (r) => <span className="text-muted-foreground">{r.industry}</span> },
    { key: "planName", header: "Plan", render: (r) => <Badge tone="brand">{r.planName}</Badge> },
    { key: "mrr", header: "MRR", align: "right", sortable: true, sortValue: (r) => r.mrr, render: (r) => inr(r.mrr, true) },
    { key: "arGenerated", header: "AR Gen", align: "right", sortable: true, sortValue: (r) => r.arGenerated, render: (r) => num(r.arGenerated) },
    { key: "conversionRate", header: "Conv %", align: "right", sortable: true, sortValue: (r) => r.conversionRate, render: (r) => pct(r.conversionRate * 100) },
    { key: "revenueGenerated", header: "Revenue", align: "right", sortable: true, sortValue: (r) => r.revenueGenerated, render: (r) => inr(r.revenueGenerated, true) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Businesses" description="All tenants on the WearBefore platform." />
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        searchKeys={["name", "industry", "region"]}
        searchPlaceholder="Search businesses..."
        pageSize={10}
        onRowClick={(r) => router.push(`/admin/businesses/${r.id}`)}
        toolbar={<FilterBar options={FILTERS as never} value={filter} onChange={setFilter} />}
      />
    </div>
  );
}
