import { joindreClasses } from "@/lib/classes";

/*
 * Graphiques à une seule série (règles dataviz) : une seule couleur, pas de
 * légende (le titre nomme la série), barres fines arrondies du côté libre,
 * valeur au survol et au focus clavier, tableau de données pour les lecteurs d'écran.
 */

export interface PointGraphique {
  cle: string;
  /** Libellé court sous la barre (ex. « 9 nov. »). */
  etiquette: string;
  /** Description complète pour l'info-bulle et le tableau (ex. « Semaine du 9 nov. : 30 rendez-vous »). */
  description: string;
  valeur: number;
  /** Barre atténuée, ex. semaine en cours non terminée. */
  partiel?: boolean;
}

/** Info-bulle centrée sur la barre, sauf aux bords où elle s'aligne vers l'intérieur (pas de débordement). */
function alignementInfoBulle(index: number, total: number): string {
  if (index < total / 4) return "start-0";
  if (index >= (total * 3) / 4) return "end-0";
  return "left-1/2 -translate-x-1/2";
}

interface ProprietesGraphiqueBarres {
  points: PointGraphique[];
  /** Titre du tableau de données accessible. */
  titreTableau: string;
  enTeteValeur: string;
}

export function GraphiqueBarres({ points, titreTableau, enTeteValeur }: ProprietesGraphiqueBarres) {
  const maximum = Math.max(...points.map((point) => point.valeur), 1);

  return (
    <figure>
      <div aria-hidden="true" className="relative flex h-48 items-end gap-2 border-b border-border-strong sm:gap-3">
        {[0.5, 1].map((part) => (
          <span key={part} className="absolute inset-x-0 border-t border-dashed border-border" style={{ bottom: `${part * 100}%` }} />
        ))}
        {points.map((point, index) => (
          <div key={point.cle} tabIndex={0} className="group relative flex h-full flex-1 items-end justify-center focus-visible:outline-offset-4">
            <span
              className={joindreClasses(
                "w-full max-w-10 rounded-t transition-colors duration-150 group-hover:bg-primary-hover",
                point.partiel ? "bg-primary/40" : "bg-primary",
              )}
              style={{ height: `${(point.valeur / maximum) * 100}%` }}
            />
            <span
              className={joindreClasses(
                "pointer-events-none absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-helper text-surface opacity-0 shadow-popover transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
                alignementInfoBulle(index, points.length),
              )}
            >
              {point.description}
            </span>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-2 flex gap-2 sm:gap-3">
        {points.map((point) => (
          <span key={point.cle} className="flex-1 truncate text-center text-helper text-fg-muted">
            {point.etiquette}
          </span>
        ))}
      </div>
      <TableauDonnees titre={titreTableau} enTeteValeur={enTeteValeur} points={points} />
    </figure>
  );
}

interface ProprietesClassement {
  points: PointGraphique[];
  titreTableau: string;
  enTeteValeur: string;
}

/** Classement horizontal : libellé, barre et valeur écrite (étiquettes directes, peu de lignes). */
export function ClassementBarres({ points, titreTableau, enTeteValeur }: ProprietesClassement) {
  const maximum = Math.max(...points.map((point) => point.valeur), 1);

  return (
    <figure>
      <ul aria-hidden="true" className="flex flex-col gap-3">
        {points.map((point) => (
          <li key={point.cle} className="grid grid-cols-[minmax(0,10rem)_1fr_2.5rem] items-center gap-3">
            <span className="truncate text-label text-fg">{point.etiquette}</span>
            <span className="h-2.5 rounded-e bg-secondary">
              <span className="block h-full rounded-e bg-primary" style={{ width: `${(point.valeur / maximum) * 100}%` }} />
            </span>
            <span className="text-end text-label tabular-nums text-fg-secondary">{point.valeur}</span>
          </li>
        ))}
      </ul>
      <TableauDonnees titre={titreTableau} enTeteValeur={enTeteValeur} points={points} />
    </figure>
  );
}

function TableauDonnees({ titre, enTeteValeur, points }: { titre: string; enTeteValeur: string; points: PointGraphique[] }) {
  return (
    <table className="sr-only">
      <caption>{titre}</caption>
      <tbody>
        {points.map((point) => (
          <tr key={point.cle}>
            <th scope="row">{point.description}</th>
            <td>
              {point.valeur} {enTeteValeur}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
