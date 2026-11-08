import { isAPIError } from "better-auth/api";

const STATUT_TROP_DE_REQUETES = 429;

export type CleErreurConnexion =
  | "identifiants_invalides"
  | "trop_de_tentatives"
  | "compte_bloque"
  | "erreur_serveur";

function codeErreur(erreur: unknown): string | undefined {
  if (!isAPIError(erreur)) return undefined;
  const corps = erreur.body as { code?: unknown } | undefined;
  return typeof corps?.code === "string" ? corps.code : undefined;
}

/** Message affiché après un échec de connexion, sans révéler si l'e-mail existe. */
export function traduireErreurConnexion(erreur: unknown): CleErreurConnexion {
  if (!isAPIError(erreur)) return "erreur_serveur";
  if (erreur.statusCode === STATUT_TROP_DE_REQUETES) return "trop_de_tentatives";
  if (codeErreur(erreur) === "BANNED_USER") return "compte_bloque";
  return "identifiants_invalides";
}

export function estEmailDejaUtilise(erreur: unknown): boolean {
  return codeErreur(erreur)?.startsWith("USER_ALREADY_EXISTS") ?? false;
}
