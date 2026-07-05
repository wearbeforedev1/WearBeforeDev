import { AuthProvider } from "@/hooks/use-auth";
import { DashboardShell } from "@/components/shell/dashboard-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardShell variant="admin">{children}</DashboardShell>
    </AuthProvider>
  );
}
