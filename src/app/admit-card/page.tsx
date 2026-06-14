import { AdmitCardPage } from "@/views/AdmitCardPage";
import { fetchListings } from "@/lib/api";

export const revalidate = 60;

export default async function AdmitCardPageRoute() {
  let jobs: any[] = [];
  try {
    const data = await fetchListings({ category: "admit-card", limit: 100 });
    if (data && data.jobs && data.jobs.length > 0) {
      jobs = data.jobs.map((j: any) => ({
        id: j.id,
        title: j.title,
        status: j.status,
        slug: j.slug,
        department: j.state ? j.state.toUpperCase().replace("-", " ") : "VARIOUS",
        lastDate: j.lastDate,
      }));
    }
  } catch (err) {
    console.error("[AdmitCardPage] Failed to fetch from API, using fallback:", err);
  }

  return <AdmitCardPage jobs={jobs} />;
}
