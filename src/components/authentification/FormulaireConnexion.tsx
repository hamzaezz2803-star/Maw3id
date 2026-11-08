"use client";

import { useActionState } from "react";
import { seConnecter, type EtatConnexion } from "@/actions/authentification";
import { Bouton } from "@/components/ui/Bouton";
import { ChampMotDePasse } from "@/components/ui/ChampMotDePasse";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { MessageErreur } from "@/components/ui/MessageErreur";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { traduireErreurChamp } from "@/lib/validation/traduction";

const ETAT_INITIAL: EtatConnexion = {};

export function FormulaireConnexion() {
  const { langue, t } = useTraductions();
  const [etat, action, enCours] = useActionState(seConnecter, ETAT_INITIAL);
  const erreurChamp = (champ: string) => traduireErreurChamp(t, etat.erreursChamps?.[champ]);

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="langue" value={langue} />
      {etat.erreur && <MessageErreur>{t.connexion.erreurs[etat.erreur]}</MessageErreur>}
      <ChampTexte
        name="email"
        type="email"
        autoComplete="username"
        libelle={t.connexion.email}
        defaultValue={etat.email}
        erreur={erreurChamp("email")}
        required
      />
      <ChampMotDePasse
        name="mot_de_passe"
        autoComplete="current-password"
        libelle={t.connexion.motDePasse}
        libelleAfficher={t.connexion.afficherMotDePasse}
        libelleMasquer={t.connexion.masquerMotDePasse}
        erreur={erreurChamp("mot_de_passe")}
        required
      />
      <Bouton type="submit" taille="grand" enCours={enCours} className="mt-1 w-full">
        {t.connexion.seConnecter}
      </Bouton>
    </form>
  );
}
