export function HealthGauge({
  score,
  size = 160,
  label = "Health",
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius; // semicircle
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference * (1 - clamped / 100);
  const status = clamped >= 75 ? "Excellent" : clamped >= 50 ? "Healthy" : clamped >= 30 ? "At risk" : "Critical";

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 8} viewBox={`0 0 ${size} ${size / 2 + 8}`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-from)" />
            <stop offset="50%" stopColor="var(--brand-via)" />
            <stop offset="100%" stopColor="var(--brand-to)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="-mt-8 text-center">
        <p className="text-3xl font-semibold tabular-nums">{clamped}</p>
        <p className="text-muted-foreground text-xs">
          {label} · {status}
        </p>
      </div>
    </div>
  );
}

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="bg-muted/50 h-2 w-full overflow-hidden rounded-full">
      <div className="bg-gradient-brand h-full rounded-full" style={{ width: `${pct}%` }} />
    </div>
  );
}
