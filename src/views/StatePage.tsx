"use client";

import {
  FileText,
  Briefcase,
  BookOpen,
  Key,
  GraduationCap,
  Building2,
  Award,
  MapPin,
  Search,
  Newspaper,
  Loader2,
} from "lucide-react";
import { JobListCard } from "@/components/JobListCard";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { fetchListings } from "@/lib/api";

interface StatePageProps {
  stateName: string;
  initialJobs?: any[];
  initialAdmitCards?: any[];
  initialResults?: any[];
  initialAnswerKeys?: any[];
  initialSyllabus?: any[];
  initialAdmissions?: any[];
  initialUniversityUpdates?: any[];
  initialScholarships?: any[];
  initialYojanas?: any[];
}

export function StatePage({
  stateName,
  initialJobs = [],
  initialAdmitCards = [],
  initialResults = [],
  initialAnswerKeys = [],
  initialSyllabus = [],
  initialAdmissions = [],
  initialUniversityUpdates = [],
  initialScholarships = [],
  initialYojanas = [],
}: StatePageProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchData, setSearchData] = useState({
    jobs: initialJobs,
    admitCards: initialAdmitCards,
    results: initialResults,
    answerKeys: initialAnswerKeys,
    syllabus: initialSyllabus,
    admissions: initialAdmissions,
    universityUpdates: initialUniversityUpdates,
    scholarships: initialScholarships,
    yojanas: initialYojanas,
  });

  // Format stateName from URL (e.g. "uttar-pradesh" -> "Uttar Pradesh")
  const formattedStateName = stateName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Toggle search dialog with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch state-scoped results (debounced) when search opens or query changes
  const fetchStateResults = useCallback(async (q: string) => {
    setIsSearchLoading(true);
    try {
      const opts = q.trim()
        ? { state: stateName, search: q.trim(), limit: 20 }
        : { state: stateName, limit: 10 };

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
        fetchListings(opts).catch(() => null),
        fetchListings({ ...opts, category: "admit-card" }).catch(() => null),
        fetchListings({ ...opts, category: "result" }).catch(() => null),
        fetchListings({ ...opts, category: "answer-key" }).catch(() => null),
        fetchListings({ ...opts, category: "syllabus" }).catch(() => null),
        fetchListings({ ...opts, category: "admission" }).catch(() => null),
        fetchListings({ ...opts, category: "university-update" }).catch(() => null),
        fetchListings({ ...opts, category: "scholarship" }).catch(() => null),
        fetchListings({ ...opts, category: "yojana" }).catch(() => null),
      ]);

      setSearchData({
        jobs: jobsRes?.jobs || [],
        admitCards: admitCardsRes?.jobs || [],
        results: resultsRes?.jobs || [],
        answerKeys: answerKeysRes?.jobs || [],
        syllabus: syllabusRes?.jobs || [],
        admissions: admissionsRes?.jobs || [],
        universityUpdates: universityUpdatesRes?.jobs || [],
        scholarships: scholarshipsRes?.jobs || [],
        yojanas: yojanasRes?.jobs || [],
      });
    } catch (err) {
      console.error("[StatePage] Failed to fetch state search suggestions:", err);
    } finally {
      setIsSearchLoading(false);
    }
  }, [stateName]);

  // Load initial results when dialog opens
  useEffect(() => {
    if (!isSearchOpen) return;
    setSearchQuery("");
    fetchStateResults("");
  }, [isSearchOpen, fetchStateResults]);

  // Debounced search on query change
  useEffect(() => {
    if (!isSearchOpen) return;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      fetchStateResults(searchQuery);
    }, 300);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery, isSearchOpen, fetchStateResults]);

  // Helper to map API items for JobListCard
  const mapItems = (items: any[]) => {
    if (!items) return [];
    return items.map((item) => ({
      title: item.title,
      status: item.status,
      slug: item.slug,
      meta: item.lastDate ? `Last Date: ${item.lastDate}` : `Posts: ${item.totalPosts || "Various"}`,
    }));
  };

  const mappedAdmitCards = useMemo(() => mapItems(initialAdmitCards), [initialAdmitCards]);
  const mappedResults = useMemo(() => mapItems(initialResults), [initialResults]);
  const mappedJobs = useMemo(() => mapItems(initialJobs), [initialJobs]);
  const mappedSyllabus = useMemo(() => mapItems(initialSyllabus), [initialSyllabus]);
  const mappedAnswerKeys = useMemo(() => mapItems(initialAnswerKeys), [initialAnswerKeys]);
  const mappedAdmissions = useMemo(() => mapItems(initialAdmissions), [initialAdmissions]);
  const mappedUniversityUpdates = useMemo(() => mapItems(initialUniversityUpdates), [initialUniversityUpdates]);
  const mappedScholarships = useMemo(() => mapItems(initialScholarships), [initialScholarships]);
  const mappedYojanas = useMemo(() => mapItems(initialYojanas), [initialYojanas]);

  // Combine and deduplicate all listings for the search dialog
  const allListings = useMemo(() => {
    const combined = [
      ...initialJobs,
      ...initialAdmitCards,
      ...initialResults,
      ...initialAnswerKeys,
      ...initialSyllabus,
      ...initialAdmissions,
      ...initialUniversityUpdates,
      ...initialScholarships,
      ...initialYojanas,
    ];

    const seen = new Set();
    return combined.filter((item) => {
      if (!item) return false;
      const key = item.id || item.slug || item.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [
    initialJobs,
    initialAdmitCards,
    initialResults,
    initialAnswerKeys,
    initialSyllabus,
    initialAdmissions,
    initialUniversityUpdates,
    initialScholarships,
    initialYojanas,
  ]);

  const totalActiveUpdates = allListings.length;

  return (
    <div className="bg-off-white min-h-screen pt-14 pb-16 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[35%] left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-[20%] right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3" />

      {/* State Header Section */}
      <section className="relative bg-navy pt-14 pb-14 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/15 via-navy to-navy pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[130px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          {/* Breadcrumb Info Badge */}
          <FadeIn delay={0.05} className="inline-flex justify-center mb-4.5">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full px-4 py-2 sm:py-1.5 border border-white/15 shadow-lg max-w-full">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand shrink-0 animate-pulse" />
                <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
                  {formattedStateName} State Hub
                </span>
              </div>
              <span className="hidden sm:inline h-4 w-[1px] bg-white/20 mx-1" />
              <span className="text-[10px] text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 tracking-wider uppercase flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                {totalActiveUpdates} Active Updates
              </span>
            </div>
          </FadeIn>

          {/* Main Title */}
          <FadeIn delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                {formattedStateName} Government Jobs
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed mb-6">
              Access real-time verified recruitment notifications, admit cards, exam schedules, and result sheets directly sourced from the {formattedStateName} administrative boards.
            </p>
          </FadeIn>

          {/* In-Hero Dynamic Filter Bar */}
          <FadeIn delay={0.25} className="max-w-lg mx-auto">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl h-12 px-1.5 group hover:bg-white/15 transition-all duration-300 cursor-pointer"
            >
              <Search className="w-4 h-4 text-white/50 ml-3.5 shrink-0 transition-colors group-hover:text-brand" />
              <input
                type="text"
                readOnly
                placeholder={`Search ${formattedStateName} updates...`}
                className="flex-1 min-w-0 px-3 text-[13.5px] text-white placeholder:text-white/40 outline-none bg-transparent cursor-pointer"
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
          </FadeIn>
        </div>
      </section>

      {/* Grid Layout Section */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-8">
            {/* Grid 1: Top Priority Items (Admit Card, Result, Current Job) */}
            <div>
              <SectionHeader
                label="Primary Updates"
                heading="Primary Recruitment Updates"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <JobListCard
                  title="Admit Card"
                  icon={FileText}
                  items={mappedAdmitCards}
                  viewAllHref="/admit-card"
                  viewAllText="View All Admit Cards"
                  delay={0}
                />
                <JobListCard
                  title="Result"
                  icon={Award}
                  items={mappedResults}
                  viewAllHref="/results"
                  viewAllText="View All Results"
                  delay={0.05}
                />
                <JobListCard
                  title="Current Jobs"
                  icon={Briefcase}
                  items={mappedJobs}
                  viewAllHref="/current-job"
                  viewAllText="View All Jobs"
                  delay={0.1}
                />
              </div>
            </div>

            {/* Grid 2: Academic & Exam Prep (Syllabus, Answer Key, Admission) */}
            <div className="pt-4">
              <SectionHeader
                label="Exams & Prep"
                heading="Exams & Preparations"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <JobListCard
                  title="Syllabus"
                  icon={BookOpen}
                  items={mappedSyllabus}
                  viewAllHref="/syllabus"
                  viewAllText="View All Syllabus"
                  delay={0.15}
                />
                <JobListCard
                  title="Answer Key"
                  icon={Key}
                  items={mappedAnswerKeys}
                  viewAllHref="/answer-key"
                  viewAllText="View All Answer Keys"
                  delay={0.2}
                />
                <JobListCard
                  title="Admissions"
                  icon={GraduationCap}
                  items={mappedAdmissions}
                  viewAllHref="/admission"
                  viewAllText="View All Admissions"
                  delay={0.25}
                />
              </div>
            </div>

            {/* Grid 3: State Education & Welfare (University Update, Scholarship, Sarkari Yojana) */}
            <div className="pt-4">
              <SectionHeader
                label="Welfare & Boards"
                heading="Welfare & Board Updates"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <JobListCard
                  title="University Updates"
                  icon={Building2}
                  items={mappedUniversityUpdates}
                  viewAllHref="/university-update"
                  viewAllText="View All Updates"
                  delay={0.3}
                />
                <JobListCard
                  title="Scholarships"
                  icon={Award}
                  items={mappedScholarships}
                  viewAllHref="/sarkari-yojana"
                  viewAllText="View All Scholarships"
                  delay={0.35}
                />
                <JobListCard
                  title="Sarkari Yojana"
                  icon={FileText}
                  items={mappedYojanas}
                  viewAllHref="/sarkari-yojana"
                  viewAllText="View All Yojana Updates"
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Command Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput
          placeholder={`Search updates for ${formattedStateName}...`}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList className="max-h-[450px] overflow-y-auto">
          {isSearchLoading ? (
            <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : (
            <>
              {!searchData.jobs.length &&
                !searchData.admitCards.length &&
                !searchData.results.length &&
                !searchData.answerKeys.length &&
                !searchData.syllabus.length &&
                !searchData.admissions.length &&
                !searchData.universityUpdates.length &&
                !searchData.scholarships.length &&
                !searchData.yojanas.length && (
                  <CommandEmpty>No matches found.</CommandEmpty>
                )}

              {/* Group 2: Latest Jobs */}
              {searchData.jobs.length > 0 && (
                <CommandGroup heading="Latest Jobs">
                  {searchData.jobs.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Briefcase className="mr-2.5 h-4 w-4 text-emerald-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 3: Admit Cards */}
              {searchData.admitCards.length > 0 && (
                <CommandGroup heading="Admit Cards">
                  {searchData.admitCards.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <FileText className="mr-2.5 h-4 w-4 text-blue-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 4: Exam Results */}
              {searchData.results.length > 0 && (
                <CommandGroup heading="Exam Results">
                  {searchData.results.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Award className="mr-2.5 h-4 w-4 text-rose-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 5: Answer Keys */}
              {searchData.answerKeys.length > 0 && (
                <CommandGroup heading="Answer Keys">
                  {searchData.answerKeys.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Key className="mr-2.5 h-4 w-4 text-amber-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 6: Syllabus */}
              {searchData.syllabus.length > 0 && (
                <CommandGroup heading="Syllabus">
                  {searchData.syllabus.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <BookOpen className="mr-2.5 h-4 w-4 text-purple-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 7: Admissions */}
              {searchData.admissions.length > 0 && (
                <CommandGroup heading="Admissions">
                  {searchData.admissions.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <GraduationCap className="mr-2.5 h-4 w-4 text-cyan-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 8: University Updates */}
              {searchData.universityUpdates.length > 0 && (
                <CommandGroup heading="University Updates">
                  {searchData.universityUpdates.map((item) => (
                    <CommandItem
                      key={item.id || item.slug}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Building2 className="mr-2.5 h-4 w-4 text-orange-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Group 9: Yojanas & Scholarships */}
              {(searchData.scholarships.length > 0 || searchData.yojanas.length > 0) && (
                <CommandGroup heading="Scholarships & Yojanas">
                  {[...searchData.scholarships, ...searchData.yojanas].map((item, idx) => (
                    <CommandItem
                      key={item.id || item.slug || idx}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        router.push(`/post/${item.slug}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Newspaper className="mr-2.5 h-4 w-4 text-indigo-500" />
                      <span className="truncate">{item.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
