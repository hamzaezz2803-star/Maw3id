import { z } from "zod";
import { LONGUEUR_MIN_MOT_DE_PASSE } from "@/constants";
import { ROLES_ORGANISATION } from "@/lib/auth/droits";
import type { TypeOrganisation } from "@/types";

/*
 * Schémas de validation des formulaires. Les messages sont des clés de
 * dictionnaire (validation.*), traduites à l'affichage.
 */

export const TYPES_ORGANISATION = [
  "clinique_medicale",
  "cabinet_dentaire",
  "cabinet_avocats",
  "cabinet_comptable",
  "cabinet_conseil",
  "centre_formation",
  "autre",
] as const satisfies readonly TypeOrganisation[];

const LONGUEUR_MAX_TEXTE = 120;
const LONGUEUR_MAX_MOT_DE_PASSE = 128;

const texteRequis = z.string().trim().min(1, "requis").max(LONGUEUR_MAX_TEXTE, "trop_long");

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "requis")
  .pipe(z.email("email_invalide"));

const nouveauMotDePasse = z
  .string()
  .min(LONGUEUR_MIN_MOT_DE_PASSE, "mot_de_passe_court")
  .max(LONGUEUR_MAX_MOT_DE_PASSE, "trop_long");

export const schemaConnexion = z.object({
  email,
  mot_de_passe: z.string().min(1, "requis").max(LONGUEUR_MAX_MOT_DE_PASSE, "trop_long"),
});

export const schemaNouvelleOrganisation = z.object({
  nom: texteRequis,
  type: z.enum(TYPES_ORGANISATION, "type_invalide"),
  ville: texteRequis,
  admin_nom: texteRequis,
  admin_email: email,
  admin_mot_de_passe: nouveauMotDePasse,
});

export const schemaNouvelUtilisateur = z.object({
  nom_complet: texteRequis,
  email,
  fonction: z.string().trim().max(LONGUEUR_MAX_TEXTE, "trop_long").optional(),
  mot_de_passe: nouveauMotDePasse,
  organisation_id: z.uuid("organisation_invalide"),
  role: z.enum(ROLES_ORGANISATION, "role_invalide"),
});

export type ErreursChamps = Record<string, string>;

export type ResultatValidation<T> = { ok: true; donnees: T } | { ok: false; erreurs: ErreursChamps };

/** Valide un formulaire et renvoie la première erreur de chaque champ. */
export function validerFormulaire<T>(schema: z.ZodType<T>, formulaire: FormData): ResultatValidation<T> {
  const resultat = schema.safeParse(Object.fromEntries(formulaire));
  if (resultat.success) return { ok: true, donnees: resultat.data };

  const erreurs: ErreursChamps = {};
  for (const probleme of resultat.error.issues) {
    const champ = String(probleme.path[0] ?? "formulaire");
    erreurs[champ] ??= probleme.message;
  }
  return { ok: false, erreurs };
}
