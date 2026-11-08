import type { Role } from "@/types";
import { ROLE_PLATEFORME_ADMIN, ROLES_ORGANISATION } from "./droits";

/**
 * Rôle effectif dans l'interface : Administrateur plateforme s'il l'est,
 * sinon son rôle dans l'organisation courante. `null` si l'utilisateur n'a
 * aucun accès (aucune organisation).
 */
export function determinerRole(rolePlateforme: string | null | undefined, roleMembre: string | null | undefined): Role | null {
  if (rolePlateforme === ROLE_PLATEFORME_ADMIN) return "administrateur_plateforme";
  if (roleMembre && (ROLES_ORGANISATION as readonly string[]).includes(roleMembre)) return roleMembre as Role;
  return null;
}
