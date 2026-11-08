import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("clients");

export default function Page() {
  return <ModulePlaceholder moduleId="clients" />;
}
