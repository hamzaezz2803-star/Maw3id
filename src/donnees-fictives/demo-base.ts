import type { Client, Collaborateur, Service } from "@/types";

/*
 * Données inventées pour visualiser l'application (aucune donnée réelle).
 * Tout est calé sur un jour fixe, pour des écrans stables.
 */

/** Mardi 10 novembre 2026. À Casablanca, ce jour-là, l'heure locale = UTC. */
export const JOUR_DEMONSTRATION = "2026-11-10";
export const HEURE_ACTUELLE_DEMONSTRATION = "11:20";
/** Adresse fictive de la page publique de réservation. */
export const ADRESSE_RESERVATION_DEMO = "mawiid.ma/clinique-test";
export const ID_ORGANISATION_DEMO = "d0000000-0000-4000-8000-000000000001";

/** Identifiant au format uuid, stable d'un rendu à l'autre. */
export function uuidDemo(categorie: number, numero: number): string {
  return `d000000${categorie}-0000-4000-8000-${String(numero).padStart(12, "0")}`;
}

const HORODATAGE = { cree_le: "2026-01-12T09:00:00Z", modifie_le: "2026-11-01T09:00:00Z" };
const BASE = { organisation_id: ID_ORGANISATION_DEMO, ...HORODATAGE };

const SERVICES_SOURCE: [string, string, number, number, boolean][] = [
  ["Première consultation", "Consultations", 45, 400, true],
  ["Consultation de suivi", "Consultations", 30, 250, true],
  ["Bilan complet", "Bilans", 90, 900, false],
  ["Séance de conseil", "Accompagnement", 60, 600, true],
  ["Rendez-vous express", "Consultations", 15, 150, true],
  ["Téléconsultation", "À distance", 30, 250, true],
];

export const SERVICES_DEMO: Service[] = SERVICES_SOURCE.map(([nom, categorie, duree, prix, enLigne], index) => ({
  ...BASE,
  id: uuidDemo(2, index + 1),
  nom,
  categorie,
  duree_minutes: duree,
  prix_mad: prix,
  // « Rendez-vous express » est désactivé, pour montrer ce statut.
  est_actif: index !== 4,
  est_reservable_en_ligne: enLigne,
}));

const EQUIPE_SOURCE: [string, string, Collaborateur["role"], [string, string] | null, number[]][] = [
  ["Karim Berrada", "Responsable du cabinet", "administrateur", ["09:00", "17:00"], [1, 2, 3, 4]],
  ["Nadia El Amrani", "Consultante", "collaborateur", ["08:30", "16:30"], [1, 2, 6]],
  ["Youssef Bennis", "Consultant", "collaborateur", ["10:00", "18:00"], [2, 3, 4, 5]],
  ["Hind Lahlou", "Consultante", "collaborateur", ["09:00", "13:00"], [1, 4, 6]],
  ["Salma Idrissi", "Accueil et secrétariat", "secretaire", ["08:30", "17:30"], []],
  ["Omar Tahiri", "Consultant", "collaborateur", null, [2, 3]],
];

export const EQUIPE_DEMO: Collaborateur[] = EQUIPE_SOURCE.map(([nom, fonction, role, horaires, services], index) => ({
  ...BASE,
  id: uuidDemo(3, index + 1),
  nom_complet: nom,
  fonction,
  role,
  horaires_du_jour: horaires ? { debut: horaires[0], fin: horaires[1] } : null,
  services_ids: services.map((numero) => uuidDemo(2, numero)),
}));

const CLIENTS_SOURCE: [string, string | null, number, string | null][] = [
  ["Youssef Alaoui", "y.alaoui@example.com", 6, "2026-11-10T09:00:00Z"],
  ["Imane Tazi", "imane.tazi@example.com", 3, "2026-11-10T09:30:00Z"],
  ["Omar Chraibi", null, 1, "2026-11-10T10:30:00Z"],
  ["Leila Bennani", "leila.b@example.com", 9, "2026-11-10T11:00:00Z"],
  ["Mehdi Ouazzani", "m.ouazzani@example.com", 2, "2026-11-10T14:00:00Z"],
  ["Sara El Fassi", "sara.elfassi@example.com", 4, "2026-11-10T14:30:00Z"],
  ["Rachid Amrani", null, 7, "2026-11-10T15:30:00Z"],
  ["Khadija Mernissi", "k.mernissi@example.com", 5, "2026-11-10T16:00:00Z"],
  ["Anas Benjelloun", "anas.bj@example.com", 1, "2026-11-11T10:00:00Z"],
  ["Zineb Kettani", "zineb.k@example.com", 12, "2026-11-12T11:00:00Z"],
  ["Hamza Sefrioui", null, 2, "2026-11-06T09:30:00Z"],
  ["Nora Belhaj", "nora.belhaj@example.com", 3, "2026-11-04T15:00:00Z"],
];

export const CLIENTS_DEMO: Client[] = CLIENTS_SOURCE.map(([nom, email, nombre, dernier], index) => ({
  ...BASE,
  id: uuidDemo(4, index + 1),
  nom_complet: nom,
  // Numéros manifestement fictifs (+212 600 000 1xx).
  telephone: `+2126000001${String(index + 1).padStart(2, "0")}`,
  email,
  nombre_rendez_vous: nombre,
  dernier_rendez_vous_le: dernier,
}));
