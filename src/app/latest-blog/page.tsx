import { fetchBlogs, fetchSettings } from "@/lib/api";
import { LatestBlogPage } from "@/views/LatestBlogPage";

export const revalidate = 3600;

export default async function Page() {
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
    const [blogsData, settingsData] = await Promise.all([
      fetchBlogs().catch(() => []),
      fetchSettings().catch(() => null)
    ]);
    if (Array.isArray(blogsData)) blogs = blogsData;
    if (settingsData) settings = settingsData;
  } catch (err) {
    console.error("[LatestBlogPage] Failed to fetch blogs or settings:", err);
  }

  return <LatestBlogPage initialBlogs={blogs} initialSettings={settings} />;
}
