import { CircleAlert, Clock, FilePlus, Wallet } from "lucide-react";
import { Indicateur } from "@/components/activite/Indicateur";
import { BadgeStatutFacture, MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Bouton } from "@/components/ui/Bouton";
import { Carte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirFinances } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterDate, formaterMontant } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("finances");
}

export default async function PageFinances() {
  const [{ langue, t }, , { factures, totaux }] = await Promise.all([obtenirTraductions(), exigerAccesModule("finances"), obtenirFinances()]);
  const textes = t.finances;

  return (
    <ConteneurPage
      titre={t.navigation.libelles.finances}
      description={textes.description}
      actions={<Bouton><FilePlus aria-hidden="true" />{textes.nouvelleFacture}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Indicateur icone={Wallet} libelle={textes.totaux.payee} valeur={formaterMontant(totaux.payee, langue)} />
        <Indicateur icone={Clock} libelle={textes.totaux.en_attente} valeur={formaterMontant(totaux.en_attente, langue)} />
        <Indicateur icone={CircleAlert} libelle={textes.totaux.en_retard} valeur={formaterMontant(totaux.en_retard, langue)} />
      </div>

      <Carte className="overflow-hidden">
        <EnteteCarte className="pb-4"><TitreCarte className="text-section-title">{textes.factures}</TitreCarte></EnteteCarte>
        <Tableau>
          <EnteteTableau>
            <LigneTableau>
              {(["numero", "client", "date", "montant", "statut"] as const).map((colonne) => (
                <CelluleEntete key={colonne} className={colonne === "montant" ? "text-end" : undefined}>{textes.colonnes[colonne]}</CelluleEntete>
              ))}
            </LigneTableau>
          </EnteteTableau>
          <CorpsTableau>
            {factures.map((facture) => (
              <LigneTableau key={facture.id}>
                <CelluleTableau dir="ltr" className="whitespace-nowrap text-start font-medium tabular-nums">{facture.numero}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap">{facture.client_nom}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap text-fg-secondary">{formaterDate(facture.emise_le, langue)}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap text-end tabular-nums">{formaterMontant(facture.montant_mad, langue)}</CelluleTableau>
                <CelluleTableau><BadgeStatutFacture statut={facture.statut} t={t} /></CelluleTableau>
              </LigneTableau>
            ))}
          </CorpsTableau>
        </Tableau>
      </Carte>
    </ConteneurPage>
  );
}
