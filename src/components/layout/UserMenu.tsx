import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { ROLE_LABELS } from "@/constants";
import type { User, UserRole } from "@/types";

interface UserMenuProps {
  user: User;
  role: UserRole;
}

export function UserMenu({ user, role }: UserMenuProps) {
  return (
    <Dropdown
      triggerLabel={`Account menu for ${user.full_name}`}
      panelClassName="w-72"
      triggerClassName="flex h-11 items-center gap-2.5 rounded-control px-1 transition-colors hover:bg-secondary sm:h-10 lg:pe-2"
      trigger={
        <>
          <Avatar name={user.full_name} src={user.avatar_url} size="sm" />
          <span className="hidden min-w-0 flex-col text-start lg:flex">
            <span className="truncate text-label text-fg">{user.full_name}</span>
            <span className="truncate text-caption font-normal text-fg-muted">{ROLE_LABELS[role]}</span>
          </span>
          <ChevronDown aria-hidden="true" className="hidden size-4 text-fg-muted lg:block" />
        </>
      }
    >
      <div className="flex items-center gap-3 px-2.5 py-2">
        <Avatar name={user.full_name} src={user.avatar_url} size="md" />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-label text-fg">{user.full_name}</p>
          <p className="truncate text-helper text-fg-secondary">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-2.5 pb-2">
        <Badge variant="primary">{ROLE_LABELS[role]}</Badge>
        <Badge>{user.job_title}</Badge>
      </div>
      <DropdownSeparator />
      <DropdownItem href="/settings">
        <Settings aria-hidden="true" />
        Account settings
      </DropdownItem>
      <DropdownItem href="/notifications">
        <Bell aria-hidden="true" />
        Notification preferences
      </DropdownItem>
      <DropdownSeparator />
      {/* Sign out is a placeholder until authentication is implemented. */}
      <DropdownItem tone="danger">
        <LogOut aria-hidden="true" />
        Sign out
      </DropdownItem>
    </Dropdown>
  );
}
