import type { AppNotification } from "@/types";
import { MOCK_CURRENT_ORGANIZATION_ID } from "./organization";

/** Fictional notifications, for development only. */
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n-1",
    organization_id: MOCK_CURRENT_ORGANIZATION_ID,
    category: "booking",
    title: "New online booking",
    message: "Youssef Alaoui booked a Strategy session for Nov 10 at 10:00.",
    is_read: false,
    created_at: "2026-11-08T08:42:00Z",
  },
  {
    id: "n-2",
    organization_id: MOCK_CURRENT_ORGANIZATION_ID,
    category: "reminder",
    title: "Upcoming appointment",
    message: "Initial consultation with Imane Tazi starts in 30 minutes.",
    is_read: false,
    created_at: "2026-11-08T07:30:00Z",
  },
  {
    id: "n-3",
    organization_id: MOCK_CURRENT_ORGANIZATION_ID,
    category: "payment",
    title: "Payment received",
    message: "Invoice INV-2026-0142 was marked as paid.",
    is_read: true,
    created_at: "2026-11-07T16:05:00Z",
  },
  {
    id: "n-4",
    organization_id: MOCK_CURRENT_ORGANIZATION_ID,
    category: "system",
    title: "Availability updated",
    message: "Karim Berrada changed his weekly availability.",
    is_read: true,
    created_at: "2026-11-06T11:20:00Z",
  },
];
