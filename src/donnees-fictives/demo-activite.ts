import type { Facture, Notification, PlageDisponibilite, RendezVous, StatutRendezVousComplet } from "@/types";
import { EQUIPE_DEMO, ID_ORGANISATION_DEMO, SERVICES_DEMO, uuidDemo } from "./demo-base";

/*
 * Rendez-vous, factures, disponibilités et notifications inventés.
 * Les rendez-vous couvrent la semaine du lundi 9 au samedi 14 novembre 2026.
 */

const HORODATAGE = { cree_le: "2026-11-01T09:00:00Z", modifie_le: "2026-11-08T09:00:00Z" };
const BASE = { organisation_id: ID_ORGANISATION_DEMO, ...HORODATAGE };

// [jour du mois, heure, collaborateur n°, service n°, client n°, statut, source]
type LigneRendezVous = [number, string, number, number, number, StatutRendezVousComplet, RendezVous["source"]];

const RENDEZ_VOUS_SOURCE: LigneRendezVous[] = [
  [9, "09:00", 1, 2, 11, "termine", "accueil"],
  [9, "10:30", 2, 1, 12, "termine", "en_ligne"],
  [9, "14:00", 3, 4, 7, "absent", "telephone"],
  [9, "15:30", 1, 6, 4, "termine", "en_ligne"],
  // Mardi 10 : le jour de démonstration
  [10, "09:00", 1, 1, 1, "termine", "en_ligne"],
  [10, "09:30", 2, 2, 2, "termine", "accueil"],
  [10, "09:00", 4, 6, 9, "termine", "en_ligne"],
  [10, "10:30", 3, 4, 3, "confirme", "telephone"],
  [10, "11:00", 1, 2, 4, "confirme", "en_ligne"],
  [10, "11:00", 4, 1, 10, "confirme", "accueil"],
  [10, "12:00", 2, 6, 6, "en_attente", "en_ligne"],
  [10, "14:00", 1, 3, 5, "confirme", "accueil"],
  [10, "14:30", 2, 1, 6, "en_attente", "en_ligne"],
  [10, "14:00", 3, 2, 8, "annule", "telephone"],
  [10, "15:30", 3, 4, 7, "confirme", "en_ligne"],
  [10, "16:00", 2, 2, 8, "confirme", "accueil"],
  [10, "16:30", 1, 6, 12, "en_attente", "en_ligne"],
  [11, "09:30", 1, 1, 9, "confirme", "en_ligne"],
  [11, "10:00", 3, 4, 9, "en_attente", "en_ligne"],
  [11, "11:30", 2, 2, 1, "confirme", "accueil"],
  [11, "15:00", 4, 6, 3, "confirme", "en_ligne"],
  [12, "09:00", 2, 1, 5, "confirme", "telephone"],
  [12, "11:00", 3, 4, 10, "confirme", "en_ligne"],
  [12, "14:30", 1, 2, 11, "en_attente", "en_ligne"],
  [12, "16:00", 4, 3, 2, "confirme", "accueil"],
  [13, "10:00", 1, 4, 4, "confirme", "en_ligne"],
  [13, "13:30", 3, 2, 6, "confirme", "accueil"],
  [13, "15:00", 2, 6, 7, "annule", "en_ligne"],
  [14, "09:30", 2, 1, 12, "confirme", "en_ligne"],
  [14, "11:00", 4, 2, 8, "en_attente", "en_ligne"],
];

export const RENDEZ_VOUS_DEMO: RendezVous[] = RENDEZ_VOUS_SOURCE.map(
  ([jour, heure, collaborateur, service, client, statut, source], index) => ({
    ...BASE,
    id: uuidDemo(5, index + 1),
    client_id: uuidDemo(4, client),
    service_id: uuidDemo(2, service),
    collaborateur_id: uuidDemo(3, collaborateur),
    debut_le: `2026-11-${String(jour).padStart(2, "0")}T${heure}:00Z`,
    duree_minutes: SERVICES_DEMO[service - 1]?.duree_minutes ?? 30,
    statut,
    source,
  }),
);

