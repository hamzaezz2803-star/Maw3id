import { Bell, CalendarCheck, Clock, CreditCard, Info, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { classesBouton } from "@/components/ui/Bouton";
import { ElementMenu, MenuDeroulant, SeparateurMenu } from "@/components/ui/MenuDeroulant";
import { obtenirTraductions } from "@/i18n/serveur";
import { joindreClasses } from "@/lib/classes";
import { formaterDateHeure, formaterTexte } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import type { Langue, Notification, TypeNotification } from "@/types";

const ICONES_TYPE: Record<TypeNotification, LucideIcon> = {
  nouvelle_reservation: CalendarCheck,
  rappel_rendez_vous: Clock,
  paiement_recu: CreditCard,
  disponibilite_modifiee: Info,
};

/** La valeur `date` d'une notification est une date ISO à formater dans la langue affichée. */
function preparerValeurs(notification: Notification, langue: Langue): Record<string, string> {
  const { date, ...autres } = notification.valeurs;
  return date ? { ...autres, date: formaterDateHeure(date, langue) } : autres;
}

/** Aperçu statique des notifications récentes. L'envoi réel viendra plus tard. */
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
      {notifications.length === 0 && <p className="px-2.5 py-6 text-center text-helper text-fg-secondary">{t.notifications.aucune}</p>}
      <ul className="flex max-h-80 flex-col overflow-y-auto">
        {notifications.map((notification) => {
          const Icone = ICONES_TYPE[notification.type];
          const textes = t.notifications.types[notification.type];
          return (
            <li key={notification.id} className="flex gap-3 rounded-control px-2.5 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-secondary text-fg-secondary">
                <Icone aria-hidden="true" className="size-4" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className={joindreClasses("flex items-center gap-2 text-label", notification.est_lue ? "text-fg-secondary" : "text-fg")}>
                  {textes.titre}
                  {!notification.est_lue && (
                    <>
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                      <span className="sr-only">{t.commun.nonLu}</span>
                    </>
                  )}
                </p>
                <p className="text-helper text-fg-secondary">
                  {formaterTexte(textes.message, preparerValeurs(notification, langue))}
                </p>
                <time dateTime={notification.cree_le} className="text-helper text-fg-muted">
                  {formaterDateHeure(notification.cree_le, langue)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      <SeparateurMenu />
      <ElementMenu lien={cheminLocalise("/notifications", langue)} className="justify-center text-primary-hover">
        {t.notifications.voirTout}
      </ElementMenu>
    </MenuDeroulant>
  );
}
