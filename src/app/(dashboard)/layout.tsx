import type { ReactNode } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { getRecentNotifications, getSessionContext } from "@/lib/data/session";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const session = getSessionContext();
  const notifications = getRecentNotifications(session.currentOrganization.id);

  return (
    <MainLayout session={session} notifications={notifications}>
      {children}
    </MainLayout>
  );
}
