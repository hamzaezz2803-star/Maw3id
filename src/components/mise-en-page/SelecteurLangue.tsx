"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { classesBouton } from "@/components/ui/Bouton";
import { LANGUES, NOM_LANGUE } from "@/i18n/config";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { cheminLocalise, retirerLangueDuChemin } from "@/lib/navigation";

/** Lien vers la même page dans l'autre langue. */
export function SelecteurLangue() {
  const { langue, t } = useTraductions();
  const chemin = usePathname();
  const autreLangue = LANGUES.find((item) => item !== langue) ?? langue;

  return (
    <Link
      href={cheminLocalise(retirerLangueDuChemin(chemin), autreLangue)}
      hrefLang={autreLangue}
      title={t.barreNavigation.changerLangue}
      className={classesBouton({ variante: "fantome", taille: "moyen", className: "px-2.5" })}
    >
      <Languages aria-hidden="true" />
      <span lang={autreLangue}>{NOM_LANGUE[autreLangue]}</span>
    </Link>
  );
}
