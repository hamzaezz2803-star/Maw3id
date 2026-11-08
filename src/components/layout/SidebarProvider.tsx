"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { DESKTOP_MEDIA_QUERY } from "@/constants";

interface SidebarContextValue {
  /** Desktop only: sidebar reduced to an icon rail. */
  isCollapsed: boolean;
  /** Collapses the sidebar on desktop, opens the drawer on smaller screens. */
  toggleSidebar: () => void;
  closeDrawer: () => void;
  drawerRef: RefObject<HTMLDialogElement | null>;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);

  function toggleSidebar() {
    if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      setIsCollapsed((collapsed) => !collapsed);
    } else {
      drawerRef.current?.showModal();
    }
  }

  function closeDrawer() {
    drawerRef.current?.close();
  }

  return (
    <SidebarContext value={{ isCollapsed, toggleSidebar, closeDrawer, drawerRef }}>
      {children}
    </SidebarContext>
  );
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside <SidebarProvider>.");
  }
  return context;
}