// [numéro, client n°, émise le, montant, statut]
const FACTURES_SOURCE: [string, number, string, number, Facture["statut"]][] = [
  ["FAC-2026-0151", 1, "2026-11-10", 400, "payee"],
  ["FAC-2026-0150", 2, "2026-11-10", 250, "payee"],
  ["FAC-2026-0149", 9, "2026-11-10", 250, "en_attente"],
  ["FAC-2026-0148", 4, "2026-11-09", 250, "payee"],
  ["FAC-2026-0147", 12, "2026-11-09", 400, "en_attente"],
  ["FAC-2026-0146", 11, "2026-11-09", 250, "payee"],
  ["FAC-2026-0145", 10, "2026-11-06", 1200, "payee"],
  ["FAC-2026-0144", 5, "2026-11-04", 900, "en_retard"],
  ["FAC-2026-0143", 6, "2026-11-03", 600, "payee"],
  ["FAC-2026-0142", 7, "2026-10-28", 1250, "en_retard"],
];

export const FACTURES_DEMO: Facture[] = FACTURES_SOURCE.map(([numero, client, emise, montant, statut], index) => ({
  ...BASE,
  id: uuidDemo(6, index + 1),
  numero,
  client_id: uuidDemo(4, client),
  emise_le: `${emise}T10:00:00Z`,
  montant_mad: montant,
  statut,
}));

/** Horaires hebdomadaires : les mêmes pour tous les jours ouvrés indiqués. */
export const DISPONIBILITES_DEMO: PlageDisponibilite[] = EQUIPE_DEMO.flatMap((membre, index) => {
  const jours = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 6], [2, 3, 4, 5, 6], [1, 2, 4], [1, 2, 3, 4, 5], [3, 5]][index] ?? [];
  const horaires = membre.horaires_du_jour ?? { debut: "09:00", fin: "17:00" };
  return jours.map((jour) => ({ collaborateur_id: membre.id, jour, debut: horaires.debut, fin: horaires.fin }));
});

/** Rendez-vous des huit dernières semaines (lundi de chaque semaine), pour les rapports. */
export const HISTORIQUE_SEMAINES_DEMO: { semaine_du: string; nombre: number }[] = [
  { semaine_du: "2026-09-21", nombre: 38 },
  { semaine_du: "2026-09-28", nombre: 44 },
  { semaine_du: "2026-10-05", nombre: 41 },
  { semaine_du: "2026-10-12", nombre: 49 },
  { semaine_du: "2026-10-19", nombre: 46 },
  { semaine_du: "2026-10-26", nombre: 39 },
  { semaine_du: "2026-11-02", nombre: 52 },
  { semaine_du: "2026-11-09", nombre: 30 },
];

const NOTIFICATIONS_SOURCE: [Notification["type"], Record<string, string>, boolean, string][] = [
  ["nouvelle_reservation", { client: "Khadija Mernissi", service: "Consultation de suivi", date: "2026-11-10T16:00:00Z" }, false, "2026-11-10T08:42:00Z"],
  ["rappel_rendez_vous", { client: "Leila Bennani", service: "Consultation de suivi", minutes: "30" }, false, "2026-11-10T10:30:00Z"],
  ["nouvelle_reservation", { client: "Anas Benjelloun", service: "Séance de conseil", date: "2026-11-11T10:00:00Z" }, false, "2026-11-09T19:12:00Z"],
  ["paiement_recu", { facture: "FAC-2026-0145" }, true, "2026-11-09T15:05:00Z"],
  ["disponibilite_modifiee", { collaborateur: "Youssef Bennis" }, true, "2026-11-08T11:20:00Z"],
];

export const NOTIFICATIONS_DEMO: Notification[] = NOTIFICATIONS_SOURCE.map(([type, valeurs, estLue, creeLe], index) => ({
  ...BASE,
  id: uuidDemo(7, index + 1),
  type,
  valeurs,
  est_lue: estLue,
  cree_le: creeLe,
  modifie_le: creeLe,
}));
