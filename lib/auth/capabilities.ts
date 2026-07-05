import type { Capability, Role } from "@/lib/types";

const OWNER_CAPS: Capability[] = [
  "billing:read",
  "billing:write",
  "ar:generate",
  "product:read",
  "product:write",
  "customer:read",
  "customer:write",
  "analytics:read",
  "staff:manage",
];

export const ROLE_CAPABILITIES: Record<Role, Capability[]> = {
  super_admin: ["platform:admin", ...OWNER_CAPS],
  owner: OWNER_CAPS,
  manager: [
    "billing:read",
    "ar:generate",
    "product:read",
    "product:write",
    "customer:read",
    "customer:write",
    "analytics:read",
  ],
  operator: ["ar:generate", "product:read", "product:write", "customer:read", "customer:write"],
  analyst: ["product:read", "customer:read", "analytics:read"],
};

export function can(role: Role, capability: Capability): boolean {
  return ROLE_CAPABILITIES[role]?.includes(capability) ?? false;
}

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  owner: "Owner",
  manager: "Manager",
  operator: "Operator",
  analyst: "Analyst",
};
