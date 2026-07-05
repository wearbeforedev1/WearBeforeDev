"use client";

import * as React from "react";
import type { Capability, Role, User } from "@/lib/types";
import { can as canFn, ROLE_LABEL } from "@/lib/auth/capabilities";
import { CURRENT_USER, CURRENT_BUSINESS, SUPER_ADMIN } from "@/lib/mock/data";

interface AuthState {
  user: User;
  businessName: string;
  role: Role;
  setRole: (role: Role) => void;
  can: (capability: Capability) => boolean;
  roleLabel: string;
}

const AuthContext = React.createContext<AuthState | null>(null);
const STORAGE_KEY = "wb.role";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>("owner");

  React.useEffect(() => {
    // Sync from persisted preference after mount to avoid SSR/CSR hydration mismatch.
    const stored = window.localStorage.getItem(STORAGE_KEY) as Role | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setRoleState(stored);
  }, []);

  const setRole = React.useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = React.useMemo<AuthState>(() => {
    const base = role === "super_admin" ? SUPER_ADMIN : CURRENT_USER;
    const user: User = { ...base, role };
    return {
      user,
      businessName: role === "super_admin" ? "WearBefore Platform" : CURRENT_BUSINESS.name,
      role,
      setRole,
      can: (capability: Capability) => canFn(role, capability),
      roleLabel: ROLE_LABEL[role],
    };
  }, [role, setRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
