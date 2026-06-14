import { fetchListings, fetchBlogs } from "@/lib/api";
import { HomePage } from "@/views/HomePage";

export const revalidate = 3600;

export default async function Page() {
  let jobs: any[] = [];
  let admitCards: any[] = [];
  let results: any[] = [];
  let answerKeys: any[] = [];
  let syllabus: any[] = [];
  let admissions: any[] = [];
  let universityUpdates: any[] = [];
  let scholarships: any[] = [];
  let yojanas: any[] = [];
  let blogs: any[] = [];

  try {
    const [
      jobsRes,
      admitCardsRes,
      resultsRes,
      answerKeysRes,
      syllabusRes,
      admissionsRes,
      universityUpdatesRes,
      scholarshipsRes,
      yojanasRes,
      blogsRes,
    ] = await Promise.all([
      fetchListings({ limit: 11 }).catch(() => null),
      fetchListings({ category: "admit-card", limit: 11 }).catch(() => null),
      fetchListings({ category: "result", limit: 10 }).catch(() => null),
      fetchListings({ category: "answer-key", limit: 10 }).catch(() => null),
      fetchListings({ category: "syllabus", limit: 10 }).catch(() => null),
      fetchListings({ category: "admission", limit: 10 }).catch(() => null),
      fetchListings({ category: "university-update", limit: 10 }).catch(() => null),
      fetchListings({ category: "scholarship", limit: 10 }).catch(() => null),
      fetchListings({ category: "yojana", limit: 10 }).catch(() => null),
      fetchBlogs().catch(() => null),
    ]);

    if (jobsRes?.jobs) jobs = jobsRes.jobs;
    if (admitCardsRes?.jobs) admitCards = admitCardsRes.jobs;
    if (resultsRes?.jobs) results = resultsRes.jobs;
    if (answerKeysRes?.jobs) answerKeys = answerKeysRes.jobs;
    if (syllabusRes?.jobs) syllabus = syllabusRes.jobs;
    if (admissionsRes?.jobs) admissions = admissionsRes.jobs;
    if (universityUpdatesRes?.jobs) universityUpdates = universityUpdatesRes.jobs;
    if (scholarshipsRes?.jobs) scholarships = scholarshipsRes.jobs;
    if (yojanasRes?.jobs) yojanas = yojanasRes.jobs;
    if (Array.isArray(blogsRes)) blogs = blogsRes;
  } catch (err) {
    console.error("[HomePage] Error fetching initial listings:", err);
  }

  return (
    <HomePage
      initialJobs={jobs}
      initialAdmitCards={admitCards}
      initialResults={results}
      initialAnswerKeys={answerKeys}
      initialSyllabus={syllabus}
      initialAdmissions={admissions}
      initialUniversityUpdates={universityUpdates}
      initialScholarships={scholarships}
      initialYojanas={yojanas}
      initialBlogs={blogs}
    />
  );
}
