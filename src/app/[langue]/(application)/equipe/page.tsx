import { CalendarCheck, Clock, UserPlus } from "lucide-react";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerEquipe } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterTexte } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("equipe");
}

export default async function PageEquipe() {
  const [{ t }, , equipe] = await Promise.all([obtenirTraductions(), exigerAccesModule("equipe"), listerEquipe()]);
  const textes = t.equipe;

  return (
    <ConteneurPage
      titre={t.navigation.libelles.equipe}
      description={textes.description}
      actions={<Bouton><UserPlus aria-hidden="true" />{textes.ajouter}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {equipe.map((membre) => (
          <li key={membre.id}>
            <Carte className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-start gap-3">
                <Avatar nom={membre.nom_complet} taille="grand" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-card-title text-fg">{membre.nom_complet}</p>
                  <p className="truncate text-helper text-fg-secondary">{membre.fonction}</p>
                  <Badge variante={membre.role === "administrateur" ? "primaire" : "neutre"} className="mt-1 self-start">{t.roles[membre.role]}</Badge>
                </div>
              </div>

              <dl className="flex flex-col gap-2 border-t border-border pt-4 text-helper">
                <div className="flex items-center gap-2">
                  <dt><Clock aria-hidden="true" className="size-4 text-fg-muted" /><span className="sr-only">{t.calendrier.aujourdHui}</span></dt>
                  <dd className={membre.horaires_du_jour ? "text-fg" : "text-fg-muted"}>
                    {membre.horaires_du_jour
                      ? formaterTexte(t.apercu.plage, { debut: membre.horaires_du_jour.debut, fin: membre.horaires_du_jour.fin })
                      : textes.absent}
                  </dd>
                </div>
                {membre.horaires_du_jour && membre.role !== "secretaire" && (
                  <div className="flex items-center gap-2">
                    <dt><CalendarCheck aria-hidden="true" className="size-4 text-fg-muted" /><span className="sr-only">{t.navigation.libelles["rendez-vous"]}</span></dt>
                    <dd className="text-fg">{formaterTexte(textes.rendezVousDuJour, { nombre: membre.rendez_vous_du_jour })}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-auto flex flex-col gap-2">
                <p className="text-label text-fg-secondary">{textes.services}</p>
                {membre.services.length > 0 ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {membre.services.map((service) => (
                      <li key={service}><Badge>{service}</Badge></li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-helper text-fg-muted">{textes.aucunService}</p>
                )}
              </div>
            </Carte>
          </li>
        ))}
      </ul>
    </ConteneurPage>
  );
}
