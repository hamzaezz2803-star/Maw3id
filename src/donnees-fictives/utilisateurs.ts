import type { Membre, Utilisateur } from "@/types";
import { ORGANISATIONS_FICTIVES } from "./organisations";

/** Utilisateur connecté inventé, pour le développement uniquement. */
export const UTILISATEUR_FICTIF: Utilisateur = {
  id: "9a3d5f7b-1c2e-4b6a-8d0f-2e4c6a8b0d1f",
  nom_complet: "Salma Idrissi",
  email: "salma.idrissi@example.com",
  fonction: "Responsable administrative",
  avatar_url: null,
  cree_le: "2026-01-12T09:05:00Z",
  modifie_le: "2026-01-12T09:05:00Z",
};

export const MEMBRES_FICTIFS: Membre[] = [
  {
    id: "c4f1a2b3-5d6e-4f70-8a9b-0c1d2e3f4a51",
    utilisateur_id: UTILISATEUR_FICTIF.id,
    organisation_id: ORGANISATIONS_FICTIVES[0].id,
    role: "administrateur",
    cree_le: "2026-01-12T09:05:00Z",
    modifie_le: "2026-01-12T09:05:00Z",
  },
  {
    id: "d5a2b3c4-6e7f-4a81-9b0c-1d2e3f4a5b62",
    utilisateur_id: UTILISATEUR_FICTIF.id,
    organisation_id: ORGANISATIONS_FICTIVES[1].id,
    role: "secretaire",
    cree_le: "2026-03-04T10:35:00Z",
    modifie_le: "2026-03-04T10:35:00Z",
  },
  {
    id: "e6b3c4d5-7f80-4b92-8c1d-2e3f4a5b6c73",
    utilisateur_id: UTILISATEUR_FICTIF.id,
    organisation_id: ORGANISATIONS_FICTIVES[2].id,
    role: "collaborateur",
    cree_le: "2026-05-21T08:20:00Z",
    modifie_le: "2026-05-21T08:20:00Z",
  },
];
