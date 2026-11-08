"use client";

import { useActionState } from "react";
import { seConnecter, type EtatConnexion } from "@/actions/authentification";
import { Bouton } from "@/components/ui/Bouton";
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
      <ChampTexte
        name="mot_de_passe"
        type="password"
        autoComplete="current-password"
        libelle={t.connexion.motDePasse}
        erreur={erreurChamp("mot_de_passe")}
        required
      />
      <Bouton type="submit" enCours={enCours} className="w-full">
        {t.connexion.seConnecter}
      </Bouton>
    </form>
  );
}
