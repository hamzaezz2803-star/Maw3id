import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Gauge, UserPlus, Wallet } from "lucide-react";
import { AgendaColonnes } from "@/components/activite/AgendaColonnes";
import { Indicateur } from "@/components/activite/Indicateur";
import { ListeNotifications } from "@/components/activite/ListeNotifications";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { BandeauJour } from "@/components/tableau-de-bord/BandeauJour";
import { ListeAConfirmer } from "@/components/tableau-de-bord/ListeAConfirmer";
import { Carte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirTableauDeBord } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterMontant, formaterPourcentage, formaterTexte } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return { title: t.navigation.libelles["tableau-de-bord"] };
}

const NOMBRE_ACTIVITES = 4;

export default async function PageTableauDeBord() {
  const [{ langue, t }, { utilisateur }, donnees] = await Promise.all([
    obtenirTraductions(),
    exigerAccesModule("tableau-de-bord"),
    obtenirTableauDeBord(),
  ]);
  const textes = t.accueil;
  const { indicateurs } = donnees;
  const variation = indicateurs.variationSemaine;

  const colonnes = donnees.collaborateurs.map((membre) => ({
    id: membre.id,
    titre: membre.nom_complet,
    sousTitre: membre.horaires_du_jour
      ? formaterTexte(t.apercu.plage, { debut: membre.horaires_du_jour.debut, fin: membre.horaires_du_jour.fin })
      : undefined,
    rendezVous: donnees.rendezVous.filter((rdv) => rdv.collaborateur_id === membre.id),
  }));

  return (
    <ConteneurPage>
      <BandeauJour
        prenom={utilisateur.nom_complet.split(" ")[0] ?? ""}
        jour={donnees.jour}
        nombre={donnees.rendezVous.length - donnees.comptes.annule}
        aConfirmer={donnees.comptes.en_attente}
        prochain={donnees.prochain}
        lienNouveau={cheminLocalise("/rendez-vous", langue)}
        langue={langue}
        t={t}
      />
      <MentionDemonstration t={t} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Indicateur
          icone={CalendarCheck}
          libelle={textes.indicateurs.rendezVousSemaine}
          valeur={String(indicateurs.rendezVousSemaine)}
          variation={variation === null ? undefined : { texte: formaterTexte(textes.indicateurs.variation, { valeur: variation > 0 ? `+${variation}` : variation }), hausse: variation >= 0 }}
        />
        <Indicateur icone={Gauge} libelle={textes.indicateurs.tauxOccupation} valeur={formaterPourcentage(indicateurs.tauxOccupation, langue)} />
        <Indicateur icone={Wallet} libelle={textes.indicateurs.encaisseMois} valeur={formaterMontant(indicateurs.encaisseMois, langue)} />
        <Indicateur icone={UserPlus} libelle={textes.indicateurs.nouveauxClients} valeur={String(indicateurs.nouveauxClients)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Carte className="min-w-0 xl:col-span-2">
          <EnteteCarte className="flex-row items-center justify-between pb-4">
            <TitreCarte className="text-section-title">{textes.agendaDuJour}</TitreCarte>
            <Link href={cheminLocalise("/calendrier", langue)} className="inline-flex min-h-11 items-center text-label text-primary-hover hover:underline sm:min-h-0">
              {textes.voirCalendrier}
            </Link>
          </EnteteCarte>
          <div className="px-2 pb-4 sm:px-4">
            <AgendaColonnes colonnes={colonnes} heureActuelle={donnees.heureActuelle} detail="service" t={t} />
          </div>
        </Carte>

        <div className="flex min-w-0 flex-col gap-6">
          <ListeAConfirmer rendezVous={donnees.aConfirmer} langue={langue} t={t} />
          <Carte>
            <EnteteCarte className="pb-2">
              <TitreCarte className="text-section-title">{textes.activite}</TitreCarte>
            </EnteteCarte>
            <ListeNotifications notifications={donnees.activite.slice(0, NOMBRE_ACTIVITES)} langue={langue} t={t} className="px-2.5 pb-4 sm:px-3.5" />
          </Carte>
        </div>
      </div>
    </ConteneurPage>
  );
}
