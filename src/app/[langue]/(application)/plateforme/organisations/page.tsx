import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Plus } from "lucide-react";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { classesBouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";
import { Pagination } from "@/components/ui/Pagination";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerOrganisations } from "@/lib/donnees/plateforme";
import { formaterDate } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import { lireNumeroPage } from "@/lib/pagination";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles.organisations };
}

export default async function PageOrganisations({ searchParams }: PageProps<"/[langue]/plateforme/organisations">) {
  const { langue, t } = await obtenirTraductions();
  const textes = t.plateforme.organisations;
  const resultats = await listerOrganisations(lireNumeroPage((await searchParams).page));
  const lienNouvelle = (
    <Link href={cheminLocalise("/plateforme/organisations/nouvelle", langue)} className={classesBouton()}>
      <Plus aria-hidden="true" />
      {textes.nouvelle}
    </Link>
  );

  return (
    <ConteneurPage titre={t.navigation.libelles.organisations} description={textes.description} actions={resultats.lignes.length > 0 && lienNouvelle}>
      <Carte className="overflow-hidden">
        {resultats.lignes.length === 0 ? (
          <EtatVide icone={Building2} titre={textes.aucune} description={textes.aucuneDescription} action={lienNouvelle} />
        ) : (
          <Tableau>
            <EnteteTableau>
              <LigneTableau>
                <CelluleEntete>{textes.colonnes.nom}</CelluleEntete>
                <CelluleEntete>{textes.colonnes.type}</CelluleEntete>
                <CelluleEntete>{textes.colonnes.ville}</CelluleEntete>
                <CelluleEntete>{textes.colonnes.membres}</CelluleEntete>
                <CelluleEntete>{t.plateforme.creeLe}</CelluleEntete>
              </LigneTableau>
            </EnteteTableau>
            <CorpsTableau>
              {resultats.lignes.map((organisation) => (
                <LigneTableau key={organisation.id}>
                  <CelluleTableau className="font-medium">{organisation.nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{t.typesOrganisation[organisation.type]}</CelluleTableau>
                  <CelluleTableau>{organisation.ville}</CelluleTableau>
                  <CelluleTableau>{organisation.nombre_membres}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{formaterDate(organisation.cree_le, langue)}</CelluleTableau>
                </LigneTableau>
              ))}
            </CorpsTableau>
          </Tableau>
        )}
      </Carte>
      <Pagination page={resultats.page} nombrePages={resultats.nombrePages} cheminBase={cheminLocalise("/plateforme/organisations", langue)} />
    </ConteneurPage>
  );
}
