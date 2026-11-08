import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("notifications");

export default function Page() {
  return <ModulePlaceholder moduleId="notifications" />;
}
