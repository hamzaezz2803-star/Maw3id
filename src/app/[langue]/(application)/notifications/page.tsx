import { CheckCheck } from "lucide-react";
import { ListeNotifications } from "@/components/activite/ListeNotifications";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerNotifications } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";

export function generateMetadata() {
  return genererMetadonneesModule("notifications");
}

export default async function PageNotifications() {
  const [{ langue, t }, , notifications] = await Promise.all([
    obtenirTraductions(),
    exigerAccesModule("notifications"),
    listerNotifications(),
  ]);

  return (
    <ConteneurPage
      titre={t.navigation.libelles.notifications}
      description={t.notificationsPage.description}
      actions={<Bouton variante="contour"><CheckCheck aria-hidden="true" />{t.notificationsPage.toutMarquer}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <Carte className="max-w-3xl">
        <ListeNotifications notifications={notifications} langue={langue} t={t} className="divide-y divide-border px-2.5 py-2 sm:px-3.5" />
      </Carte>
    </ConteneurPage>
  );
}
