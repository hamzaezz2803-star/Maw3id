/*
 * Data access layer for the current session context.
 * Pages and components read data through these functions only, so the mock
 * sources can be swapped for the real backend without touching the UI.
 */
import { MOCK_NOTIFICATIONS } from "@/data/mock/notifications";
import {
  MOCK_CURRENT_ORGANIZATION_ID,
  MOCK_ORGANIZATIONS,
} from "@/data/mock/organization";
import { MOCK_CURRENT_USER, MOCK_MEMBERSHIPS } from "@/data/mock/user";
import type {
  AppNotification,
  Organization,
  User,
  UserRole,
} from "@/types";

export interface OrganizationWithRole {
  organization: Organization;
  role: UserRole;
}

export interface SessionContext {
  user: User;
  currentOrganization: Organization;
  role: UserRole;
  /** Every organization the user belongs to, for the switcher. */
  organizations: OrganizationWithRole[];
}

export function getSessionContext(): SessionContext {
  const organizations = MOCK_MEMBERSHIPS.flatMap((membership) => {
    const organization = MOCK_ORGANIZATIONS.find(
      (item) => item.id === membership.organization_id,
    );
    return organization ? [{ organization, role: membership.role }] : [];
  });

  const current =
    organizations.find(
      (item) => item.organization.id === MOCK_CURRENT_ORGANIZATION_ID,
    ) ?? organizations[0];

  return {
    user: MOCK_CURRENT_USER,
    currentOrganization: current.organization,
    role: current.role,
    organizations,
  };
}

export function getRecentNotifications(organizationId: string): AppNotification[] {
  return MOCK_NOTIFICATIONS.filter(
    (notification) => notification.organization_id === organizationId,
  );
}
