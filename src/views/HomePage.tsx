"use client";

import { Hero } from "@/sections/Hero";
import { StateNavigation } from "@/sections/StateNavigation";
import { TrendingJobCards } from "@/sections/TrendingJobCards";
import { MainContentWithSidebar } from "@/sections/MainContentWithSidebar";
import { UtilityTools } from "@/sections/UtilityTools";
import { FAQSection } from "@/sections/FAQSection";

interface HomePageProps {
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

export function HomePage({
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
}: HomePageProps) {
  return (
    <>
      <Hero />
      <StateNavigation />
      {/* <TrendingJobCards /> */}
      <MainContentWithSidebar
        initialJobs={initialJobs}
        initialAdmitCards={initialAdmitCards}
        initialResults={initialResults}
        initialAnswerKeys={initialAnswerKeys}
        initialSyllabus={initialSyllabus}
        initialAdmissions={initialAdmissions}
        initialUniversityUpdates={initialUniversityUpdates}
        initialScholarships={initialScholarships}
        initialYojanas={initialYojanas}
        initialBlogs={initialBlogs}
      />
      <UtilityTools />
      <FAQSection />
    </>
  );
}
