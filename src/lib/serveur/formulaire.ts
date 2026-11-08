import "server-only";
import { estLangueValide, LANGUE_PAR_DEFAUT } from "@/i18n/config";
import type { Langue } from "@/types";

/**
 * Lit et retire la langue envoyée par le champ caché « langue » d'un formulaire.
 * C'est une entrée du navigateur : elle est validée comme les autres.
 */
export function extraireLangue(formulaire: FormData): Langue {
  const valeur = String(formulaire.get("langue") ?? "");
  formulaire.delete("langue");
  return estLangueValide(valeur) ? valeur : LANGUE_PAR_DEFAUT;
}
