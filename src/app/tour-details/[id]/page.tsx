import TourDetailById from "@/components/features/tour-detail-by-id";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Tour Details - Triptrix Voyages",
};

export default async function TourDetailsIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Wrapper>
      <TourDetailById id={id} />
    </Wrapper>
  );
}
