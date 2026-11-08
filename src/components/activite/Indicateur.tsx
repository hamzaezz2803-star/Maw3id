import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { joindreClasses } from "@/lib/classes";

interface ProprietesIndicateur {
  libelle: string;
  valeur: string;
  icone: LucideIcon;
  /** Variation affichée sous la valeur ; le sens est donné par l'icône et le texte, pas la couleur seule. */
  variation?: { texte: string; hausse: boolean };
}

/** Indicateur compact : libellé, valeur, et éventuellement une variation. */
export function Indicateur({ libelle, valeur, icone: Icone, variation }: ProprietesIndicateur) {
  const IconeVariation = variation?.hausse ? TrendingUp : TrendingDown;

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="flex items-start gap-2 text-fg-secondary">
        <Icone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <p className="text-label">{libelle}</p>
      </div>
      <p className="text-page-title tabular-nums text-fg">{valeur}</p>
      {variation && (
        <p className={joindreClasses("flex items-center gap-1.5 text-helper", variation.hausse ? "text-success" : "text-danger-hover")}>
          <IconeVariation aria-hidden="true" className="size-4 shrink-0" />
          {variation.texte}
        </p>
      )}
    </div>
  );
}
