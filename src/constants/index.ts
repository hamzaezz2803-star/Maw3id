import type { OrganizationType, UserRole } from "@/types";

export const APP_NAME = "Maw3id";
export const APP_DESCRIPTION =
  "Appointment booking and management platform for professional organizations.";

/** Matches Tailwind's `lg` breakpoint: sidebar is a collapsible column from here. */
export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

/** Time zone used to display dates until users can choose their own. */
export const DEFAULT_TIME_ZONE = "Africa/Casablanca";
export const DEFAULT_LOCALE = "en-GB";

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  organization_admin: "Organization Admin",
  secretary: "Secretary",
  collaborator: "Collaborator",
  client: "Client",
};

export const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  medical_clinic: "Medical clinic",
  dental_office: "Dental office",
  law_firm: "Law firm",
  accounting_firm: "Accounting firm",
  consulting_office: "Consulting office",
  training_center: "Training center",
  other: "Professional services",
};

/** Roles that work inside an organization's back office. */
export const STAFF_ROLES: readonly UserRole[] = [
  "super_admin",
  "organization_admin",
  "secretary",
  "collaborator",
];

export const ADMIN_ROLES: readonly UserRole[] = [
  "super_admin",
  "organization_admin",
];
