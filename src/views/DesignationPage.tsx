"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchDesignations, type ApiDesignationItem } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Bell, Briefcase, ChevronRight, Frown, Search, Zap } from "lucide-react";
import { designations } from "@/data/designations";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusBadge } from "@/components/StatusBadge";
import type { ApiJobItem } from "@/lib/api";
import { useSettings } from "@/hooks/useSettings";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface DesignationPageProps {
  slug: string;
  /** Pre-fetched jobs from the dashboard API (passed by the server page component) */
  jobs: ApiJobItem[];
  total?: number;
  initialDesignations?: ApiDesignationItem[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-brand/10 text-brand px-0.5 rounded font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// Highly tailored premium styling variables matching individual designation themes
const pageThemes: Record<
  string,
  {
    color: string;
    glowBg: string;
    radialGlow: string;
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeActiveBg: string;
    activeSidebarBg: string;
    rowHoverBorder: string;
    statusDot: string;
    arrowColor: string;
    heroTextGradient: string;
  }
> = {
  "clerk-jobs": {
    color: "text-sky-800",
    glowBg: "from-sky-500/20 via-navy to-navy",
    radialGlow: "bg-sky-500/10",
    iconBg: "bg-sky-500/10 border-sky-500/20 shadow-[0_0_30px_rgba(14,165,233,0.15)]",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.1)]",
    badgeActiveBg: "bg-sky-50 text-sky-600",
    activeSidebarBg: "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/20 scale-[1.02] border-transparent",
    rowHoverBorder: "hover:border-l-sky-500",
    statusDot: "bg-sky-500 shadow-sm shadow-sky-500/50",
    arrowColor: "text-sky-500",
    heroTextGradient: "from-sky-400 to-indigo-300",
  },
  "officer-jobs": {
    color: "text-indigo-800",
    glowBg: "from-indigo-500/20 via-navy to-navy",
    radialGlow: "bg-indigo-500/10",
    iconBg: "bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    iconColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]",
    badgeActiveBg: "bg-indigo-50 text-indigo-600",
    activeSidebarBg: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.02] border-transparent",
    rowHoverBorder: "hover:border-l-indigo-500",
    statusDot: "bg-indigo-500 shadow-sm shadow-indigo-500/50",
    arrowColor: "text-indigo-500",
    heroTextGradient: "from-indigo-400 to-purple-300",
  },
  "teacher-jobs": {
    color: "text-emerald-800",
    glowBg: "from-emerald-500/20 via-navy to-navy",
    radialGlow: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    badgeActiveBg: "bg-emerald-50 text-emerald-600",
    activeSidebarBg: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-[1.02] border-transparent",
    rowHoverBorder: "hover:border-l-emerald-500",
    statusDot: "bg-emerald-500 shadow-sm shadow-emerald-500/50",
    arrowColor: "text-emerald-500",
    heroTextGradient: "from-emerald-400 to-teal-300",
  },
  "nurse-jobs": {
    color: "text-pink-800",
    glowBg: "from-pink-500/20 via-navy to-navy",
    radialGlow: "bg-pink-500/10",
    iconBg: "bg-pink-500/10 border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    iconColor: "text-pink-400",
    badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]",
    badgeActiveBg: "bg-pink-50 text-pink-600",
    activeSidebarBg: "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/20 scale-[1.02] border-transparent",
    rowHoverBorder: "hover:border-l-pink-500",
    statusDot: "bg-pink-500 shadow-sm shadow-pink-500/50",
    arrowColor: "text-pink-500",
    heroTextGradient: "from-pink-400 to-rose-300",
  },
  "it-engineer-jobs": {
    color: "text-violet-800",
    glowBg: "from-violet-500/20 via-navy to-navy",
    radialGlow: "bg-violet-500/10",
    iconBg: "bg-violet-500/10 border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    iconColor: "text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]",
    badgeActiveBg: "bg-violet-50 text-violet-600",
    activeSidebarBg: "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 scale-[1.02] border-transparent",
    rowHoverBorder: "hover:border-l-violet-500",
    statusDot: "bg-violet-500 shadow-sm shadow-violet-500/50",
    arrowColor: "text-violet-500",
    heroTextGradient: "from-violet-400 to-fuchsia-300",
  }
};

