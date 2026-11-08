import Link from "next/link";
import { Plus } from "lucide-react";
import { BadgeStatutRendezVous, MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { joindreClasses } from "@/lib/classes";
import { listerRendezVous } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterDuree, formaterJourCourt } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";

export function generateMetadata() {
  return genererMetadonneesModule("rendez-vous");
}

const FILTRES = ["tous", "en_attente", "confirme", "annule"] as const;
type Filtre = (typeof FILTRES)[number];

/** Le filtre vient de l'URL : il est validé avant usage. */
function lireFiltre(valeur: string | string[] | undefined): Filtre {
  const texte = Array.isArray(valeur) ? valeur[0] : valeur;
  return (FILTRES as readonly string[]).includes(texte ?? "") ? (texte as Filtre) : "tous";
}

export default async function PageRendezVous({ searchParams }: PageProps<"/[langue]/rendez-vous">) {
  const [{ langue, t }, , tous] = await Promise.all([obtenirTraductions(), exigerAccesModule("rendez-vous"), listerRendezVous()]);
  const textes = t.rendezVous;
  const filtre = lireFiltre((await searchParams).statut);
  const liste = filtre === "tous" ? tous : tous.filter((rdv) => rdv.statut === filtre);
  const base = cheminLocalise("/rendez-vous", langue);

  return (
    <ConteneurPage
      titre={t.navigation.libelles["rendez-vous"]}
      description={textes.description}
      actions={<Bouton><Plus aria-hidden="true" />{textes.nouveau}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <nav aria-label={textes.filtrerParStatut} className="flex flex-wrap gap-2">
        {FILTRES.map((cle) => (
          <Link
            key={cle}
            href={cle === "tous" ? base : `${base}?statut=${cle}`}
            aria-current={cle === filtre ? "page" : undefined}
            className={joindreClasses(
              "inline-flex min-h-11 items-center gap-2 rounded-control border px-3.5 text-label transition-colors sm:min-h-9",
              cle === filtre ? "border-primary bg-primary-subtle text-primary-hover" : "border-border bg-surface text-fg-secondary hover:bg-surface-muted",
            )}
          >
            {textes.filtres[cle]}
            <span className="tabular-nums text-fg-muted">{cle === "tous" ? tous.length : tous.filter((rdv) => rdv.statut === cle).length}</span>
          </Link>
        ))}
      </nav>

      <Carte className="overflow-hidden">
        {liste.length === 0 ? (
          <EtatVide titre={textes.aucun} />
        ) : (
          <Tableau>
            <EnteteTableau>
              <LigneTableau>
                {(["date", "client", "service", "collaborateur", "duree", "source", "statut"] as const).map((colonne) => (
                  <CelluleEntete key={colonne}>{textes.colonnes[colonne]}</CelluleEntete>
                ))}
              </LigneTableau>
            </EnteteTableau>
            <CorpsTableau>
              {liste.map((rdv) => (
                <LigneTableau key={rdv.id}>
                  <CelluleTableau className="whitespace-nowrap">
                    <span className="inline-block first-letter:uppercase">{formaterJourCourt(rdv.debut_le, langue)}</span>{" "}
                    <span dir="ltr" className="font-medium tabular-nums">{rdv.debut_le.slice(11, 16)}</span>
                  </CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap font-medium">{rdv.client_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{rdv.service_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap text-fg-secondary">{rdv.collaborateur_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap tabular-nums">{formaterDuree(rdv.duree_minutes, t.apercu.unites)}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap text-fg-secondary">{t.apercu.sources[rdv.source]}</CelluleTableau>
                  <CelluleTableau><BadgeStatutRendezVous statut={rdv.statut} t={t} /></CelluleTableau>
                </LigneTableau>
              ))}
            </CorpsTableau>
          </Tableau>
        )}
      </Carte>
    </ConteneurPage>
  );
}
