"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  Calendar,
  Eye,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  AlertCircle,
  Building2,
  Landmark,
  Train,
  Shield,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Globe,
  Zap,
  Bell,
  ArrowRight,
  Frown,
} from "lucide-react";
import { fallbackBlogs, BlogItem } from "@/data/blogs";
import { FadeIn } from "@/components/FadeIn";
import { StatusBadge } from "@/components/StatusBadge";
import { SectionHeader } from "@/components/SectionHeader";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useSettings } from "@/hooks/useSettings";

const sidebarCategories = [
  { icon: Building2, label: "All India Govt Jobs", slug: "current-job" },
  { icon: Landmark, label: "Bank Jobs", slug: "bank" },
  { icon: BookOpen, label: "Teaching Jobs", slug: "teaching" },
  { icon: Train, label: "Railway Jobs", slug: "railway" },
  { icon: Shield, label: "Police/Defence Jobs", slug: "police-defence" },
  { icon: Briefcase, label: "Engineering Jobs", slug: "engineering" },
  { icon: Stethoscope, label: "Medical Jobs", slug: "medical" },
  { icon: FileText, label: "SSC Jobs", slug: "ssc" },
  { icon: Globe, label: "UPSC Jobs", slug: "upsc" },
  { icon: GraduationCap, label: "Education", slug: "education" },
];

