import type { Facture, RendezVous, StatutFacture, StatutRendezVousComplet } from "@/types";

/*
 * Logique métier pure : aucun accès à la base ni à l'interface, donc facile à tester.
 * Les heures « HH:MM » sont des heures locales (Casablanca).
 */

/** « 09:30 » -> 570 */
export function minutesDepuisMinuit(heure: string): number {
  const [heures = 0, minutes = 0] = heure.split(":").map(Number);
  return heures * 60 + minutes;
}

/** Rendez-vous d'un jour (« 2026-11-10 »), triés par heure de début. */
export function rendezVousDuJour(rendezVous: RendezVous[], jour: string): RendezVous[] {
  return rendezVous
    .filter((item) => item.debut_le.startsWith(jour))
    .sort((a, b) => a.debut_le.localeCompare(b.debut_le));
}

export function compterParStatut(rendezVous: RendezVous[]): Record<StatutRendezVousComplet, number> {
  const comptes: Record<StatutRendezVousComplet, number> = { confirme: 0, en_attente: 0, annule: 0, termine: 0, absent: 0 };
  for (const item of rendezVous) comptes[item.statut] += 1;
  return comptes;
}

/** Les rendez-vous annulés ne prennent pas de temps dans l'agenda. */
export function estPlanifie(rendezVous: RendezVous): boolean {
  return rendezVous.statut !== "annule";
}

/**
 * Part du temps d'ouverture occupée par des rendez-vous, en pourcentage entier.
 * 0 si personne n'est disponible.
 */
export function tauxOccupation(rendezVous: RendezVous[], minutesDisponibles: number): number {
  if (minutesDisponibles <= 0) return 0;
  const minutesOccupees = rendezVous.filter(estPlanifie).reduce((total, item) => total + item.duree_minutes, 0);
  return Math.min(100, Math.round((minutesOccupees / minutesDisponibles) * 100));
}

/** Prochain rendez-vous planifié à partir d'une heure donnée, ou null. */
export function prochainRendezVous(rendezVousTries: RendezVous[], heureActuelle: string): RendezVous | null {
  const maintenant = minutesDepuisMinuit(heureActuelle);
  return (
    rendezVousTries.find((item) => estPlanifie(item) && item.statut !== "termine" && minutesDepuisMinuit(item.debut_le.slice(11, 16)) >= maintenant) ??
    null
  );
}

/** Somme des factures d'un statut, en dirhams (arrondie au centime). */
export function totalFactures(factures: Facture[], statut: StatutFacture): number {
  const total = factures.filter((item) => item.statut === statut).reduce((somme, item) => somme + item.montant_mad, 0);
  return Math.round(total * 100) / 100;
}

/** Nombre de rendez-vous planifiés par service, du plus demandé au moins demandé. */
export function classerServices(rendezVous: RendezVous[]): { service_id: string; nombre: number }[] {
  const comptes = new Map<string, number>();
  for (const item of rendezVous.filter(estPlanifie)) comptes.set(item.service_id, (comptes.get(item.service_id) ?? 0) + 1);
  return [...comptes].map(([service_id, nombre]) => ({ service_id, nombre })).sort((a, b) => b.nombre - a.nombre);
}

/** Variation en pourcentage entier entre deux valeurs ; null si la référence est nulle. */
export function variationPourcentage(valeur: number, reference: number): number | null {
  if (reference === 0) return null;
  return Math.round(((valeur - reference) / reference) * 100);
}

/**
 * Répartit des rendez-vous qui se chevauchent en voies côte à côte (algorithme glouton).
 * Renvoie, pour chaque identifiant, sa voie et le nombre de voies de son groupe de chevauchement.
 */
export function repartirEnVoies(rendezVous: RendezVous[]): Map<string, { voie: number; total: number }> {
  const tries = [...rendezVous].sort((a, b) => a.debut_le.localeCompare(b.debut_le));
  const resultat = new Map<string, { voie: number; total: number }>();
  let groupe: { id: string; voie: number }[] = [];
  let finsDesVoies: number[] = [];
  let finGroupe = -1;

  const fermerGroupe = () => {
    for (const item of groupe) resultat.set(item.id, { voie: item.voie, total: finsDesVoies.length });
    groupe = [];
    finsDesVoies = [];
  };

  for (const item of tries) {
    const debut = minutesDepuisMinuit(item.debut_le.slice(11, 16));
    const fin = debut + item.duree_minutes;
    if (debut >= finGroupe) fermerGroupe();
    const voieLibre = finsDesVoies.findIndex((finVoie) => finVoie <= debut);
    const voie = voieLibre === -1 ? finsDesVoies.length : voieLibre;
    finsDesVoies[voie] = fin;
    groupe.push({ id: item.id, voie });
    finGroupe = Math.max(finGroupe, fin);
  }
  fermerGroupe();
  return resultat;
}
