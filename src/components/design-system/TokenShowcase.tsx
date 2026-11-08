import { cn } from "@/lib/utils";

// Static class names so Tailwind can detect them at build time.
const COLOR_TOKENS = [
  { name: "Primary", token: "primary", swatch: "bg-primary" },
  { name: "Primary hover", token: "primary-hover", swatch: "bg-primary-hover" },
  { name: "Secondary", token: "secondary", swatch: "bg-secondary" },
  { name: "Background", token: "background", swatch: "bg-background" },
  { name: "Surface", token: "surface", swatch: "bg-surface" },
  { name: "Border", token: "border", swatch: "bg-border" },
  { name: "Text primary", token: "fg", swatch: "bg-fg" },
  { name: "Text secondary", token: "fg-secondary", swatch: "bg-fg-secondary" },
  { name: "Success", token: "success", swatch: "bg-success" },
  { name: "Warning", token: "warning", swatch: "bg-warning" },
  { name: "Danger", token: "danger", swatch: "bg-danger" },
  { name: "Information", token: "info", swatch: "bg-info" },
];

const TYPE_SCALE = [
  { name: "Page title", token: "text-page-title", sample: "Appointments overview" },
  { name: "Section title", token: "text-section-title", sample: "Upcoming this week" },
  { name: "Card title", token: "text-card-title", sample: "Initial consultation" },
  { name: "Body", token: "text-body", sample: "Clients can book a service online at any time." },
  { name: "Label", token: "text-label", sample: "Service duration" },
  { name: "Helper", token: "text-helper", sample: "Shown to clients on the booking page." },
];

export function ColorTokens() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {COLOR_TOKENS.map((color) => (
        <li key={color.token} className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn("size-10 shrink-0 rounded-control border border-border", color.swatch)}
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-label text-fg">{color.name}</span>
            <code className="truncate font-mono text-caption font-normal text-fg-muted">{color.token}</code>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TypographyScale() {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {TYPE_SCALE.map((style) => (
        <li key={style.token} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
          <code className="w-40 shrink-0 font-mono text-caption font-normal text-fg-muted">{style.token}</code>
          <span className={cn("min-w-0 text-fg", style.token)}>{style.sample}</span>
        </li>
      ))}
    </ul>
  );
}
