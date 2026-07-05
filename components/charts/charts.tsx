"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimePoint } from "@/lib/types";
import { ChartTooltip } from "./chart-tooltip";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
];

const axisProps = {
  stroke: "var(--color-muted-foreground)",
  tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
  tickLine: false,
  axisLine: false,
};

interface SeriesDef {
  key: string;
  color?: string;
}

export function AreaTrend({
  data,
  series,
  height = 240,
  format,
}: {
  data: TimePoint[];
  series: SeriesDef[];
  height?: number;
  format?: (v: number | string, name?: string) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color ?? CHART_COLORS[i]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={s.color ?? CHART_COLORS[i]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="date" {...axisProps} minTickGap={24} />
        <YAxis {...axisProps} width={48} />
        <Tooltip content={<ChartTooltip formatter={format} />} cursor={{ stroke: "var(--color-border)" }} />
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={s.color ?? CHART_COLORS[i]}
            strokeWidth={2}
            fill={`url(#grad-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineTrend({
  data,
  series,
  height = 240,
  format,
}: {
  data: TimePoint[];
  series: SeriesDef[];
  height?: number;
  format?: (v: number | string, name?: string) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="date" {...axisProps} minTickGap={24} />
        <YAxis {...axisProps} width={48} />
        <Tooltip content={<ChartTooltip formatter={format} />} cursor={{ stroke: "var(--color-border)" }} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={s.color ?? CHART_COLORS[i]}
            strokeWidth={2}
            dot={false}
            strokeDasharray={s.key === "target" ? "4 4" : undefined}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarSeries({
  data,
  series,
  height = 240,
  layout = "horizontal",
  format,
}: {
  data: TimePoint[];
  series: SeriesDef[];
  height?: number;
  layout?: "horizontal" | "vertical";
  format?: (v: number | string, name?: string) => string;
}) {
  const vertical = layout === "vertical";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 8, left: vertical ? 8 : -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={!vertical} vertical={vertical} />
        {vertical ? (
          <>
            <XAxis type="number" {...axisProps} />
            <YAxis type="category" dataKey="date" {...axisProps} width={90} />
          </>
        ) : (
          <>
            <XAxis dataKey="date" {...axisProps} minTickGap={16} />
            <YAxis {...axisProps} width={48} />
          </>
        )}
        <Tooltip content={<ChartTooltip formatter={format} />} cursor={{ fill: "var(--color-muted)", opacity: 0.3 }} />
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} fill={s.color ?? CHART_COLORS[i]} radius={vertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Donut({
  data,
  height = 220,
  format,
}: {
  data: { date: string; value: number }[];
  height?: number;
  format?: (v: number | string, name?: string) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="date"
          innerRadius="58%"
          outerRadius="82%"
          paddingAngle={3}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip formatter={format} />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({
  data,
  color = "var(--color-chart-2)",
  dataKey = "value",
  height = 48,
}: {
  data: TimePoint[];
  color?: string;
  dataKey?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} fill={`url(#spark-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export { CHART_COLORS };
