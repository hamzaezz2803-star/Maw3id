import type { Dictionnaire } from "@/i18n/dictionnaires";

type CleValidation = keyof Dictionnaire["validation"];

function estCleValidation(t: Dictionnaire, cle: string): cle is CleValidation {
  return cle in t.validation;
}

/** Traduit une clé d'erreur renvoyée par le serveur ; une clé inconnue devient une erreur générique. */
export function traduireErreurChamp(t: Dictionnaire, cle: string | undefined): string | undefined {
  if (!cle) return undefined;
  return estCleValidation(t, cle) ? t.validation[cle] : t.validation.erreur_serveur;
}
