import type { CSSProperties } from "react";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { joindreClasses } from "@/lib/classes";
import { minutesDepuisMinuit, repartirEnVoies } from "@/lib/metier/statistiques";
import type { RendezVousDetaille, StatutRendezVousComplet } from "@/types";

const HEURE_DEBUT = 8;
const HEURE_FIN = 18;
const HAUTEUR_HEURE_REM = 4;
const HEURES = Array.from({ length: HEURE_FIN - HEURE_DEBUT }, (_, index) => HEURE_DEBUT + index);

// Même langage visuel que le panneau de connexion : bord de début coloré, fond léger.
const STYLE_CRENEAU: Record<StatutRendezVousComplet, string> = {
  confirme: "border-primary bg-primary-subtle text-fg",
  en_attente: "border-warning border-dashed bg-warning-subtle text-fg",
  annule: "border-border-strong bg-surface-muted text-fg-muted line-through",
  termine: "border-fg-muted bg-secondary text-fg-secondary",
  absent: "border-info bg-info-subtle text-fg-secondary",
};

export interface ColonneAgenda {
  id: string;
  titre: string;
  sousTitre?: string;
  estMiseEnAvant?: boolean;
  rendezVous: RendezVousDetaille[];
}

interface ProprietesAgendaColonnes {
  colonnes: ColonneAgenda[];
  /** Ligne verte « maintenant », sur les colonnes mises en avant (ou toutes). */
  heureActuelle?: string;
  /** Texte secondaire d'un créneau : le service (vue du jour) ou le collaborateur (vue semaine). */
  detail: "service" | "collaborateur";
  t: Dictionnaire;
}

function position(minutes: number): string {
  return `${((minutes - HEURE_DEBUT * 60) / 60) * HAUTEUR_HEURE_REM}rem`;
}

/** Agenda en colonnes (collaborateurs ou jours), heure par heure, avec défilement horizontal sur mobile. */
export function AgendaColonnes({ colonnes, heureActuelle, detail, t }: ProprietesAgendaColonnes) {
  const hauteur = `${(HEURE_FIN - HEURE_DEBUT) * HAUTEUR_HEURE_REM}rem`;
  const minutesActuelles = heureActuelle ? minutesDepuisMinuit(heureActuelle) : null;
  const ligneVisible = colonnes.some((colonne) => colonne.estMiseEnAvant) ? (c: ColonneAgenda) => c.estMiseEnAvant : () => true;

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[40rem]" style={{ gridTemplateColumns: `3.5rem repeat(${colonnes.length}, minmax(8.5rem, 1fr))` }}>
        <div className="sticky start-0 z-10 bg-surface" />
        {colonnes.map((colonne) => (
          <div key={colonne.id} className={joindreClasses("border-b border-border px-3 pb-3", colonne.estMiseEnAvant && "text-primary-hover")}>
            <p className="truncate text-label">{colonne.titre}</p>
            {colonne.sousTitre && <p className="truncate text-helper text-fg-muted">{colonne.sousTitre}</p>}
          </div>
        ))}

        <div aria-hidden="true" className="sticky start-0 z-10 bg-surface" style={{ height: hauteur }}>
          {HEURES.map((heure) => (
            <span key={heure} dir="ltr" className="absolute end-2 -translate-y-1/2 text-helper tabular-nums text-fg-muted" style={{ top: position(heure * 60) }}>
              {String(heure).padStart(2, "0")}:00
            </span>
          ))}
        </div>

        {colonnes.map((colonne) => {
          const voies = repartirEnVoies(colonne.rendezVous);
          return (
          <section key={colonne.id} aria-label={colonne.titre} className="relative border-s border-border" style={{ height: hauteur }}>
            {HEURES.map((heure) => (
              <span key={heure} aria-hidden="true" className="absolute inset-x-0 border-t border-border/70" style={{ top: position(heure * 60) }} />
            ))}
            <ul>
              {colonne.rendezVous.map((rdv) => (
                <Creneau key={rdv.id} rdv={rdv} voie={voies.get(rdv.id) ?? { voie: 0, total: 1 }} detail={detail} t={t} />
              ))}
            </ul>
            {minutesActuelles !== null && ligneVisible(colonne) && (
              <span aria-hidden="true" className="absolute inset-x-0 z-[1] flex items-center" style={{ top: position(minutesActuelles) }}>
                <span className="size-2 -translate-y-1/2 rounded-full bg-maintenant ltr:-translate-x-1/2 rtl:translate-x-1/2" />
                <span className="h-0.5 flex-1 -translate-y-1/2 bg-maintenant" />
              </span>
            )}
          </section>
          );
        })}
      </div>
    </div>
  );
}

const MARGE_CRENEAU_PX = 4;

interface ProprietesCreneau {
  rdv: RendezVousDetaille;
  /** Voie occupée parmi les rendez-vous simultanés, et nombre de voies. */
  voie: { voie: number; total: number };
  detail: "service" | "collaborateur";
  t: Dictionnaire;
}

function Creneau({ rdv, voie, detail, t }: ProprietesCreneau) {
  const debut = minutesDepuisMinuit(rdv.debut_le.slice(11, 16));
  const largeur = 100 / voie.total;
  const style: CSSProperties = {
    top: `calc(${position(debut)} + 2px)`,
    height: `calc(${(rdv.duree_minutes / 60) * HAUTEUR_HEURE_REM}rem - 4px)`,
    insetInlineStart: `calc(${voie.voie * largeur}% + ${MARGE_CRENEAU_PX}px)`,
    width: `calc(${largeur}% - ${MARGE_CRENEAU_PX * 1.5}px)`,
  };

  const secondaire = detail === "service" ? rdv.service_nom : rdv.collaborateur_nom;
  // Trois rendez-vous simultanés ou plus : la place manque, on n'affiche que l'heure
  // (le détail reste lisible au survol et par les lecteurs d'écran).
  const estCompact = voie.total >= 3;
  const heure = rdv.debut_le.slice(11, 16);

  return (
    <li
      style={style}
      title={`${heure} ${rdv.client_nom}, ${secondaire}`}
      className={joindreClasses(
        "absolute overflow-hidden rounded-md py-1 text-helper",
        estCompact ? "border-s-2 px-1" : "border-s-4 px-2",
        STYLE_CRENEAU[rdv.statut],
      )}
    >
      <p dir="auto" className="truncate font-medium">
        <span dir="ltr" className="tabular-nums">{heure}</span>{" "}
        <span className={estCompact ? "sr-only" : undefined}>{rdv.client_nom}</span>
      </p>
      {rdv.duree_minutes >= 30 && voie.total === 1 && <p dir="auto" className="truncate text-fg-secondary">{secondaire}</p>}
      <span className="sr-only">
        {voie.total > 1 && `, ${secondaire}`}, {t.apercu.statuts[rdv.statut]}
      </span>
    </li>
  );
}
