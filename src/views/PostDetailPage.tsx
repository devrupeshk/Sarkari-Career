"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  IndianRupee,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Bookmark,
  Share2,
  Printer,
  ExternalLink,
  Briefcase,
  Zap,
  Bell,
  Link2,
  HelpCircle,
  CheckCircle2,
  Star,
  Shield,
  MousePointerClick,
  Sparkles,
  Globe,
  LogIn,
  FileDown,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";
import type { ApiJobDetail } from "@/lib/api";
import { FadeIn } from "@/components/FadeIn";
import { StatusBadge } from "@/components/StatusBadge";
import { cleanHtml, parseFaqFromHtml, stripFaqFromHtml, stripSocialChannelsFromHtml } from "@/lib/utils";
import { CategoryQuickLinks } from "@/sections/CategoryQuickLinks";
import { JobsByEducation } from "@/sections/JobsByEducation";
import { JobsByDesignation } from "@/sections/JobsByDesignation";
import { StateJobsSidebar } from "@/sections/StateJobsSidebar";
import { EmailSubscription } from "@/sections/EmailSubscription";
import { useSettings } from "@/hooks/useSettings";

const cleanSocialLink = (customLink: string | null | undefined, fallbackLink: string) => {
  if (!customLink) return fallbackLink;
  const normalized = customLink.trim();
  if (
    normalized === "" ||
    normalized === "https://t.me/rupeshk" ||
    normalized === "https://chat.whatsapp.com/rupeshk" ||
    normalized === "https://chat.whatsapp.com/..." ||
    normalized === "https://t.me/..." ||
    normalized.endsWith("/...")
  ) {
    return fallbackLink;
  }
  return normalized;
};

interface PostDetailPageProps {
  slug: string;
  /** Pre-fetched job from the dashboard API (passed by the server page component) */
  job: ApiJobDetail | null;
}

