import { GenericSectionPage } from "@/views/GenericSectionPage";
import { fetchListings } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "University Update : Latest Education News, Board Results & Notifications",
  description:
    "Get the latest educational news, board results, and academic notifications from across India.",
};

export default async function UniversityUpdatePage() {
  let jobs: any[] = [];
  try {
    const data = await fetchListings({ category: "university-update", limit: 100 });
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
    console.error("[UniversityUpdatePage] Failed to fetch from API:", err);
  }

  return <GenericSectionPage title="University Update" jobs={jobs} />;
}
