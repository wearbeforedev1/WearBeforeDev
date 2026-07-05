import type {
  ActivityLog,
  ActivityType,
  Business,
  Category,
  CreditLedgerEntry,
  Customer,
  GarmentCategory,
  Industry,
  Invoice,
  Order,
  Plan,
  Product,
  Session,
  Subscription,
  User,
  FunnelStage,
  DeviceType,
} from "@/lib/types";
import { Rng, daysAgo } from "./seed";

const rng = new Rng(20260605);

export const CATEGORIES: Category[] = (
  [
    "Saree",
    "Kurti",
    "Shirt",
    "Blazer",
    "Suit",
    "Sherwani",
    "Indo-Western",
  ] as GarmentCategory[]
).map((name) => ({ id: `cat_${name.toLowerCase()}`, name, slug: name.toLowerCase() }));

export const PLANS: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    priceMonthly: 4999,
    priceAnnual: 49990,
    creditAllotment: 500,
    features: ["500 AR previews / mo", "2 team seats", "Basic analytics", "Email support"],
  },
  {
    id: "plan_pro",
    name: "Pro",
    priceMonthly: 14999,
    priceAnnual: 149990,
    creditAllotment: 2500,
    features: [
      "2,500 AR previews / mo",
      "8 team seats",
      "Advanced analytics",
      "Conversion funnel",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "plan_scale",
    name: "Scale",
    priceMonthly: 39999,
    priceAnnual: 399990,
    creditAllotment: 10000,
    features: [
      "10,000 AR previews / mo",
      "Unlimited seats",
      "Full analytics suite",
      "Custom categories",
      "Dedicated manager",
    ],
  },
];

const INDUSTRIES: Industry[] = [
  "Saree Vendor",
  "Suit Vendor",
  "Kurti Seller",
  "Boutique",
  "Fashion Brand",
  "Wholesaler",
  "Custom Tailor",
  "Manufacturer",
];

const REGIONS = ["Mumbai", "Delhi", "Bengaluru", "Surat", "Jaipur", "Chennai", "Kolkata", "Pune"];

const BRAND_NAMES = [
  "Raymond", "Pantaloons", "Manyavar", "Jack & Jones", "Duke",
  "Nalli Silks", "FabIndia", "Soch", "Biba", "W for Woman",
  "Kalki Fashion", "Sabyasachi Atelier", "House of Masaba", "Anita Dongre",
  "Libas", "Aurelia", "Global Desi", "Cottinfab", "Zudio", "Max Fashion",
  "Reliance Trends", "Vedant Fashions", "Snitch", "Bewakoof",
];

const COLORS = ["#9b99fe", "#6366f1", "#2bc8b7", "#c084fc", "#38bdf8", "#f472b6"];