export function DesignationPage({ slug, jobs, total, initialDesignations = [] }: DesignationPageProps) {
  const router = useRouter();
  const settings = useSettings();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchQuery = "";
  const [apiDesignations, setApiDesignations] = useState<ApiDesignationItem[]>(initialDesignations);

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

  useEffect(() => {
    if (initialDesignations && initialDesignations.length > 0) {
      return;
    }
    const getDesignations = async () => {
      try {
        const data = await fetchDesignations();
        setApiDesignations(data);
      } catch (err) {
        console.error("Failed to fetch designations for sidebar:", err);
      }
    };
    getDesignations();
  }, [initialDesignations]);

  const desgInfo = useMemo(() => {
    // Check if the current page slug matches any designation returned from API
    const apiDesg = apiDesignations.find((d) => {
      const urlSlug = d.slug.endsWith("-jobs") ? d.slug : `${d.slug}-jobs`;
      return urlSlug === slug;
    });

    if (apiDesg) {
      const staticInfo = designations.find((d) => d.slug === slug);
      return {
        slug: slug,
        dbSlug: apiDesg.slug,
        label: apiDesg.name,
        count: String(apiDesg.jobCount),
        description: staticInfo?.description || `Latest verified government jobs, vacancies, and recruitments for ${apiDesg.name}.`
      };
    }

    // Fallback to static meta
    return designations.find((d) => d.slug === slug);
  }, [apiDesignations, slug]);

  const filteredJobs = jobs;

  if (!desgInfo) {
    return (
      <div className="min-h-screen pt-20 bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark-text mb-4">
            Designation Not Found
          </h1>
          <p className="text-slate-custom mb-6 font-medium">
            The designation you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-px"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Active theme mapping with bulletproof fallback to clerk-jobs styles
  const theme = pageThemes[slug] || pageThemes["clerk-jobs"];

  return (
    <div className="min-h-screen pt-14 bg-off-white overflow-hidden relative">
      {/* Page Background Mesh Glows */}
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3" />

      {/* Hero Banner with Custom Theme Integration */}
      <section className="relative bg-navy pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden">
        {/* Dynamic backdrop glows reflecting the active qualification */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme.glowBg}`} />
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.radialGlow} rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3`} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-slate-custom mb-5">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{desgInfo.label} Jobs</span>
            </nav>
          </FadeIn>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            {/* dynamic interactive graduation cap container */}
            <FadeIn className="shrink-0" delay={0.1}>
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center relative group transition-all duration-300 hover:rotate-6 ${theme.iconBg}`}>
                <Briefcase className={`w-8 h-8 relative z-10 ${theme.iconColor}`} />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2.5">
                  {desgInfo.label}{" "}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.heroTextGradient}`}>
                    Government Jobs
                  </span>
                </h1>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <p className="text-[13.5px] md:text-[15px] text-slate-custom max-w-2xl leading-relaxed font-medium mb-6">
              {desgInfo.description}
            </p>
          </FadeIn>

          {/* Premium In-Hero Glassmorphic Search Bar */}
          <FadeIn delay={0.3}>
            <div className="max-w-lg">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl h-12 px-1.5 group hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white/60 ml-3.5 shrink-0 transition-colors group-hover:text-brand" />
                <input
                  type="text"
                  placeholder={`Search in ${desgInfo.label} jobs...`}
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

      {/* Main Content & Sidebar */}
      <section className="py-10 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader label="📋 LISTINGS" heading={`${desgInfo.label} Jobs`} />

          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Main Listing Column */}
            <div className="flex-1 lg:w-[70%]">
              <FadeIn>
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl overflow-hidden relative z-20">
                  {/* Table Header */}
                  <div className="bg-slate-50/50 backdrop-blur-md px-5 py-3 hidden md:grid md:grid-cols-[3.2fr_1.3fr_1.1fr_0.8fr] gap-4 border-b border-slate-100 items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Job Title
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      State
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Last Date
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                      Status
                    </span>
                  </div>

                  {/* Rows */}
                  {filteredJobs.length > 0 ? (
                    <StaggerContainer staggerDelay={0.03}>
                      {filteredJobs.map((job, i) => {
                        const isNew =
                          job.status === "NEW" ||
                          job.status === "STARTED" ||
                          job.status === "ONLINE" ||
                          job.status === "APPLY NOW";
                        const isOut = job.status === "OUT" || job.status === "ALERT";
                        const isSoon = job.status === "SOON" || job.status === "EXTEND";

                        const borderHoverColor = isNew
                          ? "hover:border-l-emerald-500"
                          : isOut
                            ? "hover:border-l-rose-500"
                            : isSoon
                              ? "hover:border-l-blue-500"
                              : "hover:border-l-brand";

                        return (
                          <StaggerItem key={i}>
                            {/* Desktop Row with dynamic hover effects */}
                            <Link
                              href={`/post/${(job as ApiJobItem).slug || generateSlug(job.title)}`}
                              className={`hidden md:grid md:grid-cols-[3.2fr_1.3fr_1.1fr_0.8fr] gap-4 px-5 py-3 border-b border-slate-100/60 border-l-4 border-l-transparent ${borderHoverColor} hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 items-center group relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/2 to-brand/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                              <div className="flex items-center gap-2.5 relative z-10 truncate">
                                {/* Dynamic state indicator dot */}
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-200 ${isNew
                                    ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                                    : isOut
                                      ? "bg-rose-500 shadow-sm shadow-rose-500/50"
                                      : isSoon
                                        ? "bg-blue-500 shadow-sm shadow-blue-500/50"
                                        : "bg-brand shadow-sm shadow-brand/50"
                                    }`}
                                />
                                <span className="text-[12px] font-medium text-slate-700 group-hover:text-brand transition-all duration-300 truncate flex items-center gap-1">
                                  <HighlightMatch text={job.title} query={searchQuery} />
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 ${theme.arrowColor} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0`}
                                  />
                                </span>
                              </div>

                              <span className="text-[11px] font-medium text-slate-500 truncate relative z-10">
                                {job.state ? (
                                  <HighlightMatch text={job.state} query={searchQuery} />
                                ) : (
                                  "Various"
                                )}
                              </span>

                              <span className="text-[11px] font-bold text-slate-600 font-mono relative z-10">
                                {job.lastDate || "Update"}
                              </span>

                              <div className="flex justify-center relative z-10">
                                <StatusBadge status={job.status || "NEW"} />
                              </div>
                            </Link>

                            {/* Mobile Card */}
                            <div className="md:hidden px-4 py-3.5 border-b border-slate-100/60 hover:bg-white transition-all duration-300 group">
                              <Link href={`/post/${(job as ApiJobItem).slug || generateSlug(job.title)}`} className="block">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${isNew
                                          ? "bg-emerald-500 shadow-sm"
                                          : isOut
                                            ? "bg-rose-500 shadow-sm"
                                            : isSoon
                                              ? "bg-blue-500 shadow-sm"
                                              : "bg-brand shadow-sm"
                                          }`}
                                      />
                                      <span className="text-[12px] font-semibold text-slate-700 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                                        <HighlightMatch text={job.title} query={searchQuery} />
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1.5 pl-3.5">
                                      <span className="text-[10.5px] font-medium text-slate-500">
                                        {job.state ? (
                                          <HighlightMatch text={job.state} query={searchQuery} />
                                        ) : (
                                          "Various"
                                        )}
                                      </span>
                                      <span className="text-[10.5px] font-bold text-slate-600 font-mono">
                                        {job.lastDate || "Update"}
                                      </span>
                                    </div>
                                  </div>
                                  <StatusBadge status={job.status || "NEW"} />
                                </div>
                              </Link>
                            </div>
                          </StaggerItem>
                        );
                      })}
                    </StaggerContainer>
                  ) : (
                    /* Premium Illustrated Empty State Glass Card */
                    <div className="py-16 px-4 text-center animate-fadeIn">
                      <div className="w-14 h-14 bg-slate-100/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200/40 shadow-inner">
                        <Frown className="w-7 h-7 text-slate-400" />
                      </div>
                      <h3 className="text-[14px] font-bold text-slate-800 mb-1">
                        No Jobs Available
                      </h3>
                      <p className="text-[11.5px] text-slate-500 max-w-xs mx-auto mb-4 leading-relaxed font-medium">
                        There are currently no active job vacancies for the {desgInfo.label} designation. Please check back later for updates.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Sidebar Columns */}
            <FadeIn direction="left" delay={0.2} className="lg:w-[30%] shrink-0">
              <div className="lg:sticky lg:top-20 space-y-4">
                {/* Active Theme Highlight Sidebar Nav */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4.5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h4 className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                      <Briefcase className="w-4 h-4 text-brand" /> Job Designations
                    </h4>
                    <Link
                      href="/designations"
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-brand hover:bg-brand-hover px-3 py-1.5 rounded-full shadow-md transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
                    >
                      View All
                    </Link>
                  </div>

                  <ul className="space-y-1.5 relative z-10">
                    {apiDesignations.map((desg) => {
                      const urlSlug = desg.slug.endsWith("-jobs") ? desg.slug : `${desg.slug}-jobs`;
                      const isActive = slug === urlSlug;
                      const desgTheme = pageThemes[urlSlug] || pageThemes["clerk-jobs"];
                      return (
                        <li key={desg.id}>
                          <Link
                            href={`/${urlSlug}`}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold transition-all duration-300 border ${isActive
                              ? `${desgTheme.activeSidebarBg} text-white`
                              : "bg-white/50 border-slate-100/60 text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-800 hover:shadow-sm"
                              }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Briefcase
                                className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-brand"
                                  }`}
                              />
                              <span>{desg.name} Jobs</span>
                            </div>


                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quick Links Card */}
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

                {/* Glassmorphic Subscribe Alert Box */}
                <div className="bg-gradient-to-br from-navy to-[#0F203A] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/5 rounded-2xl p-5 relative overflow-hidden group">
                  {/* Visual Mesh Glows */}
                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand/15 rounded-full blur-2xl group-hover:bg-brand/25 transition-all duration-500 pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Animated Pulsing Notification Bell Wrapper */}
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
                      <svg className="w-3.5 h-3.5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.82-.76 4.38-1.07 6.07-.13.71-.39.95-.64.97-.56.05-1-.38-1.55-.74-.85-.56-1.33-.9-2.16-1.45-.96-.64-.34-.99.21-1.56.14-.15 2.65-2.43 2.7-2.65.01-.03.01-.13-.05-.18-.06-.05-.14-.03-.21-.02-.09.02-1.58 1-4.47 2.96-.42.29-.8.43-1.15.42-.38-.01-1.11-.21-1.66-.39-.67-.22-1.2-.33-1.15-.7.03-.2.3-.4.81-.61 3.16-1.38 5.27-2.29 6.33-2.73 3.01-1.26 3.63-1.48 4.04-1.48.09 0 .29.02.42.13.11.09.14.21.16.3.02.09.02.26 0 .42z" />
                      </svg>
                      Join Telegram Now
                    </a>

                    <a
                      href={settings.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-[13px] font-bold rounded-full py-2.5 transition-all duration-300 hover:-translate-y-px shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25"
                    >
                      <svg className="w-3.5 h-3.5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 4.999L2 22l5.135-1.348a9.97 9.97 0 004.877 1.28h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0012.012 2zm5.795 14.13c-.253.71-1.47 1.39-2.022 1.48-.49.08-1.127.14-3.267-.74-2.737-1.13-4.502-3.91-4.64-4.09-.137-.18-1.148-1.53-1.148-2.92 0-1.39.73-2.074 1.012-2.355.28-.28.618-.35.815-.35h.59c.19 0 .45.07.7.67.25.62.87 2.12.945 2.27.076.15.127.33.026.53-.1.2-.15.33-.3.51-.15.18-.315.4-.45.54-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11.1.09.2.18.315.27.915.815 1.57.86 1.83.6.26-.26.85-1.08-1.34.08-.12.22-.2.38-.13l2.25 1.06c.15.07.25.15.3.26.05.11.05.62-.2 1.34z" />
                      </svg>
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
        <CommandInput placeholder={`Search in ${desgInfo.label} jobs...`} />
        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading={`${desgInfo.label} Jobs`}>
            {jobs.map((item) => {
              const jobSlug = item.slug || generateSlug(item.title);
              return (
                <CommandItem
                  key={jobSlug}
                  onSelect={() => {
                    setIsSearchOpen(false);
                    router.push(`/post/${jobSlug}`);
                  }}
                  className="cursor-pointer"
                >
                  <Briefcase className={`mr-2.5 h-4 w-4 shrink-0 ${theme.iconColor}`} />
                  <span className="truncate">{item.title}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
