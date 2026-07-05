// Async data access layer. Returns typed mock data with simulated latency so it
// can be swapped for real fetch/Supabase/Prisma calls without changing the UI.

import {
  BUSINESSES,
  BUSINESS_ACTIVITY,
  CATEGORIES,
  CREDIT_LEDGER,
  CURRENT_BUSINESS,
  CUSTOMERS,
  INVOICES,
  ORDERS,
  PLANS,
  PLATFORM_ACTIVITY,
  PRODUCTS,
  SESSIONS,
  SUBSCRIPTION,
  TEAM,
} from "@/lib/mock/data";
import {
  activityHeatmap,
  arUsageSeries,
  businessGrowthSeries,
  categoryPerformance,
  conversionFunnel,
  conversionTrendSeries,
  creditConsumptionSeries,
  deviceSplit,
  retentionSeries,
  revenueGrowthSeries,
} from "@/lib/mock/series";
import { accountHealthScore, summarizeSessions } from "@/lib/analytics/scoring";
import type { KpiDelta } from "@/lib/types";

function delay<T>(value: T, ms = 240): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function delta(value: number, direction: KpiDelta["direction"] = "up"): KpiDelta {
  return { value, direction };
}

// -------- Admin (platform) --------

export async function getAdminMetrics() {
  const total = BUSINESSES.length;
  const active = BUSINESSES.filter((b) => b.status === "active").length;
  const trial = BUSINESSES.filter((b) => b.status === "trial").length;
  const paid = BUSINESSES.filter((b) => b.status === "active" || b.status === "past_due").length;
  const mrr = BUSINESSES.reduce((a, b) => a + (b.status === "active" ? b.mrr : 0), 0);
  const arGenerated = BUSINESSES.reduce((a, b) => a + b.arGenerated, 0);
  return delay({
    business: {
      total,
      active,
      newThisWeek: 7,
      trial,
      paid,
      churnRate: 2.4,
      mrr,
      arr: mrr * 12,
      revenueGrowth: 18.6,
    },
    ar: {
      total: arGenerated,
      today: 1284,
      week: 8460,
      month: 34210,
      avgSessionDuration: 78,
      avgConversion: 27.4,
    },
    customer: {
      totalReached: 184320,
      returning: 51240,
      activeSessions: 312,
    },
    deltas: {
      mrr: delta(12.4),
      businesses: delta(6.1),
      ar: delta(9.8),
      churn: delta(0.3, "down"),
    },
  });
}

export async function getAdminCharts() {
  return delay({
    revenue: revenueGrowthSeries(),
    arUsage: arUsageSeries(),
    businessGrowth: businessGrowthSeries(),
    conversion: conversionTrendSeries(),
    category: categoryPerformance(),
    heatmap: activityHeatmap(),
  });
}

export async function getBusinessesTable() {
  return delay(
    BUSINESSES.map((b) => ({
      ...b,
      planName: PLANS.find((p) => p.id === b.planId)?.name ?? "—",
    }))
  );
}

export async function getBusinessById(id: string) {
  const biz = BUSINESSES.find((b) => b.id === id) ?? null;
  return delay(biz);
}

export async function getPlatformActivity() {
  return delay(PLATFORM_ACTIVITY);
}

// -------- Business (tenant) --------

export async function getCurrentBusiness() {
  return delay(CURRENT_BUSINESS);
}

export async function getBusinessHome() {
  const sessions = summarizeSessions(SESSIONS);
  const repeatRate = CUSTOMERS.filter((c) => c.isRepeat).length / CUSTOMERS.length;
  const plan = PLANS.find((p) => p.id === SUBSCRIPTION.planId)!;
  const creditRunway = CURRENT_BUSINESS.creditsRemaining / plan.creditAllotment;
  const health = accountHealthScore({
    conversionRate: CURRENT_BUSINESS.conversionRate,
    creditRunwayPct: Math.min(1, creditRunway),
    activeRate: sessions.activeRate,
    repeatRate,
  });
  return delay({
    business: CURRENT_BUSINESS,
    plan,
    subscription: SUBSCRIPTION,
    usage: {
      creditsUsed: plan.creditAllotment - CURRENT_BUSINESS.creditsRemaining,
      creditsRemaining: CURRENT_BUSINESS.creditsRemaining,
      creditAllotment: plan.creditAllotment,
      arGenerated: CURRENT_BUSINESS.arGenerated,
      ordersGenerated: ORDERS.length,
    },
    activity: BUSINESS_ACTIVITY.slice(0, 8),
    trendingProducts: [...PRODUCTS].sort((a, b) => b.arViews - a.arViews).slice(0, 5),
    topCategories: categoryPerformance().sort((a, b) => Number(b.views) - Number(a.views)).slice(0, 5),
    healthScore: health,
    activeCustomers: CUSTOMERS.filter(
      (c) => new Date(c.lastSeenAt).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 14
    ).length,
  });
}

export async function getBusinessKpis() {
  const sessions = summarizeSessions(SESSIONS);
  const revenueInfluenced = ORDERS.reduce((a, o) => a + o.amount, 0);
  return delay({
    arPreviews: { today: 142, week: 980, month: 3820, all: CURRENT_BUSINESS.arGenerated },
    conversionRate: CURRENT_BUSINESS.conversionRate * 100,
    orders: ORDERS.length,
    revenueInfluenced,
    creditsRemaining: CURRENT_BUSINESS.creditsRemaining,
    activeCustomers: CUSTOMERS.filter((c) => c.sessions > 1).length,
    avgSessionDuration: Math.round(
      SESSIONS.reduce((a, s) => a + s.durationSec, 0) / SESSIONS.length
    ),
    engagementScore: sessions.avgEngagement,
    deltas: {
      arPreviews: delta(11.2),
      conversion: delta(3.4),
      orders: delta(7.8),
      revenue: delta(14.1),
      engagement: delta(2.2),
    },
  });
}

export async function getBusinessCharts() {
  return delay({
    arUsage: arUsageSeries(),
    funnel: conversionFunnel(),
    retention: retentionSeries(),
    category: categoryPerformance(),
    device: deviceSplit(),
    conversion: conversionTrendSeries(),
  });
}

export async function getSessions() {
  return delay(SESSIONS);
}

export async function getProducts() {
  return delay(PRODUCTS);
}

export async function getProductById(id: string) {
  return delay(PRODUCTS.find((p) => p.id === id) ?? null);
}

export async function getCustomers() {
  return delay(CUSTOMERS);
}

export async function getCustomerById(id: string) {
  return delay(CUSTOMERS.find((c) => c.id === id) ?? null);
}

export async function getCategories() {
  return delay(CATEGORIES);
}

export async function getTeam() {
  return delay(TEAM);
}

// -------- Billing --------

export async function getBilling() {
  const plan = PLANS.find((p) => p.id === SUBSCRIPTION.planId)!;
  return delay({
    plan,
    plans: PLANS,
    subscription: SUBSCRIPTION,
    invoices: INVOICES,
    ledger: CREDIT_LEDGER,
    consumption: creditConsumptionSeries(),
    creditsUsed: plan.creditAllotment - CURRENT_BUSINESS.creditsRemaining,
    creditsRemaining: CURRENT_BUSINESS.creditsRemaining,
    creditAllotment: plan.creditAllotment,
  });
}

export async function getPlans() {
  return delay(PLANS);
}
