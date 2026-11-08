import type { BadgeVariant } from "@/components/ui/Badge";

/** Fictional rows used only by the design system showcase page. */
export const SHOWCASE_APPOINTMENTS: {
  id: string;
  client_name: string;
  service_name: string;
  collaborator_name: string;
  starts_at: string;
  status_label: string;
  status_variant: BadgeVariant;
}[] = [
  {
    id: "a-1",
    client_name: "Youssef Alaoui",
    service_name: "Strategy session",
    collaborator_name: "Karim Berrada",
    starts_at: "2026-11-10T09:00:00Z",
    status_label: "Confirmed",
    status_variant: "success",
  },
  {
    id: "a-2",
    client_name: "Imane Tazi",
    service_name: "Initial consultation",
    collaborator_name: "Salma Idrissi",
    starts_at: "2026-11-10T13:30:00Z",
    status_label: "Pending",
    status_variant: "warning",
  },
  {
    id: "a-3",
    client_name: "Omar Chraibi",
    service_name: "Follow-up meeting",
    collaborator_name: "Karim Berrada",
    starts_at: "2026-11-11T15:00:00Z",
    status_label: "Cancelled",
    status_variant: "danger",
  },
];

export const SHOWCASE_SERVICE_OPTIONS = [
  { value: "initial", label: "Initial consultation" },
  { value: "follow-up", label: "Follow-up meeting" },
  { value: "strategy", label: "Strategy session" },
];
