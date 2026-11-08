import Link from "next/link";
import { Globe, Phone, Store, type LucideIcon } from "lucide-react";
import { Carte, DescriptionCarte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { formaterJourCourt } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import type { Langue, RendezVous, RendezVousDetaille } from "@/types";

const ICONES_SOURCE: Record<RendezVous["source"], LucideIcon> = { en_ligne: Globe, telephone: Phone, accueil: Store };
const NOMBRE_AFFICHE = 4;

interface ProprietesListeAConfirmer {
  rendezVous: RendezVousDetaille[];
  langue: Langue;
  t: Dictionnaire;
}

/** Demandes en attente : le travail de l'accueil, mis en avant sur le tableau de bord. */
export function ListeAConfirmer({ rendezVous, langue, t }: ProprietesListeAConfirmer) {
  const textes = t.accueil;

  return (
    <Carte>
      <EnteteCarte className="pb-3">
        <TitreCarte className="flex items-center gap-2 text-section-title">
          {textes.aConfirmer}
          <span className="rounded-md bg-warning-subtle px-2 text-label tabular-nums text-warning">{rendezVous.length}</span>
        </TitreCarte>
        <DescriptionCarte>{textes.aConfirmerDescription}</DescriptionCarte>
      </EnteteCarte>
      {rendezVous.length === 0 ? (
        <p className="px-5 pb-5 text-helper text-fg-secondary sm:px-6">{textes.rienAConfirmer}</p>
      ) : (
        <ul className="divide-y divide-border border-t border-border">
          {rendezVous.slice(0, NOMBRE_AFFICHE).map((rdv) => {
            const Icone = ICONES_SOURCE[rdv.source];
            return (
              <li key={rdv.id} className="flex items-center gap-3 px-5 py-3 sm:px-6">
                <div className="flex w-20 shrink-0 flex-col text-helper">
                  <span className="text-fg-muted">{formaterJourCourt(rdv.debut_le, langue)}</span>
                  <span dir="ltr" className="font-medium tabular-nums text-fg">{rdv.debut_le.slice(11, 16)}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-label text-fg">{rdv.client_nom}</p>
                  <p className="truncate text-helper text-fg-secondary">{rdv.service_nom}</p>
                </div>
                <span title={t.apercu.sources[rdv.source]} className="text-fg-muted">
                  <Icone aria-hidden="true" className="size-4" />
                  <span className="sr-only">{t.apercu.sources[rdv.source]}</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="border-t border-border px-5 py-3 sm:px-6">
        <Link href={`${cheminLocalise("/rendez-vous", langue)}?statut=en_attente`} className="inline-flex min-h-11 items-center text-label text-primary-hover hover:underline sm:min-h-0">
          {textes.voirDemandes}
        </Link>
      </div>
    </Carte>
  );
}
