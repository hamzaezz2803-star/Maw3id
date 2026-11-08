"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownItem, DropdownLabel } from "@/components/ui/Dropdown";
import { ORGANIZATION_TYPE_LABELS, ROLE_LABELS } from "@/constants";
import type { OrganizationWithRole } from "@/lib/data/session";
import { cn } from "@/lib/utils";
import { BLOCK_VISIBILITY, RAIL_ALIGNMENT, type SidebarMode } from "./sidebarModes";

interface OrganizationSwitcherProps {
  organizations: OrganizationWithRole[];
  currentOrganizationId: string;
  mode: SidebarMode;
}

/** Static switcher: lists the user's organizations, switching comes later. */
export function OrganizationSwitcher({
  organizations,
  currentOrganizationId,
  mode,
}: OrganizationSwitcherProps) {
  const current =
    organizations.find((item) => item.organization.id === currentOrganizationId) ??
    organizations[0];

  if (!current) return null;

  const { organization } = current;

  const trigger = (
    <>
      <Avatar name={organization.name} src={organization.logo_url} shape="square" size="md" />
      <span className={cn("flex min-w-0 flex-1 flex-col", BLOCK_VISIBILITY[mode])}>
        <span className="truncate text-label text-fg">{organization.name}</span>
        <span className="truncate text-caption font-normal text-fg-muted">
          {ORGANIZATION_TYPE_LABELS[organization.type]}
        </span>
      </span>
      <ChevronsUpDown
        aria-hidden="true"
        className={cn("size-4 shrink-0 text-fg-muted", BLOCK_VISIBILITY[mode])}
      />
    </>
  );

  return (
    <Dropdown
      align="start"
      trigger={trigger}
      triggerLabel={`Current organization: ${organization.name}. Switch organization`}
      triggerClassName={cn(
        "flex w-full items-center gap-3 rounded-control border p-2 text-start transition-colors hover:bg-surface-muted",
        RAIL_ALIGNMENT[mode],
        // Border only around the expanded switcher, not the icon rail.
        mode === "full" && "border-border",
        mode === "responsive" && "border-transparent lg:border-border",
        mode === "rail" && "border-transparent",
      )}
      panelClassName="w-72"
    >
      <DropdownLabel>Your organizations</DropdownLabel>
      <ul>
        {organizations.map(({ organization: item, role }) => (
          <li key={item.id}>
            <DropdownItem className="py-1.5">
              <Avatar name={item.name} src={item.logo_url} shape="square" size="sm" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate">{item.name}</span>
                <span className="truncate text-caption font-normal text-fg-muted">
                  {ORGANIZATION_TYPE_LABELS[item.type]}, {ROLE_LABELS[role]}
                </span>
              </span>
              {item.id === organization.id && (
                <>
                  <Check aria-hidden="true" className="text-primary!" />
                  <span className="sr-only">(current)</span>
                </>
              )}
            </DropdownItem>
          </li>
        ))}
      </ul>
      <p className="px-2.5 pb-1.5 pt-2 text-helper text-fg-muted">
        Switching organizations will be available soon.
      </p>
    </Dropdown>
  );
}
