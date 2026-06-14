import { FileText, Zap, Briefcase } from 'lucide-react';
import { JobListCard } from '@/components/JobListCard';
import { admitCards, latestUpdates, currentJobs } from '@/data/jobs';
import { SectionHeader } from '@/components/SectionHeader';
import { JobsByEducation } from './JobsByEducation';
import { JobsByDesignation } from './JobsByDesignation';
import { CategoryQuickLinks } from './CategoryQuickLinks';
import { StateJobsSidebar } from './StateJobsSidebar';
import { EmailSubscription } from './EmailSubscription';

export function ThreeColumnGrid() {
  return (
    <section id="admit-card" className="py-12 md:py-16 relative bg-slate-50/80 border-t border-slate-200/50">
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <SectionHeader label="📋 QUICK ACCESS" heading="Latest Notifications" showViewAll viewAllHref="#" />

        {/* Two-column main + sidebar */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: 2-column job cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <JobListCard
              title="Current Jobs"
              icon={Briefcase}
              items={currentJobs}
              viewAllHref="/current-job"
              viewAllText="View All Jobs"
              delay={0}
            />
            <JobListCard
              title="Admit Card"
              icon={FileText}
              items={admitCards}
              viewAllHref="/admit-card"
              viewAllText="View All Admit Cards"
              delay={0.08}
            />
            <JobListCard
              title="⚡ Latest Updates"
              icon={Zap}
              items={latestUpdates}
              viewAllHref="/latest-updates"
              viewAllText="View All Updates"
              delay={0.16}
            />
          </div>

          {/* Right: stacked sidebar widgets */}
          <div className="lg:w-[300px] shrink-0 space-y-4">
            <CategoryQuickLinks />
            <JobsByEducation />
            <JobsByDesignation />
            <StateJobsSidebar />
            <EmailSubscription />
          </div>
        </div>
      </div>
    </section>
  );
}
