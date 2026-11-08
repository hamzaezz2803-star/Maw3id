import { TriangleAlert } from "lucide-react";
import { MiseEnPagePrincipale } from "@/components/mise-en-page/MiseEnPagePrincipale";
import { PanneauMessage } from "@/components/mise-en-page/PanneauMessage";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirContexteSession, obtenirNotificationsRecentes } from "@/lib/donnees/session";

export default async function MiseEnPageApplication({ children }: LayoutProps<"/[langue]">) {
  const [{ t }, session] = await Promise.all([obtenirTraductions(), obtenirContexteSession()]);

  if (!session.ok) {
    return <PanneauMessage icone={TriangleAlert} titre={t.commun.erreurTitre} description={t.commun.erreurDescription} />;
  }

  const notifications = await obtenirNotificationsRecentes(session.donnees.organisationCourante.id);

  return (
    <MiseEnPagePrincipale session={session.donnees} notifications={notifications.ok ? notifications.donnees : []}>
      {children}
    </MiseEnPagePrincipale>
  );
}
