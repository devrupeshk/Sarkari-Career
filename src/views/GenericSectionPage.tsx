"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Landmark,
  BookOpen,
  Train,
  Shield,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Zap,
  Search,
  Stethoscope,
  FileText,
  Globe,
  ArrowRight,
  Frown,
  Award,
  Key,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { StatusBadge } from "@/components/StatusBadge";
import type { JobItem } from "@/data/jobs";

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

const pageThemes: Record<
  string,
  {
    glowBg: string;
    radialGlow: string;
    iconColor: string;
    iconBg: string;
    icon: any;
  }
> = {
  "Exam Results": {
    glowBg: "from-rose-500/20 via-navy to-navy",
    radialGlow: "bg-rose-500/10",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    icon: Award,
  },
  "Exam Syllabus": {
    glowBg: "from-violet-500/20 via-navy to-navy",
    radialGlow: "bg-violet-500/10",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    icon: BookOpen,
  },
  "Answer Keys": {
    glowBg: "from-amber-500/20 via-navy to-navy",
    radialGlow: "bg-amber-500/10",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    icon: Key,
  },
  "Admissions": {
    glowBg: "from-cyan-500/20 via-navy to-navy",
    radialGlow: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    icon: GraduationCap,
  },
  "University Update": {
    glowBg: "from-sky-500/20 via-navy to-navy",
    radialGlow: "bg-sky-500/10",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10 border-sky-500/20 shadow-[0_0_30px_rgba(14,165,233,0.15)]",
    icon: GraduationCap,
  },
  "Latest Updates": {
    glowBg: "from-brand/20 via-navy to-navy",
    radialGlow: "bg-brand/10",
    iconColor: "text-brand",
    iconBg: "bg-brand/10 border-brand/20 shadow-[0_0_30px_rgba(220,38,38,0.15)]",
    icon: Zap,
  },
};

export interface GenericSectionPageProps {
  title: string;
  jobs: JobItem[];
}

