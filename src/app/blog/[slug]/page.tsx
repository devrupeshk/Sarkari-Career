"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Bookmark,
  Share2,
  Printer,
  ChevronRight,
  FileText,
  Sparkles,
  Zap,
  Bell,
  Link2,
  Shield,
  HelpCircle,
  Clock,
} from "lucide-react";
import { fallbackBlogs, BlogItem } from "@/data/blogs";
import { FadeIn } from "@/components/FadeIn";
import { StatusBadge } from "@/components/StatusBadge";
import { cleanHtml } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

const cleanSocialLink = (customLink: string | null | undefined, fallbackLink: string) => {
  if (!customLink) return fallbackLink;
  const normalized = customLink.trim();
  if (
    normalized === "" ||
    normalized === "https://t.me/rupeshk" ||
    normalized === "https://chat.whatsapp.com/rupeshk" ||
    normalized === "https://chat.whatsapp.com/..." ||
    normalized === "https://t.me/..." ||
    normalized.endsWith("/...")
  ) {
    return fallbackLink;
  }
  return normalized;
};

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const settings = useSettings();
  const { slug } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const telegramLink = cleanSocialLink(blog?.telegramLink, settings.telegramLink);
  const whatsappLink = cleanSocialLink(blog?.whatsappLink, settings.whatsappLink);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        // Try fetching blog details dynamically from API
        const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";
        const response = await fetch(`${dashboardUrl}/api/blogs?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.id) {
            setBlog(data);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load blog from API, trying fallback static data:", err);
      }

      // Fallback to static mock blogs
      const staticBlog = fallbackBlogs.find((b) => b.slug === slug);
      if (staticBlog) {
        setBlog(staticBlog);
      }
      setIsLoading(false);
    }
    loadBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-off-white text-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent mb-4" />
        <p className="text-slate-500 text-sm font-semibold animate-pulse">Loading blog article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-off-white text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 mx-auto">
          <FileText className="w-10 h-10 text-brand" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Blog Post Not Found</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md leading-relaxed">
          The blog article you are trying to access does not exist or has been removed.
        </p>
        <Link
          href="/latest-blog"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand/20 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white overflow-hidden">

      {/* Hero Banner Section */}
      <section className="relative bg-navy pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-navy to-navy pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-brand/8 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Breadcrumb Row */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                <Link href="/" className="hover:text-white transition-colors duration-200 font-medium">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <Link href="/latest-blog" className="hover:text-white transition-colors duration-200 font-medium">
                  Latest Blog
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="text-white/70 font-medium truncate max-w-[160px] xs:max-w-[220px] sm:max-w-sm bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {blog.title}
                </span>
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <button title="Bookmark" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm">
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button title="Share" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button title="Print" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-sm" onClick={() => typeof window !== "undefined" && window.print()}>
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Title Area */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-4 lg:max-w-[75%]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] bg-brand/20 text-brand border border-brand/30 font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    {blog.category}
                  </span>
                  <StatusBadge status={blog.status as any} />
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-[30px] lg:leading-[37.5px] font-bold lg:tracking-[-0.75px] text-white">
                  {blog.title}
                </h1>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Column: Post Details */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Rich HTML Content Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 text-brand bg-brand/10 border-brand/20">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-brand inline-block" />
                    Article Information Guide
                  </h3>
                </div>

                <div className="p-5 sm:p-6 article-content">
                  {blog.description ? (
                    <div dangerouslySetInnerHTML={{ __html: cleanHtml(blog.description) }} />
                  ) : (
                    <p className="text-sm text-slate-400 italic">No description provided.</p>
                  )}
                </div>
              </div>

              {/* Alert Warning Box */}
              <FadeIn delay={0.2}>
                <div className="p-4.5 rounded-2xl bg-amber-500/5 border border-amber-500/25 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[12.5px] font-extrabold text-amber-800 uppercase tracking-wider">Note to Aspirants</h5>
                    <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                      Please check the eligibility rules, cut-off dates, and guidelines carefully from the official portals before submitting any forms. Details presented above are for guidance purposes.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Sticky Sidebar Widgets */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="lg:sticky lg:top-24 space-y-5">

                {/* Stats Widget */}
                <FadeIn direction="left" delay={0.15}>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-slate-400">Total Views</p>
                        <p className="text-[13.5px] font-bold text-slate-800">{blog.views.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                      Live Stats
                    </span>
                  </div>
                </FadeIn>

                {/* Social Groups Channels Widget */}
                <FadeIn direction="left" delay={0.2}>
                  <div className="relative bg-gradient-to-br from-navy to-[#0F203A] border border-white/10 rounded-2xl p-5 overflow-hidden group shadow-lg">
                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="relative w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3">
                        <Bell className="w-4 h-4 text-brand" />
                      </div>
                      <h4 className="text-[14px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                        Get Instant Alerts
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
                      </h4>
                      <p className="text-[11.5px] text-slate-400 mb-4 leading-relaxed font-semibold">
                        Never miss any government notifications or updates. Join our social media channels now.
                      </p>

                      <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#0088CC] hover:bg-[#0077B3] text-white text-[12.5px] font-bold rounded-full py-2.5 mb-2 transition-all shadow-md hover:-translate-y-0.5"
                      >
                        Join Telegram Now
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-[12.5px] font-bold rounded-full py-2.5 transition-all shadow-md hover:-translate-y-0.5"
                      >
                        Join WhatsApp Group
                      </a>
                    </div>
                  </div>
                </FadeIn>

                {/* Similar Updates Widget */}
                <FadeIn direction="left" delay={0.25}>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider">Other Yojana & Updates</h4>
                    </div>
                    <ul className="p-3 space-y-2">
                      {fallbackBlogs
                        .filter((b) => b.slug !== blog.slug)
                        .slice(0, 3)
                        .map((b) => (
                          <li key={b.id}>
                            <Link
                              href={`/blog/${b.slug}`}
                              className="flex items-start gap-2.5 p-2 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-300"
                            >
                              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-400">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[11.5px] font-medium text-slate-600 hover:text-brand line-clamp-2 leading-snug">
                                {b.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </FadeIn>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
