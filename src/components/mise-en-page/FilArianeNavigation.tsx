"use client";

import { usePathname } from "next/navigation";
import { FilAriane } from "@/components/ui/FilAriane";
import { CHEMIN_SYSTEME_DESIGN, obtenirCheminAccueil } from "@/config/navigation";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { cheminLocalise, retirerLangueDuChemin, trouverElementParChemin } from "@/lib/navigation";
import type { ElementFilAriane, Role } from "@/types";

/** Espace (organisation ou plateforme) > section courante, déduit de l'URL. */
export function FilArianeNavigation({ nomEspace, role }: { nomEspace: string; role: Role }) {
  const { langue, t } = useTraductions();
  const chemin = usePathname();
  const element = trouverElementParChemin(chemin);
  const libelleCourant = element
    ? t.navigation.libelles[element.id]
    : retirerLangueDuChemin(chemin) === CHEMIN_SYSTEME_DESIGN
      ? t.navigation.systemeDesign
      : undefined;

  const elements: ElementFilAriane[] = [
    { libelle: nomEspace, lien: cheminLocalise(obtenirCheminAccueil(role), langue) },
  ];
  if (libelleCourant) elements.push({ libelle: libelleCourant });

  return (
    <>
      <FilAriane elements={elements} libelle={t.commun.filAriane} className="hidden sm:block" />
      <p className="truncate text-label text-fg sm:hidden">{libelleCourant ?? nomEspace}</p>
    </>
  );
}
