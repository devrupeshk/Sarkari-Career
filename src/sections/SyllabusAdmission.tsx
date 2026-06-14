import { BookOpen, GraduationCap } from 'lucide-react';
import { JobListCard } from '@/components/JobListCard';
import { syllabus, admissions } from '@/data/jobs';
import { SectionHeader } from '@/components/SectionHeader';

export function SyllabusAdmission() {
  return (
    <section id="syllabus" className="py-12 md:py-16 bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <SectionHeader label="📚 STUDY MATERIAL" heading="Syllabus & Admissions" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <JobListCard
            title="Syllabus"
            icon={BookOpen}
            items={syllabus}
            viewAllHref="/syllabus"
            viewAllText="View All Syllabus"
            delay={0}
          />
          <JobListCard
            title="Admission"
            icon={GraduationCap}
            items={admissions}
            viewAllHref="/admission"
            viewAllText="View All Admissions"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
