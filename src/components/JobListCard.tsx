import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { JobItem } from "@/data/jobs";
import { StatusBadge } from "./StatusBadge";
import { FadeIn } from "./FadeIn";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

interface JobListCardProps {
  title: string;
  icon: LucideIcon;
  items: JobItem[];
  viewAllHref?: string;
  viewAllText?: string;
  delay?: number;
  slim?: boolean;
}

export function JobListCard({
  title,
  icon: Icon,
  items,
  viewAllHref = "#",
  viewAllText = "View All",
  delay = 0,
  slim = false,
}: JobListCardProps) {

  if (slim) {
    return (
      <FadeIn delay={delay} className="h-full">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-card border border-white/60 border-l-4 border-l-brand p-4 h-full hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none group-hover:bg-brand/10 z-0" />

          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 tracking-wider mb-2 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-3 bg-brand rounded-full" />
                {title}
              </h4>
              <ul className="space-y-0.5">
                {items.map((item, i) => (
                  <li key={i} className="py-2 border-b border-slate-100 last:border-b-0">
                    <Link
                      href={`/post/${item.slug || generateSlug(item.title)}`}
                      className="flex items-start gap-2.5 group/link"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 group-hover/link:scale-125 transition-transform duration-200 ${item.status === "NEW" || item.status === "STARTED" || item.status === "ONLINE" || item.status === "APPLY NOW"
                          ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                          : item.status === "OUT" || item.status === "ALERT"
                            ? "bg-rose-500 shadow-sm shadow-rose-500/50"
                            : item.status === "SOON" || item.status === "EXTEND"
                              ? "bg-blue-500 shadow-sm shadow-blue-500/50"
                              : "bg-brand shadow-sm shadow-brand/50"
                          }`}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="block text-[12px] font-medium text-slate-750 group-hover/link:text-brand transition-colors duration-200 line-clamp-4 leading-normal">
                          {item.title}
                        </span>
                      </div>
                      <StatusBadge status={item.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 mt-3 text-[11px] font-extrabold text-brand hover:gap-1.5 transition-all duration-300 relative z-10 uppercase tracking-wider"
            >
              {viewAllText} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={delay} className="h-full">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-card border border-white/60 overflow-hidden h-full flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 relative group">
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand/5 rounded-bl-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-110 pointer-events-none group-hover:bg-brand/10 z-0" />

        <div className="relative z-10 flex-1 flex flex-col justify-between">
          {/* Card Header with soft linear-gradient */}
          <div className="bg-gradient-to-r from-brand/5 to-transparent border-b border-slate-100 px-4.5 py-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-[11.5px] font-extrabold text-slate-800 tracking-wider uppercase">
              {title}
            </h3>
          </div>

          <ul className="px-4.5 py-1.5 flex-1">
            {items.map((item, i) => (
              <li key={i} className="py-2 border-b border-slate-100 last:border-b-0">
                <Link
                  href={`/post/${item.slug || generateSlug(item.title)}`}
                  className="flex items-start gap-2.5 group/link"
                >
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 group-hover/link:scale-125 transition-transform duration-200 ${item.status === "NEW" || item.status === "STARTED" || item.status === "ONLINE" || item.status === "APPLY NOW"
                      ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                      : item.status === "OUT" || item.status === "ALERT"
                        ? "bg-rose-500 shadow-sm shadow-rose-500/50"
                        : item.status === "SOON" || item.status === "EXTEND"
                          ? "bg-blue-500 shadow-sm shadow-blue-500/50"
                          : "bg-brand shadow-sm shadow-brand/50"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[12px] font-medium text-slate-755 group-hover/link:text-brand group-hover/link:translate-x-0.5 transition-all duration-200 line-clamp-2 leading-normal">
                      {item.title}
                    </span>
                    {item.meta && (
                      <span className="block text-[9.5px] text-slate-400 font-bold mt-0.5">
                        {item.meta}
                      </span>
                    )}
                  </div>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-3 text-center border-t border-slate-100/60 bg-slate-50/30">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand hover:gap-1.5 transition-all duration-300 uppercase tracking-wider"
            >
              {viewAllText} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

