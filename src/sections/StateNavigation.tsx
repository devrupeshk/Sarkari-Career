import { MapPin } from "lucide-react";
import { states } from "@/data/states";
import { SectionHeader } from "@/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/FadeIn";
import Link from "next/link";

export function StateNavigation() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] relative overflow-hidden border-t border-slate-200/40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader
          label="🗺️ BROWSE BY STATE"
          heading="Find Jobs in Your State"
        />

        <StaggerContainer
          staggerDelay={0.02}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 mt-4"
        >
          {states.map((state) => (
            <StaggerItem key={state.code}>
              <Link
                href={`/${state.name
                  .toLowerCase()
                  .replace(/[^a-z0-9 ]/g, "")
                  .replace(/\s+/g, "-")}`}
                className="flex items-center justify-center gap-1.5 bg-white/75 backdrop-blur-md rounded-xl px-3 py-2 text-[11.5px] font-bold text-slate-700 shadow-card border border-white/60 hover:bg-gradient-to-br hover:from-brand hover:to-brand-hover hover:text-white hover:shadow-card-hover hover:border-transparent hover:-translate-y-1 transition-all duration-300 group"
              >
                <MapPin className="w-3 h-3 text-brand group-hover:text-white shrink-0 transition-colors duration-300" />
                <span className="truncate tracking-wide">{state.name}</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

