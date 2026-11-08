import { useId, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { joindreClasses } from "@/lib/classes";
import { CLASSES_CONTROLE } from "./ChampFormulaire";

export interface ProprietesChampRecherche extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Libellé accessible, visuellement masqué. */
  libelle: string;
  classeConteneur?: string;
}

export function ChampRecherche({ id, libelle, className, classeConteneur, ...proprietes }: ProprietesChampRecherche) {
  const idGenere = useId();
  const idChamp = id ?? idGenere;

  return (
    <div role="search" className={joindreClasses("relative", classeConteneur)}>
      <label htmlFor={idChamp} className="sr-only">
        {libelle}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
      />
      <input
        id={idChamp}
        type="search"
        className={joindreClasses(CLASSES_CONTROLE, "h-11 ps-9 sm:h-10", className)}
        {...proprietes}
      />
    </div>
  );
}
