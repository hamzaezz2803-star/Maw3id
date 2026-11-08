"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSidebar } from "./SidebarProvider";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle navigation menu" onClick={toggleSidebar} className="-ms-2">
      <PanelLeft aria-hidden="true" className="size-5!" />
    </Button>
  );
}
