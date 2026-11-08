import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Carte } from "@/components/ui/Carte";
import { EtatVide } from "@/components/ui/EtatVide";

interface ProprietesPanneauMessage {
  titre: string;
  description: string;
  icone?: LucideIcon;
  action?: ReactNode;
}

/** Message plein écran centré : erreur, page introuvable, données indisponibles. */
export function PanneauMessage({ titre, description, icone, action }: ProprietesPanneauMessage) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-12">
      <Carte className="w-full">
        <EtatVide icone={icone} titre={titre} description={description} action={action} />
      </Carte>
    </div>
  );
}
