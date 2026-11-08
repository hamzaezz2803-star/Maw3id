"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EXTRA_ROUTE_LABELS } from "@/config/navigation";
import { findNavItemByPath } from "@/lib/navigation";
import type { BreadcrumbItem } from "@/types";

/** Organization > current section, derived from the URL. */
export function NavbarBreadcrumb({ organizationName }: { organizationName: string }) {
  const pathname = usePathname();
  const currentLabel = findNavItemByPath(pathname)?.label ?? EXTRA_ROUTE_LABELS[pathname];

  const items: BreadcrumbItem[] = [{ label: organizationName, href: "/dashboard" }];
  if (currentLabel) items.push({ label: currentLabel });

  return (
    <>
      <Breadcrumbs items={items} className="hidden sm:block" />
      <p className="truncate text-label text-fg sm:hidden">{currentLabel ?? organizationName}</p>
    </>
  );
}
