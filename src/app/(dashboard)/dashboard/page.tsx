import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Palette } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ORGANIZATION_TYPE_LABELS, ROLE_LABELS } from "@/constants";
import { getSessionContext } from "@/lib/data/session";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const { user, currentOrganization, role } = getSessionContext();
  const firstName = user.full_name.split(" ")[0];

  const workspaceDetails = [
    { label: "Organization", value: currentOrganization.name },
    { label: "Organization type", value: ORGANIZATION_TYPE_LABELS[currentOrganization.type] },
    { label: "Your role", value: ROLE_LABELS[role] },
  ];

  return (
    <PageContainer
      title="Dashboard"
      description={`Welcome back, ${firstName}. Here is your workspace at ${currentOrganization.name}.`}
      actions={
        <Link href="/design-system" className={buttonClasses({ variant: "outline" })}>
          <Palette aria-hidden="true" />
          View design system
        </Link>
      }
    >
      <dl className="grid gap-4 sm:grid-cols-3">
        {workspaceDetails.map((detail) => (
          <Card key={detail.label} className="flex min-w-0 flex-col gap-1 p-5">
            <dt className="text-label text-fg-secondary">{detail.label}</dt>
            <dd className="truncate text-card-title text-fg">{detail.value}</dd>
          </Card>
        ))}
      </dl>

      <Card>
        <EmptyState
          icon={LayoutDashboard}
          title="Your dashboard is coming next"
          description="Key figures, today's appointments and recent activity will appear here. The dashboard is scheduled for the next development task."
        />
      </Card>
    </PageContainer>
  );
}
