import type { Metadata } from "next";
import { obtenirTraductions } from "@/i18n/serveur";
import type { IdElementNavigation } from "@/types";

/** Titre d'onglet d'une page de module, dans la langue affichée. */
export async function genererMetadonneesModule(idModule: IdElementNavigation): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles[idModule] };
}
