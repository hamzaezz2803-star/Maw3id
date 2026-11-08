import { Suspense } from "react";
import { redirect } from "next/navigation";
import { EcranChargement } from "@/components/mise-en-page/EcranChargement";
import { obtenirCheminAccueil } from "@/config/navigation";
import { obtenirLangue } from "@/i18n/serveur";
import { exigerContexteSession } from "@/lib/donnees/session";
import { cheminLocalise } from "@/lib/navigation";

/** Envoie chaque utilisateur vers l'accueil de son rôle. */
async function RedirectionAccueil(): Promise<null> {
  const [langue, contexte] = await Promise.all([obtenirLangue(), exigerContexteSession()]);
  redirect(cheminLocalise(obtenirCheminAccueil(contexte.role), langue));
}

export default function PageLangue() {
  return (
    <Suspense fallback={<EcranChargement />}>
      <RedirectionAccueil />
    </Suspense>
  );
}
