import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_NAV } from "@/lib/site";
import { setLangFrom } from "@/i18n/server";

export default async function AdminLayout({
  children, params }: {
  children: React.ReactNode;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  return (
    <DashboardShell nav={ADMIN_NAV} area="Admin">
      {children}
    </DashboardShell>
  );
}
