import { GenericSectionPage } from "@/views/GenericSectionPage";
import { latestUpdates as fallbackLatestUpdates } from "@/data/jobs";
import { fetchListings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function LatestUpdatesPage() {
  let jobs = fallbackLatestUpdates;
  try {
    const data = await fetchListings({ limit: 100 });
    if (data && data.jobs && data.jobs.length > 0) {
      jobs = data.jobs.map((j: any) => ({
        title: j.title,
        status: j.status,
        slug: j.slug,
        department: j.state ? j.state.toUpperCase().replace("-", " ") : "VARIOUS",
        lastDate: j.lastDate,
      }));
    }
  } catch (err) {
    console.error("[LatestUpdatesPage] Failed to fetch from API, using fallback:", err);
  }

  return <GenericSectionPage title="Latest Updates" jobs={jobs} />;
}
