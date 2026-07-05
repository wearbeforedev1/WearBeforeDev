import {
  Bell,
  Building2,
  LayoutDashboard,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Capability } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  capability?: Capability;
  exact?: boolean;
}

export const ADMIN_NAV: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Businesses", href: "/admin/businesses", icon: Building2 },
  { label: "Revenue", href: "/admin/revenue", icon: TrendingUp },
  { label: "AR Platform", href: "/admin/ar-platform", icon: Sparkles },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Plans", href: "/admin/plans", icon: Layers },
  { label: "Activity", href: "/admin/activity", icon: Bell },
];