export function GenericSectionPage({ title, jobs }: GenericSectionPageProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchQuery = "";

  const theme = pageThemes[title] || pageThemes["Latest Updates"];
  const ActiveIcon = theme.icon;

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

  const filteredJobs = jobs;

  return (
    <div className="min-h-screen pt-14 bg-off-white overflow-hidden relative">
      {/* Page Background Mesh */}
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3" />

      {/* Category Hero */}
      <section className="relative bg-navy pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden">
        {/* Dynamic backdrop glows reflecting the active category */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme.glowBg}`} />
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.radialGlow} rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3`} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-6">
            <FadeIn className="inline-flex justify-center mb-4" delay={0.1}>
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center relative group transition-all duration-300 hover:rotate-6 ${theme.iconBg}`}>
                <ActiveIcon className={`w-7 h-7 relative z-10 ${theme.iconColor}`} />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2.5 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  {title} Hub
                </span>
              </h1>
              <p className="text-slate-300 text-[13.5px] md:text-[15px] font-medium max-w-xl mx-auto leading-relaxed">
                Browse and download the latest verified {title.toLowerCase()} releases, exam dates, and official announcements directly from the recruitment board authorities.
              </p>
            </FadeIn>
          </div>

          {/* Premium In-Hero Glassmorphic Search Bar */}
          <FadeIn delay={0.3}>
            <div className="max-w-lg mx-auto">
              <div
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl h-12 px-1 sm:px-1.5 group hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white/60 ml-3.5 shrink-0 transition-colors group-hover:text-brand" />
                <input
                  type="text"
                  placeholder={`Search in ${title}...`}
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
      <section className="py-8 md:py-10 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Main Column */}
            <div className="flex-1 lg:w-[70%]">
              <FadeIn>
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl overflow-hidden relative z-20">
                  {/* Table Header */}
                  <div className="bg-slate-50/50 backdrop-blur-md px-5 py-3 hidden md:grid md:grid-cols-[3.2fr_1.3fr_1.1fr_0.8fr] gap-4 border-b border-slate-100 items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Exam Title
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

                  {/* Table Rows */}
                  {filteredJobs.length > 0 ? (
                    <StaggerContainer staggerDelay={0.03}>
                      {filteredJobs.map((job, i) => {
                        // Calculate left border hover accents dynamically based on status
                        const isNew = job.status === "NEW" || job.status === "STARTED" || job.status === "ONLINE" || job.status === "APPLY NOW";
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
                            {/* Desktop Row */}
                            <Link
                              href={`/post/${job.slug || generateSlug(job.title)}`}
                              className={`hidden md:grid md:grid-cols-[3.2fr_1.3fr_1.1fr_0.8fr] gap-4 px-5 py-3 border-b border-slate-100/60 border-l-4 border-l-transparent ${borderHoverColor} hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 items-center group relative overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/2 to-brand/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                              <div className="flex items-center gap-2.5 relative z-10 truncate">
                                {/* Color Dot aligned with Status */}
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
                                  <ArrowRight className="w-3.5 h-3.5 text-brand opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                                </span>
                              </div>

                              <span className="text-[11px] font-medium text-slate-500 truncate relative z-10">
                                {job.department ? (
                                  <HighlightMatch text={job.department} query={searchQuery} />
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
                              <Link
                                href={`/post/${job.slug || generateSlug(job.title)}`}
                                className="block"
                              >
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
                                        {job.department ? (
                                          <HighlightMatch text={job.department} query={searchQuery} />
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
                    /* Elegant Empty State Glass Card */
                    <div className="py-16 px-4 text-center animate-fadeIn">
                      <div className="w-14 h-14 bg-slate-100/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200/40 shadow-inner">
                        <Frown className="w-7 h-7 text-slate-400" />
                      </div>
                      <h3 className="text-[14px] font-bold text-slate-800 mb-1">
                        No Listings Available
                      </h3>
                      <p className="text-[11.5px] text-slate-500 max-w-xs mx-auto mb-4 leading-relaxed font-medium">
                        There are currently no active listings available in the {title.toLowerCase()} category. Please check back later for updates.
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Pagination (Hidden during Search) */}
              {!searchQuery.trim() && filteredJobs.length >= 20 && (
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  <button
                    className="px-2.5 py-1.5 text-xs font-bold text-slate-400 border border-slate-200 rounded-full cursor-not-allowed bg-white/50"
                    disabled
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${page === 1
                        ? "bg-brand text-white shadow-md shadow-brand/20 hover:scale-105"
                        : "bg-white/70 backdrop-blur-md border border-white/60 text-slate-600 hover:border-brand/40 hover:text-brand hover:scale-105"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-2.5 py-1.5 text-xs font-bold text-brand bg-white/70 border border-brand/20 rounded-full hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 hover:scale-105">
                    <ChevronRight className="w-3.5 h-3.5" />
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
                {/* Category Nav */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4.5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                  <h4 className="text-[13px] font-bold text-slate-800 mb-3 flex items-center gap-1.5 relative z-10 uppercase tracking-wide">
                    <Briefcase className="w-3.5 h-3.5 text-brand" /> Job Categories
                  </h4>
                  <ul className="space-y-1 relative z-10">
                    {sidebarCategories.map((cat) => {
                      return (
                        <li key={cat.slug}>
                          <Link
                            href={`/${cat.slug}`}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-[12px] font-bold transition-all duration-300 border bg-white/50 border-slate-100 text-slate-600 hover:border-brand/30 hover:bg-white hover:shadow-sm hover:text-brand group/item"
                          >
                            <cat.icon className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-brand transition-colors" />
                            {cat.label}
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
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Local Command Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder={`Search in ${title}...`} />
        <CommandList className="max-h-[400px] overflow-y-auto">
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading={`${title} Listings`}>
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
                  <ActiveIcon className={`mr-2.5 h-4 w-4 shrink-0 ${theme.iconColor}`} />
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

