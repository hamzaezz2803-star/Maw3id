import type { Organization } from "@/types";

/** Fictional organizations, for development only. */
export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "7c1e2a4b-3f5d-4e8a-9b2c-1d0e6f7a8b90",
    name: "Atlas Advisory Group",
    type: "consulting_office",
    logo_url: null,
    city: "Casablanca",
    created_at: "2026-01-12T09:00:00Z",
  },
  {
    id: "2b9f4c6d-8e1a-4f3b-a5c7-9d2e0f1a3b4c",
    name: "Nour Dental Care",
    type: "dental_office",
    logo_url: null,
    city: "Rabat",
    created_at: "2026-03-04T10:30:00Z",
  },
  {
    id: "5e8a1b3c-6d9f-4a2e-b7c4-0f1d2e3a4b5c",
    name: "Bennani Legal Partners",
    type: "law_firm",
    logo_url: null,
    city: "Marrakech",
    created_at: "2026-05-21T08:15:00Z",
  },
];

export const MOCK_CURRENT_ORGANIZATION_ID = MOCK_ORGANIZATIONS[0].id;
