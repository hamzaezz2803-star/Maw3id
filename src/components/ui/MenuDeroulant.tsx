"use client";

import Link from "next/link";
import { useId, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { joindreClasses } from "@/lib/classes";

export type AlignementMenu = "debut" | "fin";

interface ProprietesMenuDeroulant {
  /** Contenu du bouton déclencheur. */
  declencheur: ReactNode;
  /** Nom accessible du déclencheur quand il n'a pas de texte visible. */
  libelleDeclencheur?: string;
  classeDeclencheur?: string;
  /** Bord du déclencheur auquel le panneau s'aligne (logique : suit le sens de lecture). */
  alignement?: AlignementMenu;
  classePanneau?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Construit sur l'API Popover native : clic extérieur, touche Échap et retour
 * du focus sont gérés par le navigateur, sans écouteur global.
 */
export function MenuDeroulant({
  declencheur,
  libelleDeclencheur,
  classeDeclencheur,
  alignement = "fin",
  classePanneau,
  className,
  children,
}: ProprietesMenuDeroulant) {
  const idReact = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const idPanneau = `menu-${idReact}`;
  const styleAncre = { "--ancre-popover": `--ancre-${idReact}` } as CSSProperties;

  return (
    <div className={joindreClasses("relative", className)} style={styleAncre}>
      <button
        type="button"
        popoverTarget={idPanneau}
        aria-label={libelleDeclencheur}
        className={joindreClasses("[anchor-name:var(--ancre-popover)]", classeDeclencheur)}
      >
        {declencheur}
      </button>
      <div
        id={idPanneau}
        popover="auto"
        data-alignement={alignement}
        className={joindreClasses(
          "panneau-popover w-64 max-w-[calc(100vw-2rem)] rounded-card border border-border bg-surface p-1.5 text-fg shadow-popover",
          classePanneau,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function fermerMenuParent(evenement: MouseEvent<HTMLElement>) {
  evenement.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
}

const CLASSES_ELEMENT =
  "flex min-h-11 w-full items-center gap-2.5 rounded-control px-2.5 text-start text-label text-fg transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50 sm:min-h-9 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-muted";

interface ProprietesElementMenu {
  lien?: string;
  /** Actions destructrices, comme la déconnexion. */
  ton?: "normal" | "danger";
  desactive?: boolean;
  className?: string;
  children: ReactNode;
}

/** Un lien (avec `lien`) ou un bouton. Ferme le menu une fois utilisé. */
export function ElementMenu({ lien, ton = "normal", desactive, className, children }: ProprietesElementMenu) {
  const classes = joindreClasses(CLASSES_ELEMENT, ton === "danger" && "text-danger [&_svg]:text-danger", className);

  if (lien) {
    return (
      <Link href={lien} onClick={fermerMenuParent} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" disabled={desactive} onClick={fermerMenuParent} className={classes}>
      {children}
    </button>
  );
}

export function LibelleMenu({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={joindreClasses("px-2.5 pb-1 pt-2 text-label text-fg-muted", className)}>{children}</div>;
}

export function SeparateurMenu() {
  return <hr className="my-1.5 border-border" />;
}
