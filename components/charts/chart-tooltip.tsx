"use client";

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatter?: (value: number | string, name?: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover/95 rounded-xl border px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      {label && <p className="text-muted-foreground mb-1 font-medium">{label}</p>}
      <div className="space-y-1">
        {payload.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground capitalize">{item.name}</span>
            <span className="text-foreground ml-auto font-medium tabular-nums">
              {formatter ? formatter(item.value ?? 0, item.name) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
