import Wrapper from "@/layouts/Wrapper";
import PackagesCatalog from "@/components/packages/PackagesCatalog";
import { Suspense } from "react";

export const metadata = {
  title: "Packages - Triptrix Voyages",
};

export default function PackagesPage() {
  return (
    <Wrapper>
      <Suspense fallback={null}>
        <PackagesCatalog />
      </Suspense>
    </Wrapper>
  );
}
