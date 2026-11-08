import type { ReactNode } from "react";
import { SelecteurLangue } from "@/components/mise-en-page/SelecteurLangue";
import { NOM_APPLICATION } from "@/constants";
import { obtenirTraductions } from "@/i18n/serveur";
import { joindreClasses } from "@/lib/classes";
import { AgendaDecoratif } from "./AgendaDecoratif";

interface ProprietesCadreAuthentification {
  titre: string;
  sousTitre?: string;
  /** Zone plus large pour l'activation (QR code, codes de secours). */
  large?: boolean;
  /** Mention discrète sous le formulaire. */
  note?: string;
  children: ReactNode;
}

/**
 * Pages hors de l'application (connexion, code, activation) :
 * panneau de marque « موعد » sur un agenda, puis le formulaire sur fond blanc.
 */
export async function CadreAuthentification({ titre, sousTitre, large = false, note, children }: ProprietesCadreAuthentification) {
  const { t } = await obtenirTraductions();

  return (
    <div className="flex min-h-dvh flex-col bg-surface lg:flex-row">
      <PanneauMarque accroche={t.connexion.accroche} sensDuNom={t.connexion.sensDuNom} />

      <main className="relative flex flex-1 flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="flex justify-end">
          <SelecteurLangue />
        </div>
        <div className="flex flex-1 items-center py-8 lg:py-0">
          <div className={joindreClasses("w-full", large ? "max-w-md" : "max-w-sm")}>
            <h1 className="text-page-title text-fg">{titre}</h1>
            {sousTitre && <p className="mt-2 text-body text-fg-secondary">{sousTitre}</p>}
            <div className="mt-8">{children}</div>
            {note && <p className="mt-8 border-t border-border pt-5 text-helper text-fg-muted">{note}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

function PanneauMarque({ accroche, sensDuNom }: { accroche: string; sensDuNom: string }) {
  return (
    <aside className="relative isolate flex shrink-0 flex-col overflow-hidden bg-nuit px-5 pb-6 pt-6 text-primary-foreground sm:px-10 lg:w-[44%] lg:max-w-2xl lg:px-14 lg:py-12">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-control bg-primary-foreground text-body font-bold text-nuit"
        >
          M
        </span>
        <span className="text-section-title">{NOM_APPLICATION}</span>
      </div>

      {/* L'agenda n'apparaît que sur grand écran : sur mobile, il gênerait la lecture. */}
      <AgendaDecoratif className="absolute inset-x-14 bottom-64 top-32 -z-10 hidden lg:block" />

      <div className="mt-8 flex flex-col gap-3 lg:mt-auto">
        <p
          lang="ar"
          dir="rtl"
          className="font-(family-name:--font-plex-arabe) text-[3.5rem] font-bold leading-none text-primary-foreground sm:text-[4.5rem] lg:text-[7.5rem]"
        >
          موعد
        </p>
        <p className="max-w-sm text-body text-nuit-texte">{accroche}</p>
        <p className="hidden text-helper text-nuit-texte/80 lg:block">{sensDuNom}</p>
      </div>
    </aside>
  );
}
