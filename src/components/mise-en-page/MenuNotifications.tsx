import { Bell } from "lucide-react";
import { ListeNotifications } from "@/components/activite/ListeNotifications";
import { Badge } from "@/components/ui/Badge";
import { classesBouton } from "@/components/ui/Bouton";
import { ElementMenu, MenuDeroulant, SeparateurMenu } from "@/components/ui/MenuDeroulant";
import { obtenirTraductions } from "@/i18n/serveur";
import { formaterTexte } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import type { Notification } from "@/types";

/** Aperçu des notifications récentes dans la barre du haut. */
export async function MenuNotifications({ notifications }: { notifications: Notification[] }) {
  const { langue, t } = await obtenirTraductions();
  const nombreNonLues = notifications.filter((item) => !item.est_lue).length;

  return (
    <MenuDeroulant
      libelleDeclencheur={
        nombreNonLues > 0
          ? formaterTexte(t.notifications.libelleAvecNonLues, { nombre: nombreNonLues })
          : t.notifications.titre
      }
      classeDeclencheur={classesBouton({ variante: "fantome", taille: "icone", className: "relative" })}
      classePanneau="w-80"
      declencheur={
        <>
          <Bell aria-hidden="true" className="size-5!" />
          {nombreNonLues > 0 && (
            <span aria-hidden="true" className="absolute end-2 top-2 size-2.5 rounded-full bg-danger ring-2 ring-surface" />
          )}
        </>
      }
    >
      <div className="flex items-center justify-between px-2.5 py-2">
        <h2 className="text-card-title">{t.notifications.titre}</h2>
        {nombreNonLues > 0 && (
          <Badge variante="primaire">{formaterTexte(t.notifications.nouvelles, { nombre: nombreNonLues })}</Badge>
        )}
      </div>
      <ListeNotifications notifications={notifications} langue={langue} t={t} className="max-h-80 overflow-y-auto" />
      <SeparateurMenu />
      <ElementMenu lien={cheminLocalise("/notifications", langue)} className="justify-center text-primary-hover">
        {t.notifications.voirTout}
      </ElementMenu>
    </MenuDeroulant>
  );
}
