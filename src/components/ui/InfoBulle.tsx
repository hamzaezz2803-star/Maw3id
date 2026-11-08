import { cloneElement, useId, type ReactElement } from "react";
import { joindreClasses } from "@/lib/classes";

export type CoteInfoBulle = "haut" | "bas";

const CLASSES_COTE: Record<CoteInfoBulle, string> = {
  haut: "bottom-full mb-2",
  bas: "top-full mt-2",
};

interface ProprietesInfoBulle {
  contenu: string;
  cote?: CoteInfoBulle;
  /** Un seul élément focalisable (bouton, lien). */
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
}

/**
 * Info-bulle en CSS seul, affichée au survol et au focus clavier, reliée à
 * son déclencheur par aria-describedby. Pour de courtes indications uniquement.
 */
export function InfoBulle({ contenu, cote = "haut", children, className }: ProprietesInfoBulle) {
  const idInfoBulle = useId();

  return (
    <span className={joindreClasses("group/infobulle relative inline-flex", className)}>
      {cloneElement(children, { "aria-describedby": idInfoBulle })}
      <span
        id={idInfoBulle}
        role="tooltip"
        className={joindreClasses(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-label text-surface opacity-0 shadow-popover transition-opacity duration-150",
          "group-hover/infobulle:opacity-100 group-has-focus-visible/infobulle:opacity-100",
          CLASSES_COTE[cote],
        )}
      >
        {contenu}
      </span>
    </span>
  );
}
