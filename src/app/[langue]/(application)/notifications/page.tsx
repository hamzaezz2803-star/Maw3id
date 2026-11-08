import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("notifications");
}

export default function Page() {
  return <ModuleAVenir idModule="notifications" />;
}
