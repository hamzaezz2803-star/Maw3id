import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { classesBouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";
import { CHEMIN_ACCUEIL } from "@/config/navigation";
import { obtenirTraductions } from "@/i18n/serveur";
import { formaterTexte } from "@/lib/formatage";
import { cheminLocalise, obtenirElementNavigation } from "@/lib/navigation";
import type { IdElementNavigation } from "@/types";
import { ConteneurPage } from "./ConteneurPage";

export async function genererMetadonneesModule(idModule: IdElementNavigation): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles[idModule] };
}

/** Page provisoire d'un module qui sera construit dans une prochaine étape. */
export async function ModuleAVenir({ idModule }: { idModule: IdElementNavigation }) {
  const element = obtenirElementNavigation(idModule);
  if (!element) notFound();

  const { langue, t } = await obtenirTraductions();
  const libelle = t.navigation.libelles[idModule];

  return (
    <ConteneurPage titre={libelle}>
      <Carte>
        <EtatVide
          icone={element.icone}
          titre={formaterTexte(t.moduleAVenir.titre, { module: libelle })}
          description={t.moduleAVenir.description}
          action={
            <Link href={cheminLocalise(CHEMIN_ACCUEIL, langue)} className={classesBouton({ variante: "contour" })}>
              {t.commun.retourTableauDeBord}
            </Link>
          }
        />
      </Carte>
    </ConteneurPage>
  );
}
