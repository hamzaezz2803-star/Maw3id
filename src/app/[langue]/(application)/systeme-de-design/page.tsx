import type { Metadata } from "next";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { ExempleEtatVide, ExemplesCartes, ExemplesSuperpositions, ExempleTableau } from "@/components/systeme-design/ExemplesAffichage";
import { ExemplesBadges, ExemplesBoutons, ExemplesFormulaires } from "@/components/systeme-design/ExemplesSaisie";
import { EchelleTypographique, JetonsCouleurs } from "@/components/systeme-design/JetonsDesign";
import { SectionDemonstration } from "@/components/systeme-design/SectionDemonstration";
import { CHEMIN_ACCUEIL } from "@/config/navigation";
import { obtenirTraductions } from "@/i18n/serveur";
import { cheminLocalise } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.systemeDesign.titre };
}

export default async function PageSystemeDesign() {
  const { langue, t } = await obtenirTraductions();
  const textes = t.systemeDesign;

  return (
    <ConteneurPage
      titre={textes.titre}
      description={textes.description}
      filAriane={[
        { libelle: t.navigation.libelles["tableau-de-bord"], lien: cheminLocalise(CHEMIN_ACCUEIL, langue) },
        { libelle: textes.titre },
      ]}
    >
      <SectionDemonstration titre={textes.couleurs.titre} description={textes.couleurs.description}>
        <JetonsCouleurs textes={textes.couleurs} />
      </SectionDemonstration>
      <SectionDemonstration titre={textes.typographie.titre}>
        <EchelleTypographique textes={textes.typographie} />
      </SectionDemonstration>
      <ExemplesBoutons textes={textes.boutons} />
      <ExemplesFormulaires textes={textes.formulaires} />
      <ExemplesBadges textes={textes.badges} statuts={t.statutsRendezVous} />
      <ExemplesSuperpositions t={t} langue={langue} />
      <ExemplesCartes t={t} />
      <ExempleTableau t={t} langue={langue} />
      <ExempleEtatVide textes={textes.vide} />
    </ConteneurPage>
  );
}
