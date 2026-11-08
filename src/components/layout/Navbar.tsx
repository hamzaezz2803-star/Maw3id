import { SearchInput } from "@/components/ui/SearchInput";
import type { AppNotification, Organization, User, UserRole } from "@/types";
import { NavbarBreadcrumb } from "./NavbarBreadcrumb";
import { NotificationsMenu } from "./NotificationsMenu";
import { SidebarToggle } from "./SidebarToggle";
import { UserMenu } from "./UserMenu";

interface NavbarProps {
  user: User;
  role: UserRole;
  organization: Organization;
  notifications: AppNotification[];
}

export function Navbar({ user, role, organization, notifications }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-navbar shrink-0 items-center gap-2 border-b border-border bg-surface px-4 sm:gap-4 sm:px-6">
      <SidebarToggle />
      <div className="min-w-0 flex-1">
        <NavbarBreadcrumb organizationName={organization.name} />
      </div>
      <SearchInput
        label="Search the workspace"
        placeholder="Search clients, appointments..."
        containerClassName="hidden w-64 md:block lg:w-80"
      />
      <div className="flex items-center gap-1">
        <NotificationsMenu notifications={notifications} />
        <UserMenu user={user} role={role} />
      </div>
    </header>
  );
}
