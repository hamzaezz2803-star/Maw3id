"use client";

import Link from "next/link";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { cheminLocalise } from "@/lib/navigation";
import type { ElementNavigation } from "@/types";
import { ALIGNEMENT_ICONES, VISIBILITE_LIBELLE, type ModeBarreLaterale } from "./modesBarreLaterale";

interface ProprietesLienNavigation {
  element: ElementNavigation;
  estActif: boolean;
  mode: ModeBarreLaterale;
  surNavigation?: () => void;
}

export function LienNavigation({ element, estActif, mode, surNavigation }: ProprietesLienNavigation) {
  const { langue, t } = useTraductions();
  const Icone = element.icone;
  const libelle = t.navigation.libelles[element.id];

  return (
    <Link
      href={cheminLocalise(element.chemin, langue)}
      onClick={surNavigation}
      aria-current={estActif ? "page" : undefined}
      // Indication native pour la colonne d'icônes, où les libellés sont masqués.
      title={mode === "icones" ? libelle : undefined}
      className={joindreClasses(
        "group flex h-11 items-center gap-3 rounded-control px-3 text-label transition-colors duration-150 sm:h-10",
        estActif ? "bg-primary-subtle text-primary-hover" : "text-fg-secondary hover:bg-secondary hover:text-fg",
        ALIGNEMENT_ICONES[mode],
      )}
    >
      <Icone
        aria-hidden="true"
        className={joindreClasses(
          "size-5 shrink-0",
          estActif ? "text-primary" : "text-fg-muted group-hover:text-fg-secondary",
        )}
      />
      <span className={joindreClasses("truncate", VISIBILITE_LIBELLE[mode])}>{libelle}</span>
    </Link>
  );
}
