import { NextResponse, type NextRequest } from "next/server";
import { estLangueValide, LANGUE_PAR_DEFAUT } from "@/i18n/config";
import type { Langue } from "@/types";

/** Langue préférée du navigateur parmi celles de l'application (en-tête Accept-Language). */
function choisirLangue(requete: NextRequest): Langue {
  const preferences = requete.headers.get("accept-language") ?? "";
  const premiere = preferences.split(",")[0]?.trim().slice(0, 2).toLowerCase() ?? "";
  return estLangueValide(premiere) ? premiere : LANGUE_PAR_DEFAUT;
}

/** Ajoute le préfixe de langue aux adresses qui n'en ont pas (/clients -> /fr/clients). */
export function proxy(requete: NextRequest) {
  const { pathname } = requete.nextUrl;
  const premierSegment = pathname.split("/")[1] ?? "";
  if (estLangueValide(premierSegment)) return;

  requete.nextUrl.pathname = `/${choisirLangue(requete)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(requete.nextUrl);
}

export const config = {
  // Ignore les fichiers internes de Next.js et les fichiers statiques (icon.svg...).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
