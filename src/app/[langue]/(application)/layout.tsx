import { Suspense } from "react";
import { EcranChargement } from "@/components/mise-en-page/EcranChargement";
import { MiseEnPagePrincipale } from "@/components/mise-en-page/MiseEnPagePrincipale";
import { listerNotifications } from "@/lib/donnees/demonstration";
import { exigerContexteSession } from "@/lib/donnees/session";

/** Lit la session (au moment de la requête) : redirige vers la connexion si besoin. */
async function CoquilleConnectee({ children }: { children: React.ReactNode }) {
  const session = await exigerContexteSession();
  // Notifications de démonstration, en attendant la table « notifications ».
  const notifications = await listerNotifications();

  return (
    <MiseEnPagePrincipale session={session} notifications={notifications}>
      {children}
    </MiseEnPagePrincipale>
  );
}

// Toutes les pages de l'espace connecté lisent la session à chaque requête : une navigation
// attend la vérification côté serveur plutôt que d'afficher une page pré-chargée.
export const instant = false;

// La lecture de la session dépend de la requête : elle doit se trouver dans un <Suspense>.
export default function MiseEnPageApplication({ children }: LayoutProps<"/[langue]">) {
  return (
    <Suspense fallback={<EcranChargement />}>
      <CoquilleConnectee>{children}</CoquilleConnectee>
    </Suspense>
  );
}
