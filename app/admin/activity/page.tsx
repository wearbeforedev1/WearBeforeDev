"use client";

import { useAsync } from "@/hooks/use-async";
import { getPlatformActivity } from "@/lib/api";
import { PageHeader } from "@/components/shell/page-header";
import { SectionCard } from "@/components/ui/glass-panel";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { LoadingState } from "@/components/feedback/states";

export default function AdminActivityPage() {
  const { data, loading } = useAsync(getPlatformActivity);
  if (loading || !data) return <LoadingState label="Loading activity" />;

  return (
    <div className="space-y-6">
      <PageHeader title="Activity" description="Real-time stream of events across the platform." />
      <SectionCard bodyClassName="p-3">
        <ActivityFeed items={data} />
      </SectionCard>
    </div>
  );
}
