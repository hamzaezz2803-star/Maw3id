"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { ElementMenu, LibelleMenu, MenuDeroulant } from "@/components/ui/MenuDeroulant";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { formaterTexte } from "@/lib/formatage";
import type { OrganisationAvecRole } from "@/types";
import { ALIGNEMENT_ICONES, VISIBILITE_BLOC, type ModeBarreLaterale } from "./modesBarreLaterale";

interface ProprietesSelecteurOrganisation {
  organisations: OrganisationAvecRole[];
  idOrganisationCourante: string;
  mode: ModeBarreLaterale;
}

const CLASSES_BORDURE: Record<ModeBarreLaterale, string> = {
  complet: "border-border",
  adaptatif: "border-transparent lg:border-border",
  icones: "border-transparent",
};

/** Sélecteur statique : liste les organisations de l'utilisateur, le changement viendra plus tard. */
export function SelecteurOrganisation({ organisations, idOrganisationCourante, mode }: ProprietesSelecteurOrganisation) {
  const { t } = useTraductions();
  const courante =
    organisations.find((item) => item.organisation.id === idOrganisationCourante) ?? organisations[0];

  if (!courante) return null;
  const { organisation } = courante;

  return (
    <MenuDeroulant
      alignement="debut"
      libelleDeclencheur={formaterTexte(t.organisation.changerOrganisation, { nom: organisation.nom })}
      classeDeclencheur={joindreClasses(
        "flex w-full items-center gap-3 rounded-control border p-2 text-start transition-colors hover:bg-surface-muted",
        ALIGNEMENT_ICONES[mode],
        CLASSES_BORDURE[mode],
      )}
      classePanneau="w-72"
      declencheur={
        <>
          <Avatar nom={organisation.nom} source={organisation.logo_url} forme="carre" />
          <span className={joindreClasses("flex min-w-0 flex-1 flex-col", VISIBILITE_BLOC[mode])}>
            <span className="truncate text-label text-fg">{organisation.nom}</span>
            <span className="truncate text-helper text-fg-muted">{t.typesOrganisation[organisation.type]}</span>
          </span>
          <ChevronsUpDown aria-hidden="true" className={joindreClasses("size-4 shrink-0 text-fg-muted", VISIBILITE_BLOC[mode])} />
        </>
      }
    >
      <LibelleMenu>{t.organisation.vosOrganisations}</LibelleMenu>
      <ul>
        {organisations.map(({ organisation: item, role }) => (
          <li key={item.id}>
            <ElementMenu className="py-1.5">
              <Avatar nom={item.nom} source={item.logo_url} forme="carre" taille="petit" />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate">{item.nom}</span>
                <span className="truncate text-helper font-normal text-fg-muted">{t.roles[role]}</span>
              </span>
              {item.id === organisation.id && (
                <>
                  <Check aria-hidden="true" className="text-primary!" />
                  <span className="sr-only">{t.commun.actuel}</span>
                </>
              )}
            </ElementMenu>
          </li>
        ))}
      </ul>
      <p className="px-2.5 pb-1.5 pt-2 text-helper text-fg-muted">{t.organisation.changementBientot}</p>
    </MenuDeroulant>
  );
}
