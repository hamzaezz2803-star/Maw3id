import { EtatChargement } from "@/components/ui/EtatChargement";
import { obtenirTraductions } from "@/i18n/serveur";

export default async function Chargement() {
  const { t } = await obtenirTraductions();
  return <EtatChargement libelle={t.commun.chargement} className="min-h-[50vh]" />;
}
