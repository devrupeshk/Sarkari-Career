"use client";

import { useEffect, useState } from "react";
import { fetchDesignations, type ApiDesignationItem } from "@/lib/api";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

export function JobsByDesignation() {
  const [designationsList, setDesignationsList] = useState<ApiDesignationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDesignations = async () => {
      try {
        const data = await fetchDesignations();
        setDesignationsList(data);
      } catch (err) {
        console.error("Failed to load designations for sidebar:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDesignations();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
        <Loader2 className="w-5 h-5 text-brand animate-spin" />
      </div>
    );
  }

  if (designationsList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-card rounded-2xl p-4 relative overflow-hidden group">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 relative z-10">
        <h4 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-3 bg-brand rounded-full" />
          Jobs by Designation
        </h4>
        <Link
          href="/designations"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-brand to-brand-hover hover:scale-105 active:scale-95 px-2.5 py-1 rounded-full shadow-md shadow-brand/10 transition-all duration-200"
        >
          View All
        </Link>
      </div>

      {/* Vertical list of designation levels */}
      <ul className="space-y-0.5 relative z-10">
        {designationsList.slice(0, 10).map((desg) => {
          const slug = desg.slug.endsWith("-jobs") ? desg.slug : `${desg.slug}-jobs`;

          return (
            <li key={desg.id}>
              <Link
                href={`/${slug}`}
                className="flex items-center justify-between px-2 py-1.5 rounded-xl text-[13.5px] font-bold text-slate-600 hover:text-brand hover:bg-brand/5 hover:translate-x-0.5 transition-all duration-200 group/item"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <ChevronRight className="w-3.5 h-3.5 text-brand shrink-0 group-hover/item:translate-x-0.5 transition-transform duration-200" />
                  <span className="truncate">{desg.name} Jobs</span>
                </div>

              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
