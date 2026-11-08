import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("online-booking");

export default function Page() {
  return <ModulePlaceholder moduleId="online-booking" />;
}
