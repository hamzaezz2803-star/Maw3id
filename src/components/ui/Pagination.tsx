"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { formaterTexte } from "@/lib/formatage";
import { obtenirJetonsPages } from "@/lib/pagination";
import { Bouton } from "./Bouton";

interface ProprietesPagination {
  page: number;
  nombrePages: number;
  surChangementPage: (page: number) => void;
  className?: string;
}

export function Pagination({ page, nombrePages, surChangementPage, className }: ProprietesPagination) {
  const { t } = useTraductions();
  if (nombrePages <= 1) return null;

  return (
    <nav aria-label={t.pagination.libelle} className={joindreClasses("flex items-center justify-between gap-3", className)}>
      <p className="text-helper text-fg-secondary">
        {formaterTexte(t.pagination.pageSurTotal, { page, total: nombrePages })}
      </p>
      <ul className="flex items-center gap-1">
        <li>
          <Bouton
            variante="contour"
            taille="icone"
            aria-label={t.pagination.precedente}
            disabled={page <= 1}
            onClick={() => surChangementPage(page - 1)}
          >
            <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
          </Bouton>
        </li>
        {obtenirJetonsPages(page, nombrePages).map((jeton) =>
          typeof jeton === "number" ? (
            <li key={jeton} className="hidden sm:block">
              <Bouton
                variante={jeton === page ? "secondaire" : "fantome"}
                taille="icone"
                aria-label={formaterTexte(t.pagination.page, { page: jeton })}
                aria-current={jeton === page ? "page" : undefined}
                onClick={() => surChangementPage(jeton)}
                className={joindreClasses(jeton === page && "text-fg")}
              >
                {jeton}
              </Bouton>
            </li>
          ) : (
            <li key={jeton} aria-hidden="true" className="hidden px-1 text-fg-muted sm:block">
              ...
            </li>
          ),
        )}
        <li>
          <Bouton
            variante="contour"
            taille="icone"
            aria-label={t.pagination.suivante}
            disabled={page >= nombrePages}
            onClick={() => surChangementPage(page + 1)}
          >
            <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
          </Bouton>
        </li>
      </ul>
    </nav>
  );
}
