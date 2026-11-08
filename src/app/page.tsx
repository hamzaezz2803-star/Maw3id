import { redirect } from "next/navigation";

/** The back office lives under /dashboard; "/" stays free for a future public site. */
export default function HomePage() {
  redirect("/dashboard");
}
