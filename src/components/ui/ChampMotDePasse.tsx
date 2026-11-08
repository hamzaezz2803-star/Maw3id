"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ChampTexte, type ProprietesChampTexte } from "./ChampTexte";

interface ProprietesChampMotDePasse extends Omit<ProprietesChampTexte, "type"> {
  libelleAfficher: string;
  libelleMasquer: string;
}

/**
 * Mot de passe avec bouton afficher / masquer. Le collage et les gestionnaires
 * de mots de passe restent possibles (WCAG 2.2, authentification accessible).
 */
export function ChampMotDePasse({ libelleAfficher, libelleMasquer, className, ...proprietes }: ProprietesChampMotDePasse) {
  const [estVisible, setEstVisible] = useState(false);
  const Icone = estVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <ChampTexte {...proprietes} type={estVisible ? "text" : "password"} className={`pe-12 ${className ?? ""}`} />
      <button
        type="button"
        onClick={() => setEstVisible((visible) => !visible)}
        aria-label={estVisible ? libelleMasquer : libelleAfficher}
        aria-pressed={estVisible}
        className="absolute end-0 top-[1.625rem] flex size-11 items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg sm:size-10"
      >
        <Icone aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
