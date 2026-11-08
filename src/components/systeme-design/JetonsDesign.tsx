import type { Dictionnaire } from "@/i18n/dictionnaires";
import { joindreClasses } from "@/lib/classes";

type TextesSysteme = Dictionnaire["systemeDesign"];

// Noms de classes écrits en entier pour que Tailwind les détecte à la compilation.
const COULEURS: { jeton: keyof TextesSysteme["couleurs"]["noms"]; echantillon: string }[] = [
  { jeton: "primary", echantillon: "bg-primary" },
  { jeton: "primary-hover", echantillon: "bg-primary-hover" },
  { jeton: "secondary", echantillon: "bg-secondary" },
  { jeton: "background", echantillon: "bg-background" },
  { jeton: "surface", echantillon: "bg-surface" },
  { jeton: "border", echantillon: "bg-border" },
  { jeton: "fg", echantillon: "bg-fg" },
  { jeton: "fg-secondary", echantillon: "bg-fg-secondary" },
  { jeton: "success", echantillon: "bg-success" },
  { jeton: "warning", echantillon: "bg-warning" },
  { jeton: "danger", echantillon: "bg-danger" },
  { jeton: "info", echantillon: "bg-info" },
];

const STYLES_TEXTE: (keyof TextesSysteme["typographie"]["exemples"])[] = [
  "text-page-title",
  "text-section-title",
  "text-card-title",
  "text-body",
  "text-label",
  "text-helper",
];

export function JetonsCouleurs({ textes }: { textes: TextesSysteme["couleurs"] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {COULEURS.map((couleur) => (
        <li key={couleur.jeton} className="flex items-center gap-3">
          <span aria-hidden="true" className={joindreClasses("size-10 shrink-0 rounded-control border border-border", couleur.echantillon)} />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-label text-fg">{textes.noms[couleur.jeton]}</span>
            <code dir="ltr" className="truncate font-mono text-helper text-fg-muted">{couleur.jeton}</code>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function EchelleTypographique({ textes }: { textes: TextesSysteme["typographie"] }) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {STYLES_TEXTE.map((style) => (
        <li key={style} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
          <code dir="ltr" className="w-44 shrink-0 font-mono text-helper text-fg-muted">{style}</code>
          <span className={joindreClasses("min-w-0 text-fg", style)}>{textes.exemples[style]}</span>
        </li>
      ))}
    </ul>
  );
}
