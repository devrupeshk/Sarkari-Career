import { states } from "@/data/states";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function getStateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
}

export function StateJobsSidebar() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4 relative overflow-hidden group">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 relative z-10">
        <h4 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-brand rounded-full" />
          Jobs by State
        </h4>
        <Link
          href="/states"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-brand to-brand-hover hover:scale-105 active:scale-95 px-2.5 py-1 rounded-full shadow-md shadow-brand/10 transition-all duration-200"
        >
          View All
        </Link>
      </div>

      {/* Vertical list */}
      <ul className="space-y-0.5 relative z-10">
        {states.slice(0, 10).map((state) => (
          <li key={state.code}>
            <Link
              href={`/${getStateSlug(state.name)}`}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[13.5px] font-bold text-slate-600 hover:text-brand hover:bg-brand/5 hover:translate-x-0.5 transition-all duration-200 group/item"
            >
              <ChevronRight className="w-3.5 h-3.5 text-brand shrink-0 group-hover/item:translate-x-0.5 transition-transform duration-200" />
              <span>{state.name} Govt Jobs</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

