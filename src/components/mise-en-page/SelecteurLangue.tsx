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
      className={classesBouton({ variante: "fantome", taille: "moyen", className: "min-w-11 px-2.5" })}
    >
      <Languages aria-hidden="true" />
      {/* Icône seule sur mobile, le nom de la langue reste lu par les lecteurs d'écran. */}
      <span lang={autreLangue} className="sr-only sm:not-sr-only">
        {NOM_LANGUE[autreLangue]}
      </span>
    </Link>
  );
}