export default function LatestBlogPage() {
  const router = useRouter();
  const settings = useSettings();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";
        const response = await fetch(`${dashboardUrl}/api/blogs`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setBlogs(data);
          }
        }
      } catch (error) {
        console.warn("Could not fetch blogs from API, falling back to static data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Keydown event listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen pt-14 bg-off-white overflow-hidden relative">
      {/* Page Background Mesh */}
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3" />

      {/* Hero Section */}
      <section className="relative bg-navy pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden">
        {/* Dynamic backdrop glows matching violet/indigo theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-navy to-navy" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-slate-custom mb-5">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">Blogs</span>
            </nav>
          </FadeIn>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <FadeIn className="shrink-0" delay={0.1}>
              <div className="w-16 h-16 rounded-2xl border border-violet-500/20 bg-violet-500/10 flex items-center justify-center relative group transition-all duration-300 hover:rotate-6 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <BookOpen className="w-8 h-8 relative z-10 text-violet-400" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2.5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                    Latest Blog & Yojana Guides
                  </span>
                </h1>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <p className="text-[13.5px] md:text-[15px] text-slate-custom max-w-2xl leading-relaxed font-medium mb-6">
              Stay updated with latest Central & State Government yojanas, scholarship guides, exam preparation tips, and important citizen portals.
            </p>
          </FadeIn>

          {/* Premium In-Hero Glassmorphic Search Bar */}
          <FadeIn delay={0.3}>
            <div className="max-w-lg">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl h-12 px-1 sm:px-1.5 group hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white/60 ml-3.5 shrink-0 transition-colors group-hover:text-brand" />
                <input
                  type="text"
                  placeholder="Search in Latest Blogs..."
                  readOnly
                  className="flex-1 min-w-0 px-2.5 sm:px-3 text-[13px] text-white placeholder:text-white/40 outline-none bg-transparent cursor-pointer"
                />
                <div className="hidden sm:flex items-center gap-1 mr-3 pointer-events-none select-none">
                  <kbd className="h-5.5 inline-flex items-center rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[9px] font-black text-white/60 uppercase">
                    Ctrl K
                  </kbd>
                </div>
                <button className="bg-brand hover:bg-brand-hover text-white font-extrabold text-[11px] px-5 py-2 rounded-full shadow-lg transition-all duration-300 shrink-0 hover:scale-103 uppercase tracking-wider">
                  Search
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader label="📰 ARTICLES" heading="Latest Publications" />

          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Main Column */}
            <div className="flex-1 lg:w-[70%]">
              {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((blog, index) => (
                    <FadeIn key={blog.id} delay={0.05 * index} className="h-full">
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group relative">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-brand/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-105 pointer-events-none group-hover:bg-brand/10 z-0" />

                        <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                          <div>
                            {/* Meta Row */}
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  {blog.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <StatusBadge status={blog.status as any} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-brand transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                              <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                            </h3>

                            {/* Snippet */}
                            <div
                              className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-6 font-medium"
                              dangerouslySetInnerHTML={{
                                __html: blog.description
                                  .replace(/<[^>]*>/g, "") // Strip HTML tags for snippet
                                  .substring(0, 180) + "..."
                              }}
                            />
                          </div>

                          {/* Actions Row */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                              <Eye className="w-4 h-4" />
                              <span>{blog.views.toLocaleString()} views</span>
                            </div>

                            <Link
                              href={`/blog/${blog.slug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand uppercase tracking-wider group/link"
                            >
                              Read Article{" "}
                              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                /* Premium Illustrated Empty State Glass Card */
                <FadeIn>
                  <div className="py-16 px-4 text-center bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl">
                    <div className="w-14 h-14 bg-slate-100/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200/40 shadow-inner">
                      <Frown className="w-7 h-7 text-slate-400" />
                    </div>
                    <h3 className="text-[14px] font-bold text-slate-800 mb-1">
                      No Articles Available
                    </h3>
                    <p className="text-[11.5px] text-slate-500 max-w-xs mx-auto mb-4 leading-relaxed font-medium">
                      There are currently no active blog articles available. Please check back later for updates.
                    </p>
                  </div>
                </FadeIn>
              )}

              {/* Pagination */}
              {blogs.length >= 20 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1.5 text-sm text-slate-custom border border-border-custom rounded-full cursor-not-allowed"
                    disabled
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors duration-200 ${page === 1
                        ? "bg-brand text-white"
                        : "border border-border-custom text-dark-text hover:border-brand hover:text-brand"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-1.5 text-sm text-brand border border-brand rounded-full hover:bg-brand-light transition-colors duration-200">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <FadeIn
              direction="left"
              delay={0.2}
              className="lg:w-[30%] shrink-0"
            >
              <div className="lg:sticky lg:top-20 space-y-4">
                {/* Job Categories Sidebar Nav */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4.5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h4 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <GraduationCap className="w-4 h-4 text-brand" />
                      Job Categories
                    </h4>
                    <Link
                      href="/categories"
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-brand hover:bg-brand-hover px-3 py-1.5 rounded-full shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
                    >
                      View All
                    </Link>
                  </div>

                  <ul className="space-y-1.5 relative z-10">
                    {sidebarCategories.map((cat) => {
                      return (
                        <li key={cat.slug}>
                          <Link
                            href={`/${cat.slug}`}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold transition-all duration-300 border bg-white/50 border-slate-100/60 text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-800 hover:shadow-sm"
                          >
                            <div className="flex items-center gap-2.5">
                              <cat.icon className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                              <span>{cat.label}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4.5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                  <h4 className="text-[13px] font-bold text-slate-800 mb-3 flex items-center gap-1.5 relative z-10 uppercase tracking-wide">
                    <Zap className="w-3.5 h-3.5 text-brand" /> Quick Links
                  </h4>
                  <ul className="space-y-0.5 relative z-10">
                    {[
                      { label: "Latest Jobs", href: "/current-job" },
                      { label: "Admit Card", href: "/admit-card" },
                      { label: "Results", href: "/results" },
                      { label: "Syllabus", href: "/syllabus" },
                      { label: "Answer Key", href: "/answer-key" },
                      { label: "Sarkari Result", href: "/" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/10 group/link transition-all duration-200"
                        >
                          <span className="text-[12px] font-medium text-slate-600 group-hover/link:text-brand transition-colors duration-200">
                            {link.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-brand group-hover/link:translate-x-1 transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription Card */}
                <div className="bg-gradient-to-br from-navy to-[#0F203A] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/5 rounded-2xl p-5 relative overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand/15 rounded-full blur-2xl group-hover:bg-brand/25 transition-all duration-500 pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="relative w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3.5 shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/20">
                      <div className="absolute inset-0 rounded-xl bg-brand/20 animate-ping opacity-40 pointer-events-none" />
                      <Bell className="w-5 h-5 text-brand transition-all duration-300 group-hover:rotate-12" />
                    </div>

                    <h4 className="text-[15px] font-bold text-white mb-1.5 tracking-wide flex items-center gap-1.5">
                      Get Instant Job Alerts
                      <span className="inline-flex w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    </h4>

                    <p className="text-[11.5px] font-medium text-slate-400 mb-4 leading-relaxed">
                      Subscribe to receive verified exam announcements, admit cards, and result updates directly on your phone.
                    </p>

                    <a
                      href={settings.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#0088CC] hover:bg-[#0077B3] text-white text-[13px] font-bold rounded-full py-2.5 mb-2 transition-all duration-300 hover:-translate-y-px shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25"
                    >
                      Join Telegram Now
                    </a>

                    <a
                      href={settings.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-[13px] font-bold rounded-full py-2.5 transition-all duration-300 hover:-translate-y-px shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
                    >
                      Join WhatsApp Group
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Local Command Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search in Latest Blogs..." />
        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Latest Blog Posts">
            {blogs.map((item) => (
              <CommandItem
                key={item.slug}
                onSelect={() => {
                  setIsSearchOpen(false);
                  router.push(`/blog/${item.slug}`);
                }}
                className="cursor-pointer"
              >
                <BookOpen className="mr-2.5 h-4 w-4 text-violet-500 shrink-0" />
                <span className="truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
