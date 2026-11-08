"use client";

import Link from "next/link";
import { useActionState } from "react";
import { verifierCodeConnexion } from "@/actions/double-authentification";
import { Bouton } from "@/components/ui/Bouton";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { MessageErreur } from "@/components/ui/MessageErreur";
import { CHEMIN_CONNEXION } from "@/config/navigation";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { cheminLocalise } from "@/lib/navigation";

export function FormulaireVerificationCode() {
  const { langue, t } = useTraductions();
  const textes = t.doubleAuthentification;
  const [etat, action, enCours] = useActionState(verifierCodeConnexion, {});
  const delaiExpire = etat.erreur === "verification_expiree";

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="langue" value={langue} />
      {etat.erreur && <MessageErreur>{textes.erreurs[etat.erreur]}</MessageErreur>}
      <ChampTexte
        name="code"
        libelle={textes.verification.code}
        aide={textes.verification.aideCode}
        autoComplete="one-time-code"
        autoCapitalize="off"
        spellCheck={false}
        dir="ltr"
        className="text-center font-mono tracking-widest"
        required
        autoFocus
      />
      <Bouton type="submit" enCours={enCours} disabled={delaiExpire} className="w-full">
        {textes.verification.verifier}
      </Bouton>
      <Link
        href={cheminLocalise(CHEMIN_CONNEXION, langue)}
        className="inline-flex min-h-11 items-center justify-center text-helper text-primary-hover hover:underline sm:min-h-0"
      >
        {textes.verification.retourConnexion}
      </Link>
    </form>
  );
}
