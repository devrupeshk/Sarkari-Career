import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SearchDialog } from "@/components/SearchDialog";
import { CustomScrollbar } from "@/components/CustomScrollbar";
import { fetchSettings, fetchEducations, fetchDesignations } from "@/lib/api";
import { GlobalDataProvider } from "@/components/GlobalDataProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarkari Career Hub",
  description:
    "Fast updates on government jobs, results, admit cards, syllabus, and education news.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, educations, designations] = await Promise.all([
    fetchSettings().catch(() => ({
      siteName: "Sarkari Career Hub",
      siteDescription: "Your trusted source for government job notifications, admit cards, results, and more.",
      contactEmail: "admin@sarkaricareerhub.com",
      telegramLink: "",
      whatsappLink: "",
      seoTitle: "Sarkari Career Hub - Latest Government Jobs 2026",
      seoDescription: "Get latest updates on Sarkari Naukri, Government Jobs, Admit Cards, Results, and Answer Keys.",
      emailSubscriptionLink: ""
    })),
    fetchEducations().catch(() => []),
    fetchDesignations().catch(() => [])
  ]);

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <GlobalDataProvider
          settings={settings}
          educations={educations}
          designations={designations}
        >
          <Navigation />
          <SearchDialog />
          <CustomScrollbar />
          <main>{children}</main>
          <Footer />
        </GlobalDataProvider>
      </body>
    </html>
  );
}
