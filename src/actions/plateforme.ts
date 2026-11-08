"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE_PLATEFORME_PAR_DEFAUT } from "@/lib/auth/droits";
import { estEmailDejaUtilise } from "@/lib/auth/erreurs";
import { exigerAccesModule } from "@/lib/donnees/session";
import { cheminLocalise } from "@/lib/navigation";
import { auth } from "@/lib/serveur/auth";
import { extraireLangue } from "@/lib/serveur/formulaire";
import { genererIdentifiantUrl } from "@/lib/texte";
import {
  schemaNouvelleOrganisation,
  schemaNouvelUtilisateur,
  validerFormulaire,
  type ErreursChamps,
} from "@/lib/validation/schemas";

export interface EtatFormulaire {
  erreursChamps?: ErreursChamps;
  /** Clé de validation.* affichée en haut du formulaire. */
  erreur?: "erreur_serveur";
  /** Valeurs saisies, renvoyées pour ne pas vider le formulaire (jamais le mot de passe). */
  valeurs?: Record<string, string>;
}

const LONGUEUR_SUFFIXE_URL = 6;

/** Langue du formulaire et valeurs saisies à renvoyer en cas d'erreur (jamais les mots de passe). */
function separerLangue(formulaire: FormData) {
  const langue = extraireLangue(formulaire);
  const valeurs: Record<string, string> = {};
  formulaire.forEach((contenu, cle) => {
    if (!cle.includes("mot_de_passe") && typeof contenu === "string") valeurs[cle] = contenu;
  });
  return { langue, valeurs };
}

async function creerCompte(corps: { email: string; nom: string; motDePasse: string; fonction?: string }) {
  return auth.api.createUser({
    body: {
      email: corps.email,
      name: corps.nom,
      password: corps.motDePasse,
      role: ROLE_PLATEFORME_PAR_DEFAUT,
      data: corps.fonction ? { fonction: corps.fonction } : undefined,
    },
    headers: await headers(),
  });
}

/** Crée une organisation et son premier administrateur. */
export async function creerOrganisation(_etat: EtatFormulaire, formulaire: FormData): Promise<EtatFormulaire> {
  const { langue, valeurs } = separerLangue(formulaire);
  await exigerAccesModule("organisations", langue);
  const validation = validerFormulaire(schemaNouvelleOrganisation, formulaire);
  if (!validation.ok) return { erreursChamps: validation.erreurs, valeurs };
  const donnees = validation.donnees;

  let utilisateurId: string;
  try {
    const { user } = await creerCompte({ email: donnees.admin_email, nom: donnees.admin_nom, motDePasse: donnees.admin_mot_de_passe });
    utilisateurId = user.id;
  } catch (erreur) {
    if (estEmailDejaUtilise(erreur)) return { erreursChamps: { admin_email: "email_deja_utilise" }, valeurs };
    return { erreur: "erreur_serveur", valeurs };
  }

  try {
    await auth.api.createOrganization({
      body: {
        name: donnees.nom,
        slug: genererIdentifiantUrl(donnees.nom, randomUUID().slice(0, LONGUEUR_SUFFIXE_URL)),
        type: donnees.type,
        ville: donnees.ville,
        userId: utilisateurId,
      },
    });
  } catch {
    // Pas de compte orphelin : on retire l'administrateur si l'organisation n'a pas pu être créée.
    await auth.api.removeUser({ body: { userId: utilisateurId }, headers: await headers() }).catch(() => undefined);
    return { erreur: "erreur_serveur", valeurs };
  }

  redirect(cheminLocalise("/plateforme/organisations", langue));
}

/** Crée un compte et le rattache à une organisation avec un rôle. */
export async function creerUtilisateur(_etat: EtatFormulaire, formulaire: FormData): Promise<EtatFormulaire> {
  const { langue, valeurs } = separerLangue(formulaire);
  await exigerAccesModule("utilisateurs", langue);
  if (!formulaire.get("fonction")) formulaire.delete("fonction");
  const validation = validerFormulaire(schemaNouvelUtilisateur, formulaire);
  if (!validation.ok) return { erreursChamps: validation.erreurs, valeurs };
  const donnees = validation.donnees;

  let utilisateurId: string;
  try {
    const { user } = await creerCompte({
      email: donnees.email,
      nom: donnees.nom_complet,
      motDePasse: donnees.mot_de_passe,
      fonction: donnees.fonction,
    });
    utilisateurId = user.id;
  } catch (erreur) {
    if (estEmailDejaUtilise(erreur)) return { erreursChamps: { email: "email_deja_utilise" }, valeurs };
    return { erreur: "erreur_serveur", valeurs };
  }

  try {
    await auth.api.addMember({
      body: { userId: utilisateurId, organizationId: donnees.organisation_id, role: donnees.role },
    });
  } catch {
    await auth.api.removeUser({ body: { userId: utilisateurId }, headers: await headers() }).catch(() => undefined);
    return { erreursChamps: { organisation_id: "organisation_invalide" }, valeurs };
  }

  redirect(cheminLocalise("/plateforme/utilisateurs", langue));
}
