"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchDesignations, type ApiDesignationItem } from "@/lib/api";
import Link from "next/link";
import { ChevronRight, Briefcase, Search, Frown, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

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

// Curated modern themes that we cycle through dynamically for dynamic designations
const cardThemesList = [
  {
    color: "text-emerald-800 group-hover:text-emerald-600",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    hoverIconBg: "group-hover:bg-emerald-500",
    badgeBg: "bg-emerald-50 border-emerald-100",
    badgeText: "text-emerald-700",
    borderHover: "hover:border-emerald-300 hover:shadow-emerald-500/5",
    glowMesh: "bg-emerald-500/5",
    arrowColor: "text-emerald-600",
  },
  {
    color: "text-cyan-800 group-hover:text-cyan-600",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-500",
    hoverIconBg: "group-hover:bg-cyan-500",
    badgeBg: "bg-cyan-50 border-cyan-100",
    badgeText: "text-cyan-700",
    borderHover: "hover:border-cyan-300 hover:shadow-cyan-500/5",
    glowMesh: "bg-cyan-500/5",
    arrowColor: "text-cyan-600",
  },
  {
    color: "text-sky-800 group-hover:text-sky-600",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    hoverIconBg: "group-hover:bg-sky-500",
    badgeBg: "bg-sky-50 border-sky-100",
    badgeText: "text-sky-700",
    borderHover: "hover:border-sky-300 hover:shadow-sky-500/5",
    glowMesh: "bg-sky-500/5",
    arrowColor: "text-sky-600",
  },
  {
    color: "text-indigo-800 group-hover:text-indigo-600",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    hoverIconBg: "group-hover:bg-indigo-500",
    badgeBg: "bg-indigo-50 border-indigo-100",
    badgeText: "text-indigo-700",
    borderHover: "hover:border-indigo-300 hover:shadow-indigo-500/5",
    glowMesh: "bg-indigo-500/5",
    arrowColor: "text-indigo-600",
  },
  {
    color: "text-violet-800 group-hover:text-violet-600",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    hoverIconBg: "group-hover:bg-violet-500",
    badgeBg: "bg-violet-50 border-violet-100",
    badgeText: "text-violet-700",
    borderHover: "hover:border-violet-300 hover:shadow-violet-500/5",
    glowMesh: "bg-violet-500/5",
    arrowColor: "text-violet-600",
  },
  {
    color: "text-fuchsia-800 group-hover:text-fuchsia-600",
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-500",
    hoverIconBg: "group-hover:bg-fuchsia-500",
    badgeBg: "bg-fuchsia-50 border-fuchsia-100",
    badgeText: "text-fuchsia-700",
    borderHover: "hover:border-fuchsia-300 hover:shadow-fuchsia-500/5",
    glowMesh: "bg-fuchsia-500/5",
    arrowColor: "text-fuchsia-600",
  },
  {
    color: "text-pink-800 group-hover:text-pink-600",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    hoverIconBg: "group-hover:bg-pink-500",
    badgeBg: "bg-pink-50 border-pink-100",
    badgeText: "text-pink-700",
    borderHover: "hover:border-pink-300 hover:shadow-pink-500/5",
    glowMesh: "bg-pink-500/5",
    arrowColor: "text-pink-600",
  },
  {
    color: "text-rose-800 group-hover:text-rose-600",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    hoverIconBg: "group-hover:bg-rose-500",
    badgeBg: "bg-rose-50 border-rose-100",
    badgeText: "text-rose-700",
    borderHover: "hover:border-rose-300 hover:shadow-rose-500/5",
    glowMesh: "bg-rose-500/5",
    arrowColor: "text-rose-600",
  },
  {
    color: "text-amber-800 group-hover:text-amber-600",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    hoverIconBg: "group-hover:bg-amber-500",
    badgeBg: "bg-amber-50 border-amber-100",
    badgeText: "text-amber-700",
    borderHover: "hover:border-amber-300 hover:shadow-amber-500/5",
    glowMesh: "bg-amber-500/5",
    arrowColor: "text-amber-600",
  },
];

interface DesignationsPageProps {
  initialDesignations?: ApiDesignationItem[];
}

export function DesignationsPage({ initialDesignations = [] }: DesignationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiDesignations, setApiDesignations] = useState<ApiDesignationItem[]>(initialDesignations);
  const [loading, setLoading] = useState(initialDesignations.length === 0);

  useEffect(() => {
    if (initialDesignations && initialDesignations.length > 0) {
      return;
    }
    const getDesignations = async () => {
      try {
        const data = await fetchDesignations();
        setApiDesignations(data);
      } catch (err) {
        console.error("Failed to fetch designations for list page:", err);
      } finally {
        setLoading(false);
      }
    };
    getDesignations();
  }, [initialDesignations]);

  const filteredDesignations = useMemo(() => {
    if (!searchQuery.trim()) return apiDesignations;
    return apiDesignations.filter((desg) =>
      desg.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apiDesignations, searchQuery]);

  return (
    <div className="min-h-screen pt-16 bg-off-white overflow-hidden relative">
      {/* Page Background Mesh */}
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3" />

      {/* Hero Banner */}
      <section className="relative bg-navy pt-8 pb-12 md:pt-10 md:pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-slate-custom mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">Designations</span>
            </nav>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Jobs by Designation
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base text-slate-custom max-w-2xl leading-relaxed font-medium">
              Find government jobs based on specific job designations. Browse vacancies for Clerk, Assistant, Officer, Engineer, Typist, and various other posts.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-6 max-w-lg">
              <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl h-12 px-1.5 group hover:bg-white/15 transition-all duration-300 focus-within:bg-white/20 focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/20">
                <Search className="w-4 h-4 text-white/60 ml-3 shrink-0 transition-colors group-focus-within:text-white" />
                <input
                  type="text"
                  placeholder="Search by designation (e.g. Clerk)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 px-2 text-[13px] text-white placeholder:text-white/40 outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] font-extrabold text-white/60 hover:text-white mr-2 uppercase tracking-wider transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button className="bg-brand hover:bg-brand-hover text-white font-extrabold text-[11px] px-5 py-2 rounded-full shadow-lg transition-all duration-300 shrink-0 hover:scale-103 uppercase tracking-wider">
                  Search
                </button>
              </div>
              {searchQuery && (
                <p className="text-[11px] text-brand font-bold mt-3 animate-fadeIn">
                  Showing {filteredDesignations.length} matches for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Designations Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <SectionHeader
            label="💼 DESIGNATIONS"
            heading="Browse vacancies by Job Post Designation"
          />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand"></div>
            </div>
          ) : filteredDesignations.length > 0 ? (
            <StaggerContainer
              staggerDelay={0.03}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
            >
              {filteredDesignations.map((desg, idx) => {
                const theme = cardThemesList[idx % cardThemesList.length];
                const slug = desg.slug.endsWith("-jobs") ? desg.slug : `${desg.slug}-jobs`;

                return (
                  <StaggerItem key={desg.id}>
                    <Link
                      href={`/${slug}`}
                      className={`group block bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl p-5 hover:bg-white hover:shadow-xl ${theme.borderHover} hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden`}
                    >
                      {/* Theme-colored glowing mesh gradient at top-right */}
                      <div className={`absolute top-0 right-0 w-32 h-32 ${theme.glowMesh} rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none`} />

                      {/* Header containing Icon & dynamic glass badge */}
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} ${theme.hoverIconBg} flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300`}>
                          <Briefcase className={`w-6 h-6 ${theme.iconColor} group-hover:text-white transition-colors duration-300`} />
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm bg-white/60 ${theme.badgeBg} ${theme.badgeText} transition-all duration-300`}>
                          {desg.jobCount} Jobs
                        </span>
                      </div>

                      {/* Title & description */}
                      <h3 className={`text-base font-bold mb-1.5 transition-colors relative z-10 ${theme.color}`}>
                        <HighlightMatch text={`${desg.name} Jobs`} query={searchQuery} />
                      </h3>
                      <p className="text-[12px] font-medium text-slate-500 leading-relaxed mb-4 relative z-10 line-clamp-2">
                        Explore latest government job recruitment notifications for {desg.name} designation posts.
                      </p>

                      {/* Animated bottom view jobs link */}
                      <div className="mt-auto pt-3 border-t border-slate-100/60 flex items-center justify-between relative z-10">
                        <span className={`text-[11px] font-extrabold flex items-center gap-1 uppercase tracking-wider ${theme.color}`}>
                          View Jobs
                        </span>
                        <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform ${theme.arrowColor}`} />
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            /* Premium Illustrated Empty State */
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl py-16 px-4 text-center mt-6 animate-fadeIn max-w-xl mx-auto">
              <div className="w-14 h-14 bg-slate-100/80 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-200/40 shadow-inner">
                <Frown className="w-7 h-7 text-slate-400" />
              </div>
              <h3 className="text-[14px] font-bold text-slate-800 mb-1">
                No Designations Found
              </h3>
              <p className="text-[11.5px] text-slate-500 max-w-xs mx-auto mb-4 leading-relaxed font-medium">
                We couldn&rsquo;t find any designations matching &ldquo;{searchQuery}&rdquo;. Try searching for another post designation.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-brand hover:bg-brand-hover text-white font-extrabold text-[10px] px-5 py-2 rounded-full shadow-md transition-all duration-200 uppercase tracking-wider hover:scale-102"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
