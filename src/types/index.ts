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
