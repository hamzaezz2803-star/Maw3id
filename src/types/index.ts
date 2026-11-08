import type { LucideIcon } from "lucide-react";

/*
 * Shared domain types. Field names use snake_case so mock data already
 * matches the future database rows and pages will not change when the
 * real data layer arrives.
 */

export type UserRole =
  | "super_admin"
  | "organization_admin"
  | "secretary"
  | "collaborator"
  | "client";

export type OrganizationType =
  | "medical_clinic"
  | "dental_office"
  | "law_firm"
  | "accounting_firm"
  | "consulting_office"
  | "training_center"
  | "other";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  logo_url: string | null;
  city: string;
  created_at: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  avatar_url: string | null;
}

/** Link between a user and an organization, carrying the user's role there. */
export interface Membership {
  id: string;
  user_id: string;
  organization_id: string;
  role: UserRole;
}

export type NotificationCategory = "booking" | "reminder" | "payment" | "system";

export interface AppNotification {
  id: string;
  organization_id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NavItem {
  /** Stable key, also used as the route segment. */
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Roles allowed to see this item. Enforced later by real permissions. */
  roles: readonly UserRole[];
}

export interface NavSection {
  id: string;
  /** Optional heading shown above the group in the expanded sidebar. */
  label?: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
