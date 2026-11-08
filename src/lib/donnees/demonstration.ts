import "server-only";
import {
  DISPONIBILITES_DEMO,
  FACTURES_DEMO,
  HISTORIQUE_SEMAINES_DEMO,
  NOTIFICATIONS_DEMO,
  RENDEZ_VOUS_DEMO,
} from "@/donnees-fictives/demo-activite";
import {
  CLIENTS_DEMO,
  EQUIPE_DEMO,
  HEURE_ACTUELLE_DEMONSTRATION,
  JOUR_DEMONSTRATION,
  SERVICES_DEMO,
} from "@/donnees-fictives/demo-base";
import {
  classerServices,
  compterParStatut,
  minutesDepuisMinuit,
  prochainRendezVous,
  rendezVousDuJour,
  tauxOccupation,
  totalFactures,
  variationPourcentage,
} from "@/lib/metier/statistiques";
import type { Client, Collaborateur, Facture, RendezVousDetaille, Service } from "@/types";

/*
 * Couche d'accès aux données de démonstration (statiques).
 * Les pages ne lisent les données que par ces fonctions : le passage à
 * PostgreSQL se fera ici, avec la vérification du rôle dans chaque fonction.
 */

const nomClient = (id: string) => CLIENTS_DEMO.find((item) => item.id === id)?.nom_complet ?? "";
const nomService = (id: string) => SERVICES_DEMO.find((item) => item.id === id)?.nom ?? "";
const nomCollaborateur = (id: string) => EQUIPE_DEMO.find((item) => item.id === id)?.nom_complet ?? "";

function detailler(liste = RENDEZ_VOUS_DEMO): RendezVousDetaille[] {
  return liste.map((item) => ({
    ...item,
    client_nom: nomClient(item.client_id),
    service_nom: nomService(item.service_id),
    collaborateur_nom: nomCollaborateur(item.collaborateur_id),
  }));
}

/** Minutes d'ouverture du jour pour les collaborateurs présents. */
function minutesDisponiblesDuJour(): number {
  return EQUIPE_DEMO.reduce((total, membre) => {
    if (!membre.horaires_du_jour || membre.role === "secretaire") return total;
    return total + minutesDepuisMinuit(membre.horaires_du_jour.fin) - minutesDepuisMinuit(membre.horaires_du_jour.debut);
  }, 0);
}

export async function obtenirTableauDeBord() {
  const duJour = rendezVousDuJour(RENDEZ_VOUS_DEMO, JOUR_DEMONSTRATION);
  const semaine = RENDEZ_VOUS_DEMO.filter((item) => item.statut !== "annule");
  const [avantDerniere, derniere] = HISTORIQUE_SEMAINES_DEMO.slice(-3, -1);
  const prochain = prochainRendezVous(duJour, HEURE_ACTUELLE_DEMONSTRATION);

  return {
    jour: `${JOUR_DEMONSTRATION}T09:00:00Z`,
    heureActuelle: HEURE_ACTUELLE_DEMONSTRATION,
    rendezVous: detailler(duJour),
    comptes: compterParStatut(duJour),
    prochain: prochain ? detailler([prochain])[0] : null,
    aConfirmer: detailler(RENDEZ_VOUS_DEMO.filter((item) => item.statut === "en_attente")),
    collaborateurs: EQUIPE_DEMO.filter((membre) => membre.role !== "secretaire" && membre.horaires_du_jour),
    indicateurs: {
      rendezVousSemaine: semaine.length,
      variationSemaine: variationPourcentage(derniere?.nombre ?? 0, avantDerniere?.nombre ?? 0),
      tauxOccupation: tauxOccupation(duJour, minutesDisponiblesDuJour()),
      encaisseMois: totalFactures(FACTURES_DEMO.filter((item) => item.emise_le.startsWith("2026-11")), "payee"),
      nouveauxClients: CLIENTS_DEMO.filter((item) => item.nombre_rendez_vous === 1).length,
    },
    activite: NOTIFICATIONS_DEMO,
  };
}

export async function listerRendezVous(): Promise<RendezVousDetaille[]> {
  return detailler([...RENDEZ_VOUS_DEMO].sort((a, b) => a.debut_le.localeCompare(b.debut_le)));
}

/** Semaine du lundi 9 au samedi 14 novembre 2026. */
export async function obtenirSemaine() {
  const jours = [9, 10, 11, 12, 13, 14].map((jour) => `2026-11-${String(jour).padStart(2, "0")}`);
  return {
    jours: jours.map((jour) => ({ jour: `${jour}T09:00:00Z`, rendezVous: detailler(rendezVousDuJour(RENDEZ_VOUS_DEMO, jour)) })),
    aujourdHui: `${JOUR_DEMONSTRATION}T09:00:00Z`,
    heureActuelle: HEURE_ACTUELLE_DEMONSTRATION,
  };
}

export async function listerClients(): Promise<Client[]> {
  return [...CLIENTS_DEMO].sort((a, b) => a.nom_complet.localeCompare(b.nom_complet, "fr"));
}

export async function listerServices(): Promise<(Service & { nombre_semaine: number })[]> {
  const classement = classerServices(RENDEZ_VOUS_DEMO);
  return SERVICES_DEMO.map((service) => ({
    ...service,
    nombre_semaine: classement.find((item) => item.service_id === service.id)?.nombre ?? 0,
  }));
}

export async function listerEquipe(): Promise<(Collaborateur & { services: string[]; rendez_vous_du_jour: number })[]> {
  const duJour = rendezVousDuJour(RENDEZ_VOUS_DEMO, JOUR_DEMONSTRATION).filter((item) => item.statut !== "annule");
  return EQUIPE_DEMO.map((membre) => ({
    ...membre,
    services: membre.services_ids.map(nomService),
    rendez_vous_du_jour: duJour.filter((item) => item.collaborateur_id === membre.id).length,
  }));
}

export async function listerDisponibilites() {
  return EQUIPE_DEMO.filter((membre) => membre.role !== "secretaire").map((membre) => ({
    collaborateur: membre,
    plages: DISPONIBILITES_DEMO.filter((plage) => plage.collaborateur_id === membre.id),
  }));
}

export async function obtenirFinances(): Promise<{
  factures: (Facture & { client_nom: string })[];
  totaux: Record<Facture["statut"], number>;
}> {
  return {
    factures: FACTURES_DEMO.map((facture) => ({ ...facture, client_nom: nomClient(facture.client_id) })),
    totaux: {
      payee: totalFactures(FACTURES_DEMO, "payee"),
      en_attente: totalFactures(FACTURES_DEMO, "en_attente"),
      en_retard: totalFactures(FACTURES_DEMO, "en_retard"),
    },
  };
}

export async function obtenirRapports() {
  return {
    semaines: HISTORIQUE_SEMAINES_DEMO,
    services: classerServices(RENDEZ_VOUS_DEMO).map((item) => ({ ...item, nom: nomService(item.service_id) })),
    statuts: compterParStatut(RENDEZ_VOUS_DEMO),
    total: RENDEZ_VOUS_DEMO.length,
  };
}

export async function listerNotifications() {
  return NOTIFICATIONS_DEMO;
}
