import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { BreadcrumbItem } from "@/types";

interface PageContainerProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Page-level actions, aligned right on larger screens. One primary at most. */
  actions?: ReactNode;
  children: ReactNode;
}

/** Standard page frame: header (breadcrumbs, title, description, actions) and content. */
export function PageContainer({ title, description, breadcrumbs, actions, children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          <h1 className="text-page-title text-fg">{title}</h1>
          {description && <p className="max-w-2xl text-body text-fg-secondary">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
