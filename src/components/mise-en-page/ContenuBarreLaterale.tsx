"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Bouton } from "@/components/ui/Bouton";
import { CHEMIN_ACCUEIL, ELEMENT_PARAMETRES } from "@/config/navigation";
import { NOM_APPLICATION } from "@/constants";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { cheminLocalise, estElementActif, obtenirNavigationPourRole, peutAccederElement } from "@/lib/navigation";
import type { ProprietesBarreLaterale } from "./BarreLaterale";
import { LienNavigation } from "./LienNavigation";
import { SelecteurOrganisation } from "./SelecteurOrganisation";
import {
  ALIGNEMENT_ICONES,
  VISIBILITE_BLOC,
  VISIBILITE_LIBELLE,
  type ModeBarreLaterale,
} from "./modesBarreLaterale";

interface ProprietesContenu extends ProprietesBarreLaterale {
  mode: ModeBarreLaterale;
  /** Présent dans le tiroir mobile : ferme le tiroir après un clic. */
  surNavigation?: () => void;
}

export function ContenuBarreLaterale({ role, organisations, idOrganisationCourante, mode, surNavigation }: ProprietesContenu) {
  const chemin = usePathname();

  return (
    <>
      <EnteteBarreLaterale mode={mode} surNavigation={surNavigation} />
      <div className="shrink-0 p-3">
        <SelecteurOrganisation organisations={organisations} idOrganisationCourante={idOrganisationCourante} mode={mode} />
      </div>
      <NavigationPrincipale role={role} mode={mode} chemin={chemin} surNavigation={surNavigation} />
      {peutAccederElement(ELEMENT_PARAMETRES, role) && (
        <div className="shrink-0 border-t border-border p-3">
          <LienNavigation
            element={ELEMENT_PARAMETRES}
            mode={mode}
            estActif={estElementActif(ELEMENT_PARAMETRES, chemin)}
            surNavigation={surNavigation}
          />
        </div>
      )}
    </>
  );
}

function EnteteBarreLaterale({ mode, surNavigation }: Pick<ProprietesContenu, "mode" | "surNavigation">) {
  const { langue, t } = useTraductions();

  return (
    <div className={joindreClasses("flex h-navbar shrink-0 items-center gap-3 border-b border-border px-5", ALIGNEMENT_ICONES[mode])}>
      <Link href={cheminLocalise(CHEMIN_ACCUEIL, langue)} onClick={surNavigation} className="flex items-center gap-2.5 rounded-control">
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-control bg-primary text-label font-bold text-primary-foreground"
        >
          M
        </span>
        <span className={joindreClasses("text-section-title text-fg", VISIBILITE_LIBELLE[mode])}>{NOM_APPLICATION}</span>
      </Link>
      {surNavigation && (
        <Bouton variante="fantome" taille="icone" aria-label={t.navigation.fermerMenu} onClick={surNavigation} className="ms-auto -me-2">
          <X aria-hidden="true" />
        </Bouton>
      )}
    </div>
  );
}

interface ProprietesNavigationPrincipale extends Pick<ProprietesContenu, "role" | "mode" | "surNavigation"> {
  chemin: string;
}

function NavigationPrincipale({ role, mode, chemin, surNavigation }: ProprietesNavigationPrincipale) {
  const { t } = useTraductions();

  return (
    <nav aria-label={t.navigation.navigationPrincipale} className="flex-1 overflow-y-auto px-3 pb-3">
      {obtenirNavigationPourRole(role).map((section) => (
        <div key={section.id} className="mt-4 first:mt-1">
          {section.avecTitre && (
            <p className={joindreClasses("mb-1 px-3 text-label text-fg-muted", VISIBILITE_BLOC[mode])}>
              {t.navigation.sections[section.id]}
            </p>
          )}
          <ul className="flex flex-col gap-0.5">
            {section.elements.map((element) => (
              <li key={element.id}>
                <LienNavigation
                  element={element}
                  mode={mode}
                  estActif={estElementActif(element, chemin)}
                  surNavigation={surNavigation}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
