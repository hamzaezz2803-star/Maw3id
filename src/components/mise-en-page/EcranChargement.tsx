import { EtatChargement } from "@/components/ui/EtatChargement";
import { obtenirTraductions } from "@/i18n/serveur";

/** Indicateur plein écran pendant la lecture de la session. */
export async function EcranChargement() {
  const { t } = await obtenirTraductions();
  return <EtatChargement libelle={t.commun.chargement} className="min-h-dvh" />;
}
