import { Bell, CalendarCheck, Clock, CreditCard, Info, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { cn, formatDateTime } from "@/lib/utils";
import type { AppNotification, NotificationCategory } from "@/types";

const CATEGORY_ICONS: Record<NotificationCategory, LucideIcon> = {
  booking: CalendarCheck,
  reminder: Clock,
  payment: CreditCard,
  system: Info,
};

/** Static preview of recent notifications. Real delivery comes later. */
export function NotificationsMenu({ notifications }: { notifications: AppNotification[] }) {
  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const triggerLabel = unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications";

  return (
    <Dropdown
      triggerLabel={triggerLabel}
      triggerClassName={buttonClasses({ variant: "ghost", size: "icon", className: "relative" })}
      panelClassName="w-80"
      trigger={
        <>
          <Bell aria-hidden="true" className="size-5!" />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute end-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-danger text-[0.625rem] font-semibold text-primary-foreground ring-2 ring-surface"
            >
              {unreadCount}
            </span>
          )}
        </>
      }
    >
      <div className="flex items-center justify-between px-2.5 py-2">
        <h2 className="text-card-title">Notifications</h2>
        {unreadCount > 0 && <Badge variant="primary">{unreadCount} new</Badge>}
      </div>
      <ul className="flex max-h-80 flex-col overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = CATEGORY_ICONS[notification.category];
          return (
            <li key={notification.id} className="flex gap-3 rounded-control px-2.5 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-secondary text-fg-secondary">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className={cn("flex items-center gap-2 text-label", notification.is_read ? "text-fg-secondary" : "text-fg")}>
                  {notification.title}
                  {!notification.is_read && (
                    <>
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                      <span className="sr-only">(unread)</span>
                    </>
                  )}
                </p>
                <p className="text-helper text-fg-secondary">{notification.message}</p>
                <time dateTime={notification.created_at} className="text-caption font-normal text-fg-muted">
                  {formatDateTime(notification.created_at)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      <DropdownSeparator />
      <DropdownItem href="/notifications" className="justify-center text-primary-hover">
        View all notifications
      </DropdownItem>
    </Dropdown>
  );
}
