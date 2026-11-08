import type { ReactNode } from "react";
import type { SessionContext } from "@/lib/data/session";
import type { AppNotification } from "@/types";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "./SidebarProvider";

interface MainLayoutProps {
  session: SessionContext;
  notifications: AppNotification[];
  children: ReactNode;
}

/** Application shell: sidebar, top navbar and the main content area. */
export function MainLayout({ session, notifications, children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-control bg-surface px-4 py-2 text-label text-fg shadow-popover focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        Skip to main content
      </a>
      <div className="flex min-h-dvh">
        <Sidebar
          role={session.role}
          organizations={session.organizations}
          currentOrganizationId={session.currentOrganization.id}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            user={session.user}
            role={session.role}
            organization={session.currentOrganization}
            notifications={notifications}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
