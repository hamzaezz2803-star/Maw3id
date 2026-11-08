import { FUSEAU_HORAIRE_PAR_DEFAUT } from "@/constants";
import { PARAMETRES_REGIONAUX } from "@/i18n/config";
import type { Langue } from "@/types";

/** Remplace les {cle} d'un modèle de texte. Une clé inconnue reste visible. */
export function formaterTexte(modele: string, valeurs: Record<string, string | number>): string {
  return modele.replace(/\{(\w+)\}/g, (correspondance, cle: string) =>
    cle in valeurs ? String(valeurs[cle]) : correspondance,
  );
}

/** « Salma Idrissi » -> « SI » */
export function obtenirInitiales(nom: string): string {
  return nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((partie) => partie[0]?.toUpperCase() ?? "")
    .join("");
}

/** « sam. 14 nov. 2026 » (fuseau fixe : identique côté serveur et navigateur). */
export function formaterDate(dateIso: string, langue: Langue): string {
  return new Intl.DateTimeFormat(PARAMETRES_REGIONAUX[langue], {
    timeZone: FUSEAU_HORAIRE_PAR_DEFAUT,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateIso));
}

/** « 14:30 » (format 24 h) */
export function formaterHeure(dateIso: string, langue: Langue): string {
  return new Intl.DateTimeFormat(PARAMETRES_REGIONAUX[langue], {
    timeZone: FUSEAU_HORAIRE_PAR_DEFAUT,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(dateIso));
}

/** « sam. 14 nov. 2026, 14:30 » */
export function formaterDateHeure(dateIso: string, langue: Langue): string {
  return `${formaterDate(dateIso, langue)}, ${formaterHeure(dateIso, langue)}`;
}
