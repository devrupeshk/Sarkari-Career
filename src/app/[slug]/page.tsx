import { notFound } from "next/navigation";
import { StatePage } from "@/views/StatePage";
import { EducationLevelPage } from "@/views/EducationLevelPage";
import { DesignationPage } from "@/views/DesignationPage";
import { CategoryPage } from "@/views/CategoryPage";
import { educationLevels } from "@/data/education";
import { states } from "@/data/states";
import { categoryMeta } from "@/data/jobs";
import { designations } from "@/data/designations";
import { Metadata } from "next";
import { fetchListings, fetchEducations, fetchDesignations } from "@/lib/api";

export const revalidate = 3600;

function getStateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export async function generateStaticParams() {
  const eduParams = educationLevels.map(({ slug }) => ({ slug }));
  const stateParams = states.map((state) => ({
    slug: getStateSlug(state.name),
  }));
  const categoryParams = Object.keys(categoryMeta).map((slug) => ({ slug }));
  
  let desgParams: { slug: string }[] = [];
  try {
    const apiDesgs = await fetchDesignations();
    desgParams = apiDesgs.map((d) => ({
      slug: d.slug.endsWith("-jobs") ? d.slug : `${d.slug}-jobs`,
    }));
  } catch (err) {
    console.error("Failed to fetch designations for generateStaticParams:", err);
  }
  
  return [...eduParams, ...stateParams, ...categoryParams, ...desgParams];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const isEducationLevel = educationLevels.some(
    (edu) => edu.slug === params.slug,
  );
  const isState = states.some((s) => getStateSlug(s.name) === params.slug);
  const isCategory = params.slug in categoryMeta;
  const isDesignation = params.slug.endsWith("-jobs") && params.slug !== "current-job";

  if (!isEducationLevel && !isState && !isCategory && !isDesignation) {
    return { title: "404 – Page Not Found" };
  }

  if (isCategory) {
    const meta = categoryMeta[params.slug];
    return {
      title: `${meta.title} : Latest Government Jobs & Notifications`,
      description: meta.description,
    };
  }

  if (isEducationLevel) {
    const edu = educationLevels.find((e) => e.slug === params.slug);
    return {
      title: `${edu?.label} Jobs : Latest Government Jobs, Vacancies`,
      description:
        edu?.description || `Latest government jobs for ${edu?.label}.`,
    };
  }

  if (isDesignation) {
    const staticInfo = designations.find((d) => d.slug === params.slug);
    const label = staticInfo?.label || params.slug
      .replace(/-jobs$/, "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    return {
      title: `${label} Jobs : Latest Govt Jobs for ${label}`,
      description:
        staticInfo?.description || `Latest government jobs for ${label}.`,
    };
  }

  const formattedStateName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedStateName} : Latest Job, Admit Card, Result, Syllabus`,
    description: `Latest government jobs, admit cards, results, syllabus and updates for ${formattedStateName}.`,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const isEducationLevel = educationLevels.some(
    (edu) => edu.slug === params.slug,
  );
  const isState = states.some((s) => getStateSlug(s.name) === params.slug);
  const isCategory = params.slug in categoryMeta;
  const isDesignation = params.slug.endsWith("-jobs") && params.slug !== "current-job";

  if (!isEducationLevel && !isState && !isCategory && !isDesignation) {
    notFound();
  }

  if (isCategory) {
    // "current-job" is the catch-all page — fetch ALL jobs (no category filter).
    // Every other category slug filters by that specific category value.
    const categoryFilter = params.slug === "current-job" ? undefined : params.slug;

    let jobs: any[] = [];
    let total = 0;
    try {
      const data = await fetchListings({ category: categoryFilter, limit: 100 });
      jobs = data.jobs;
      total = data.total;
    } catch (err) {
      console.error("[CategoryPage] Failed to fetch from dashboard API:", err);
    }
    return <CategoryPage slug={params.slug} jobs={jobs} total={total} />;
  }

  if (isEducationLevel) {
    // Fetch jobs and education levels from the dashboard public API filtered by education level
    let jobs: any[] = [];
    let total = 0;
    let educations: any[] = [];
    try {
      const [listingsData, educationsData] = await Promise.all([
        fetchListings({ education: params.slug, limit: 100 }),
        fetchEducations()
      ]);
      jobs = listingsData.jobs;
      total = listingsData.total;
      educations = educationsData;
    } catch (err) {
      console.error("[EducationLevelPage] Failed to fetch from dashboard API:", err);
    }
    return <EducationLevelPage slug={params.slug} jobs={jobs} total={total} initialEducations={educations} />;
  }

  if (isDesignation) {
    const dbSlug = params.slug.replace(/-jobs$/, "");
    let jobs: any[] = [];
    let total = 0;
    let activeDesignations: any[] = [];
    try {
      const [listingsData, designationsData] = await Promise.all([
        fetchListings({ designation: dbSlug, limit: 100 }),
        fetchDesignations().catch(() => [])
      ]);
      jobs = listingsData.jobs;
      total = listingsData.total;
      activeDesignations = designationsData;
    } catch (err) {
      console.error("[DesignationPage] Failed to fetch from dashboard API:", err);
    }
    return <DesignationPage slug={params.slug} jobs={jobs} total={total} initialDesignations={activeDesignations} />;
  }

  let jobs: any[] = [];
  let admitCards: any[] = [];
  let results: any[] = [];
  let answerKeys: any[] = [];
  let syllabus: any[] = [];
  let admissions: any[] = [];
  let universityUpdates: any[] = [];
  let scholarships: any[] = [];
  let yojanas: any[] = [];

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
    ] = await Promise.all([
      fetchListings({ state: params.slug, limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "admit-card", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "result", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "answer-key", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "syllabus", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "admission", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "university-update", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "scholarship", limit: 8 }).catch(() => null),
      fetchListings({ state: params.slug, category: "yojana", limit: 8 }).catch(() => null),
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
  } catch (err) {
    console.error("[StatePage] Error fetching listings for state:", params.slug, err);
  }

  return (
    <StatePage
      stateName={params.slug}
      initialJobs={jobs}
      initialAdmitCards={admitCards}
      initialResults={results}
      initialAnswerKeys={answerKeys}
      initialSyllabus={syllabus}
      initialAdmissions={admissions}
      initialUniversityUpdates={universityUpdates}
      initialScholarships={scholarships}
      initialYojanas={yojanas}
    />
  );
}