function makeUserForBusiness(businessId: string, name: string): User {
  return {
    id: rng.id("usr"),
    businessId,
    role: "owner",
    name,
    email: `${name.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
    avatarColor: rng.pick(COLORS),
    status: "active",
    lastActiveAt: daysAgo(rng.int(0, 5)),
  };
}

export const BUSINESSES: Business[] = BRAND_NAMES.map((name, i) => {
  const ownerId = rng.id("usr");
  const planId = rng.pick(PLANS).id;
  const status = rng.pick<Business["status"]>(
    i < 16 ? ["active", "active", "active", "trial"] : ["trial", "active", "past_due", "suspended"]
  );
  const arGenerated = rng.int(120, 9800);
  const conversionRate = rng.float(0.08, 0.42);
  return {
    id: `biz_${i + 1}`,
    name,
    industry: rng.pick(INDUSTRIES),
    planId,
    status,
    creditsRemaining: rng.int(40, 4200),
    arGenerated,
    conversionRate,
    revenueGenerated: Math.round(arGenerated * conversionRate * rng.int(900, 4200)),
    mrr: PLANS.find((p) => p.id === planId)!.priceMonthly,
    ownerId,
    createdAt: daysAgo(rng.int(2, 420)),
    region: rng.pick(REGIONS),
  };
});

// The "current" business used by the business app prototype.
export const CURRENT_BUSINESS: Business = BUSINESSES[0];

export const CURRENT_USER: User = makeUserForBusiness(CURRENT_BUSINESS.id, "Akarsh Mehta");
CURRENT_USER.id = CURRENT_BUSINESS.ownerId;

export const SUPER_ADMIN: User = {
  id: "usr_admin",
  businessId: null,
  role: "super_admin",
  name: "WearBefore Ops",
  email: "ops@wearbefore.com",
  avatarColor: "#6366f1",
  status: "active",
  lastActiveAt: daysAgo(0),
};

export const TEAM: User[] = [
  CURRENT_USER,
  {
    id: rng.id("usr"),
    businessId: CURRENT_BUSINESS.id,
    role: "manager",
    name: "Priya Nair",
    email: "priya@example.com",
    avatarColor: "#2bc8b7",
    status: "active",
    lastActiveAt: daysAgo(1),
  },
  {
    id: rng.id("usr"),
    businessId: CURRENT_BUSINESS.id,
    role: "operator",
    name: "Rahul Verma",
    email: "rahul@example.com",
    avatarColor: "#c084fc",
    status: "active",
    lastActiveAt: daysAgo(2),
  },
  {
    id: rng.id("usr"),
    businessId: CURRENT_BUSINESS.id,
    role: "analyst",
    name: "Sara Khan",
    email: "sara@example.com",
    avatarColor: "#38bdf8",
    status: "invited",
    lastActiveAt: daysAgo(9),
  },
];

const PRODUCT_PREFIXES: Record<GarmentCategory, string[]> = {
  Saree: ["Banarasi", "Kanjivaram", "Chiffon", "Georgette", "Silk"],
  Kurti: ["Anarkali", "Straight", "A-Line", "Cotton", "Printed"],
  Gown: ["Evening", "Ball", "A-Line", "Mermaid", "Slip"],
  Lehenga: ["Bridal", "Flared", "A-Line", "Mermaid", "Jacket"],
  Anarkali: ["Floor-Length", "Flared", "Layered", "Cotton", "Silk"],
  Shirt: ["Linen", "Oxford", "Slim-Fit", "Formal", "Casual"],
  Trousers: ["Chino", "Pleated", "Slim", "Formal", "Tapered"],
  Blazer: ["Tailored", "Double-Breasted", "Velvet", "Tweed", "Classic"],
  Suit: ["3-Piece", "Tuxedo", "Wool", "Italian", "Business"],
  "3-Piece Suit": ["Classic", "Tuxedo", "Wool", "Italian", "Business"],
  Kurta: ["Pathani", "Cotton", "Linen", "Silk", "Printed"],
  Sherwani: ["Royal", "Embroidered", "Velvet", "Jodhpuri", "Classic"],
  "Nehru Jacket": ["Silk", "Bandhgala", "Velvet", "Printed", "Classic"],
  "Indo-Western": ["Fusion", "Draped", "Asymmetric", "Cape", "Layered"],
};

export const PRODUCTS: Product[] = Array.from({ length: 28 }, (_, i) => {
  const category = rng.pick(CATEGORIES).name;
  const arViews = rng.int(40, 3200);
  const conversionRate = rng.float(0.06, 0.46);
  const orders = Math.round(arViews * conversionRate);
  const price = rng.int(1200, 28000);
  return {
    id: `prd_${i + 1}`,
    businessId: CURRENT_BUSINESS.id,
    category,
    name: `${rng.pick(PRODUCT_PREFIXES[category])} ${category}`,
    sku: `WB-${category.slice(0, 3).toUpperCase()}-${1000 + i}`,
    price,
    status: rng.pick<Product["status"]>(["active", "active", "active", "draft", "archived"]),
    arViews,
    orders,
    conversionRate,
    revenue: orders * price,
    createdAt: daysAgo(rng.int(1, 240)),
  } satisfies Product;
});

const DEVICES: DeviceType[] = ["Mobile", "Mobile", "Mobile", "Tablet", "Desktop"];

export const CUSTOMERS: Customer[] = Array.from({ length: 64 }, (_, i) => {
  const sessions = rng.int(1, 12);
  const isRepeat = sessions > 2;
  return {
    id: `cus_${i + 1}`,
    businessId: CURRENT_BUSINESS.id,
    handle: `customer_${(i + 1).toString().padStart(3, "0")}`,
    device: rng.pick(DEVICES),
    isRepeat,
    sessions,
    orders: rng.int(0, Math.max(1, Math.floor(sessions / 2))),
    engagementScore: rng.int(18, 98),
    firstSeenAt: daysAgo(rng.int(30, 200)),
    lastSeenAt: daysAgo(rng.int(0, 28)),
  } satisfies Customer;
});

const FUNNEL_STAGES: FunnelStage[] = [
  "link_opened",
  "ar_viewed",
  "interaction_started",
  "product_saved",
  "add_to_cart",
  "order_completed",
];

export const SESSIONS: Session[] = Array.from({ length: 220 }, (_, i) => {
  const customer = rng.pick(CUSTOMERS);
  const product = rng.pick(PRODUCTS);
  const durationSec = rng.int(4, 320);
  const interactionCount = rng.int(0, 14);
  const stageIdx = rng.int(0, FUNNEL_STAGES.length - 1);
  const converted = FUNNEL_STAGES[stageIdx] === "order_completed";
  const engagementScore = Math.min(
    100,
    Math.round(interactionCount * 6 + Math.min(durationSec, 180) / 3 + (converted ? 18 : 0))
  );
  return {
    id: `ses_${i + 1}`,
    businessId: CURRENT_BUSINESS.id,
    arGenerationId: `arg_${i + 1}`,
    customerId: customer.id,
    customerHandle: customer.handle,
    device: customer.device,
    durationSec,
    productsViewed: rng.int(1, 8),
    interactionCount,
    engagementScore,
    qualityScore: Math.min(100, Math.round(engagementScore * rng.float(0.8, 1.1))),
    conversionLikelihood: Math.min(
      100,
      Math.round(engagementScore * rng.float(0.7, 1.0) + (customer.isRepeat ? 10 : 0))
    ),
    funnelStage: FUNNEL_STAGES[stageIdx],
    converted,
    createdAt: daysAgo(rng.int(0, 60)),
    _product: product.id,
  } as Session & { _product: string };
});

export const ORDERS: Order[] = SESSIONS.filter((s) => s.converted).map((s, i) => ({
  id: `ord_${i + 1}`,
  businessId: CURRENT_BUSINESS.id,
  sessionId: s.id,
  customerId: s.customerId,
  amount: rng.int(1200, 26000),
  status: rng.pick<Order["status"]>(["completed", "completed", "completed", "pending", "refunded"]),
  createdAt: s.createdAt,
}));

export const CREDIT_LEDGER: CreditLedgerEntry[] = (() => {
  let balance = CURRENT_BUSINESS.creditsRemaining + 1800;
  const entries: CreditLedgerEntry[] = [];
  for (let i = 0; i < 40; i++) {
    const isPurchase = rng.bool(0.25);
    const delta = isPurchase ? rng.int(200, 1000) : -rng.int(1, 12);
    balance += delta;
    entries.push({
      id: `cl_${i + 1}`,
      businessId: CURRENT_BUSINESS.id,
      delta,
      reason: isPurchase ? "purchase" : "generation",
      balanceAfter: balance,
      createdAt: daysAgo(40 - i),
    });
  }
  return entries.reverse();
})();

export const SUBSCRIPTION: Subscription = {
  id: "sub_1",
  businessId: CURRENT_BUSINESS.id,
  planId: "plan_pro",
  status: "active",
  renewsAt: daysAgo(-12),
  billingCycle: "monthly",
};

export const INVOICES: Invoice[] = Array.from({ length: 8 }, (_, i) => ({
  id: `inv_${i + 1}`,
  businessId: CURRENT_BUSINESS.id,
  number: `WB-2026-${(1000 + i).toString()}`,
  amount: 14999,
  status: i === 0 ? "open" : "paid",
  periodStart: daysAgo((i + 1) * 30),
  periodEnd: daysAgo(i * 30),
  createdAt: daysAgo(i * 30),
}));

const ACTIVITY_TEMPLATES: Record<ActivityType, (name: string) => string> = {
  business_signup: (n) => `${n} created a new account`,
  subscription_purchase: (n) => `${n} upgraded to the Pro plan`,
  ar_generated: (n) => `${n} generated a new AR preview`,
  conversion_completed: (n) => `${n} converted a preview into an order`,
  credit_purchase: (n) => `${n} purchased a credit pack`,
  product_uploaded: (n) => `${n} uploaded a new product`,
  customer_added: (n) => `${n} added a new customer`,
};

function makeActivity(scope: "platform" | "business", count: number): ActivityLog[] {
  const types = Object.keys(ACTIVITY_TEMPLATES) as ActivityType[];
  return Array.from({ length: count }, (_, i) => {
    const type = rng.pick(types);
    const actorName =
      scope === "platform" ? rng.pick(BRAND_NAMES) : rng.pick(TEAM).name;
    return {
      id: `act_${scope}_${i + 1}`,
      businessId: scope === "platform" ? null : CURRENT_BUSINESS.id,
      actorName,
      type,
      message: ACTIVITY_TEMPLATES[type](actorName),
      createdAt: daysAgo(0).slice(0, 10) + `T${(23 - i).toString().padStart(2, "0")}:00:00.000Z`,
    } satisfies ActivityLog;
  });
}

export const PLATFORM_ACTIVITY = makeActivity("platform", 18);
export const BUSINESS_ACTIVITY = makeActivity("business", 14);

export { rng as mockRng };
