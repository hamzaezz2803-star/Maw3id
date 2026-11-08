import { Suspense } from "react";
import { EcranChargement } from "@/components/mise-en-page/EcranChargement";
import { MiseEnPagePrincipale } from "@/components/mise-en-page/MiseEnPagePrincipale";
import { exigerContexteSession, obtenirNotificationsRecentes } from "@/lib/donnees/session";

/** Lit la session (au moment de la requête) : redirige vers la connexion si besoin. */
async function CoquilleConnectee({ children }: { children: React.ReactNode }) {
  const session = await exigerContexteSession();
  const notifications = await obtenirNotificationsRecentes();

  return (
    <MiseEnPagePrincipale session={session} notifications={notifications.ok ? notifications.donnees : []}>
      {children}
    </MiseEnPagePrincipale>
  );
}

// La lecture de la session dépend de la requête : elle doit se trouver dans un <Suspense>.
export default function MiseEnPageApplication({ children }: LayoutProps<"/[langue]">) {
  return (
    <Suspense fallback={<EcranChargement />}>
      <CoquilleConnectee>{children}</CoquilleConnectee>
    </Suspense>
  );
}
