import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Palette } from "lucide-react";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { classesBouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";
import { CHEMIN_SYSTEME_DESIGN } from "@/config/navigation";
import { obtenirTraductions } from "@/i18n/serveur";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterTexte } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles["tableau-de-bord"] };
}

export default async function PageTableauDeBord() {
  const [{ langue, t }, { utilisateur, organisationCourante, role }] = await Promise.all([
    obtenirTraductions(),
    exigerAccesModule("tableau-de-bord"),
  ]);
  const nomOrganisation = organisationCourante?.nom ?? "";

  const details = [
    { libelle: t.tableauDeBord.organisation, valeur: nomOrganisation },
    { libelle: t.tableauDeBord.typeOrganisation, valeur: organisationCourante ? t.typesOrganisation[organisationCourante.type] : "" },
    { libelle: t.tableauDeBord.votreRole, valeur: t.roles[role] },
  ];

  return (
    <ConteneurPage
      titre={t.navigation.libelles["tableau-de-bord"]}
      description={formaterTexte(t.tableauDeBord.bienvenue, {
        prenom: utilisateur.nom_complet.split(" ")[0],
        organisation: nomOrganisation,
      })}
      actions={
        <Link href={cheminLocalise(CHEMIN_SYSTEME_DESIGN, langue)} className={classesBouton({ variante: "contour" })}>
          <Palette aria-hidden="true" />
          {t.tableauDeBord.voirSystemeDesign}
        </Link>
      }
    >
      <dl className="grid gap-4 sm:grid-cols-3">
        {details.map((detail) => (
          <Carte key={detail.libelle} className="flex min-w-0 flex-col gap-1 p-5">
            <dt className="text-label text-fg-secondary">{detail.libelle}</dt>
            <dd className="truncate text-card-title text-fg">{detail.valeur}</dd>
          </Carte>
        ))}
      </dl>
      <Carte>
        <EtatVide icone={LayoutDashboard} titre={t.tableauDeBord.aVenirTitre} description={t.tableauDeBord.aVenirDescription} />
      </Carte>
    </ConteneurPage>
  );
}
