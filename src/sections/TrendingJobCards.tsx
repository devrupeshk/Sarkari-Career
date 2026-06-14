import { Shield, FlaskConical, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { featuredJobs } from "@/data/jobs";
import { StaggerContainer, StaggerItem } from "@/components/FadeIn";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

const departmentIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Defence: Shield,
  Medical: FlaskConical,
  Education: GraduationCap,
};

export function TrendingJobCards() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-[#F1F5F9] to-white relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader
          label="🔥 TRENDING NOW"
          heading="Featured Job Alerts"
          showViewAll
          viewAllHref="/categories"
        />

        <StaggerContainer
          staggerDelay={0.05}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-3.5"
        >
          {featuredJobs.map((job, i) => {
            const DeptIcon = departmentIcons[job.department || ""] || Shield;
            return (
              <StaggerItem key={i}>
                <Link
                  href={`/post/${generateSlug(job.title)}`}
                  className="group relative flex flex-col justify-between bg-white/70 backdrop-blur-xl rounded-xl border border-white/60 shadow-card hover:shadow-card-hover hover:border-brand/20 hover:-translate-y-0.5 transition-all duration-300 p-3.5 h-full overflow-hidden"
                >
                  {/* Glowing background highlights */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none group-hover:bg-brand/10" />
                  <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-brand/70 via-[#FF5F5F] to-brand opacity-80 group-hover:opacity-100 transition-opacity z-20" />

                  <div>
                    {/* Dept badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-6 h-6 rounded-md bg-brand/10 flex items-center justify-center text-brand">
                        <DeptIcon className="w-3 h-3" />
                      </div>
                      <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-500">
                        {job.department}
                      </span>
                    </div>

                    <h3 className="text-[12.5px] font-extrabold text-slate-800 mb-1 leading-snug group-hover:text-brand transition-colors duration-200">
                      {job.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 mb-3 font-semibold leading-normal">
                      {job.meta}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 relative z-10">
                    <StatusBadge status={job.status} />
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand group-hover:gap-1.5 transition-all duration-300">
                      View Details
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

