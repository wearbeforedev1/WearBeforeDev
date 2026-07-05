import type { InteractionType, Session } from "@/lib/types";

export const MEANINGFUL_INTERACTIONS: InteractionType[] = [
  "rotate",
  "zoom",
  "change_garment",
  "change_variant",
  "save",
  "share",
  "screenshot",
];

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

/** Active session: > 30s OR >= 2 meaningful interactions. */
export function isActiveSession(durationSec: number, interactionCount: number): boolean {
  return durationSec > 30 || interactionCount >= 2;
}

/** Bounce session: leaves within 15s with no interaction. */
export function isBounceSession(durationSec: number, interactionCount: number): boolean {
  return durationSec < 15 && interactionCount === 0;
}

/** Engagement Score (0-100): weighted blend of interactions, dwell time, depth, save/share. */
export function engagementScore(input: {
  interactionCount: number;
  durationSec: number;
  productsViewed: number;
  savedOrShared: boolean;
}): number {
  const interactions = clamp((input.interactionCount / 10) * 100) * 0.4;
  const dwell = clamp((Math.min(input.durationSec, 180) / 180) * 100) * 0.3;
  const depth = clamp((input.productsViewed / 8) * 100) * 0.2;
  const intent = (input.savedOrShared ? 100 : 0) * 0.1;
  return Math.round(clamp(interactions + dwell + depth + intent));
}

/** Session Quality Score: engagement adjusted by recency and funnel progress. */
export function sessionQualityScore(input: {
  engagement: number;
  daysAgo: number;
  funnelDepth: number; // 0..5
}): number {
  const recency = clamp(100 - input.daysAgo * 2, 40, 100) / 100;
  const funnel = 1 + (input.funnelDepth / 5) * 0.25;
  return Math.round(clamp(input.engagement * recency * funnel));
}

/** Conversion Likelihood Score: logistic-style blend of quality and intent signals. */
export function conversionLikelihood(input: {
  quality: number;
  isRepeat: boolean;
  addedToCart: boolean;
  categoryBaseline: number; // 0..1
}): number {
  const z =
    (input.quality / 100) * 2.4 +
    (input.isRepeat ? 0.6 : 0) +
    (input.addedToCart ? 1.1 : 0) +
    input.categoryBaseline * 1.2 -
    1.8;
  const p = 1 / (1 + Math.exp(-z));
  return Math.round(clamp(p * 100));
}

export function likelihoodBand(score: number): "Low" | "Medium" | "High" {
  if (score >= 66) return "High";
  if (score >= 33) return "Medium";
  return "Low";
}

/** Account health: composite of usage, conversion, retention and credit runway. */
export function accountHealthScore(input: {
  conversionRate: number; // 0..1
  creditRunwayPct: number; // 0..1
  activeRate: number; // 0..1
  repeatRate: number; // 0..1
}): number {
  return Math.round(
    clamp(
      input.conversionRate * 100 * 0.3 +
        input.creditRunwayPct * 100 * 0.2 +
        input.activeRate * 100 * 0.3 +
        input.repeatRate * 100 * 0.2
    )
  );
}

export function summarizeSessions(sessions: Session[]) {
  const active = sessions.filter((s) => isActiveSession(s.durationSec, s.interactionCount));
  const bounce = sessions.filter((s) => isBounceSession(s.durationSec, s.interactionCount));
  const avgEngagement =
    sessions.reduce((a, s) => a + s.engagementScore, 0) / Math.max(1, sessions.length);
  return {
    total: sessions.length,
    active: active.length,
    bounce: bounce.length,
    activeRate: active.length / Math.max(1, sessions.length),
    avgEngagement: Math.round(avgEngagement),
  };
}
