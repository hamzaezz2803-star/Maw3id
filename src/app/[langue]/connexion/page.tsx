import type { Metadata } from "next";
import { CadreAuthentification } from "@/components/authentification/CadreAuthentification";
import { FormulaireConnexion } from "@/components/authentification/FormulaireConnexion";
import { obtenirTraductions } from "@/i18n/serveur";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.connexion.titre };
}

export default async function PageConnexion() {
  const { t } = await obtenirTraductions();

  return (
    <CadreAuthentification titre={t.connexion.titre} sousTitre={t.connexion.sousTitre} note={t.connexion.compteCree}>
      <FormulaireConnexion />
    </CadreAuthentification>
  );
}
