import { useId, type TextareaHTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";
import {
  ChampFormulaire,
  CLASSES_CONTROLE,
  obtenirIdDescription,
  type MessagesChamp,
} from "./ChampFormulaire";

export interface ProprietesZoneTexte
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    MessagesChamp {
  libelle?: string;
  masquerLibelle?: boolean;
  classeConteneur?: string;
}

export function ZoneTexte({
  id,
  libelle,
  masquerLibelle,
  aide,
  erreur,
  required,
  rows = 4,
  className,
  classeConteneur,
  ...proprietes
}: ProprietesZoneTexte) {
  const idGenere = useId();
  const idZone = id ?? idGenere;

  return (
    <ChampFormulaire
      id={idZone}
      libelle={libelle}
      masquerLibelle={masquerLibelle}
      obligatoire={required}
      aide={aide}
      erreur={erreur}
      className={classeConteneur}
    >
      <textarea
        id={idZone}
        rows={rows}
        required={required}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={obtenirIdDescription(idZone, { aide, erreur })}
        className={joindreClasses(CLASSES_CONTROLE, "min-h-24 resize-y py-2", className)}
        {...proprietes}
      />
    </ChampFormulaire>
  );
}
