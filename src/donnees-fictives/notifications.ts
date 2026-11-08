import type { Notification } from "@/types";
import { ID_ORGANISATION_COURANTE_FICTIVE } from "./organisations";

/**
 * Notifications inventées, pour le développement uniquement.
 * La valeur `date` est une date ISO, formatée à l'affichage selon la langue.
 */
export const NOTIFICATIONS_FICTIVES: Notification[] = [
  {
    id: "1f2e3d4c-5b6a-4978-8a1b-2c3d4e5f6a01",
    organisation_id: ID_ORGANISATION_COURANTE_FICTIVE,
    type: "nouvelle_reservation",
    valeurs: { client: "Youssef Alaoui", service: "Séance stratégique", date: "2026-11-10T09:00:00Z" },
    est_lue: false,
    cree_le: "2026-11-08T08:42:00Z",
    modifie_le: "2026-11-08T08:42:00Z",
  },
  {
    id: "2a3b4c5d-6e7f-4089-9b2c-3d4e5f6a7b02",
    organisation_id: ID_ORGANISATION_COURANTE_FICTIVE,
    type: "rappel_rendez_vous",
    valeurs: { client: "Imane Tazi", service: "Première consultation", minutes: "30" },
    est_lue: false,
    cree_le: "2026-11-08T07:30:00Z",
    modifie_le: "2026-11-08T07:30:00Z",
  },
  {
    id: "3b4c5d6e-7f80-4190-8c3d-4e5f6a7b8c03",
    organisation_id: ID_ORGANISATION_COURANTE_FICTIVE,
    type: "paiement_recu",
    valeurs: { facture: "FAC-2026-0142" },
    est_lue: true,
    cree_le: "2026-11-07T16:05:00Z",
    modifie_le: "2026-11-07T16:05:00Z",
  },
  {
    id: "4c5d6e7f-8091-42a1-9d4e-5f6a7b8c9d04",
    organisation_id: ID_ORGANISATION_COURANTE_FICTIVE,
    type: "disponibilite_modifiee",
    valeurs: { collaborateur: "Karim Berrada" },
    est_lue: true,
    cree_le: "2026-11-06T11:20:00Z",
    modifie_le: "2026-11-06T11:20:00Z",
  },
];
