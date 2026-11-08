import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Avatar } from "@/components/ui/Avatar";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerDisponibilites } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterJourCourt } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("disponibilites");
}

/** Lundi de référence pour écrire le nom des jours dans la langue affichée. */
const LUNDI_REFERENCE = Date.UTC(2026, 10, 9, 12);
const JOURS = [1, 2, 3, 4, 5, 6, 7];
const UN_JOUR_MS = 86_400_000;

export default async function PageDisponibilites() {
  const [{ langue, t }, , lignes] = await Promise.all([obtenirTraductions(), exigerAccesModule("disponibilites"), listerDisponibilites()]);
  const textes = t.disponibilites;
  const nomJour = (jour: number) =>
    formaterJourCourt(new Date(LUNDI_REFERENCE + (jour - 1) * UN_JOUR_MS).toISOString(), langue).split(" ")[0];

  return (
    <ConteneurPage
      titre={t.navigation.libelles.disponibilites}
      description={textes.description}
      actions={<Bouton variante="contour">{textes.modifier}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <Carte className="overflow-hidden">
        <Tableau>
          <EnteteTableau>
            <LigneTableau>
              <CelluleEntete>{textes.collaborateur}</CelluleEntete>
              {JOURS.map((jour) => (
                <CelluleEntete key={jour} className="capitalize">{nomJour(jour)}</CelluleEntete>
              ))}
            </LigneTableau>
          </EnteteTableau>
          <CorpsTableau>
            {lignes.map(({ collaborateur, plages }) => (
              <LigneTableau key={collaborateur.id}>
                <CelluleEntete scope="row" className="h-auto py-3 font-medium text-fg">
                  <span className="flex items-center gap-3">
                    <Avatar nom={collaborateur.nom_complet} taille="petit" />
                    {collaborateur.nom_complet}
                  </span>
                </CelluleEntete>
                {JOURS.map((jour) => {
                  const plage = plages.find((item) => item.jour === jour);
                  return (
                    <CelluleTableau key={jour} className="whitespace-nowrap">
                      {plage ? (
                        <span dir="ltr" className="inline-flex rounded-md border-s-4 border-primary bg-primary-subtle px-2 py-1 text-helper tabular-nums text-fg">
                          {plage.debut} - {plage.fin}
                        </span>
                      ) : (
                        <span className="text-helper text-fg-muted">{textes.ferme}</span>
                      )}
                    </CelluleTableau>
                  );
                })}
              </LigneTableau>
            ))}
          </CorpsTableau>
        </Tableau>
      </Carte>
    </ConteneurPage>
  );
}
