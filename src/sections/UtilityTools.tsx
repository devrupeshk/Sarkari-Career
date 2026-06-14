import {
  Calculator,
  FileSearch,
  FileText as FileTextIcon,
  Image,
  Sparkles,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import Link from "next/link";

const tools = [
  {
    icon: Calculator,
    label: "Age Calculator",
    desc: "Calculate precise age for forms",
    href: "/tool/age-calculator",
    popular: true,
  },
  {
    icon: FileSearch,
    label: "Image Resizer",
    desc: "Crop & resize photo / signature",
    href: "/tool/image-resizer",
    popular: true,
  },
  {
    icon: FileTextIcon,
    label: "PDF to Word",
    desc: "Convert document format instantly",
  },
  {
    icon: Image,
    label: "Image to PDF",
    desc: "Merge image files into single PDF",
  },
  {
    icon: Image,
    label: "Compress 50KB",
    desc: "Resize image to under 50KB limit",
  },
  {
    icon: Image,
    label: "Compress 100KB",
    desc: "Resize image to under 100KB limit",
  },
  {
    icon: Image,
    label: "Compress 120KB",
    desc: "Resize image to under 120KB limit",
  },
  {
    icon: Image,
    label: "Compress 150KB",
    desc: "Resize image to under 150KB limit",
  },
  {
    icon: Image,
    label: "Compress 160KB",
    desc: "Resize image to under 160KB limit",
  },
  {
    icon: Image,
    label: "Compress 200KB",
    desc: "Resize image to under 200KB limit",
  },
  {
    icon: Image,
    label: "Compress 250KB",
    desc: "Resize image to under 250KB limit",
  },
];

export function UtilityTools() {
  return (
    <section
      id="documents"
      className="py-8 md:py-10 relative bg-slate-50/60 border-t border-slate-200/50 overflow-hidden"
    >
      {/* Dynamic background mesh */}
      <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-6 text-center">
          <SectionHeader label="🛠️ ONLINE UTILITIES" heading="Useful Tools & Resizers" />
          <p className="text-slate-500 text-[12px] font-medium max-w-xl mx-auto mt-1.5 leading-relaxed">
            Supercharge your application process. Crop images, calculate ages, and format documents instantly with zero file uploads.
          </p>
        </div>

        <div className="grid">
          <StaggerContainer
            staggerDelay={0.05}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3.5"
          >
            {tools.map((tool, i) => (
              <StaggerItem key={i}>
                <Link
                  href={tool.href || "#"}
                  className="flex flex-col bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-xl p-4 hover:border-brand/30 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group h-full relative overflow-hidden"
                >
                  {/* Popular Badge */}
                  {tool.popular && (
                    <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-0.5 text-[8.5px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 rounded-full shadow-md shadow-orange-500/10 z-20">
                      <Sparkles className="w-2 h-2" />
                      POPULAR
                    </span>
                  )}

                  {/* Decorative card glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />

                  {/* Icon Badge */}
                  <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                    <tool.icon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Labels */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[13px] font-extrabold text-slate-800 group-hover:text-brand transition-colors duration-200 mb-0.5">
                        {tool.label}
                      </h4>
                      <p className="text-[11px] font-semibold text-slate-500 leading-normal mb-3">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand group-hover:translate-x-0.5 transition-transform duration-200 uppercase tracking-wider">
                      Open Tool
                      <span className="text-[11px]">→</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

