import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/serveur/auth";

/** Points d'entrée HTTP de Better Auth (session, déconnexion...). */
export const { GET, POST } = toNextJsHandler(auth);
