import Link from "next/link";
import { SearchX } from "lucide-react";
import { PanneauMessage } from "@/components/mise-en-page/PanneauMessage";
import { classesBouton } from "@/components/ui/Bouton";
import { CHEMIN_ACCUEIL } from "@/config/navigation";
import { obtenirTraductions } from "@/i18n/serveur";
import { cheminLocalise } from "@/lib/navigation";

export default async function PageIntrouvable() {
  const { langue, t } = await obtenirTraductions();

  return (
    <main className="flex min-h-dvh">
      <PanneauMessage
        icone={SearchX}
        titre={t.commun.introuvableTitre}
        description={t.commun.introuvableDescription}
        action={
          <Link href={cheminLocalise(CHEMIN_ACCUEIL, langue)} className={classesBouton({ variante: "contour" })}>
            {t.commun.retourTableauDeBord}
          </Link>
        }
      />
    </main>
  );
}
