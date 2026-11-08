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

/** « 1 250,00 MAD » en français (règle de design) ; format marocain en arabe. */
export function formaterMontant(montant: number, langue: Langue): string {
  if (langue === "ar") {
    return new Intl.NumberFormat(PARAMETRES_REGIONAUX.ar, { style: "currency", currency: "MAD" }).format(montant);
  }
  const nombre = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(montant);
  // Espaces fines insécables de fr-FR remplacées par des espaces insécables classiques.
  return `${nombre.replace(/[\u202f\u00a0]/g, "\u00a0")}\u00a0MAD`;
}

/** « +212612345678 » -> « 06 12 34 56 78 » ; les autres numéros sont laissés tels quels. */
export function formaterTelephone(numeroE164: string): string {
  const national = numeroE164.startsWith("+212") ? `0${numeroE164.slice(4)}` : numeroE164;
  return /^0\d{9}$/.test(national) ? national.replace(/(\d{2})(?=\d)/g, "$1 ") : numeroE164;
}

/** 90 -> « 1 h 30 », 45 -> « 45 min », 60 -> « 1 h » (unités fournies par le dictionnaire). */
export function formaterDuree(minutes: number, unites: { heure: string; minute: string }): string {
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  if (heures === 0) return `${reste} ${unites.minute}`;
  return reste === 0 ? `${heures} ${unites.heure}` : `${heures} ${unites.heure} ${String(reste).padStart(2, "0")}`;
}

/** « mar. 10 nov. » : jour et date courts, sans l'année. */
export function formaterJourCourt(dateIso: string, langue: Langue): string {
  return new Intl.DateTimeFormat(PARAMETRES_REGIONAUX[langue], {
    timeZone: FUSEAU_HORAIRE_PAR_DEFAUT,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(dateIso));
}

/** « mardi 10 novembre » : pour le titre d'une journée. */
export function formaterJourLong(dateIso: string, langue: Langue): string {
  return new Intl.DateTimeFormat(PARAMETRES_REGIONAUX[langue], {
    timeZone: FUSEAU_HORAIRE_PAR_DEFAUT,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(dateIso));
}

/** 31 -> « 31 % » en français, format marocain en arabe. */
export function formaterPourcentage(valeur: number, langue: Langue): string {
  const texte = new Intl.NumberFormat(langue === "ar" ? PARAMETRES_REGIONAUX.ar : "fr-FR", { style: "percent", maximumFractionDigits: 0 }).format(valeur / 100);
  // Même espace insécable que pour les montants.
  return texte.replace(/[\u202f\u00a0]/g, "\u00a0");
}
