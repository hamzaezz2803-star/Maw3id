import { CalendarCheck, Clock, CreditCard, Info, type LucideIcon } from "lucide-react";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { joindreClasses } from "@/lib/classes";
import { formaterDateHeure, formaterTexte } from "@/lib/formatage";
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

interface ProprietesListeNotifications {
  notifications: Notification[];
  langue: Langue;
  t: Dictionnaire;
  className?: string;
}

/** Liste des notifications, utilisée dans le menu de la barre du haut, le tableau de bord et la page dédiée. */
export function ListeNotifications({ notifications, langue, t, className }: ProprietesListeNotifications) {
  if (notifications.length === 0) {
    return <p className="px-2.5 py-6 text-center text-helper text-fg-secondary">{t.notifications.aucune}</p>;
  }

  return (
    <ul className={joindreClasses("flex flex-col", className)}>
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
              <p className="text-helper text-fg-secondary">{formaterTexte(textes.message, preparerValeurs(notification, langue))}</p>
              <time dateTime={notification.cree_le} className="text-helper text-fg-muted">
                {formaterDateHeure(notification.cree_le, langue)}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
