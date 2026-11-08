"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SETTINGS_NAV_ITEM } from "@/config/navigation";
import { APP_NAME } from "@/constants";
import type { OrganizationWithRole } from "@/lib/data/session";
import { canAccessNavItem, getNavigationForRole, isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { SidebarNavLink } from "./SidebarNavLink";
import { useSidebar } from "./SidebarProvider";
import { BLOCK_VISIBILITY, LABEL_VISIBILITY, RAIL_ALIGNMENT, type SidebarMode } from "./sidebarModes";

interface SidebarProps {
  role: UserRole;
  organizations: OrganizationWithRole[];
  currentOrganizationId: string;
}

/** Desktop/tablet column plus the mobile drawer, sharing the same content. */
export function Sidebar(props: SidebarProps) {
  const { isCollapsed, drawerRef, closeDrawer } = useSidebar();

  return (
    <>
      <aside
        aria-label="Sidebar"
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-e border-border bg-surface transition-[width] duration-200 md:flex",
          isCollapsed ? "w-sidebar-collapsed" : "w-sidebar-collapsed lg:w-sidebar",
        )}
      >
        <SidebarContent {...props} mode={isCollapsed ? "rail" : "responsive"} />
      </aside>

      <dialog
        ref={drawerRef}
        aria-label="Navigation menu"
        // A click on the dialog element itself is a click on the backdrop.
        onClick={(event) => event.target === event.currentTarget && closeDrawer()}
        className="m-0 h-dvh max-h-dvh w-sidebar max-w-[85vw] border-e border-border bg-surface p-0"
      >
        <div className="flex h-full flex-col">
          <SidebarContent {...props} mode="full" onNavigate={closeDrawer} />
        </div>
      </dialog>
    </>
  );
}

interface SidebarContentProps extends SidebarProps {
  mode: SidebarMode;
  onNavigate?: () => void;
}

function SidebarContent({
  role,
  organizations,
  currentOrganizationId,
  mode,
  onNavigate,
}: SidebarContentProps) {
  const pathname = usePathname();
  const sections = getNavigationForRole(role);
  const isInDrawer = mode === "full" && Boolean(onNavigate);

  return (
    <>
      <div className={cn("flex h-navbar shrink-0 items-center gap-3 border-b border-border px-5", RAIL_ALIGNMENT[mode])}>
        <Link href="/dashboard" onClick={onNavigate} className="flex items-center gap-2.5 rounded-control">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-control bg-primary text-label font-bold text-primary-foreground"
          >
            M
          </span>
          <span className={cn("text-section-title tracking-tight text-fg", LABEL_VISIBILITY[mode])}>
            {APP_NAME}
          </span>
        </Link>
        {isInDrawer && (
          <Button variant="ghost" size="icon" aria-label="Close navigation menu" onClick={onNavigate} className="ms-auto -me-2">
            <X aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="shrink-0 p-3">
        <OrganizationSwitcher
          organizations={organizations}
          currentOrganizationId={currentOrganizationId}
          mode={mode}
        />
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 pb-3">
        {sections.map((section) => (
          <div key={section.id} className="mt-4 first:mt-1">
            {section.label && (
              <p className={cn("mb-1 px-3 text-caption uppercase tracking-wide text-fg-muted", BLOCK_VISIBILITY[mode])}>
                {section.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <SidebarNavLink
                    item={item}
                    mode={mode}
                    isActive={isNavItemActive(item, pathname)}
                    onNavigate={onNavigate}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {canAccessNavItem(SETTINGS_NAV_ITEM, role) && (
        <div className="shrink-0 border-t border-border p-3">
          <SidebarNavLink
            item={SETTINGS_NAV_ITEM}
            mode={mode}
            isActive={isNavItemActive(SETTINGS_NAV_ITEM, pathname)}
            onNavigate={onNavigate}
          />
        </div>
      )}
    </>
  );
}
