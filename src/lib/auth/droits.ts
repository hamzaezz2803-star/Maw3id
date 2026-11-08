import { createAccessControl } from "better-auth/plugins/access";
import { adminAc as adminPlateformeAc, defaultStatements as instructionsPlateforme, userAc } from "better-auth/plugins/admin/access";
import { defaultStatements as instructionsOrganisation, memberAc, ownerAc } from "better-auth/plugins/organization/access";

/*
 * Droits des rôles, partagés par le serveur et les tests.
 * Deux niveaux : la plateforme (Administrateur plateforme) et chaque organisation.
 */

export const ROLE_PLATEFORME_ADMIN = "administrateur_plateforme";
export const ROLE_PLATEFORME_PAR_DEFAUT = "utilisateur";

export const controlePlateforme = createAccessControl(instructionsPlateforme);

export const rolesPlateforme = {
  [ROLE_PLATEFORME_ADMIN]: controlePlateforme.newRole(adminPlateformeAc.statements),
  [ROLE_PLATEFORME_PAR_DEFAUT]: controlePlateforme.newRole(userAc.statements),
};

/** Rôles qu'un membre peut avoir dans une organisation. */
export const ROLES_ORGANISATION = ["administrateur", "secretaire", "collaborateur"] as const;
export type RoleOrganisation = (typeof ROLES_ORGANISATION)[number];

export const controleOrganisation = createAccessControl(instructionsOrganisation);

export const rolesOrganisation: Record<RoleOrganisation, ReturnType<typeof controleOrganisation.newRole>> = {
  administrateur: controleOrganisation.newRole(ownerAc.statements),
  // Les droits fins (clients, rendez-vous...) seront ajoutés avec chaque module.
  secretaire: controleOrganisation.newRole(memberAc.statements),
  collaborateur: controleOrganisation.newRole(memberAc.statements),
};