export function PostDetailPage({ slug, job }: PostDetailPageProps) {
  const settings = useSettings();
  const telegramLink = cleanSocialLink(job?.telegramLink, settings.telegramLink);
  const whatsappLink = cleanSocialLink(job?.whatsappLink, settings.whatsappLink);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [parsedFaq, setParsedFaq] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    if (job) {
      let extracted: { question: string; answer: string }[] = [];
      if (job.faqs && job.faqs !== '[]') {
        try {
          extracted = typeof job.faqs === "string" ? JSON.parse(job.faqs) : job.faqs;
        } catch (e) {
          console.error("Failed to parse faqs:", e);
        }
      }
      if (extracted.length === 0 && job.description) {
        extracted = parseFaqFromHtml(job.description);
      }
      setParsedFaq(extracted);
    }
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-off-white text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6 mx-auto">
          <AlertCircle className="w-10 h-10 text-brand animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Job Post Not Found</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md leading-relaxed">
          The recruitment details page you are trying to access does not exist or has been archived.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand/20 hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Parse customLinks JSON if available
  let customLinks: { label: string; url: string; type?: 'primary' | 'secondary' | 'info' }[] = [];
  try {
    if (job.customLinks && job.customLinks !== '[]') {
      customLinks = JSON.parse(job.customLinks);
    }
  } catch {
    customLinks = [];
  }

  // Build category-based action labels
  let applyLabel = "Apply Online";
  let sidebarActionLabel = "Start Application";
  const categoryLower = (job.category || "").toLowerCase();
  if (categoryLower === "admit-card" || categoryLower === "admit-cards") {
    applyLabel = "Download Admit Card";
    sidebarActionLabel = "Download Admit Card";
  } else if (categoryLower === "result" || categoryLower === "results") {
    applyLabel = "Check Result";
    sidebarActionLabel = "Check Result";
  } else if (categoryLower === "answer-key" || categoryLower === "answer-keys") {
    applyLabel = "Download Answer Key";
    sidebarActionLabel = "Download Answer Key";
  } else if (categoryLower === "syllabus") {
    applyLabel = "Download Syllabus";
    sidebarActionLabel = "Download Syllabus";
  }

  // Build importantLinks from db fields
  const importantLinks: { label: string; url: string; type?: 'primary' | 'secondary' | 'info' }[] = [
    ...(job.applyLink && job.applyLink !== 'Coming Soon' ? [{ label: applyLabel, url: job.applyLink, type: 'primary' as const }] : []),
    ...(job.notificationPdf && job.notificationPdf !== 'Coming Soon' ? [{ label: 'Official Notification PDF', url: job.notificationPdf, type: 'info' as const }] : []),
    ...(job.syllabusPdf ? [{ label: 'Download Syllabus', url: job.syllabusPdf, type: 'info' as const }] : []),
    ...(job.officialWebsite ? [{ label: 'Official Website', url: job.officialWebsite, type: 'info' as const }] : []),
    ...(job.applicantLogin && job.applicantLogin !== 'Coming Soon' ? [{ label: 'Applicant Login', url: job.applicantLogin, type: 'secondary' as const }] : []),
    ...(job.checkEligibility ? [{ label: 'Check Eligibility', url: job.checkEligibility, type: 'secondary' as const }] : []),
    ...customLinks,
  ];

  // Build tags array
  const tags = job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [job.category, job.education, job.state].filter(Boolean);

  // Build important dates
  const importantDates = [
    ...(job.notificationDate ? [{ label: 'Notification Date', date: job.notificationDate }] : []),
    ...(job.onlineFormStart ? [{ label: 'Online Form Start', date: job.onlineFormStart }] : []),
    ...(job.lastDate ? [{ label: 'Last Date to Apply', date: job.lastDate }] : []),
    ...(job.admitCard ? [{ label: 'Admit Card', date: job.admitCard }] : []),
    ...(job.examDate ? [{ label: 'Exam Date', date: job.examDate }] : []),
    ...(job.resultDate ? [{ label: 'Result Date', date: job.resultDate }] : []),
  ];

  // Normalise post fields for display
  const post = {
    title: job.title,
    slug: job.slug,
    category: job.category,
    department: job.state || 'Government of India',
    status: job.status as any,
    lastDate: job.lastDate,
    examDate: job.examDate,
    totalPosts: String(job.totalPosts),
    ageLimit: job.ageLimit || 'As per notification',
    qualification: job.qualification || 'As per notification',
    applicationFee: job.applicationFee || 'As per notification',
    salary: job.salary || 'As per pay matrix',
    selectionProcess: job.selectionProcess || 'As per notification',
    howToApply: job.howToApply || '',
    importantDates,
    tags,
    relatedPosts: [] as string[],
    applyUrl: job.applyLink !== 'Coming Soon' ? job.applyLink : undefined,
    sidebarActionLabel,
    content: job.description ? stripFaqFromHtml(cleanHtml(stripSocialChannelsFromHtml(job.description))) : undefined,
    importantLinks,
    faq: parsedFaq,
  };

  return (
    <div className="min-h-screen bg-off-white overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-navy pt-20 pb-16 overflow-hidden">
        {/* Gradient meshes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-navy to-navy pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-brand/8 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Breadcrumb + Action Row */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                <Link href="/" className="hover:text-white transition-colors duration-200 font-medium flex items-center gap-1">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <Link href={`/${post.category}`} className="hover:text-white transition-colors capitalize duration-200 font-medium">
                  {post.category.replace(/-/g, " ")}
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="text-white/70 font-medium truncate max-w-[160px] xs:max-w-[220px] sm:max-w-sm bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                  {post.title}
                </span>
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <button title="Bookmark" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm">
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button title="Share" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button title="Print" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm" onClick={() => typeof window !== "undefined" && window.print()}>
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Hero Title Area */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 lg:max-w-[70%]">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/20 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.15)] shrink-0 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-transparent" />
                  <Briefcase className="w-8 h-8 text-brand relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Status badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <StatusBadge status={post.status as any} />
                    <span className="text-[10px] text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 tracking-wider uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      Applications Open
                    </span>

                  </div>

                  <h1 className="text-xl sm:text-2xl lg:text-[30px] lg:leading-[37.5px] font-bold lg:tracking-[-0.75px] text-white mb-4">
                    {post.title}
                  </h1>


                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto  sm:px-6 md:px-8">
          <div className="flex flex-col xl:flex-row gap-8">

            {/* ══ LEFT / MAIN CONTENT ══ */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* ── Social Channels Join Section ── */}
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.03] to-teal-500/[0.01] hover:from-emerald-500/[0.06] hover:to-teal-500/[0.03] transition-all duration-300 hover:-translate-y-0.5 shadow-sm shadow-emerald-500/5 hover:shadow-emerald-500/12 gap-4"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="relative w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <span className="absolute inset-0 rounded-xl bg-emerald-500/15 animate-ping opacity-35 pointer-events-none" />
                        <svg className="w-5.5 h-5.5 fill-current relative z-10" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 4.999L2 22l5.135-1.348a9.97 9.97 0 004.877 1.28h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0012.012 2zm5.795 14.13c-.253.71-1.47 1.39-2.022 1.48-.49.08-1.127.14-3.267-.74-2.737-1.13-4.502-3.91-4.64-4.09-.137-.18-1.148-1.53-1.148-2.92 0-1.39.73-2.074 1.012-2.355.28-.28.618-.35.815-.35h.59c.19 0 .45.07.7.67.25.62.87 2.12.945 2.27.076.15.127.33.026.53-.1.2-.15.33-.3.51-.15.18-.315.4-.45.54-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11.1.09.2.18.315.27.915.815 1.57.86 1.83.6.26-.26.85-1.08-1.34.08-.12.22-.2.38-.13l2.25 1.06c.15.07.25.15.3.26.05.11.05.62-.2 1.34z" />
                        </svg>
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className="text-[14px] font-bold text-slate-800 mb-0.5 leading-snug">Join WhatsApp Channel</h4>
                        <p className="text-[11px] text-slate-500 leading-snug truncate">Get job updates & results on WhatsApp</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] tracking-wider px-3.5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm shadow-emerald-500/10 shrink-0 relative z-10 w-full sm:w-auto">
                      JOIN GROUP
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>

                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-sky-500/15 bg-gradient-to-br from-sky-500/[0.03] to-blue-500/[0.01] hover:from-sky-500/[0.06] hover:to-blue-500/[0.03] transition-all duration-300 hover:-translate-y-0.5 shadow-sm shadow-sky-500/5 hover:shadow-sky-500/12 gap-4"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-sky-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="relative w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <span className="absolute inset-0 rounded-xl bg-sky-500/15 animate-ping opacity-35 pointer-events-none" />
                        <svg className="w-5.5 h-5.5 fill-current relative z-10" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.82-.76 4.38-1.07 6.07-.13.71-.39.95-.64.97-.56.05-1-.38-1.55-.74-.85-.56-1.33-.9-2.16-1.45-.96-.64-.34-.99.21-1.56.14-.15 2.65-2.43 2.7-2.65.01-.03.01-.13-.05-.18-.06-.05-.14-.03-.21-.02-.09.02-1.58 1-4.47 2.96-.42.29-.8.43-1.15.42-.38-.01-1.11-.21-1.66-.39-.67-.22-1.2-.33-1.15-.7.03-.2.3-.4.81-.61 3.16-1.38 5.27-2.29 6.33-2.73 3.01-1.26 3.63-1.48 4.04-1.48.09 0 .29.02.42.13.11.09.14.21.16.3.02.09.02.26 0 .42z" />
                        </svg>
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className="text-[14px] font-bold text-slate-800 mb-0.5 leading-snug">Join Telegram Channel</h4>
                        <p className="text-[11px] text-slate-500 leading-snug truncate">Get instant alerts for government jobs</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white font-black text-[10px] tracking-wider px-3.5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm shadow-sky-500/10 shrink-0 relative z-10 w-full sm:w-auto">
                      JOIN NOW
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </a>
                </div>
              </FadeIn>

              {/* ── Full Article Content ── */}
              {post.content && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                  <div className="p-5 sm:p-6 article-content">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              )}

              {/* ── FAQ Section ── */}
              {post.faq && post.faq.length > 0 && (
                <FadeIn delay={0.35}>
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": post.faq.map((item) => ({
                          "@type": "Question",
                          "name": item.question,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer,
                          },
                        })),
                      }),
                    }}
                  />
                  <PremiumFaqSection
                    faqs={post.faq}
                    openFaq={openFaq}
                    setOpenFaq={setOpenFaq}
                  />
                </FadeIn>
              )}

              {/* ── Important Links ── */}
              {post.importantLinks && post.importantLinks.length > 0 && (
                <FadeIn delay={0.4}>
                  <ImportantLinksSection links={post.importantLinks} />
                </FadeIn>
              )}

              {/* ── Tags ── */}
              <FadeIn delay={0.45}>
                <div className="flex flex-wrap items-center gap-2 py-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Tags:</span>
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200 hover:border-brand/30 text-slate-500 hover:text-brand text-[12px] font-semibold px-3 py-1 rounded-full transition-all duration-300 cursor-pointer hover:shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* ══ RIGHT SIDEBAR ══ */}
            <div className="xl:w-[320px] shrink-0">
              <div className="xl:sticky xl:top-24 space-y-5">

                {/* Jobs by Category Widget */}
                <FadeIn direction="left" delay={0.15}>
                  <CategoryQuickLinks />
                </FadeIn>

                {/* Jobs by Education Widget */}
                <FadeIn direction="left" delay={0.2}>
                  <JobsByEducation />
                </FadeIn>

                {/* Jobs by Designation Widget */}
                <FadeIn direction="left" delay={0.22}>
                  <JobsByDesignation />
                </FadeIn>

                {/* Jobs by State Widget */}
                <FadeIn direction="left" delay={0.25}>
                  <StateJobsSidebar />
                </FadeIn>

                {/* Email Newsletter Subscription Widget */}
                <FadeIn direction="left" delay={0.28}>
                  <EmailSubscription />
                </FadeIn>

                {/* Job Alerts Subscribe Widget */}
                <FadeIn direction="left" delay={0.3}>
                  <div className="relative bg-gradient-to-br from-navy to-[#0F203A] border border-white/10 rounded-2xl p-5 overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand/15 rounded-full blur-2xl pointer-events-none group-hover:bg-brand/25 transition-all duration-500" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10">
                      <div className="relative w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 rounded-xl bg-brand/15 animate-ping opacity-50 pointer-events-none" />
                        <Bell className="w-4 h-4 text-brand group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <h4 className="text-[14px] font-bold text-white mb-1.5 flex items-center gap-1.5">
                        Get Instant Job Alerts
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
                      </h4>
                      <p className="text-[11.5px] text-slate-400 mb-4 leading-relaxed">
                        Get verified exam alerts, admit cards, and results directly on your phone.
                      </p>
                      <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#0088CC] hover:bg-[#0077B3] text-white text-[12.5px] font-bold rounded-full py-2.5 mb-2 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15.82-.76 4.38-1.07 6.07-.13.71-.39.95-.64.97-.56.05-1-.38-1.55-.74-.85-.56-1.33-.9-2.16-1.45-.96-.64-.34-.99.21-1.56.14-.15 2.65-2.43 2.7-2.65.01-.03.01-.13-.05-.18-.06-.05-.14-.03-.21-.02-.09.02-1.58 1-4.47 2.96-.42.29-.8.43-1.15.42-.38-.01-1.11-.21-1.66-.39-.67-.22-1.2-.33-1.15-.7.03-.2.3-.4.81-.61 3.16-1.38 5.27-2.29 6.33-2.73 3.01-1.26 3.63-1.48 4.04-1.48.09 0 .29.02.42.13.11.09.14.21.16.3.02.09.02.26 0 .42z" /></svg>
                        Join Telegram Now
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-[12.5px] font-bold rounded-full py-2.5 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 4.999L2 22l5.135-1.348a9.97 9.97 0 004.877 1.28h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.062A9.92 9.92 0 0012.012 2zm5.795 14.13c-.253.71-1.47 1.39-2.022 1.48-.49.08-1.127.14-3.267-.74-2.737-1.13-4.502-3.91-4.64-4.09-.137-.18-1.148-1.53-1.148-2.92 0-1.39.73-2.074 1.012-2.355.28-.28.618-.35.815-.35h.59c.19 0 .45.07.7.67.25.62.87 2.12.945 2.27.076.15.127.33.026.53-.1.2-.15.33-.3.51-.15.18-.315.4-.45.54-.15.15-.31.31-.13.62.18.3.79 1.3 1.7 2.11.1.09.2.18.315.27.915.815 1.57.86 1.83.6.26-.26.85-1 1.08-1.34.08-.12.22-.2.38-.13l2.25 1.06c.15.07.25.15.3.26.05.11.05.62-.2 1.34z" /></svg>
                        Join WhatsApp Group
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────── HELPER COMPONENTS ─────────────────── */

