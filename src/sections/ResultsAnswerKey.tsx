import { Trophy, Key } from "lucide-react";
import { JobListCard } from "@/components/JobListCard";
import { results, answerKeys } from "@/data/jobs";
import { SectionHeader } from "@/components/SectionHeader";

export function ResultsAnswerKey() {
  return (
    <section id="results" className="py-12 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="📋 EXAM OUTCOMES"
          heading="Results & Answer Keys"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <JobListCard
            title="Results"
            icon={Trophy}
            items={results}
            viewAllHref="/results"
            viewAllText="View All"
            delay={0}
          />
          <JobListCard
            title="Answer Key"
            icon={Key}
            items={answerKeys}
            viewAllHref="/answer-key"
            viewAllText="View All"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
