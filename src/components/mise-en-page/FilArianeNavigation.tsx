"use client";

import { usePathname } from "next/navigation";
import { FilAriane } from "@/components/ui/FilAriane";
import { CHEMIN_ACCUEIL, CHEMIN_SYSTEME_DESIGN } from "@/config/navigation";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { cheminLocalise, retirerLangueDuChemin, trouverElementParChemin } from "@/lib/navigation";
import type { ElementFilAriane } from "@/types";

/** Organisation > section courante, déduit de l'URL. */
export function FilArianeNavigation({ nomOrganisation }: { nomOrganisation: string }) {
  const { langue, t } = useTraductions();
  const chemin = usePathname();
  const element = trouverElementParChemin(chemin);
  const libelleCourant = element
    ? t.navigation.libelles[element.id]
    : retirerLangueDuChemin(chemin) === CHEMIN_SYSTEME_DESIGN
      ? t.navigation.systemeDesign
      : undefined;

  const elements: ElementFilAriane[] = [
    { libelle: nomOrganisation, lien: cheminLocalise(CHEMIN_ACCUEIL, langue) },
  ];
  if (libelleCourant) elements.push({ libelle: libelleCourant });

  return (
    <>
      <FilAriane elements={elements} libelle={t.commun.filAriane} className="hidden sm:block" />
      <p className="truncate text-label text-fg sm:hidden">{libelleCourant ?? nomOrganisation}</p>
    </>
  );
}
