import { PostDetailPage } from "@/views/PostDetailPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchJobBySlug } from "@/lib/api";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const job = await fetchJobBySlug(slug);

    if (!job) {
      return { title: "404 – Post Not Found" };
    }

    const title = job.metaTitle || job.title;
    const description =
      job.metaDescription ||
      `Get full details about ${job.title}. Apply online, download notification, check eligibility, salary and important dates.`;

    return {
      title: `${title} : Full Details, Notification, Apply Online`,
      description,
    };
  } catch {
    return { title: "404 – Post Not Found" };
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let job = null;
  try {
    job = await fetchJobBySlug(slug);
  } catch (err) {
    console.error("[post/[slug]] Failed to fetch job from dashboard API:", err);
  }

  if (!job) {
    notFound();
  }

  return <PostDetailPage slug={slug} job={job} />;
}
