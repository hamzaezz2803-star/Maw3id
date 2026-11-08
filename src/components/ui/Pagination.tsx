"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { formaterTexte } from "@/lib/formatage";
import { obtenirJetonsPages } from "@/lib/pagination";
import { Bouton, classesBouton, type VarianteBouton } from "./Bouton";

interface ProprietesPagination {
  page: number;
  nombrePages: number;
  /** Mode liens (pages serveur) : chaque page devient `${cheminBase}?page=n`. */
  cheminBase?: string;
  /** Mode bouton (composants client). */
  surChangementPage?: (page: number) => void;
  className?: string;
}

interface ProprietesBoutonPage {
  page: number;
  variante: VarianteBouton;
  libelle: string;
  desactive?: boolean;
  courant?: boolean;
  cheminBase?: string;
  surChangementPage?: (page: number) => void;
  children: ReactNode;
}

function BoutonPage({ page: cible, variante, libelle, desactive, courant, cheminBase, surChangementPage, children }: ProprietesBoutonPage) {
  if (cheminBase && !desactive) {
    return (
      <Link
        href={`${cheminBase}?page=${cible}`}
        aria-label={libelle}
        aria-current={courant ? "page" : undefined}
        className={classesBouton({ variante, taille: "icone", className: joindreClasses(courant && "text-fg") })}
      >
        {children}
      </Link>
    );
  }
  return (
    <Bouton
      variante={variante}
      taille="icone"
      aria-label={libelle}
      aria-current={courant ? "page" : undefined}
      disabled={desactive}
      onClick={() => surChangementPage?.(cible)}
      className={joindreClasses(courant && "text-fg")}
    >
      {children}
    </Bouton>
  );
}

export function Pagination({ page, nombrePages, cheminBase, surChangementPage, className }: ProprietesPagination) {
  const { t } = useTraductions();
  if (nombrePages <= 1) return null;

  return (
    <nav aria-label={t.pagination.libelle} className={joindreClasses("flex items-center justify-between gap-3", className)}>
      <p className="text-helper text-fg-secondary">{formaterTexte(t.pagination.pageSurTotal, { page, total: nombrePages })}</p>
      <ul className="flex items-center gap-1">
        <li>
          <BoutonPage cheminBase={cheminBase} surChangementPage={surChangementPage} page={page - 1} variante="contour" libelle={t.pagination.precedente} desactive={page <= 1}>
            <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
          </BoutonPage>
        </li>
        {obtenirJetonsPages(page, nombrePages).map((jeton) =>
          typeof jeton === "number" ? (
            <li key={jeton} className="hidden sm:block">
              <BoutonPage
                cheminBase={cheminBase}
                surChangementPage={surChangementPage}
                page={jeton}
                variante={jeton === page ? "secondaire" : "fantome"}
                libelle={formaterTexte(t.pagination.page, { page: jeton })}
                courant={jeton === page}
              >
                {jeton}
              </BoutonPage>
            </li>
          ) : (
            <li key={jeton} aria-hidden="true" className="hidden px-1 text-fg-muted sm:block">
              ...
            </li>
          ),
        )}
        <li>
          <BoutonPage cheminBase={cheminBase} surChangementPage={surChangementPage} page={page + 1} variante="contour" libelle={t.pagination.suivante} desactive={page >= nombrePages}>
            <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
          </BoutonPage>
        </li>
      </ul>
    </nav>
  );
}
