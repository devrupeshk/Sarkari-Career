import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface SectionHeaderProps {
  label: string;
  heading: string;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function SectionHeader({ label, heading, showViewAll = false, viewAllHref = '#' }: SectionHeaderProps) {
  return (
    <FadeIn className="mb-5">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{label}</span>
          </div>
          <h2 className="text-lg md:text-2xl font-extrabold text-slate-800 tracking-tight">{heading}</h2>
        </div>
        {showViewAll && (
          <Link
            href={viewAllHref}
            className="hidden md:flex items-center gap-1 text-[12px] font-bold text-brand hover:underline transition-colors duration-200"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </FadeIn>
  );
}
