"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { LABEL_VISIBILITY, RAIL_ALIGNMENT, type SidebarMode } from "./sidebarModes";

interface SidebarNavLinkProps {
  item: NavItem;
  isActive: boolean;
  mode: SidebarMode;
  onNavigate?: () => void;
}

export function SidebarNavLink({ item, isActive, mode, onNavigate }: SidebarNavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      // Native hint for the icon-only rail, where labels are visually hidden.
      title={mode === "rail" ? item.label : undefined}
      className={cn(
        "group flex h-11 items-center gap-3 rounded-control px-3 text-label transition-colors duration-150 sm:h-10",
        isActive
          ? "bg-primary-subtle text-primary-hover"
          : "text-fg-secondary hover:bg-secondary hover:text-fg",
        RAIL_ALIGNMENT[mode],
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-5 shrink-0",
          isActive ? "text-primary" : "text-fg-muted group-hover:text-fg-secondary",
        )}
      />
      <span className={cn("truncate", LABEL_VISIBILITY[mode])}>{item.label}</span>
    </Link>
  );
}
