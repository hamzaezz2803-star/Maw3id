import type { CSSProperties } from "react";
import { joindreClasses } from "@/lib/classes";

/*
 * Agenda d'une journée, purement décoratif (aria-hidden) : des créneaux sans
 * nom ni chiffre, pour évoquer le métier sans afficher de fausses données.
 */

const HEURE_DEBUT = 8;
const HEURE_FIN = 17;
const HEURES = Array.from({ length: HEURE_FIN - HEURE_DEBUT + 1 }, (_, index) => HEURE_DEBUT + index);
const HEURE_MAINTENANT = 11.4;
const DELAI_ENTRE_CRENEAUX_MS = 70;

// début et durée en heures ; colonne en pourcentage de la largeur disponible.
const CRENEAUX: { debut: number; duree: number; depuis: number; largeur: number; fort: boolean }[] = [
  { debut: 8.5, duree: 1, depuis: 0, largeur: 46, fort: true },
  { debut: 9, duree: 0.75, depuis: 52, largeur: 40, fort: false },
  { debut: 10, duree: 1.5, depuis: 18, largeur: 50, fort: false },
  { debut: 12, duree: 0.5, depuis: 0, largeur: 34, fort: true },
  { debut: 13.5, duree: 1.25, depuis: 40, largeur: 54, fort: true },
  { debut: 14, duree: 0.75, depuis: 0, largeur: 32, fort: false },
  { debut: 15.5, duree: 1, depuis: 10, largeur: 62, fort: false },
];

function position(heure: number): string {
  return `${((heure - HEURE_DEBUT) / (HEURE_FIN - HEURE_DEBUT)) * 100}%`;
}

export function AgendaDecoratif({ className }: { className?: string }) {
  return (
    // Le conteneur externe est placé par le parent ; l'interne sert de repère aux positions en %.
    // L'agenda suit le sens de lecture (heures à droite en arabe) ; les heures restent en chiffres latins.
    <div aria-hidden="true" className={className}>
      <div className="relative h-full">
        {HEURES.map((heure) => (
          <div key={heure} className="absolute inset-x-0 flex items-center gap-3" style={{ top: position(heure) }}>
            <span dir="ltr" className="w-11 shrink-0 -translate-y-1/2 text-start text-helper tabular-nums text-nuit-texte/75">
              {String(heure).padStart(2, "0")}:00
            </span>
            <span className="h-px flex-1 -translate-y-1/2 bg-nuit-ligne" />
          </div>
        ))}

        <div className="absolute inset-y-0 end-0 start-14">
          {CRENEAUX.map((creneau, index) => {
            const style: CSSProperties = {
              top: position(creneau.debut),
              height: `calc(${position(HEURE_DEBUT + creneau.duree)} - 4px)`,
              insetInlineStart: `${creneau.depuis}%`,
              width: `${creneau.largeur}%`,
              animationDelay: `${index * DELAI_ENTRE_CRENEAUX_MS}ms`,
            };
            return (
              <span
                key={`${creneau.debut}-${creneau.depuis}`}
                style={style}
                className={joindreClasses(
                  "absolute animate-apparition-creneau rounded-md border-s-4",
                  creneau.fort
                    ? "border-creneau-doux bg-creneau-fort/55"
                    : "border-creneau-fort bg-creneau-doux/20",
                )}
              />
            );
          })}

          <span className="absolute inset-x-0 flex items-center" style={{ top: position(HEURE_MAINTENANT) }}>
            <span className="size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maintenant rtl:translate-x-1/2" />
            <span className="h-0.5 flex-1 -translate-y-1/2 bg-maintenant" />
          </span>
        </div>
      </div>
    </div>
  );
}
