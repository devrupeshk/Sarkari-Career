import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 50000, suffix: '+', label: 'Total Job Listings' },
  { value: 25000, suffix: '+', label: 'Admit Cards Issued' },
  { value: 30000, suffix: '+', label: 'Results Declared' },
  { value: 28, suffix: '', label: 'States Covered' },
  { value: 10000000, suffix: '+', label: 'Monthly Visitors', display: '10M+' },
];

function AnimatedNumber({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(value * eased));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (value >= 1000000) return display || `${(num / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `${Math.floor(num / 1000)},${String(num % 1000).padStart(3, '0')}`;
    return String(num);
  };

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-extrabold bg-linear-to-br from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm">
        {display && isInView ? display : `${formatNumber(count)}${suffix}`}
      </div>
      <div className="text-xs md:text-sm font-semibold tracking-wider text-slate-400 uppercase mt-2">{stats.find(s => s.value === value)?.label}</div>
    </div>
  );
}

export function StatisticsBar() {
  return (
    <section className="relative bg-navy py-12 md:py-16 overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[200%] bg-brand/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} display={stat.display} />
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
