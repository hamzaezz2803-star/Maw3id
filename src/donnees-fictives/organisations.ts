import type { Organisation } from "@/types";

/** Organisations inventées, pour le développement uniquement. */
export const ORGANISATIONS_FICTIVES: Organisation[] = [
  {
    id: "7c1e2a4b-3f5d-4e8a-9b2c-1d0e6f7a8b90",
    nom: "Atlas Conseil",
    type: "cabinet_conseil",
    logo_url: null,
    ville: "Casablanca",
    cree_le: "2026-01-12T09:00:00Z",
    modifie_le: "2026-01-12T09:00:00Z",
  },
  {
    id: "2b9f4c6d-8e1a-4f3b-a5c7-9d2e0f1a3b4c",
    nom: "Cabinet Dentaire Nour",
    type: "cabinet_dentaire",
    logo_url: null,
    ville: "Rabat",
    cree_le: "2026-03-04T10:30:00Z",
    modifie_le: "2026-03-04T10:30:00Z",
  },
  {
    id: "5e8a1b3c-6d9f-4a2e-b7c4-0f1d2e3a4b5c",
    nom: "Bennani Avocats Associés",
    type: "cabinet_avocats",
    logo_url: null,
    ville: "Marrakech",
    cree_le: "2026-05-21T08:15:00Z",
    modifie_le: "2026-05-21T08:15:00Z",
  },
];

export const ID_ORGANISATION_COURANTE_FICTIVE = ORGANISATIONS_FICTIVES[0].id;
