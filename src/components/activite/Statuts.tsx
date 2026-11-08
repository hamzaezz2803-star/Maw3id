import { FlaskConical } from "lucide-react";
import { Badge, type VarianteBadge } from "@/components/ui/Badge";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import type { StatutFacture, StatutRendezVousComplet } from "@/types";

export const VARIANTE_STATUT_RENDEZ_VOUS: Record<StatutRendezVousComplet, VarianteBadge> = {
  confirme: "succes",
  en_attente: "attention",
  annule: "danger",
  termine: "neutre",
  absent: "info",
};

const VARIANTE_STATUT_FACTURE: Record<StatutFacture, VarianteBadge> = {
  payee: "succes",
  en_attente: "attention",
  en_retard: "danger",
};

export function BadgeStatutRendezVous({ statut, t }: { statut: StatutRendezVousComplet; t: Dictionnaire }) {
  return (
    <Badge variante={VARIANTE_STATUT_RENDEZ_VOUS[statut]} avecPoint>
      {t.apercu.statuts[statut]}
    </Badge>
  );
}

export function BadgeStatutFacture({ statut, t }: { statut: StatutFacture; t: Dictionnaire }) {
  return (
    <Badge variante={VARIANTE_STATUT_FACTURE[statut]} avecPoint>
      {t.apercu.statutsFacture[statut]}
    </Badge>
  );
}

/** Signale que les chiffres affichés sont fictifs (règle : pas de faux chiffres présentés comme réels). */
export function MentionDemonstration({ t }: { t: Dictionnaire }) {
  return (
    <p className="inline-flex items-center gap-2 self-start rounded-control border border-info/20 bg-info-subtle px-3 py-1.5 text-helper text-info">
      <FlaskConical aria-hidden="true" className="size-4 shrink-0" />
      {t.apercu.donneesDemo}
    </p>
  );
}
