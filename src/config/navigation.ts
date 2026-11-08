import {
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  Clock,
  Globe,
  LayoutDashboard,
  Settings,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { ADMIN_ROLES, STAFF_ROLES } from "@/constants";
import type { NavItem, NavSection, UserRole } from "@/types";

const SCHEDULING_ROLES: readonly UserRole[] = STAFF_ROLES;
const MANAGEMENT_ROLES: readonly UserRole[] = [...ADMIN_ROLES, "secretary"];

export const NAVIGATION: NavSection[] = [
  {
    id: "overview",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: STAFF_ROLES },
      { id: "appointments", label: "Appointments", href: "/appointments", icon: CalendarCheck, roles: SCHEDULING_ROLES },
      { id: "calendar", label: "Calendar", href: "/calendar", icon: CalendarDays, roles: SCHEDULING_ROLES },
    ],
  },
  {
    id: "management",
    label: "Management",
    items: [
      { id: "clients", label: "Clients", href: "/clients", icon: Users, roles: MANAGEMENT_ROLES },
      { id: "services", label: "Services", href: "/services", icon: Briefcase, roles: ADMIN_ROLES },
      { id: "team", label: "Team", href: "/team", icon: UsersRound, roles: ADMIN_ROLES },
      { id: "availability", label: "Availability", href: "/availability", icon: Clock, roles: STAFF_ROLES },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    items: [
      { id: "online-booking", label: "Online Booking", href: "/online-booking", icon: Globe, roles: ADMIN_ROLES },
      { id: "notifications", label: "Notifications", href: "/notifications", icon: Bell, roles: STAFF_ROLES },
    ],
  },
  {
    id: "business",
    label: "Business",
    items: [
      { id: "finance", label: "Finance", href: "/finance", icon: Wallet, roles: MANAGEMENT_ROLES },
      { id: "reports", label: "Reports", href: "/reports", icon: ChartColumn, roles: ADMIN_ROLES },
    ],
  },
];

/** Labels for routes that exist outside the main navigation. */
export const EXTRA_ROUTE_LABELS: Record<string, string> = {
  "/design-system": "Design System",
};

/** Pinned at the bottom of the sidebar. */
export const SETTINGS_NAV_ITEM: NavItem = {
  id: "settings",
  label: "Settings",
  href: "/settings",
  icon: Settings,
  roles: ADMIN_ROLES,
};
