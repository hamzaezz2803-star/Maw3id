import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getNavItem } from "@/lib/navigation";
import { PageContainer } from "./PageContainer";

export function getModuleMetadata(moduleId: string): Metadata {
  return { title: getNavItem(moduleId)?.label };
}

/** Temporary page for a module that will be built in a later task. */
export function ModulePlaceholder({ moduleId }: { moduleId: string }) {
  const item = getNavItem(moduleId);
  if (!item) notFound();

  return (
    <PageContainer title={item.label}>
      <Card>
        <EmptyState
          icon={item.icon}
          title={`${item.label} is on the way`}
          description="This module is planned for an upcoming development task. The navigation and layout are ready for it."
          action={
            <Link href="/dashboard" className={buttonClasses({ variant: "outline" })}>
              Back to dashboard
            </Link>
          }
        />
      </Card>
    </PageContainer>
  );
}
