import { GenericSectionPage } from "@/views/GenericSectionPage";
import { fetchListings } from "@/lib/api";

export const revalidate = 3600;

export default async function LatestUpdatesPage() {
  let jobs: any[] = [];
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
