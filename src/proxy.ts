import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { CHEMIN_CONNEXION, CHEMIN_VERIFICATION_CODE } from "@/config/navigation";
import { estLangueValide, LANGUE_PAR_DEFAUT } from "@/i18n/config";
import type { Langue } from "@/types";

const PREFIXE_COOKIES = "maw3id";

/** Pages accessibles sans session : connexion, puis saisie du code de double authentification. */
const CHEMINS_PUBLICS = [CHEMIN_CONNEXION, CHEMIN_VERIFICATION_CODE];

/** Langue préférée du navigateur parmi celles de l'application (en-tête Accept-Language). */
function choisirLangue(requete: NextRequest): Langue {
  const preferences = requete.headers.get("accept-language") ?? "";
  const premiere = preferences.split(",")[0]?.trim().slice(0, 2).toLowerCase() ?? "";
  return estLangueValide(premiere) ? premiere : LANGUE_PAR_DEFAUT;
}

function rediriger(requete: NextRequest, chemin: string) {
  const url = requete.nextUrl.clone();
  url.pathname = chemin;
  url.search = "";
  return NextResponse.redirect(url);
}

/*
 * 1. Ajoute le préfixe de langue aux adresses qui n'en ont pas (/clients -> /fr/clients).
 * 2. Vérification rapide de connexion (présence du cookie) pour éviter d'afficher
 *    l'application à un visiteur. La vraie vérification de session et de rôle est
 *    faite côté serveur dans chaque page et chaque action.
 */
export function proxy(requete: NextRequest) {
  const { pathname } = requete.nextUrl;
  const [, premierSegment = "", ...reste] = pathname.split("/");

  if (!estLangueValide(premierSegment)) {
    return rediriger(requete, `/${choisirLangue(requete)}${pathname === "/" ? "" : pathname}`);
  }

  const estPagePublique = CHEMINS_PUBLICS.includes(`/${reste.join("/")}`);
  const aUnCookieDeSession = Boolean(getSessionCookie(requete, { cookiePrefix: PREFIXE_COOKIES }));

  // Le proxy ne peut pas vérifier qu'un cookie est encore valide : il ne renvoie donc
  // jamais hors de la connexion (sinon une session expirée tournerait en boucle).
  if (!aUnCookieDeSession && !estPagePublique) {
    return rediriger(requete, `/${premierSegment}${CHEMIN_CONNEXION}`);
  }
}

export const config = {
  // Ignore l'API d'authentification, les fichiers internes de Next.js et les fichiers statiques.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
