import { DEFAULT_LOCALE, DEFAULT_TIME_ZONE } from "@/constants";

type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** "Salma Idrissi" -> "SI" */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const dateTimeFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  timeZone: DEFAULT_TIME_ZONE,
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** "2026-11-08T08:42:00Z" -> "8 Nov, 09:42" (fixed time zone, so stable across server and client) */
export function formatDateTime(isoDate: string): string {
  return dateTimeFormatter.format(new Date(isoDate));
}
