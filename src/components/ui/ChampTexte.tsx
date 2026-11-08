import { useId, type InputHTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";
import {
  ChampFormulaire,
  CLASSES_CONTROLE,
  obtenirIdDescription,
  type MessagesChamp,
} from "./ChampFormulaire";

export interface ProprietesChampTexte extends InputHTMLAttributes<HTMLInputElement>, MessagesChamp {
  libelle?: string;
  masquerLibelle?: boolean;
  classeConteneur?: string;
}

export function ChampTexte({
  id,
  libelle,
  masquerLibelle,
  aide,
  erreur,
  required,
  className,
  classeConteneur,
  ...proprietes
}: ProprietesChampTexte) {
  const idGenere = useId();
  const idChamp = id ?? idGenere;

  return (
    <ChampFormulaire
      id={idChamp}
      libelle={libelle}
      masquerLibelle={masquerLibelle}
      obligatoire={required}
      aide={aide}
      erreur={erreur}
      className={classeConteneur}
    >
      <input
        id={idChamp}
        required={required}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={obtenirIdDescription(idChamp, { aide, erreur })}
        className={joindreClasses(CLASSES_CONTROLE, "h-11 sm:h-10", className)}
        {...proprietes}
      />
    </ChampFormulaire>
  );
}
