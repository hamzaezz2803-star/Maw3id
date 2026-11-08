import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { joindreClasses } from "@/lib/classes";
import type { ElementFilAriane } from "@/types";

interface ProprietesFilAriane {
  elements: ElementFilAriane[];
  /** Nom accessible de la navigation (« Fil d'Ariane »). */
  libelle: string;
  className?: string;
}

/** Le dernier élément est la page courante : il n'est pas cliquable. */
export function FilAriane({ elements, libelle, className }: ProprietesFilAriane) {
  return (
    <nav aria-label={libelle} className={joindreClasses("min-w-0", className)}>
      <ol className="flex min-w-0 items-center gap-1.5 text-helper text-fg-secondary">
        {elements.map((element, index) => {
          const estDernier = index === elements.length - 1;
          return (
            <li key={`${element.libelle}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {element.lien && !estDernier ? (
                <Link
                  href={element.lien}
                  className="inline-flex min-h-11 items-center truncate rounded-sm transition-colors hover:text-fg sm:min-h-0"
                >
                  {element.libelle}
                </Link>
              ) : (
                <span
                  aria-current={estDernier ? "page" : undefined}
                  className={joindreClasses("truncate", estDernier && "font-medium text-fg")}
                >
                  {element.libelle}
                </span>
              )}
              {!estDernier && (
                <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-fg-muted rtl:rotate-180" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
