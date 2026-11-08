import type { Membership, User } from "@/types";
import { MOCK_ORGANIZATIONS } from "./organization";

/** Fictional signed-in user, for development only. */
export const MOCK_CURRENT_USER: User = {
  id: "9a3d5f7b-1c2e-4b6a-8d0f-2e4c6a8b0d1f",
  full_name: "Salma Idrissi",
  email: "salma.idrissi@example.com",
  job_title: "Office Manager",
  avatar_url: null,
};

export const MOCK_MEMBERSHIPS: Membership[] = [
  {
    id: "m-1",
    user_id: MOCK_CURRENT_USER.id,
    organization_id: MOCK_ORGANIZATIONS[0].id,
    role: "organization_admin",
  },
  {
    id: "m-2",
    user_id: MOCK_CURRENT_USER.id,
    organization_id: MOCK_ORGANIZATIONS[1].id,
    role: "secretary",
  },
  {
    id: "m-3",
    user_id: MOCK_CURRENT_USER.id,
    organization_id: MOCK_ORGANIZATIONS[2].id,
    role: "collaborator",
  },
];
