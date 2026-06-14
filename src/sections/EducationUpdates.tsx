import { eduUpdates, eduNotifications, eduResults } from '@/data/jobs';
import { JobListCard } from '@/components/JobListCard';
import { SectionHeader } from '@/components/SectionHeader';

export function EducationUpdates() {
  return (
    <section id="education" className="py-12 md:py-16 relative bg-white border-t border-slate-100">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader label="📖 EDUCATION" heading="University Update" showViewAll viewAllHref="/university-update" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <JobListCard
            title="New Edu Updates"
            icon={undefined as never}
            items={eduUpdates}
            viewAllHref="/university-update"
            viewAllText="View All"
            delay={0}
            slim
          />
          <JobListCard
            title="Notifications"
            icon={undefined as never}
            items={eduNotifications}
            viewAllHref="/university-update"
            viewAllText="View All"
            delay={0.12}
            slim
          />
          <JobListCard
            title="Results"
            icon={undefined as never}
            items={eduResults}
            viewAllHref="/university-update"
            viewAllText="View All"
            delay={0.24}
            slim
          />
        </div>
      </div>
    </section>
  );
}
