import type { LucideIcon } from "lucide-react";

/*
 * Types partagés. Les champs sont en snake_case et en français, comme les
 * futures colonnes de la base : les pages ne changeront pas au passage à
 * PostgreSQL.
 */

export type Langue = "fr" | "ar";

export type Role =
  | "administrateur_plateforme"
  | "administrateur"
  | "secretaire"
  | "collaborateur"
  | "client";

export type TypeOrganisation =
  | "clinique_medicale"
  | "cabinet_dentaire"
  | "cabinet_avocats"
  | "cabinet_comptable"
  | "cabinet_conseil"
  | "centre_formation"
  | "autre";

/** Colonnes présentes sur chaque table. */
interface Horodatage {
  id: string;
  cree_le: string;
  modifie_le: string;
}

export interface Organisation extends Horodatage {
  nom: string;
  type: TypeOrganisation;
  logo_url: string | null;
  ville: string;
}

export interface Utilisateur extends Horodatage {
  nom_complet: string;
  email: string;
  fonction: string | null;
  avatar_url: string | null;
}

/** Lien entre un utilisateur et une organisation, avec son rôle dans celle-ci. */
export interface Membre extends Horodatage {
  utilisateur_id: string;
  organisation_id: string;
  role: Role;
}

export type TypeNotification =
  | "nouvelle_reservation"
  | "rappel_rendez_vous"
  | "paiement_recu"
  | "disponibilite_modifiee";

/** Le texte est construit à l'affichage, dans la langue de l'utilisateur. */
export interface Notification extends Horodatage {
  organisation_id: string;
  type: TypeNotification;
  /** Valeurs insérées dans le modèle de texte du type de notification. */
  valeurs: Record<string, string>;
  est_lue: boolean;
}

export interface OrganisationAvecRole {
  organisation: Organisation;
  role: Role;
}

export interface ContexteSession {
  utilisateur: Utilisateur;
  /** Absente pour un Administrateur plateforme qui n'est membre d'aucune organisation. */
  organisationCourante: Organisation | null;
  role: Role;
  doubleAuthentificationActive: boolean;
  /** Toutes les organisations de l'utilisateur, pour le sélecteur. */
  organisations: OrganisationAvecRole[];
}

/** Résultat explicite des fonctions qui peuvent échouer. */
export type Resultat<T> = { ok: true; donnees: T } | { ok: false; erreur: string };

export type IdElementNavigation =
  | "tableau-de-bord"
  | "rendez-vous"
  | "calendrier"
  | "clients"
  | "services"
  | "equipe"
  | "disponibilites"
  | "reservation-en-ligne"
  | "notifications"
  | "finances"
  | "rapports"
  | "parametres"
  | "organisations"
  | "utilisateurs";

export type IdSectionNavigation = "plateforme" | "apercu" | "gestion" | "relation-client" | "activite";

export interface ElementNavigation {
  /** Identifiant stable, aussi utilisé comme segment d'URL. */
  id: IdElementNavigation;
  /** Chemin sans le préfixe de langue (/clients). */
  chemin: string;
  icone: LucideIcon;
  /** Rôles autorisés à voir l'élément. Les vraies permissions viendront plus tard. */
  roles: readonly Role[];
}

export interface SectionNavigation {
  id: IdSectionNavigation;
  /** Une section sans titre est affichée en tête de la barre latérale. */
  avecTitre: boolean;
  elements: ElementNavigation[];
}

export interface ElementFilAriane {
  libelle: string;
  lien?: string;
}

export type StatutRendezVous = "confirme" | "en_attente" | "annule";

/* --- Données métier (aperçu avec données statiques) --- */

export type StatutRendezVousComplet = StatutRendezVous | "termine" | "absent";

export interface Client extends Horodatage {
  organisation_id: string;
  nom_complet: string;
  telephone: string;
  email: string | null;
  nombre_rendez_vous: number;
  dernier_rendez_vous_le: string | null;
}

export interface Service extends Horodatage {
  organisation_id: string;
  nom: string;
  categorie: string;
  duree_minutes: number;
  prix_mad: number;
  est_actif: boolean;
  est_reservable_en_ligne: boolean;
}

export interface Collaborateur extends Horodatage {
  organisation_id: string;
  nom_complet: string;
  fonction: string;
  role: Role;
  /** Horaires du jour de démonstration, null si absent. */
  horaires_du_jour: { debut: string; fin: string } | null;
  services_ids: string[];
}

export interface RendezVous extends Horodatage {
  organisation_id: string;
  client_id: string;
  service_id: string;
  collaborateur_id: string;
  debut_le: string;
  duree_minutes: number;
  statut: StatutRendezVousComplet;
  source: "en_ligne" | "accueil" | "telephone";
}

export type StatutFacture = "payee" | "en_attente" | "en_retard";

export interface Facture extends Horodatage {
  organisation_id: string;
  numero: string;
  client_id: string;
  emise_le: string;
  montant_mad: number;
  statut: StatutFacture;
}

/** Une plage d'ouverture hebdomadaire ; jour : 1 = lundi ... 7 = dimanche. */
export interface PlageDisponibilite {
  collaborateur_id: string;
  jour: number;
  debut: string;
  fin: string;
}

/** Rendez-vous avec les noms utiles à l'affichage. */
export interface RendezVousDetaille extends RendezVous {
  client_nom: string;
  service_nom: string;
  collaborateur_nom: string;
}
