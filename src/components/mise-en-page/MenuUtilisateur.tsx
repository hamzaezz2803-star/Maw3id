import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ElementMenu, MenuDeroulant, SeparateurMenu } from "@/components/ui/MenuDeroulant";
import { obtenirTraductions } from "@/i18n/serveur";
import { formaterTexte } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import type { Role, Utilisateur } from "@/types";

interface ProprietesMenuUtilisateur {
  utilisateur: Utilisateur;
  role: Role;
}

export async function MenuUtilisateur({ utilisateur, role }: ProprietesMenuUtilisateur) {
  const { langue, t } = await obtenirTraductions();

  return (
    <MenuDeroulant
      libelleDeclencheur={formaterTexte(t.utilisateur.menuDuCompte, { nom: utilisateur.nom_complet })}
      classePanneau="w-72"
      classeDeclencheur="flex h-11 items-center gap-2.5 rounded-control px-1 transition-colors hover:bg-secondary sm:h-10 lg:pe-2"
      declencheur={
        <>
          <Avatar nom={utilisateur.nom_complet} source={utilisateur.avatar_url} taille="petit" />
          <span className="hidden min-w-0 flex-col text-start lg:flex">
            <span className="truncate text-label text-fg">{utilisateur.nom_complet}</span>
            <span className="truncate text-helper text-fg-muted">{t.roles[role]}</span>
          </span>
          <ChevronDown aria-hidden="true" className="hidden size-4 text-fg-muted lg:block" />
        </>
      }
    >
      <div className="flex items-center gap-3 px-2.5 py-2">
        <Avatar nom={utilisateur.nom_complet} source={utilisateur.avatar_url} />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-label text-fg">{utilisateur.nom_complet}</p>
          <p className="truncate text-helper text-fg-secondary">{utilisateur.email}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-2.5 pb-2">
        <Badge variante="primaire">{t.roles[role]}</Badge>
        <Badge>{utilisateur.fonction}</Badge>
      </div>
      <SeparateurMenu />
      <ElementMenu lien={cheminLocalise("/parametres", langue)}>
        <Settings aria-hidden="true" />
        {t.utilisateur.parametresCompte}
      </ElementMenu>
      <ElementMenu lien={cheminLocalise("/notifications", langue)}>
        <Bell aria-hidden="true" />
        {t.utilisateur.preferencesNotifications}
      </ElementMenu>
      <SeparateurMenu />
      {/* Sans effet tant que l'authentification n'est pas en place. */}
      <ElementMenu ton="danger">
        <LogOut aria-hidden="true" className="rtl:-scale-x-100" />
        {t.utilisateur.deconnexion}
      </ElementMenu>
    </MenuDeroulant>
  );
}
