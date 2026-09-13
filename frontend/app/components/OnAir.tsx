import { sanityFetch } from "@/sanity/lib/live";
import { timeslotsQuery } from "@/sanity/lib/queries";
import OnAirClient from "./OnAirClient";

export default async function OnAir() {
  const { data } = await sanityFetch({ query: timeslotsQuery });

  return <OnAirClient schedule={data ?? []} />;
}