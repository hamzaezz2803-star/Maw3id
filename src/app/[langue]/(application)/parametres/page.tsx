import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { SectionFormulaire } from "@/components/plateforme/SectionFormulaire";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ListeDeroulante } from "@/components/ui/ListeDeroulante";
import { LANGUES, NOM_LANGUE } from "@/i18n/config";
import { obtenirTraductions } from "@/i18n/serveur";
import { exigerAccesModule } from "@/lib/donnees/session";
import { TYPES_ORGANISATION } from "@/lib/validation/schemas";

export function generateMetadata() {
  return genererMetadonneesModule("parametres");
}

export default async function PageParametres() {
  const [{ langue, t }, contexte] = await Promise.all([obtenirTraductions(), exigerAccesModule("parametres")]);
  const textes = t.parametres;
  const organisation = contexte.organisationCourante;
  const types = TYPES_ORGANISATION.map((type) => ({ valeur: type, libelle: t.typesOrganisation[type] }));
  const langues = LANGUES.map((item) => ({ valeur: item, libelle: NOM_LANGUE[item] }));

  return (
    <ConteneurPage titre={t.navigation.libelles.parametres} description={textes.description} mention={<MentionDemonstration t={t} />}>
      {/* Formulaire d'aperçu : l'enregistrement sera branché avec la gestion des organisations. */}
      <Carte className="max-w-3xl p-5 sm:p-6">
        <form className="flex flex-col gap-8">
          <SectionFormulaire titre={textes.organisation}>
            <ChampTexte name="nom" libelle={textes.nom} defaultValue={organisation?.nom} classeConteneur="sm:col-span-2" />
            <ListeDeroulante name="type" libelle={textes.type} options={types} defaultValue={organisation?.type} />
            <ChampTexte name="ville" libelle={textes.ville} defaultValue={organisation?.ville} />
            <ChampTexte name="telephone" type="tel" dir="ltr" libelle={textes.telephone} defaultValue="05 22 00 00 00" />
            <ChampTexte name="email" type="email" dir="ltr" libelle={textes.email} defaultValue="contact@example.com" />
          </SectionFormulaire>
          <SectionFormulaire titre={textes.preferences}>
            <ChampTexte name="fuseau" libelle={textes.fuseau} defaultValue={textes.fuseauValeur} readOnly />
            <ListeDeroulante name="langue" libelle={textes.langue} options={langues} defaultValue={langue} />
          </SectionFormulaire>
          <div className="flex justify-end border-t border-border pt-5">
            <Bouton type="button">{textes.enregistrer}</Bouton>
          </div>
        </form>
      </Carte>
    </ConteneurPage>
  );
}
