import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("clients");
}

export default function Page() {
  return <ModuleAVenir idModule="clients" />;
}
