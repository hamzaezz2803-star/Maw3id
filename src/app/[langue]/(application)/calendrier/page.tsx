import { AgendaColonnes } from "@/components/activite/AgendaColonnes";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Carte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirSemaine } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterJourCourt, formaterTexte } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("calendrier");
}

export default async function PageCalendrier() {
  const [{ langue, t }, , semaine] = await Promise.all([obtenirTraductions(), exigerAccesModule("calendrier"), obtenirSemaine()]);
  const textes = t.calendrier;
  const premier = semaine.jours[0]?.jour ?? semaine.aujourdHui;
  const dernier = semaine.jours.at(-1)?.jour ?? semaine.aujourdHui;

  const colonnes = semaine.jours.map(({ jour, rendezVous }) => {
    const estAujourdHui = jour === semaine.aujourdHui;
    return {
      id: jour,
      titre: formaterJourCourt(jour, langue),
      sousTitre: estAujourdHui ? textes.aujourdHui : undefined,
      estMiseEnAvant: estAujourdHui,
      rendezVous,
    };
  });

  return (
    <ConteneurPage titre={t.navigation.libelles.calendrier} description={textes.description} mention={<MentionDemonstration t={t} />}>
      <Carte className="min-w-0">
        <EnteteCarte className="pb-4">
          <TitreCarte className="text-section-title first-letter:uppercase">
            {formaterTexte(textes.semaine, { debut: formaterJourCourt(premier, langue), fin: formaterJourCourt(dernier, langue) })}
          </TitreCarte>
        </EnteteCarte>
        <div className="px-2 pb-4 sm:px-4">
          <AgendaColonnes colonnes={colonnes} heureActuelle={semaine.heureActuelle} detail="collaborateur" t={t} />
        </div>
      </Carte>
    </ConteneurPage>
  );
}
