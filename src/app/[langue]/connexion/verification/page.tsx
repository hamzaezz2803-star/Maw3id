import type { Metadata } from "next";
import { CadreAuthentification } from "@/components/authentification/CadreAuthentification";
import { FormulaireVerificationCode } from "@/components/authentification/FormulaireVerificationCode";
import { obtenirTraductions } from "@/i18n/serveur";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.doubleAuthentification.verification.titre };
}

/** Deuxième étape de la connexion : code de l'application ou code de secours. */
export default async function PageVerificationCode() {
  const { t } = await obtenirTraductions();
  const textes = t.doubleAuthentification.verification;

  return (
    <CadreAuthentification titre={textes.titre} sousTitre={textes.sousTitre}>
      <FormulaireVerificationCode />
    </CadreAuthentification>
  );
}
