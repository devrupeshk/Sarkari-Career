import { Search, Sparkles } from "lucide-react";

export function Hero() {
  const quickTags = [
    { label: "SSC CGL 2026", href: "/ssc" },
    { label: "UPSC Civil Services", href: "/upsc" },
    { label: "RRB NTPC", href: "/railway" },
    { label: "IBPS PO", href: "/bank" },
    { label: "UP Police Const.", href: "/police-defence" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#060D1A] via-[#09152B] to-[#040810] pt-16 sm:pt-18 pb-8 sm:pb-10 overflow-hidden">
      {/* Mesh glowing blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[60%] rounded-full bg-brand/10 blur-[130px] animate-float pointer-events-none" />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[55%] rounded-full bg-brand/5 blur-[125px] pointer-events-none animate-float" 
        style={{ animationDelay: "3s" }} 
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-1 relative z-10">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-brand" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90">
              India's #1 Govt Jobs Resource
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-4.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight leading-tight">
            Your Gateway to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-[#FF5F5F] to-[#FFA6A6]">Government Jobs</span>
          </h1>
          <p className="text-[11px] sm:text-[13px] md:text-[14px] text-slate-300 max-w-xl mx-auto leading-relaxed">
            Fastest and most accurate updates for official government exam job alerts, notifications, results, admit cards, and detailed syllabi across India.
          </p>
        </div>

        {/* Search Bar */}
        <div 
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("open-search"));
            }
          }}
          className="relative max-w-xl mx-auto cursor-pointer"
        >
          <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_15px_40px_-5px_rgba(0,0,0,0.3)] h-12 sm:h-13 px-1 sm:px-1.5 group hover:bg-white/10 transition-all duration-300">
            <Search className="w-4 h-4 text-white/60 ml-3.5 shrink-0 transition-colors group-hover:text-brand" />
            <input
              type="text"
              placeholder="Search jobs, results, admit cards, states..."
              readOnly
              className="flex-1 min-w-0 px-2.5 sm:px-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none bg-transparent cursor-pointer"
            />
            <div className="hidden sm:flex items-center gap-1 mr-3 pointer-events-none select-none">
              <kbd className="h-5.5 inline-flex items-center rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[9px] font-black text-white/60 uppercase">
                Ctrl K
              </kbd>
            </div>
            <button className="bg-gradient-to-r from-brand to-brand-hover hover:scale-105 active:scale-95 text-white font-bold text-xs sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg shadow-brand/20 transition-all duration-300 shrink-0">
              Search Portal
            </button>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Trending:
          </span>
          {quickTags.map((tag) => (
            <a
              key={tag.label}
              href={tag.href}
              className="px-3 py-1 bg-white/5 hover:bg-brand/10 border border-white/5 hover:border-brand/20 text-white/80 hover:text-white text-[9px] sm:text-[10px] font-semibold rounded-full transition-all duration-300"
            >
              {tag.label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

