import type { Metadata } from "next";
import Link from "next/link";
import { Plus, UserCog } from "lucide-react";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { Badge } from "@/components/ui/Badge";
import { classesBouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";
import { Pagination } from "@/components/ui/Pagination";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { determinerRole } from "@/lib/auth/role";
import { listerUtilisateurs } from "@/lib/donnees/plateforme";
import { formaterDate } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import { lireNumeroPage } from "@/lib/pagination";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles.utilisateurs };
}

export default async function PageUtilisateurs({ searchParams }: PageProps<"/[langue]/plateforme/utilisateurs">) {
  const { langue, t } = await obtenirTraductions();
  const textes = t.plateforme.utilisateurs;
  const resultats = await listerUtilisateurs(lireNumeroPage((await searchParams).page));
  const libelleRole = (roleBrut: string) => {
    const role = determinerRole(null, roleBrut);
    return role ? t.roles[role] : roleBrut;
  };

  return (
    <ConteneurPage
      titre={t.navigation.libelles.utilisateurs}
      description={textes.description}
      actions={
        <Link href={cheminLocalise("/plateforme/utilisateurs/nouveau", langue)} className={classesBouton()}>
          <Plus aria-hidden="true" />
          {textes.nouveau}
        </Link>
      }
    >
      <Carte className="overflow-hidden">
        {resultats.lignes.length === 0 ? (
          <EtatVide icone={UserCog} titre={textes.aucun} description={textes.aucunDescription} />
        ) : (
          <Tableau>
            <EnteteTableau>
              <LigneTableau>
                <CelluleEntete>{textes.colonnes.nom}</CelluleEntete>
                <CelluleEntete>{textes.colonnes.email}</CelluleEntete>
                <CelluleEntete>{textes.colonnes.organisations}</CelluleEntete>
                <CelluleEntete>{t.plateforme.creeLe}</CelluleEntete>
              </LigneTableau>
            </EnteteTableau>
            <CorpsTableau>
              {resultats.lignes.map((utilisateur) => (
                <LigneTableau key={utilisateur.id}>
                  <CelluleTableau className="font-medium">{utilisateur.nom_complet}</CelluleTableau>
                  <CelluleTableau dir="ltr" className="text-start">{utilisateur.email}</CelluleTableau>
                  <CelluleTableau>
                    <div className="flex flex-wrap gap-1.5">
                      {utilisateur.role_plateforme === "administrateur_plateforme" && (
                        <Badge variante="primaire">{t.roles.administrateur_plateforme}</Badge>
                      )}
                      {utilisateur.appartenances.map((appartenance) => (
                        <Badge key={appartenance.organisation_nom}>
                          {appartenance.organisation_nom} : {libelleRole(appartenance.role)}
                        </Badge>
                      ))}
                      {utilisateur.appartenances.length === 0 && utilisateur.role_plateforme !== "administrateur_plateforme" && (
                        <span className="text-helper text-fg-muted">{textes.aucuneOrganisation}</span>
                      )}
                    </div>
                  </CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{formaterDate(utilisateur.cree_le, langue)}</CelluleTableau>
                </LigneTableau>
              ))}
            </CorpsTableau>
          </Tableau>
        )}
      </Carte>
      <Pagination page={resultats.page} nombrePages={resultats.nombrePages} cheminBase={cheminLocalise("/plateforme/utilisateurs", langue)} />
    </ConteneurPage>
  );
}
