import {
  CheckCircle2,
  CreditCard,
  PackagePlus,
  Sparkles,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/format";
import type { ActivityLog, ActivityType } from "@/lib/types";

const META: Record<ActivityType, { icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  business_signup: { icon: UserPlus, tone: "text-[var(--brand-from)]" },
  subscription_purchase: { icon: CreditCard, tone: "text-[oklch(0.78_0.16_250)]" },
  ar_generated: { icon: Sparkles, tone: "text-[var(--brand-to)]" },
  conversion_completed: { icon: CheckCircle2, tone: "text-[oklch(0.8_0.17_162)]" },
  credit_purchase: { icon: Wallet, tone: "text-[oklch(0.86_0.16_84)]" },
  product_uploaded: { icon: PackagePlus, tone: "text-[oklch(0.78_0.16_320)]" },
  customer_added: { icon: Zap, tone: "text-[var(--brand-via)]" },
};

export function ActivityFeed({ items }: { items: ActivityLog[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const meta = META[item.type];
        const Icon = meta.icon;
        return (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/5"
          >
            <span className={cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border bg-white/5", meta.tone)}>
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">{item.message}</p>
              <p className="text-muted-foreground mt-0.5 text-xs">{relativeTime(item.createdAt)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
