"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CHEMIN_CONNEXION, CHEMIN_VERIFICATION_CODE } from "@/config/navigation";
import { traduireErreurConnexion, type CleErreurConnexion } from "@/lib/auth/erreurs";
import { cheminLocalise } from "@/lib/navigation";
import { auth } from "@/lib/serveur/auth";
import { extraireLangue } from "@/lib/serveur/formulaire";
import { schemaConnexion, validerFormulaire, type ErreursChamps } from "@/lib/validation/schemas";

export interface EtatConnexion {
  erreur?: CleErreurConnexion;
  erreursChamps?: ErreursChamps;
  /** Renvoyé pour ne pas vider le champ après une erreur (jamais le mot de passe). */
  email?: string;
}

export async function seConnecter(_etat: EtatConnexion, formulaire: FormData): Promise<EtatConnexion> {
  const langue = extraireLangue(formulaire);
  const email = String(formulaire.get("email") ?? "");

  const validation = validerFormulaire(schemaConnexion, formulaire);
  if (!validation.ok) return { erreursChamps: validation.erreurs, email };

  let codeDemande = false;
  try {
    const resultat = await auth.api.signInEmail({
      body: { email: validation.donnees.email, password: validation.donnees.mot_de_passe },
      headers: await headers(),
    });
    // Double authentification active : pas encore de session, le code est demandé.
    codeDemande = "twoFactorRedirect" in resultat && resultat.twoFactorRedirect === true;
  } catch (erreur) {
    return { erreur: traduireErreurConnexion(erreur), email };
  }

  // Sinon, la page de langue redirige vers l'accueil adapté au rôle.
  redirect(codeDemande ? cheminLocalise(CHEMIN_VERIFICATION_CODE, langue) : `/${langue}`);
}

export async function seDeconnecter(formulaire: FormData): Promise<void> {
  const langue = extraireLangue(formulaire);
  await auth.api.signOut({ headers: await headers() });
  redirect(cheminLocalise(CHEMIN_CONNEXION, langue));
}
