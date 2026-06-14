import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqData } from "@/data/jobs";
import { StaggerContainer, StaggerItem } from "@/components/FadeIn";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-off-white">
      <div className="max-w-[850px] mx-auto px-4 md:px-6">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
          {/* ── Decorative background blobs ── */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)' }} />

          {/* ── Header ── */}
          <div className="relative px-6 py-5 border-b border-slate-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1324 0%, #1E3A5F 60%, #1a2f52 100%)' }}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)' }} />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Icon bubble */}
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.25), rgba(245,158,11,0.15))', border: '1px solid rgba(234,179,8,0.3)' }}>
                  <div className="absolute inset-0 rounded-xl animate-ping opacity-20" style={{ background: 'rgba(234,179,8,0.4)' }} />
                  <HelpCircle className="w-5 h-5 relative z-10" style={{ color: '#FCD34D' }} />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-white tracking-tight">Frequently Asked Questions</h3>
                  <p className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Everything you need to know
                  </p>
                </div>
              </div>
              {/* FAQ count badge */}
              <span className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(234,179,8,0.15)', color: '#FCD34D', border: '1px solid rgba(234,179,8,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FCD34D' }} />
                {faqData.length} Questions
              </span>
            </div>
          </div>

          {/* ── FAQ Items ── */}
          <div className="p-4 sm:p-5 space-y-3">
            <StaggerContainer staggerDelay={0.06} className="space-y-3">
              {faqData.map((item, i) => {
                const isOpen = activeIndex === i;
                const gradients = [
                  'from-rose-500 to-orange-500',
                  'from-violet-500 to-purple-600',
                  'from-sky-500 to-blue-600',
                  'from-emerald-500 to-teal-600',
                  'from-amber-500 to-yellow-500',
                  'from-pink-500 to-rose-500',
                  'from-indigo-500 to-blue-500',
                  'from-cyan-500 to-sky-600',
                ];
                const grad = gradients[i % gradients.length];
                return (
                  <StaggerItem key={i}>
                    <div
                      className={`group relative rounded-xl border overflow-hidden transition-all duration-300 ${isOpen
                          ? 'border-slate-300 shadow-[0_4px_20px_rgba(15,23,42,0.08)]'
                          : 'border-slate-100 hover:border-slate-200 hover:shadow-[0_2px_12px_rgba(15,23,42,0.05)]'
                        }`}
                      style={{ background: isOpen ? 'linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)' : '#FAFAFA' }}
                    >
                      {/* Left accent bar — shows on open */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-all duration-300 bg-gradient-to-b ${grad} ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        {/* Gradient number bubble */}
                        <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-gradient-to-br ${grad} ${isOpen ? 'shadow-[0_4px_12px_rgba(0,0,0,0.15)]' : 'opacity-60'}`}>
                          <span className="text-white text-[11px] font-black">{String(i + 1).padStart(2, '0')}</span>
                        </div>

                        {/* Question text */}
                        <span className={`flex-1 min-w-0 text-[13.5px] font-semibold leading-snug transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                          {item.q}
                        </span>

                        {/* Chevron with animated ring */}
                        <div className={`relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-slate-900 shadow-md' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                          <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-slate-500'}`} />
                        </div>
                      </button>

                      {/* Answer panel */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 sm:px-5 pb-4 pl-[4.25rem]">
                          {/* Divider */}
                          <div className={`h-px mb-3.5 bg-gradient-to-r ${grad} opacity-20`} />
                          {/* Answer text */}
                          <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* ── Bottom note ── */}
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
              <span className="text-amber-600 text-[8px] font-black">!</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Have other questions? Visit our{" "}
              <span className="text-brand font-semibold">contact & help desk</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
