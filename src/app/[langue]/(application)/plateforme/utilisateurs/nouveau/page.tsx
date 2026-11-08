import type { Metadata } from "next";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { FormulaireUtilisateur } from "@/components/plateforme/FormulaireUtilisateur";
import { Carte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerOrganisationsPourSelection } from "@/lib/donnees/plateforme";
import { cheminLocalise } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.plateforme.utilisateurs.formulaire.titre };
}

export default async function PageNouvelUtilisateur() {
  const [{ langue, t }, organisations] = await Promise.all([obtenirTraductions(), listerOrganisationsPourSelection()]);
  const textes = t.plateforme.utilisateurs.formulaire;

  return (
    <ConteneurPage
      titre={textes.titre}
      filAriane={[
        { libelle: t.navigation.libelles.utilisateurs, lien: cheminLocalise("/plateforme/utilisateurs", langue) },
        { libelle: textes.titre },
      ]}
    >
      <Carte className="max-w-3xl p-5 sm:p-6">
        <FormulaireUtilisateur organisations={organisations} />
      </Carte>
    </ConteneurPage>
  );
}
