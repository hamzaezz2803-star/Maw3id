import { isAPIError } from "better-auth/api";
import type { Role } from "@/types";

/** Rôles pour lesquels la double authentification est obligatoire (README-securite.md, section 2). */
export const ROLES_DOUBLE_AUTHENTIFICATION_OBLIGATOIRE: readonly Role[] = ["administrateur_plateforme", "administrateur"];

export function exigeDoubleAuthentification(role: Role): boolean {
  return ROLES_DOUBLE_AUTHENTIFICATION_OBLIGATOIRE.includes(role);
}

const FORMAT_CODE_APPLICATION = /^\d{6}$/;
const FORMAT_CODE_SECOURS = /^[A-Za-z0-9]{5}-[A-Za-z0-9]{5}$/;

export type TypeCode = "application" | "secours";

/** « 123 456 » -> application ; « aB3dE-9xYz1 » -> secours ; sinon null. */
export function reconnaitreCode(saisie: string): { type: TypeCode; code: string } | null {
  const code = saisie.replace(/\s+/g, "");
  if (FORMAT_CODE_APPLICATION.test(code)) return { type: "application", code };
  if (FORMAT_CODE_SECOURS.test(code)) return { type: "secours", code };
  return null;
}

/** Clé à saisir à la main si l'utilisateur ne peut pas scanner le QR code. */
export function extraireCleSecrete(uriTotp: string): string | null {
  try {
    return new URL(uriTotp).searchParams.get("secret");
  } catch {
    return null;
  }
}

/** « JBSWY3DPEHPK3PXP » -> « JBSW Y3DP EHPK 3PXP » (lecture plus facile). */
export function grouperParQuatre(cle: string): string {
  return cle.match(/.{1,4}/g)?.join(" ") ?? cle;
}

export type CleErreurCode = "code_invalide" | "trop_de_tentatives" | "verification_expiree" | "mot_de_passe_incorrect" | "erreur_serveur";

const STATUT_TROP_DE_REQUETES = 429;

/** Traduit une erreur de Better Auth pendant l'activation ou la vérification. */
export function traduireErreurCode(erreur: unknown): CleErreurCode {
  if (!isAPIError(erreur)) return "erreur_serveur";
  const code = (erreur.body as { code?: unknown } | undefined)?.code;
  if (erreur.statusCode === STATUT_TROP_DE_REQUETES || code === "ACCOUNT_TEMPORARILY_LOCKED" || code === "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE") {
    return "trop_de_tentatives";
  }
  if (code === "INVALID_TWO_FACTOR_COOKIE") return "verification_expiree";
  if (code === "INVALID_PASSWORD") return "mot_de_passe_incorrect";
  if (code === "INVALID_CODE" || code === "INVALID_BACKUP_CODE") return "code_invalide";
  return "erreur_serveur";
}
