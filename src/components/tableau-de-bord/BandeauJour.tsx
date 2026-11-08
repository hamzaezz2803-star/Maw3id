import Link from "next/link";
import { CalendarClock, Plus } from "lucide-react";
import { classesBouton } from "@/components/ui/Bouton";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { formaterJourLong, formaterTexte } from "@/lib/formatage";
import type { Langue, RendezVousDetaille } from "@/types";

interface ProprietesBandeauJour {
  prenom: string;
  jour: string;
  nombre: number;
  aConfirmer: number;
  prochain: RendezVousDetaille | null;
  lienNouveau: string;
  langue: Langue;
  t: Dictionnaire;
}

/**
 * En-tête du tableau de bord, dans l'esprit du panneau de connexion :
 * bleu nuit, la date du jour en grand, et ce qui compte maintenant.
 */
export function BandeauJour({ prenom, jour, nombre, aConfirmer, prochain, lienNouveau, langue, t }: ProprietesBandeauJour) {
  const textes = t.accueil;

  return (
    <section className="flex flex-col gap-6 rounded-card bg-nuit px-6 py-7 text-primary-foreground sm:px-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-body text-nuit-texte first-letter:uppercase">{formaterJourLong(jour, langue)}</p>
        <h1 className="text-page-title sm:text-[2rem] sm:leading-[2.5rem]">{formaterTexte(textes.bonjour, { prenom })}</h1>
        <p className="max-w-xl text-body text-nuit-texte">
          {formaterTexte(textes.resume, { nombre, attente: aConfirmer })}
        </p>
        <p className="mt-2 flex items-start gap-2 text-body">
          <CalendarClock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-maintenant" />
          {prochain
            ? formaterTexte(textes.prochain, {
                heure: prochain.debut_le.slice(11, 16),
                client: prochain.client_nom,
                service: prochain.service_nom,
              })
            : textes.aucunProchain}
        </p>
      </div>
      <Link href={lienNouveau} className={classesBouton({ variante: "secondaire", className: "self-start lg:self-auto" })}>
        <Plus aria-hidden="true" />
        {textes.nouveauRendezVous}
      </Link>
    </section>
  );
}
