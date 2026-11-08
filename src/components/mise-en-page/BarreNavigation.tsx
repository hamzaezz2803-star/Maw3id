import { ChampRecherche } from "@/components/ui/ChampRecherche";
import { obtenirTraductions } from "@/i18n/serveur";
import type { Notification, Organisation, Role, Utilisateur } from "@/types";
import { BoutonBarreLaterale } from "./BoutonBarreLaterale";
import { FilArianeNavigation } from "./FilArianeNavigation";
import { MenuNotifications } from "./MenuNotifications";
import { MenuUtilisateur } from "./MenuUtilisateur";
import { SelecteurLangue } from "./SelecteurLangue";

interface ProprietesBarreNavigation {
  utilisateur: Utilisateur;
  role: Role;
  organisation: Organisation;
  notifications: Notification[];
}

export async function BarreNavigation({ utilisateur, role, organisation, notifications }: ProprietesBarreNavigation) {
  const { t } = await obtenirTraductions();

  return (
    <header className="sticky top-0 z-30 flex h-navbar shrink-0 items-center gap-2 border-b border-border bg-surface px-4 sm:gap-4 sm:px-6">
      <BoutonBarreLaterale />
      <div className="min-w-0 flex-1">
        <FilArianeNavigation nomOrganisation={organisation.nom} />
      </div>
      <ChampRecherche
        libelle={t.barreNavigation.rechercheLibelle}
        placeholder={t.barreNavigation.recherchePlaceholder}
        classeConteneur="hidden w-56 lg:block xl:w-80"
      />
      <div className="flex items-center gap-1">
        <SelecteurLangue />
        <MenuNotifications notifications={notifications} />
        <MenuUtilisateur utilisateur={utilisateur} role={role} />
      </div>
    </header>
  );
}
