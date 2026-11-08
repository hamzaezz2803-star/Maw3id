import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { joindreClasses } from "@/lib/classes";
import {
  ChampFormulaire,
  CLASSES_CONTROLE,
  obtenirIdDescription,
  type MessagesChamp,
} from "./ChampFormulaire";

export interface OptionListe {
  valeur: string;
  libelle: string;
  desactivee?: boolean;
}

export interface ProprietesListeDeroulante
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">,
    MessagesChamp {
  libelle?: string;
  masquerLibelle?: boolean;
  options: OptionListe[];
  /** Première option vide, ex. « Choisir un service ». */
  texteIndicatif?: string;
  classeConteneur?: string;
}

export function ListeDeroulante({
  id,
  libelle,
  masquerLibelle,
  aide,
  erreur,
  required,
  options,
  texteIndicatif,
  className,
  classeConteneur,
  ...proprietes
}: ProprietesListeDeroulante) {
  const idGenere = useId();
  const idListe = id ?? idGenere;

  return (
    <ChampFormulaire
      id={idListe}
      libelle={libelle}
      masquerLibelle={masquerLibelle}
      obligatoire={required}
      aide={aide}
      erreur={erreur}
      className={classeConteneur}
    >
      <div className="relative">
        <select
          id={idListe}
          required={required}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={obtenirIdDescription(idListe, { aide, erreur })}
          className={joindreClasses(CLASSES_CONTROLE, "h-11 appearance-none pe-10 sm:h-10", className)}
          {...proprietes}
        >
          {texteIndicatif && <option value="">{texteIndicatif}</option>}
          {options.map((option) => (
            <option key={option.valeur} value={option.valeur} disabled={option.desactivee}>
              {option.libelle}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
        />
      </div>
    </ChampFormulaire>
  );
}
