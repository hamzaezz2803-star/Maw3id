import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

/** Erreur en haut d'un formulaire, annoncée aux lecteurs d'écran. Icône + texte, jamais la couleur seule. */
export function MessageErreur({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-control border border-danger/20 bg-danger-subtle px-3 py-2.5 text-helper text-danger-hover">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
