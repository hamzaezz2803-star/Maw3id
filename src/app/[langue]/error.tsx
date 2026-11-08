"use client";

import { TriangleAlert } from "lucide-react";
import { PanneauMessage } from "@/components/mise-en-page/PanneauMessage";
import { Bouton } from "@/components/ui/Bouton";
import { useTraductions } from "@/i18n/FournisseurTraductions";

/** Message clair pour l'utilisateur, sans détail technique. */
export default function ErreurPage({ retry }: { error: unknown; retry: () => void }) {
  const { t } = useTraductions();

  return (
    <PanneauMessage
      icone={TriangleAlert}
      titre={t.commun.erreurTitre}
      description={t.commun.erreurDescription}
      action={
        <Bouton variante="contour" onClick={retry}>
          {t.commun.reessayer}
        </Bouton>
      }
    />
  );
}
