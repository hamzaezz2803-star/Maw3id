"use client";

import { PanelLeft } from "lucide-react";
import { Bouton } from "@/components/ui/Bouton";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { useBarreLaterale } from "./FournisseurBarreLaterale";

export function BoutonBarreLaterale() {
  const { t } = useTraductions();
  const { basculerBarreLaterale } = useBarreLaterale();

  return (
    <Bouton
      variante="fantome"
      taille="icone"
      aria-label={t.navigation.afficherMasquerMenu}
      onClick={basculerBarreLaterale}
      className="-ms-2"
    >
      <PanelLeft aria-hidden="true" className="size-5! rtl:-scale-x-100" />
    </Bouton>
  );
}
