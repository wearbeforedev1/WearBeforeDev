import { cn } from "@/lib/utils";
import { num } from "@/lib/format";
import type { FunnelPoint } from "@/lib/types";

export function FunnelChart({ data }: { data: FunnelPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((stage, i) => {
        const width = (stage.value / max) * 100;
        const prev = i > 0 ? data[i - 1].value : stage.value;
        const dropoff = i > 0 ? ((prev - stage.value) / prev) * 100 : 0;
        return (
          <div key={stage.stage}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{stage.stage}</span>
              <span className="flex items-center gap-2">
                <span className="font-medium tabular-nums">{num(stage.value)}</span>
                {i > 0 && (
                  <span className="text-destructive/80 tabular-nums">-{dropoff.toFixed(0)}%</span>
                )}
              </span>
            </div>
            <div className="bg-muted/40 h-8 overflow-hidden rounded-lg">
              <div
                className={cn("bg-gradient-brand h-full rounded-lg")}
                style={{ width: `${width}%`, opacity: 1 - i * 0.1 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
