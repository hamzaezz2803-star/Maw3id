import type { StatutRendezVous } from "@/types";

/** Lignes inventées utilisées uniquement par la page « Système de design ». */
export const RENDEZ_VOUS_DEMONSTRATION: {
  id: string;
  client_nom: string;
  service_nom: string;
  collaborateur_nom: string;
  debut_le: string;
  statut: StatutRendezVous;
}[] = [
  {
    id: "a1b2c3d4-e5f6-4a07-8b18-c9d0e1f2a301",
    client_nom: "Youssef Alaoui",
    service_nom: "Séance stratégique",
    collaborateur_nom: "Karim Berrada",
    debut_le: "2026-11-10T09:00:00Z",
    statut: "confirme",
  },
  {
    id: "b2c3d4e5-f6a7-4b18-9c29-d0e1f2a3b402",
    client_nom: "Imane Tazi",
    service_nom: "Première consultation",
    collaborateur_nom: "Salma Idrissi",
    debut_le: "2026-11-10T13:30:00Z",
    statut: "en_attente",
  },
  {
    id: "c3d4e5f6-a7b8-4c29-8d3a-e1f2a3b4c503",
    client_nom: "Omar Chraibi",
    service_nom: "Rendez-vous de suivi",
    collaborateur_nom: "Karim Berrada",
    debut_le: "2026-11-11T15:00:00Z",
    statut: "annule",
  },
];

export const SERVICES_DEMONSTRATION = [
  { valeur: "premiere-consultation", libelle: "Première consultation" },
  { valeur: "suivi", libelle: "Rendez-vous de suivi" },
  { valeur: "seance-strategique", libelle: "Séance stratégique" },
];
