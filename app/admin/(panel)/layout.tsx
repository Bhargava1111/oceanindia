import { AdminShell } from "@/components/admin/AdminShell";
import { isDefaultPassword } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell warnPassword={isDefaultPassword()}>{children}</AdminShell>;
}
