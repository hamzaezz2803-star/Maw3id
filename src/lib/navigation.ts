import { NAVIGATION, SETTINGS_NAV_ITEM } from "@/config/navigation";
import type { NavItem, NavSection, UserRole } from "@/types";

/** Navigation sections visible to a role. Empty sections are dropped. */
export function getNavigationForRole(role: UserRole): NavSection[] {
  return NAVIGATION.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.items.length > 0);
}

export function canAccessNavItem(item: NavItem, role: UserRole): boolean {
  return item.roles.includes(role);
}

const ALL_NAV_ITEMS: NavItem[] = [
  ...NAVIGATION.flatMap((section) => section.items),
  SETTINGS_NAV_ITEM,
];

export function getNavItem(id: string): NavItem | undefined {
  return ALL_NAV_ITEMS.find((item) => item.id === id);
}

/** Nav item matching the current path, including nested pages (/clients/123). */
export function findNavItemByPath(pathname: string): NavItem | undefined {
  return ALL_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  return findNavItemByPath(pathname)?.id === item.id;
}
