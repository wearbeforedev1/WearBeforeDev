interface Cell {
  day: string;
  hour: number;
  value: number;
}

export function Heatmap({ cells }: { cells: Cell[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const max = Math.max(...cells.map((c) => c.value), 1);
  const byKey = new Map(cells.map((c) => [`${c.day}-${c.hour}`, c.value]));

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="flex flex-col gap-1">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-1">
              <span className="text-muted-foreground w-8 shrink-0 text-[10px]">{day}</span>
              <div className="flex flex-1 gap-1">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const value = byKey.get(`${day}-${hour}`) ?? 0;
                  const intensity = value / max;
                  return (
                    <div
                      key={hour}
                      title={`${day} ${hour}:00 — ${value}`}
                      className="aspect-square flex-1 rounded-[3px] border border-white/5"
                      style={{
                        backgroundColor: `color-mix(in oklch, var(--brand-via) ${Math.round(intensity * 100)}%, transparent)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mt-2 flex items-center justify-end gap-2 text-[10px]">
          <span>Less</span>
          {[0.15, 0.4, 0.65, 0.9].map((o) => (
            <span
              key={o}
              className="size-3 rounded-[3px]"
              style={{ backgroundColor: `color-mix(in oklch, var(--brand-via) ${o * 100}%, transparent)` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
