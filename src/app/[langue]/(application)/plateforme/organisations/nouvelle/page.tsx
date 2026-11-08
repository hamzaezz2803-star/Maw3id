import type { Metadata } from "next";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { FormulaireOrganisation } from "@/components/plateforme/FormulaireOrganisation";
import { Carte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { exigerAccesModule } from "@/lib/donnees/session";
import { cheminLocalise } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.plateforme.organisations.formulaire.titre };
}

export default async function PageNouvelleOrganisation() {
  const [{ langue, t }] = await Promise.all([obtenirTraductions(), exigerAccesModule("organisations")]);
  const textes = t.plateforme.organisations.formulaire;

  return (
    <ConteneurPage
      titre={textes.titre}
      description={textes.description}
      filAriane={[
        { libelle: t.navigation.libelles.organisations, lien: cheminLocalise("/plateforme/organisations", langue) },
        { libelle: textes.titre },
      ]}
    >
      <Carte className="max-w-3xl p-5 sm:p-6">
        <FormulaireOrganisation />
      </Carte>
    </ConteneurPage>
  );
}
