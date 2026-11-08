/*
 * How the sidebar content is displayed:
 * - "full": always expanded (mobile drawer).
 * - "responsive": desktop column, icon rail on tablets, expanded from `lg`.
 * - "rail": icons only (desktop column collapsed by the user).
 */
export type SidebarMode = "full" | "responsive" | "rail";

/** Text that must stay readable by screen readers when hidden. */
export const LABEL_VISIBILITY: Record<SidebarMode, string> = {
  full: "",
  responsive: "max-lg:sr-only",
  rail: "sr-only",
};

/** Decorative or secondary blocks, removed entirely when hidden. */
export const BLOCK_VISIBILITY: Record<SidebarMode, string> = {
  full: "",
  responsive: "max-lg:hidden",
  rail: "hidden",
};

/** Centers icons when the sidebar is a rail. */
export const RAIL_ALIGNMENT: Record<SidebarMode, string> = {
  full: "",
  responsive: "max-lg:justify-center max-lg:px-0",
  rail: "justify-center px-0",
};
