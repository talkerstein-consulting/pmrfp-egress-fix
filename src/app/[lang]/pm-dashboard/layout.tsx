import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PM_NAV } from "@/lib/site";
import { setLangFrom } from "@/i18n/server";

export default async function PmDashboardLayout({
  children, params }: {
  children: React.ReactNode;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  return (
    <DashboardShell nav={PM_NAV} area="Property Manager">
      {children}
    </DashboardShell>
  );
}
