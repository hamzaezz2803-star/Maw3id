import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("finance");

export default function Page() {
  return <ModulePlaceholder moduleId="finance" />;
}
