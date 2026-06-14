"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  Award,
  BookOpen,
  GraduationCap,
  Key,
  Newspaper,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { fetchListings } from "@/lib/api";
import { categoryMeta } from "@/data/jobs";
import { states } from "@/data/states";

function getStateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

type DataState = {
  jobs: any[];
  admitCards: any[];
  results: any[];
  syllabus: any[];
  answerKeys: any[];
  admissions: any[];
  yojanas: any[];
};

const EMPTY_DATA: DataState = {
  jobs: [],
  admitCards: [],
  results: [],
  syllabus: [],
  answerKeys: [],
  admissions: [],
  yojanas: [],
};

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataState>(EMPTY_DATA);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydration safety & Event Listeners
  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore global search shortcut on category, admit-card, state, and other listing pages
      const segment = window.location.pathname.split("/").filter(Boolean)[0];
      const isCategoryPage = segment && segment in categoryMeta;
      const isStatePage = segment && states.some((s) => getStateSlug(s.name) === segment);
      const isCustomSearchPage = [
        "admit-card",
        "results",
        "syllabus",
        "answer-key",
        "admission",
        "latest-updates",
        "university-update",
        "latest-blog",
        "8th-pass",
        "10th-pass",
        "12th-pass",
        "diploma",
        "iti",
        "btech",
        "bcom",
        "graduate",
        "post-graduate",
      ].includes(segment);
      if (isCategoryPage || isCustomSearchPage || isStatePage) return;

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    const handleOpenSearch = () => {
      // Ignore global search event on category, admit-card, state, and other listing pages
      const segment = window.location.pathname.split("/").filter(Boolean)[0];
      const isCategoryPage = segment && segment in categoryMeta;
      const isStatePage = segment && states.some((s) => getStateSlug(s.name) === segment);
      const isCustomSearchPage = [
        "admit-card",
        "results",
        "syllabus",
        "answer-key",
        "admission",
        "latest-updates",
        "university-update",
        "latest-blog",
        "8th-pass",
        "10th-pass",
        "12th-pass",
        "diploma",
        "iti",
        "btech",
        "bcom",
        "graduate",
        "post-graduate",
      ].includes(segment);
      if (isCategoryPage || isCustomSearchPage || isStatePage) return;

      setOpen(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, []);

  // Fetch results (debounced) whenever dialog opens or query changes
  const fetchResults = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const opts = searchQuery.trim()
        ? { search: searchQuery.trim(), limit: 20 }
        : { limit: 8 };

      const [
        jobsRes,
        admitCardsRes,
        resultsRes,
        answerKeysRes,
        syllabusRes,
        admissionsRes,
        yojanasRes,
      ] = await Promise.all([
        fetchListings(opts).catch(() => null),
        fetchListings({ ...opts, category: "admit-card" }).catch(() => null),
        fetchListings({ ...opts, category: "result" }).catch(() => null),
        fetchListings({ ...opts, category: "answer-key" }).catch(() => null),
        fetchListings({ ...opts, category: "syllabus" }).catch(() => null),
        fetchListings({ ...opts, category: "admission" }).catch(() => null),
        fetchListings({ ...opts, category: "yojana" }).catch(() => null),
      ]);

      setData({
        jobs: jobsRes?.jobs || [],
        admitCards: admitCardsRes?.jobs || [],
        results: resultsRes?.jobs || [],
        answerKeys: answerKeysRes?.jobs || [],
        syllabus: syllabusRes?.jobs || [],
        admissions: admissionsRes?.jobs || [],
        yojanas: yojanasRes?.jobs || [],
      });
    } catch (err) {
      console.error("[SearchDialog] Failed to fetch search suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load initial data when dialog opens
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setData(EMPTY_DATA);
    fetchResults("");
  }, [open, fetchResults]);

  // Debounced search on query change
  useEffect(() => {
    if (!open) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchResults(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open, fetchResults]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery("");
      setData(EMPTY_DATA);
    }
  }, [open]);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const totalResults =
    data.jobs.length +
    data.admitCards.length +
    data.results.length +
    data.answerKeys.length +
    data.syllabus.length +
    data.admissions.length +
    data.yojanas.length;

  if (!mounted) return null;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type to search jobs, results, syllabus..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[450px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Searching...</span>
          </div>
        ) : (
          <>
            {totalResults === 0 && !isLoading && (
              <CommandEmpty>No matches found.</CommandEmpty>
            )}

            {/* Group 1: Navigation Pages – only shown when no query typed */}
            {!query.trim() && (
              <CommandGroup heading="Quick Links">
                <CommandItem onSelect={() => handleSelect("/")}>
                  <LayoutDashboard className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Home / Sarkari Result</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/current-job")}>
                  <Briefcase className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Latest Jobs</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/admit-card")}>
                  <FileText className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Admit Cards</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/results")}>
                  <Award className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Results</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/answer-key")}>
                  <Key className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Answer Keys</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/syllabus")}>
                  <BookOpen className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Syllabus</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/admission")}>
                  <GraduationCap className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Admissions</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/sarkari-yojana")}>
                  <Newspaper className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Sarkari Yojana & Yojanas</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/latest-blog")}>
                  <Newspaper className="mr-2.5 h-4 w-4 text-slate-500" />
                  <span>Latest Blogs</span>
                </CommandItem>
              </CommandGroup>
            )}

            {/* Group 2: Job Posts */}
            {data.jobs.length > 0 && (
              <CommandGroup heading="Latest Jobs">
                {data.jobs.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <Briefcase className="mr-2.5 h-4 w-4 text-emerald-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 3: Admit Cards */}
            {data.admitCards.length > 0 && (
              <CommandGroup heading="Admit Cards">
                {data.admitCards.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <FileText className="mr-2.5 h-4 w-4 text-blue-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 4: Results */}
            {data.results.length > 0 && (
              <CommandGroup heading="Exam Results">
                {data.results.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <Award className="mr-2.5 h-4 w-4 text-rose-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 5: Answer Keys */}
            {data.answerKeys.length > 0 && (
              <CommandGroup heading="Answer Keys">
                {data.answerKeys.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <Key className="mr-2.5 h-4 w-4 text-amber-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 6: Syllabus */}
            {data.syllabus.length > 0 && (
              <CommandGroup heading="Syllabus">
                {data.syllabus.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <BookOpen className="mr-2.5 h-4 w-4 text-purple-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 7: Admissions */}
            {data.admissions.length > 0 && (
              <CommandGroup heading="Admissions">
                {data.admissions.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
                  >
                    <GraduationCap className="mr-2.5 h-4 w-4 text-cyan-500" />
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Group 8: Yojanas */}
            {data.yojanas.length > 0 && (
              <CommandGroup heading="Scholarships & Yojanas">
                {data.yojanas.map((item) => (
                  <CommandItem
                    key={item.id || item.slug}
                    onSelect={() => handleSelect(`/post/${item.slug}`)}
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
  );
}
