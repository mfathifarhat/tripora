// @ts-expect-error - Importing JSX file from TSX
import { ItineraryPage } from "../pages/itinerary/itinerary";

export function meta() {
  return [
    { title: "Itinerary | Tripora" },
    { name: "description", content: "Your entire trip, all in one web. Tripora keeps travel simple and connected." },
  ];
}

export default function Itinerary() {
  return <ItineraryPage />;
}
