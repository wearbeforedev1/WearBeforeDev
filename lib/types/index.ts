// Core domain types for WearBefore. These mirror the planned database entities
// so the mock layer can later be swapped for a real backend without UI changes.

export type Role = "super_admin" | "owner" | "manager" | "operator" | "analyst";

export type Capability =
  | "platform:admin"
  | "billing:read"
  | "billing:write"
  | "ar:generate"
  | "product:read"
  | "product:write"
  | "customer:read"
  | "customer:write"
  | "analytics:read"
  | "staff:manage";

export type BusinessStatus = "trial" | "active" | "past_due" | "suspended";

export type Industry =
  | "Saree Vendor"
  | "Suit Vendor"
  | "Kurti Seller"
  | "Boutique"
  | "Fashion Brand"
  | "Wholesaler"
  | "Custom Tailor"
  | "Manufacturer";

export type GarmentCategory =
  | "Saree"
  | "Kurti"
  | "Gown"
  | "Lehenga"
  | "Anarkali"
  | "Shirt"
  | "Trousers"
  | "Blazer"
  | "Suit"
  | "3-Piece Suit"
  | "Kurta"
  | "Sherwani"
  | "Nehru Jacket"
  | "Indo-Western";

export type DeviceType = "Mobile" | "Tablet" | "Desktop";

export type FunnelStage =
  | "link_opened"
  | "ar_viewed"
  | "interaction_started"
  | "product_saved"
  | "add_to_cart"
  | "order_completed";

export type InteractionType =
  | "rotate"
  | "zoom"
  | "change_garment"
  | "change_variant"
  | "save"
  | "share"
  | "screenshot";

export type ARStatus = "queued" | "processing" | "ready" | "failed";

export interface User {
  id: string;
  businessId: string | null;
  role: Role;
  name: string;
  email: string;
  avatarColor: string;
  status: "active" | "invited" | "disabled";
  lastActiveAt: string;
}

export interface Business {
  id: string;
  name: string;
  industry: Industry;
  planId: string;
  status: BusinessStatus;
  creditsRemaining: number;
  arGenerated: number;
  conversionRate: number;
  revenueGenerated: number;
  mrr: number;
  ownerId: string;
  createdAt: string;
  region: string;
}

export interface Customer {
  id: string;
  businessId: string;
  handle: string;
  device: DeviceType;
  isRepeat: boolean;
  sessions: number;
  orders: number;
  engagementScore: number;
  firstSeenAt: string;
  lastSeenAt: string;
}

export interface Category {
  id: string;
  name: GarmentCategory;
  slug: string;
}

export interface Product {
  id: string;
  businessId: string;
  category: GarmentCategory;
  name: string;
  sku: string;
  price: number;
  status: "active" | "draft" | "archived";
  arViews: number;
  orders: number;
  conversionRate: number;
  revenue: number;
  createdAt: string;
}

export interface ARGeneration {
  id: string;
  businessId: string;
  productId: string;
  customerId: string;
  category: GarmentCategory;
  resultUrl: string;
  provider: string;
  creditCost: number;
  status: ARStatus;
  createdAt: string;
}

export interface Session {
  id: string;
  businessId: string;
  arGenerationId: string;
  customerId: string;
  customerHandle: string;
  device: DeviceType;
  durationSec: number;
  productsViewed: number;
  interactionCount: number;
  engagementScore: number;
  qualityScore: number;
  conversionLikelihood: number;
  funnelStage: FunnelStage;
  converted: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  businessId: string;
  sessionId: string;
  customerId: string;
  amount: number;
  status: "completed" | "pending" | "refunded";
  createdAt: string;
}

export interface CreditLedgerEntry {
  id: string;
  businessId: string;
  delta: number;
  reason: "purchase" | "generation" | "refund" | "grant";
  balanceAfter: number;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  creditAllotment: number;
  features: string[];
  highlighted?: boolean;
}

export interface Subscription {
  id: string;
  businessId: string;
  planId: string;
  status: BusinessStatus;
  renewsAt: string;
  billingCycle: "monthly" | "annual";
}

export interface Invoice {
  id: string;
  businessId: string;
  number: string;
  amount: number;
  status: "paid" | "open" | "void";
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

export type ActivityType =
  | "business_signup"
  | "subscription_purchase"
  | "ar_generated"
  | "conversion_completed"
  | "credit_purchase"
  | "product_uploaded"
  | "customer_added";

export interface ActivityLog {
  id: string;
  businessId: string | null;
  actorName: string;
  type: ActivityType;
  message: string;
  createdAt: string;
}

export interface TimePoint {
  date: string;
  [key: string]: string | number;
}

export interface FunnelPoint {
  stage: string;
  value: number;
}

export type Period = "today" | "week" | "month" | "all";

export interface KpiDelta {
  value: number;
  direction: "up" | "down" | "flat";
}
