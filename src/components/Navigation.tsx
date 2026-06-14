"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { fetchEducations, type ApiEducationItem } from "@/lib/api";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  Briefcase,
  FileText,
  Trophy,
  BookOpen,
  GraduationCap,
  Key,
  FileCheck,
  Building2,
  MapPin,
  Landmark,
  Train,
  Shield,
  Newspaper,
  Stethoscope,
  Globe,
  type LucideIcon,
} from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  dropdown?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Latest Jobs",
    href: "/categories",
    icon: Briefcase,
    dropdown: [
      {
        label: "Current Job",
        href: "/current-job",
        icon: Building2,
      },
      { label: "Bank Jobs", href: "/bank", icon: Landmark },
      { label: "SSC Jobs", href: "/ssc", icon: FileText },
      { label: "UPSC Jobs", href: "/upsc", icon: Globe },
      { label: "Teaching Jobs", href: "/teaching", icon: BookOpen },
      { label: "Railway Jobs", href: "/railway", icon: Train },
      {
        label: "Police/Defence Jobs",
        href: "/police-defence",
        icon: Shield,
      },
      {
        label: "Engineering Jobs",
        href: "/engineering",
        icon: Briefcase,
      },
      { label: "Medical Jobs", href: "/medical", icon: Stethoscope },
    ],
  },
  { label: "Admit Card", href: "/admit-card", icon: FileText },
  { label: "Result", href: "/results", icon: Trophy },
  { label: "Syllabus", href: "/syllabus", icon: BookOpen },
  {
    label: "Education",
    href: "/education-levels",
    icon: GraduationCap,
    dropdown: [
      { label: "10th Pass Jobs", href: "/10th-pass" },
      { label: "12th Pass Jobs", href: "/12th-pass" },
      { label: "Diploma Jobs", href: "/diploma" },
      { label: "ITI Jobs", href: "/iti" },
      { label: "Graduate Jobs", href: "/graduate" },
      { label: "Post Graduate Jobs", href: "/post-graduate" },
    ],
  },
  { label: "Answer Key", href: "/answer-key", icon: Key },
  { label: "Blog", href: "/latest-blog", icon: Newspaper },
];

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [leavingHome, setLeavingHome] = useState(false);
  const pathname = usePathname();
  const [educations, setEducations] = useState<ApiEducationItem[]>([]);

  useEffect(() => {
    const getEducations = async () => {
      try {
        const data = await fetchEducations();
        setEducations(data);
      } catch (err) {
        console.error("Failed to fetch educations for navigation:", err);
      }
    };
    getEducations();
  }, []);

  const dynamicNavLinks = useMemo(() => {
    return navLinks.map((link) => {
      if (link.label === "Education") {
        let dropdownItems: DropdownItem[] = educations.length > 0
          ? educations.slice(0, 9).map((edu) => {
            let slug = edu.slug;
            if (slug === "any-graduate") slug = "graduate";
            if (slug === "btech-be") slug = "btech";
            return {
              label: `${edu.name} Jobs`,
              href: `/${slug}`,
            };
          })
          : link.dropdown || [];

        if (educations.length > 9) {
          dropdownItems.push({
            label: "View All Education...",
            href: "/education-levels",
          });
        }

        return {
          ...link,
          dropdown: dropdownItems.slice(0, 10),
        };
      }
      return link;
    });
  }, [educations]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setScrolled(false);
    setLeavingHome(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = useCallback(() => {
    setLeavingHome(true);
    setScrolled(false);
  }, []);

  const isHomePage = pathname === "/" && !leavingHome;

  if (!mounted) {
    return <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-navy" />;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-navbar border-slate-200/40 py-1"
            : isHomePage
              ? "bg-transparent border-transparent py-2.5"
              : "bg-navy backdrop-blur-xl border-transparent py-1.5"
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={handleLinkClick}
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center font-extrabold text-[12.5px] text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-all duration-300">
                <span className="relative z-10 font-sans tracking-wide">SCH</span>
                <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"
                    }`}
                >
                  Sarkari Career Hub
                </span>
                <span className={`text-[9px] uppercase font-bold tracking-wider -mt-1 transition-colors duration-300 ${scrolled ? "text-slate-400" : "text-white/60"
                  }`}>
                  Gateway to Success
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {dynamicNavLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && setOpenDropdown(link.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.dropdown ? (
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-300 relative group/btn ${scrolled
                          ? "text-slate-700 hover:text-brand hover:bg-slate-100/60"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180 text-brand" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-1 px-3 py-1.5 text-[13px] font-bold rounded-lg transition-all duration-300 ${scrolled
                          ? "text-slate-700 hover:text-brand hover:bg-slate-100/60"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Glassmorphic Dropdown */}
                  {link.dropdown && openDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-dropdown py-3 min-w-[240px] border border-slate-200/50 ring-1 ring-black/5 animate-accordion-down">
                        <div className="absolute top-0 left-6 w-3 h-3 bg-white border-t border-l border-slate-200/50 -translate-y-[6px] rotate-45" />
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-brand/5 hover:text-brand transition-all duration-200"
                          >
                            {item.icon && (
                              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand/10 transition-colors">
                                <item.icon className="w-4 h-4 text-slate-500" />
                              </div>
                            )}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Subscribe Action & Mobile Menu Toggle */}
            <div className="flex items-center gap-2.5">
              <button className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/20 hover:scale-105 hover:animate-pulse-glow transition-all duration-300">
                <Newspaper className="w-3.5 h-3.5" />
                Subscribe
              </button>

              <button
                className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${scrolled
                    ? "bg-slate-100 border-slate-200/60 text-slate-800"
                    : "bg-white/10 border-white/10 text-white"
                  }`}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-md transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-slate-100 overflow-y-auto z-70 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-bold text-white text-xs">
                  SCH
                </div>
                <span className="font-extrabold text-sm text-slate-900">Navigation</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {dynamicNavLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label,
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-100/60"
                      >
                        <span className="flex items-center gap-2.5">
                          <link.icon className="w-4 h-4 text-slate-400" />
                          {link.label}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180 text-brand" : ""
                            }`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="ml-6 space-y-1 mt-1 pl-4 border-l border-slate-100">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={handleLinkClick}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 rounded-lg hover:bg-brand/5 hover:text-brand"
                            >
                              {item.icon && (
                                <item.icon className="w-3.5 h-3.5 text-slate-400" />
                              )}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-100/60"
                    >
                      <link.icon className="w-4 h-4 text-slate-400" />
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 pt-6 border-t border-slate-100">
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/20">
                <Newspaper className="w-4 h-4" />
                Subscribe Alerts
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

