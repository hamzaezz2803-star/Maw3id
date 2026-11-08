import type { Metadata } from "next";
import { FormulaireConnexion } from "@/components/authentification/FormulaireConnexion";
import { SelecteurLangue } from "@/components/mise-en-page/SelecteurLangue";
import { Carte } from "@/components/ui/Carte";
import { NOM_APPLICATION } from "@/constants";
import { obtenirTraductions } from "@/i18n/serveur";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.connexion.titre };
}

export default async function PageConnexion() {
  const { t } = await obtenirTraductions();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-control bg-primary text-body font-bold text-primary-foreground"
        >
          M
        </span>
        <span className="text-page-title text-fg">{NOM_APPLICATION}</span>
      </div>
      <Carte className="w-full max-w-sm p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-section-title text-fg">{t.connexion.titre}</h1>
          <p className="text-helper text-fg-secondary">{t.connexion.sousTitre}</p>
        </div>
        <FormulaireConnexion />
      </Carte>
      <SelecteurLangue />
    </main>
  );
}
