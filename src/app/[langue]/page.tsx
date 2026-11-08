import { redirect } from "next/navigation";
import { CHEMIN_ACCUEIL } from "@/config/navigation";
import { obtenirLangue } from "@/i18n/serveur";
import { cheminLocalise } from "@/lib/navigation";

/** L'espace de gestion commence au tableau de bord. */
export default async function PageLangue() {
  redirect(cheminLocalise(CHEMIN_ACCUEIL, await obtenirLangue()));
}
