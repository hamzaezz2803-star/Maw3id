import type { Langue } from "@/types";

export const LANGUES: readonly Langue[] = ["fr", "ar"];
export const LANGUE_PAR_DEFAUT: Langue = "fr";

export const DIRECTION_TEXTE: Record<Langue, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
};

/** Paramètres régionaux utilisés pour formater dates et nombres (Maroc). */
export const PARAMETRES_REGIONAUX: Record<Langue, string> = {
  fr: "fr-MA",
  ar: "ar-MA",
};

/** Nom de chaque langue écrit dans cette langue, pour le sélecteur. */
export const NOM_LANGUE: Record<Langue, string> = {
  fr: "Français",
  ar: "العربية",
};

export function estLangueValide(valeur: string): valeur is Langue {
  return (LANGUES as readonly string[]).includes(valeur);
}
