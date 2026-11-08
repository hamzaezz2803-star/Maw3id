import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { CHEMIN_CONNEXION } from "@/config/navigation";
import { estLangueValide, LANGUE_PAR_DEFAUT } from "@/i18n/config";
import type { Langue } from "@/types";

const PREFIXE_COOKIES = "maw3id";

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

  const estPageConnexion = `/${reste.join("/")}` === CHEMIN_CONNEXION;
  const aUnCookieDeSession = Boolean(getSessionCookie(requete, { cookiePrefix: PREFIXE_COOKIES }));

  if (!aUnCookieDeSession && !estPageConnexion) {
    return rediriger(requete, `/${premierSegment}${CHEMIN_CONNEXION}`);
  }
  if (aUnCookieDeSession && estPageConnexion) {
    return rediriger(requete, `/${premierSegment}`);
  }
}

export const config = {
  // Ignore l'API d'authentification, les fichiers internes de Next.js et les fichiers statiques.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
