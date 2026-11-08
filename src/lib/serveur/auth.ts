import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, organization, twoFactor } from "better-auth/plugins";
import {
  controleOrganisation,
  controlePlateforme,
  ROLE_PLATEFORME_ADMIN,
  ROLE_PLATEFORME_PAR_DEFAUT,
  rolesOrganisation,
  rolesPlateforme,
} from "@/lib/auth/droits";
import { LONGUEUR_MIN_MOT_DE_PASSE, NOM_APPLICATION } from "@/constants";
import { pool } from "./base-de-donnees";

const DUREE_SESSION_SECONDES = 60 * 60 * 8; // une journée de travail

/*
 * Authentification avec Better Auth (service éprouvé, pas de système maison).
 * Tables et colonnes renommées en français, identifiants uuid, session en
 * cookie httpOnly. L'inscription libre est fermée : seuls les administrateurs
 * créent des comptes.
 */
export const auth = betterAuth({
  appName: NOM_APPLICATION,
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    database: { generateId: "uuid" },
    cookiePrefix: "maw3id",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: LONGUEUR_MIN_MOT_DE_PASSE,
  },
  session: {
    modelName: "sessions",
    expiresIn: DUREE_SESSION_SECONDES,
    fields: {
      expiresAt: "expire_le",
      token: "jeton",
      createdAt: "cree_le",
      updatedAt: "modifie_le",
      ipAddress: "adresse_ip",
      userAgent: "agent_utilisateur",
      userId: "utilisateur_id",
    },
  },
  user: {
    modelName: "utilisateurs",
    fields: {
      name: "nom_complet",
      emailVerified: "email_verifie",
      image: "avatar_url",
      createdAt: "cree_le",
      updatedAt: "modifie_le",
    },
    additionalFields: {
      fonction: { type: "string", required: false },
    },
  },
  account: {
    modelName: "comptes",
    fields: {
      accountId: "compte_fournisseur_id",
      providerId: "fournisseur_id",
      userId: "utilisateur_id",
      accessToken: "jeton_acces",
      refreshToken: "jeton_rafraichissement",
      idToken: "jeton_identite",
      accessTokenExpiresAt: "jeton_acces_expire_le",
      refreshTokenExpiresAt: "jeton_rafraichissement_expire_le",
      scope: "portee",
      password: "mot_de_passe_hache",
      createdAt: "cree_le",
      updatedAt: "modifie_le",
    },
  },
  verification: {
    modelName: "verifications",
    fields: {
      identifier: "identifiant",
      value: "valeur",
      expiresAt: "expire_le",
      createdAt: "cree_le",
      updatedAt: "modifie_le",
    },
  },
  // Limite les essais répétés de mot de passe, y compris en développement.
  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "limites_requetes",
    fields: { key: "cle", count: "nombre", lastRequest: "derniere_requete" },
  },
  plugins: [
    admin({
      ac: controlePlateforme,
      roles: rolesPlateforme,
      adminRoles: [ROLE_PLATEFORME_ADMIN],
      defaultRole: ROLE_PLATEFORME_PAR_DEFAUT,
      schema: {
        user: {
          fields: {
            role: "role_plateforme",
            banned: "est_bloque",
            banReason: "raison_blocage",
            banExpires: "blocage_expire_le",
          },
        },
        session: { fields: { impersonatedBy: "usurpe_par" } },
      },
    }),
    organization({
      ac: controleOrganisation,
      roles: rolesOrganisation,
      creatorRole: "administrateur",
      // Seul l'Administrateur plateforme crée des organisations (via l'API serveur).
      allowUserToCreateOrganization: false,
      schema: {
        session: { fields: { activeOrganizationId: "organisation_active_id" } },
        organization: {
          modelName: "organisations",
          fields: { name: "nom", slug: "identifiant_url", logo: "logo_url", createdAt: "cree_le", metadata: "metadonnees" },
          additionalFields: {
            type: { type: "string", required: true },
            ville: { type: "string", required: true },
          },
        },
        member: {
          modelName: "membres",
          fields: { organizationId: "organisation_id", userId: "utilisateur_id", createdAt: "cree_le" },
        },
        invitation: {
          modelName: "invitations",
          fields: {
            organizationId: "organisation_id",
            status: "statut",
            expiresAt: "expire_le",
            inviterId: "invite_par_id",
            createdAt: "cree_le",
            teamId: "equipe_id",
          },
        },
      },
    }),
    // Double authentification par application (TOTP) et codes de secours, chiffrés en base.
    twoFactor({
      issuer: NOM_APPLICATION,
      schema: {
        user: { fields: { twoFactorEnabled: "double_authentification_active" } },
        twoFactor: {
          modelName: "doubles_authentifications",
          fields: {
            secret: "secret_chiffre",
            backupCodes: "codes_secours_chiffres",
            userId: "utilisateur_id",
            verified: "est_verifiee",
            failedVerificationCount: "nombre_echecs",
            lockedUntil: "bloquee_jusqu_au",
          },
        },
      },
    }),
    // Doit rester le dernier : écrit les cookies depuis les Server Actions.
    nextCookies(),
  ],
});

export type SessionAuth = typeof auth.$Infer.Session;
