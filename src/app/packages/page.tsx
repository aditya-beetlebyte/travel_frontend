import Wrapper from "@/layouts/Wrapper";
import PackagesCatalog from "@/components/packages/PackagesCatalog";

export const metadata = {
  title: "Packages - Triptrix Voyages",
};

export default function PackagesPage() {
  return (
    <Wrapper>
      <PackagesCatalog />
    </Wrapper>
  );
}
