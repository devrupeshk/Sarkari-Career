"use client";

import { useMemo } from "react";
import Link from "next/link";

import {
  FileText,
  Zap,
  Trophy,
  Key,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  ChevronRight,
  Building2,
} from "lucide-react";
import { JobListCard } from "@/components/JobListCard";
import {
  admitCards,
  latestUpdates,
  currentJobs,
  results,
  answerKeys,
  syllabus,
  admissions,
  eduUpdates,
  eduNotifications,
} from "@/data/jobs";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryQuickLinks } from "./CategoryQuickLinks";
import { JobsByEducation } from "./JobsByEducation";
import { JobsByDesignation } from "./JobsByDesignation";
import { StateJobsSidebar } from "./StateJobsSidebar";
import { EmailSubscription } from "./EmailSubscription";

interface MainContentWithSidebarProps {
  initialJobs?: any[];
  initialAdmitCards?: any[];
  initialResults?: any[];
  initialAnswerKeys?: any[];
  initialSyllabus?: any[];
  initialAdmissions?: any[];
  initialUniversityUpdates?: any[];
  initialScholarships?: any[];
  initialYojanas?: any[];
  initialBlogs?: any[];
}

export function MainContentWithSidebar({
  initialJobs = [],
  initialAdmitCards = [],
  initialResults = [],
  initialAnswerKeys = [],
  initialSyllabus = [],
  initialAdmissions = [],
  initialUniversityUpdates = [],
  initialScholarships = [],
  initialYojanas = [],
  initialBlogs = [],
}: MainContentWithSidebarProps) {
  const mappedCurrentJobs = useMemo(() => {
    if (initialJobs && initialJobs.length > 0) {
      // Find jobs categorized as "current-job", but wait, "current-job" is a catch-all!
      // In the static code, currentJobs shows all latest notifications.
      // So we map the first 11 jobs (just like static currentJobs had 11 items).
      return initialJobs.slice(0, 11).map((job) => ({
        title: job.title,
        status: job.status,
        slug: job.slug,
        meta: job.state ? job.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return currentJobs;
  }, [initialJobs]);

  const mappedAdmitCards = useMemo(() => {
    if (initialAdmitCards && initialAdmitCards.length > 0) {
      return initialAdmitCards.slice(0, 11).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return admitCards;
  }, [initialAdmitCards]);

  const mappedResults = useMemo(() => {
    if (initialResults && initialResults.length > 0) {
      return initialResults.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return results;
  }, [initialResults]);

  const mappedAnswerKeys = useMemo(() => {
    if (initialAnswerKeys && initialAnswerKeys.length > 0) {
      return initialAnswerKeys.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialAnswerKeys]);

  const mappedSyllabus = useMemo(() => {
    if (initialSyllabus && initialSyllabus.length > 0) {
      return initialSyllabus.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialSyllabus]);

  const mappedAdmissions = useMemo(() => {
    if (initialAdmissions && initialAdmissions.length > 0) {
      return initialAdmissions.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialAdmissions]);

  const mappedUniversityUpdates = useMemo(() => {
    if (initialUniversityUpdates && initialUniversityUpdates.length > 0) {
      return initialUniversityUpdates.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialUniversityUpdates]);

  const mappedScholarships = useMemo(() => {
    if (initialScholarships && initialScholarships.length > 0) {
      return initialScholarships.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialScholarships]);

  const mappedYojanas = useMemo(() => {
    if (initialYojanas && initialYojanas.length > 0) {
      return initialYojanas.slice(0, 10).map((item) => ({
        title: item.title,
        status: item.status,
        slug: item.slug,
        meta: item.state ? item.state.toUpperCase().replace("-", " ") : "VARIOUS",
      }));
    }
    return [];
  }, [initialYojanas]);

  const mappedBlogs = useMemo(() => {
    return initialBlogs || [];
  }, [initialBlogs]);

  return (
    <div className="bg-slate-50/80 border-t border-slate-200/50 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0 space-y-7">
            {/* 1. Latest Notifications: Current Jobs + Admit Card + Latest Updates */}
            <div id="admit-card">
              <SectionHeader
                label="📋 QUICK ACCESS"
                heading="Latest Notifications"
                showViewAll
                viewAllHref="#"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                <JobListCard
                  title="Current Jobs"
                  icon={Briefcase}
                  items={mappedCurrentJobs}
                  viewAllHref="/current-job"
                  viewAllText="View All"
                  delay={0}
                />
                <JobListCard
                  title="Admit Card"
                  icon={FileText}
                  items={mappedAdmitCards}
                  viewAllHref="/admit-card"
                  viewAllText="View All"
                  delay={0.08}
                />
                <JobListCard
                  title="Results"
                  icon={Trophy}
                  items={mappedResults}
                  viewAllHref="/results"
                  viewAllText="View All"
                  delay={0.16}
                />
              </div>
            </div>

            {/* 2. Answer Key, Syllabus & Admission */}
            <div id="resources">
              <SectionHeader
                label="📚 EXAM RESOURCES"
                heading="Answer Key, Syllabus & Admission"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                <JobListCard
                  title="Answer Key"
                  icon={Key}
                  items={mappedAnswerKeys}
                  viewAllHref="/answer-key"
                  viewAllText="View All"
                  delay={0}
                />
                <JobListCard
                  title="Syllabus"
                  icon={BookOpen}
                  items={mappedSyllabus}
                  viewAllHref="/syllabus"
                  viewAllText="View All"
                  delay={0.08}
                />
                <JobListCard
                  title="Admission"
                  icon={GraduationCap}
                  items={mappedAdmissions}
                  viewAllHref="/admission"
                  viewAllText="View All"
                  delay={0.16}
                />
              </div>
            </div>

            {/* 3. University Update, Scholarship & Sarkari Yojanas */}
            <div id="education" className="relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px]" />
              </div>
              <SectionHeader
                label="📖 EDUCATION & YOJANAS"
                heading="University Update, Scholarship & Sarkari Yojanas"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
                <JobListCard
                  title="University Update"
                  icon={Building2}
                  items={mappedUniversityUpdates}
                  viewAllHref="/university-update"
                  viewAllText="View All"
                  delay={0}
                />
                <JobListCard
                  title="Scholarship"
                  icon={Award}
                  items={mappedScholarships}
                  viewAllHref="/scholarship"
                  viewAllText="View All"
                  delay={0.08}
                />
                <JobListCard
                  title="Sarkari Yojanas"
                  icon={FileText}
                  items={mappedYojanas}
                  viewAllHref="/sarkari-yojana"
                  viewAllText="View All"
                  delay={0.16}
                />
              </div>
            </div>

            {/* 4. Latest Blog Posts */}
            {mappedBlogs.length > 0 && (
              <div id="latest-blogs" className="relative">
                <SectionHeader
                  label="✍️ LATEST UPDATES & GUIDES"
                  heading="Latest Blog Posts"
                  showViewAll
                  viewAllHref="/latest-blog"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 relative z-10">
                  {mappedBlogs.slice(0, 4).map((blog, idx) => (
                    <div
                      key={blog.id}
                      className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 group relative"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none transition-transform duration-500 group-hover:scale-110" />
                      
                      <div className="relative z-10 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-2.5">
                            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {blog.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          
                          <h4 className="text-[13.5px] font-extrabold text-slate-800 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100/50 mt-4">
                          <span className="text-[11px] font-bold text-slate-400">
                            {blog.views ? blog.views.toLocaleString() : 0} views
                          </span>
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand uppercase tracking-wider group/link"
                          >
                            Read Guide <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky Sidebar ── */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
            <div className="lg:sticky lg:top-18 space-y-4 lg:space-y-3">
              <CategoryQuickLinks />
              <JobsByEducation />
              <JobsByDesignation />
              <StateJobsSidebar />
              <EmailSubscription />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