/* ── Premium FAQ Accordion Section ── */
function PremiumFaqSection({
  faqs,
  openFaq,
  setOpenFaq,
}: {
  faqs: { question: string; answer: string }[];
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}) {
  return (
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
              <h3 className="text-[18px] font-semibold text-white tracking-wide">Frequently Asked Questions</h3>
            </div>
          </div>

        </div>
      </div>

      {/* ── FAQ Items ── */}
      <div className="p-4 sm:p-5 space-y-3">
        {faqs.map((item, i) => {
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
            <div
              key={i}
              className="group relative rounded-xl border overflow-hidden border-slate-300 shadow-[0_4px_20px_rgba(15,23,42,0.08)]"
              style={{ background: 'linear-gradient(135deg, #FAFBFF 0%, #F8FAFF 100%)' }}
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-gradient-to-b ${grad}`} />

              <div className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left">
                {/* Gradient number bubble */}
                <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-gradient-to-br ${grad}`}>
                  <span className="text-white text-[11px] font-black">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Question text */}
                <span className="flex-1 min-w-0 text-[13.5px] font-bold leading-snug text-slate-900">
                  {item.question}
                </span>
              </div>

              {/* Answer panel */}
              <div className="px-4 sm:px-5 pb-4 pl-4 sm:pl-[4.25rem]">
                {/* Divider */}
                <div className={`h-px mb-3.5 bg-gradient-to-r ${grad} opacity-20`} />
                {/* Answer text */}
                <p className="text-[13px] text-slate-600 leading-relaxed font-semibold">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}

/* ── Important Links Premium Section ── */
function ImportantLinksSection({ links }: { links: { label: string; url: string; type?: 'primary' | 'secondary' | 'info' }[] }) {
  const getLinkConfig = (type?: string, label?: string) => {
    const lbl = (label || '').toLowerCase();
    if (type === 'primary' || lbl.includes('apply')) return {
      gradient: 'from-rose-500 via-red-500 to-orange-500',
      glow: 'shadow-[0_8px_32px_rgba(239,68,68,0.35)] hover:shadow-[0_12px_40px_rgba(239,68,68,0.5)]',
      badge: 'bg-white/20 text-white border-white/30',
      chip: 'bg-white/15 text-white/90 border-white/20',
      chipText: 'APPLY NOW',
      icon: MousePointerClick,
      textColor: 'text-white',
      arrowColor: 'text-white/60',
      numBg: 'bg-white/20 text-white',
      isGradient: true,
    };
    if (type === 'secondary' || lbl.includes('login') || lbl.includes('eligibility') || lbl.includes('status')) return {
      gradient: 'from-violet-600 via-purple-600 to-indigo-600',
      glow: 'shadow-[0_8px_32px_rgba(124,58,237,0.25)] hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)]',
      badge: 'bg-white/20 text-white border-white/30',
      chip: 'bg-white/15 text-white/90 border-white/20',
      chipText: lbl.includes('login') ? 'LOGIN' : 'CHECK',
      icon: lbl.includes('login') ? LogIn : ClipboardCheck,
      textColor: 'text-white',
      arrowColor: 'text-white/60',
      numBg: 'bg-white/20 text-white',
      isGradient: true,
    };
    if (type === 'info' || lbl.includes('pdf') || lbl.includes('notification') || lbl.includes('syllabus') || lbl.includes('download')) return {
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glow: 'shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.4)]',
      badge: 'bg-white/20 text-white border-white/30',
      chip: 'bg-white/15 text-white/90 border-white/20',
      chipText: lbl.includes('pdf') || lbl.includes('download') || lbl.includes('syllabus') ? 'DOWNLOAD' : 'READ',
      icon: lbl.includes('pdf') || lbl.includes('syllabus') ? FileDown : Globe,
      textColor: 'text-white',
      arrowColor: 'text-white/60',
      numBg: 'bg-white/20 text-white',
      isGradient: true,
    };
    // default
    return {
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      glow: 'shadow-[0_8px_32px_rgba(14,165,233,0.2)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.35)]',
      badge: 'bg-white/20 text-white border-white/30',
      chip: 'bg-white/15 text-white/90 border-white/20',
      chipText: 'VISIT',
      icon: Globe,
      textColor: 'text-white',
      arrowColor: 'text-white/60',
      numBg: 'bg-white/20 text-white',
      isGradient: true,
    };
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
      {/* Header */}
      <div className="relative px-5 py-4 overflow-hidden border-b border-slate-100" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.02) 0%, rgba(239,68,68,0.02) 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(239,68,68,0.3))', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
              <Sparkles className="w-1.5 h-1.5 text-white" />
            </span>
          </div>
          <div>
            <h3 className="text-[14px] font-extrabold tracking-wide uppercase flex items-center gap-2 text-slate-800">
              Important Links
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {links.length} Links
              </span>
            </h3>
            <p className="text-[11px] mt-0.5 text-slate-500">All official government portals</p>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link, i) => {
            const cfg = getLinkConfig(link.type, link.label);
            const IconComp = cfg.icon;
            return (
              <Link
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${cfg.glow}`}
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              >

                {/* Actual gradient using Tailwind */}
                <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cfg.gradient}`} />
                {/* Shimmer overlay */}
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)' }} />

                {/* Icon */}
                <span className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <IconComp className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </span>
                {/* Label + chip */}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-white leading-tight truncate">{link.label}</p>
                  <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {cfg.chipText}
                  </span>
                </div>
                {/* Arrow */}
                <ArrowUpRight className="relative z-10 w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
              </Link>
            );
          })}
        </div>


      </div>
    </div>
  );
}




