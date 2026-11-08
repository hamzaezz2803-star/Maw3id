import type { ButtonHTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";
import { IndicateurChargement } from "./EtatChargement";

export type VarianteBouton = "principal" | "secondaire" | "contour" | "fantome" | "danger";
export type TailleBouton = "petit" | "moyen" | "grand" | "icone";

const CLASSES_BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const CLASSES_VARIANTE: Record<VarianteBouton, string> = {
  principal: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover",
  secondaire: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  contour: "border border-border-strong bg-surface text-fg hover:bg-surface-muted",
  fantome: "text-fg-secondary hover:bg-secondary hover:text-fg",
  danger: "bg-danger text-primary-foreground shadow-card hover:bg-danger-hover",
};

// Sur mobile, zone cliquable d'au moins 44 px ; un peu plus compact sur ordinateur.
const CLASSES_TAILLE: Record<TailleBouton, string> = {
  petit: "h-11 px-3 text-label sm:h-8",
  moyen: "h-11 px-4 text-label sm:h-10",
  grand: "h-12 px-5 text-body",
  icone: "size-11 sm:size-10",
};

interface OptionsStyleBouton {
  variante?: VarianteBouton;
  taille?: TailleBouton;
  className?: string;
}

/** Classes d'un bouton, réutilisables sur un lien (`<Link className={classesBouton()} />`). */
export function classesBouton({
  variante = "principal",
  taille = "moyen",
  className,
}: OptionsStyleBouton = {}): string {
  return joindreClasses(CLASSES_BASE, CLASSES_VARIANTE[variante], CLASSES_TAILLE[taille], className);
}

export interface ProprietesBouton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<OptionsStyleBouton, "className"> {
  /** Désactive le bouton et affiche un indicateur, par exemple pendant un envoi. */
  enCours?: boolean;
}

export function Bouton({
  variante,
  taille,
  enCours = false,
  disabled,
  className,
  type = "button",
  children,
  ...proprietes
}: ProprietesBouton) {
  return (
    <button
      type={type}
      disabled={disabled || enCours}
      aria-busy={enCours || undefined}
      className={classesBouton({ variante, taille, className })}
      {...proprietes}
    >
      {enCours && <IndicateurChargement />}
      {children}
    </button>
  );
}
