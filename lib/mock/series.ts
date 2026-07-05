import type { FunnelPoint, TimePoint } from "@/lib/types";
import { Rng, isoDay } from "./seed";

const rng = new Rng(99);

function trend(days: number, base: number, growth: number, noise: number): number[] {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < days; i++) {
    v = v * (1 + growth) + rng.float(-noise, noise) * base;
    out.push(Math.max(0, Math.round(v)));
  }
  return out;
}

export function arUsageSeries(days = 30): TimePoint[] {
  const generated = trend(days, 120, 0.012, 0.12);
  const viewed = generated.map((g) => Math.round(g * rng.float(0.7, 0.95)));
  return Array.from({ length: days }, (_, i) => ({
    date: isoDay(days - 1 - i),
    generated: generated[i],
    viewed: viewed[i],
  }));
}

export function revenueGrowthSeries(months = 12): TimePoint[] {
  const mrr = trend(months, 280000, 0.08, 0.05);
  const credits = trend(months, 60000, 0.06, 0.1);
  const names = [
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  ];
  return Array.from({ length: months }, (_, i) => ({
    date: names[i % 12],
    mrr: mrr[i],
    credits: credits[i],
  }));
}

export function businessGrowthSeries(months = 12): TimePoint[] {
  let total = 40;
  const names = [
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  ];
  return Array.from({ length: months }, (_, i) => {
    const added = rng.int(6, 22);
    const churned = rng.int(0, 5);
    total += added - churned;
    return { date: names[i % 12], total, added, churned };
  });
}

export function conversionTrendSeries(days = 30): TimePoint[] {
  return Array.from({ length: days }, (_, i) => ({
    date: isoDay(days - 1 - i),
    rate: Number(rng.float(0.16, 0.38).toFixed(3)) * 100,
    target: 28,
  }));
}

export function categoryPerformance(): TimePoint[] {
  const cats = ["Saree", "Kurti", "Shirt", "Blazer", "Suit", "Sherwani", "Indo-Western"];
  return cats.map((c) => ({
    date: c,
    views: rng.int(800, 6400),
    conversion: Number(rng.float(0.1, 0.4).toFixed(2)) * 100,
  }));
}

export function deviceSplit(): TimePoint[] {
  return [
    { date: "Mobile", value: rng.int(58, 70) },
    { date: "Tablet", value: rng.int(12, 20) },
    { date: "Desktop", value: rng.int(14, 24) },
  ];
}

export function retentionSeries(weeks = 8): TimePoint[] {
  let v = 100;
  return Array.from({ length: weeks }, (_, i) => {
    if (i > 0) v = v * rng.float(0.82, 0.95);
    return { date: `W${i + 1}`, retention: Math.round(v) };
  });
}

export function conversionFunnel(): FunnelPoint[] {
  const stages = [
    "Link Opened",
    "AR Viewed",
    "Interaction Started",
    "Product Saved",
    "Add to Cart",
    "Order Completed",
  ];
  let v = 10000;
  return stages.map((stage, i) => {
    if (i > 0) v = Math.round(v * rng.float(0.55, 0.82));
    return { stage, value: v };
  });
}

export function activityHeatmap(): { day: string; hour: number; value: number }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cells: { day: string; hour: number; value: number }[] = [];
  for (const day of days) {
    for (let hour = 0; hour < 24; hour++) {
      const peak = hour >= 10 && hour <= 22 ? 1 : 0.25;
      cells.push({ day, hour, value: Math.round(rng.float(0, 100) * peak) });
    }
  }
  return cells;
}

export function creditConsumptionSeries(days = 30): TimePoint[] {
  return Array.from({ length: days }, (_, i) => ({
    date: isoDay(days - 1 - i),
    used: rng.int(8, 80),
  }));
}
