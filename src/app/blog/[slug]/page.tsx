import { fetchBlogBySlug, fetchBlogs, fetchSettings } from "@/lib/api";
import { BlogDetailPage } from "@/views/BlogDetailPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const blog = await fetchBlogBySlug(slug);

    if (!blog) {
      return { title: "404 – Page Not Found" };
    }

    const title = blog.title;
    const description =
      blog.description
        .replace(/<[^>]*>/g, "")
        .substring(0, 160) ||
      `Get full details about ${blog.title}.`;

    return {
      title: `${title} : Yojana Updates & Guidelines`,
      description,
    };
  } catch {
    return { title: "404 – Page Not Found" };
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let blog = null;
  let blogs: any[] = [];
  let settings: any = {
    siteName: "Sarkari Career Hub",
    siteDescription: "Your trusted source for government job notifications, admit cards, results, and more.",
    contactEmail: "admin@sarkaricareerhub.com",
    telegramLink: "",
    whatsappLink: "",
    seoTitle: "Sarkari Career Hub - Latest Government Jobs 2026",
    seoDescription: "Get latest updates on Sarkari Naukri, Government Jobs, Admit Cards, Results, and Answer Keys.",
    emailSubscriptionLink: ""
  };

  try {
    const [blogData, blogsData, settingsData] = await Promise.all([
      fetchBlogBySlug(slug).catch(() => null),
      fetchBlogs().catch(() => []),
      fetchSettings().catch(() => null)
    ]);
    blog = blogData;
    if (Array.isArray(blogsData)) blogs = blogsData;
    if (settingsData) settings = settingsData;
  } catch (err) {
    console.error(`[blog/[slug]] Failed to fetch blog post ${slug}:`, err);
  }

  if (!blog) {
    notFound();
  }

  return (
    <BlogDetailPage
      initialBlog={blog}
      initialBlogs={blogs}
      initialSettings={settings}
      slug={slug}
    />
  );
}
