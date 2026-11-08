import type { Role } from "@/types";

export const NOM_APPLICATION = "Maw3id";

/** Correspond au point de rupture `lg` de Tailwind : barre latérale repliable à partir d'ici. */
export const REQUETE_MEDIA_BUREAU = "(min-width: 1024px)";

/** Fuseau d'affichage des dates tant que l'utilisateur ne peut pas choisir le sien. */
export const FUSEAU_HORAIRE_PAR_DEFAUT = "Africa/Casablanca";

/** Couleur de la barre du navigateur mobile (même valeur que --color-surface). */
export const COULEUR_THEME_NAVIGATEUR = "#ffffff";

/** Rôles qui travaillent dans l'espace de gestion d'une organisation. */
export const ROLES_EQUIPE: readonly Role[] = [
  "administrateur_plateforme",
  "administrateur",
  "secretaire",
  "collaborateur",
];

export const ROLES_ADMINISTRATION: readonly Role[] = ["administrateur_plateforme", "administrateur"];

export const ROLES_GESTION: readonly Role[] = [...ROLES_ADMINISTRATION, "secretaire"];

/** Nombre de pages affichées de chaque côté de la page courante dans la pagination. */
export const PAGES_VOISINES_PAGINATION = 1;
