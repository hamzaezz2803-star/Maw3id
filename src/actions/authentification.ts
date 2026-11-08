"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CHEMIN_CONNEXION } from "@/config/navigation";
import { estLangueValide, LANGUE_PAR_DEFAUT } from "@/i18n/config";
import { traduireErreurConnexion, type CleErreurConnexion } from "@/lib/auth/erreurs";
import { cheminLocalise } from "@/lib/navigation";
import { auth } from "@/lib/serveur/auth";
import { schemaConnexion, validerFormulaire, type ErreursChamps } from "@/lib/validation/schemas";
import type { Langue } from "@/types";

export interface EtatConnexion {
  erreur?: CleErreurConnexion;
  erreursChamps?: ErreursChamps;
  /** Renvoyé pour ne pas vider le champ après une erreur (jamais le mot de passe). */
  email?: string;
}

/** La langue arrive d'un champ caché : on la valide comme toute entrée. */
function lireLangue(formulaire: FormData): Langue {
  const valeur = String(formulaire.get("langue") ?? "");
  return estLangueValide(valeur) ? valeur : LANGUE_PAR_DEFAUT;
}

export async function seConnecter(_etat: EtatConnexion, formulaire: FormData): Promise<EtatConnexion> {
  const langue = lireLangue(formulaire);
  formulaire.delete("langue");
  const email = String(formulaire.get("email") ?? "");

  const validation = validerFormulaire(schemaConnexion, formulaire);
  if (!validation.ok) return { erreursChamps: validation.erreurs, email };

  try {
    await auth.api.signInEmail({
      body: { email: validation.donnees.email, password: validation.donnees.mot_de_passe },
      headers: await headers(),
    });
  } catch (erreur) {
    return { erreur: traduireErreurConnexion(erreur), email };
  }

  // La page de langue redirige vers l'accueil adapté au rôle.
  redirect(`/${langue}`);
}

export async function seDeconnecter(formulaire: FormData): Promise<void> {
  const langue = lireLangue(formulaire);
  await auth.api.signOut({ headers: await headers() });
  redirect(cheminLocalise(CHEMIN_CONNEXION, langue));
}
