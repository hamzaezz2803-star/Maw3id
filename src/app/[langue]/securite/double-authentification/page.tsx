import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { seDeconnecter } from "@/actions/authentification";
import { AssistantActivation } from "@/components/authentification/AssistantActivation";
import { CadreAuthentification } from "@/components/authentification/CadreAuthentification";
import { EcranChargement } from "@/components/mise-en-page/EcranChargement";
import { Bouton } from "@/components/ui/Bouton";
import { obtenirTraductions } from "@/i18n/serveur";
import { exigerContexteSession } from "@/lib/donnees/session";

// La page lit la session à chaque requête : la navigation attend la vérification serveur.
export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.doubleAuthentification.activation.titre };
}

/** Activation obligatoire pour les administrateurs, avant tout accès à l'application. */
async function ContenuActivation() {
  const [{ langue, t }, contexte] = await Promise.all([
    obtenirTraductions(),
    exigerContexteSession({ avantDoubleAuthentification: true }),
  ]);
  if (contexte.doubleAuthentificationActive) redirect(`/${langue}`);

  return (
    <CadreAuthentification titre={t.doubleAuthentification.activation.titre} large>
      <AssistantActivation />
      <form action={seDeconnecter} className="mt-4 flex justify-center">
        <input type="hidden" name="langue" value={langue} />
        <Bouton type="submit" variante="fantome" taille="petit">
          {t.utilisateur.deconnexion}
        </Bouton>
      </form>
    </CadreAuthentification>
  );
}

export default function PageActivationDoubleAuthentification() {
  return (
    <Suspense fallback={<EcranChargement />}>
      <ContenuActivation />
    </Suspense>
  );
}
