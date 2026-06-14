"use client";

import Link from "next/link";
import { Send, MapPin, Mail, ArrowRight, Download, Heart, ChevronRight } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa6";
import { useSettings } from "@/hooks/useSettings";

const quickLinks = [
  { label: "Latest Jobs", href: "/categories" },
  { label: "Admit Card", href: "/admit-card" },
  { label: "Result", href: "/results" },
  { label: "Syllabus", href: "/syllabus" },
  { label: "Answer Key", href: "/answer-key" },
  { label: "Education Updates", href: "/education-levels" },
  { label: "University Updates", href: "/education-levels" },
];

const jobCategories = [
  { label: "Current Jobs", href: "/current-job" },
  { label: "Bank Jobs", href: "/bank" },
  { label: "Teaching Jobs", href: "/teaching" },
  { label: "Railway Jobs", href: "/railway" },
  { label: "Police/Defence", href: "/police-defence" },
  { label: "Engineering Jobs", href: "/engineering" },
  { label: "Medical Jobs", href: "/medical" },
  { label: "SSC Jobs", href: "/ssc" },
  { label: "UPSC Jobs", href: "/upsc" },
];

const resources = [
  { label: "Admissions", href: "/admission" },
  { label: "Important Links", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const importantLinks = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Sitemap", href: "#" },
];

export function Footer() {
  const settings = useSettings();
  return (
    <footer className="relative bg-gradient-to-b from-[#0F172A] via-[#0B1324] to-[#070D19] px-4 md:px-6 overflow-hidden border-t border-white/10 pt-16 pb-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[140px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[120px] -ml-36 -mb-36 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <div className="relative pb-16 pt-2">
          <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-white/15 hover:border-brand/35 transition-all duration-500 rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] group/sub">
            {/* Custom glowing mesh backgrounds inside sub card */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/15 rounded-full blur-3xl opacity-60 pointer-events-none group-hover/sub:bg-brand/25 transition-all duration-500" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl opacity-60 pointer-events-none" />

            {/* Decorative icon */}
            <div className="hidden lg:flex absolute top-10 right-10 w-16 h-16 bg-white/[0.03] border border-white/15 rounded-2xl items-center justify-center backdrop-blur-md shadow-inner group-hover/sub:border-brand/40 group-hover/sub:bg-brand/5 group-hover/sub:-translate-y-1 transition-all duration-500">
              <Send className="w-6 h-6 text-brand group-hover/sub:scale-110 group-hover/sub:rotate-12 transition-transform duration-300" />
            </div>

            <div className="max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand/15 border border-brand/40 text-brand text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-[0_2px_10px_rgba(239,68,68,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Stay Updated
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight bg-gradient-to-r from-white via-white to-slate-200 bg-clip-text text-transparent">
                Subscribe to instant Job Alerts
              </h3>
              <p className="text-slate-300 mb-8 text-xs sm:text-sm leading-relaxed max-w-xl">
                Get real-time updates on latest government job releases, official exam admit cards, result announcements, and answer keys sent straight to your mailbox.
              </p>

              <form
                className="flex flex-col sm:flex-row gap-3 max-w-lg"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-1 relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-brand transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] hover:bg-white/[0.06] border border-white/15 rounded-2xl text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand/60 focus:bg-slate-900/90 focus:ring-4 focus:ring-brand/15 transition-all duration-300 shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-brand to-rose-600 hover:from-rose-600 hover:to-brand text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-brand/25 hover:shadow-brand/45 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Subscribe Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-brand opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand & About */}
            <div className="lg:col-span-2 space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand via-brand to-rose-600 flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 group-hover:shadow-brand/40 transition-all duration-300 relative overflow-hidden">
                  <span className="text-white font-black text-sm tracking-wider relative z-10">SCH</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-600 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-white tracking-tight group-hover:text-brand transition-colors duration-300">
                    Sarkari Career Hub
                  </span>
                  <span className="text-[10px] text-brand uppercase font-extrabold tracking-widest -mt-0.5">
                    Gateway to Government Jobs
                  </span>
                </div>
              </Link>

              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm max-w-sm font-medium">
                Your primary reference portal for government updates. Providing highly accurate, rapid notifications to keep job-seekers ahead in their academic and career pursuits.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 text-slate-200 hover:text-white transition-colors duration-300 text-xs sm:text-sm group/contact">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover/contact:border-brand/40 group-hover/contact:bg-brand/5 flex items-center justify-center transition-all duration-300">
                    <MapPin className="w-4 h-4 text-brand group-hover/contact:scale-110 transition-transform" />
                  </div>
                  <span className="font-medium">India</span>
                </div>
                <a
                  href="mailto:contact@sarkaricareerhub.com"
                  className="flex items-center gap-3.5 text-slate-200 hover:text-white transition-colors duration-300 text-xs sm:text-sm group/contact"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover/contact:border-brand/40 group-hover/contact:bg-brand/5 flex items-center justify-center transition-all duration-300">
                    <Mail className="w-4 h-4 text-brand group-hover/contact:scale-110 transition-transform" />
                  </div>
                  <span className="underline-offset-4 group-hover/contact:underline font-medium">contact@sarkaricareerhub.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">
                  Connect With Us
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { icon: FaTelegram, color: "hover:bg-gradient-to-br hover:from-[#0088CC] hover:to-[#00a2ed] hover:shadow-[#0088CC]/30", href: settings.telegramLink },
                    { icon: FaWhatsapp, color: "hover:bg-gradient-to-br hover:from-[#25D366] hover:to-[#20ba5a] hover:shadow-[#25D366]/30", href: settings.whatsappLink },
                    { icon: FaFacebookF, color: "hover:bg-gradient-to-br hover:from-[#1877F2] hover:to-[#3b8efb] hover:shadow-[#1877F2]/30", href: "#" },
                    { icon: FaXTwitter, color: "hover:bg-gradient-to-br hover:from-[#0f1419] hover:to-[#2d3748] hover:shadow-black/30", href: "#" },
                    { icon: FaYoutube, color: "hover:bg-gradient-to-br hover:from-[#FF0000] hover:to-[#dd0000] hover:shadow-[#FF0000]/30", href: "#" },
                    { icon: FaInstagram, color: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:shadow-[#DD2A7B]/30", href: "#" }
                  ].map((soc, i) => (
                    <Link
                      key={i}
                      href={soc.href}
                      className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${soc.color} hover:border-transparent`}
                    >
                      <soc.icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="relative pb-3 mb-6 select-none group/title">
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
                  Quick Links
                </h4>
                <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-gradient-to-r from-brand to-rose-600 rounded-full group-hover/title:w-16 transition-all duration-300" />
              </div>
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-300 hover:text-white hover:pl-2.5 inline-flex items-center gap-1 transition-all duration-300 group font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-brand opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Categories */}
            <div>
              <div className="relative pb-3 mb-6 select-none group/title">
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
                  Job Categories
                </h4>
                <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-gradient-to-r from-brand to-rose-600 rounded-full group-hover/title:w-16 transition-all duration-300" />
              </div>
              <ul className="space-y-3.5">
                {jobCategories.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-300 hover:text-white hover:pl-2.5 inline-flex items-center gap-1 transition-all duration-300 group font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-brand opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="relative pb-3 mb-6 select-none group/title">
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
                  Resources
                </h4>
                <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-gradient-to-r from-brand to-rose-600 rounded-full group-hover/title:w-16 transition-all duration-300" />
              </div>
              <ul className="space-y-3.5">
                {resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-300 hover:text-white hover:pl-2.5 inline-flex items-center gap-1 transition-all duration-300 group font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-brand opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* App Download */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h5 className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-3">
                  Download Mobile App
                </h5>
                <button className="flex items-center gap-3 px-4.5 py-2.5 bg-white/[0.03] hover:bg-gradient-to-r hover:from-brand/10 hover:to-rose-500/5 hover:border-brand/35 border border-white/10 rounded-2xl text-white transition-all duration-300 group w-full text-left hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/5">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center border border-brand/20 group-hover:bg-brand/20 transition-all">
                    <Download className="w-4.5 h-4.5 text-brand group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-300 font-semibold tracking-wider uppercase">Get it on Android</div>
                    <div className="text-xs font-extrabold tracking-tight mt-0.5">Sarkari Career Hub</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* States Pill Bar */}
        <div className="pb-12">
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.25)]">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
              Browse Government Jobs by State
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Uttar Pradesh",
                "Bihar",
                "Madhya Pradesh",
                "Rajasthan",
                "Maharashtra",
                "Delhi",
                "West Bengal",
                "Tamil Nadu",
                "Karnataka",
                "Gujarat",
                "Punjab",
                "Haryana",
                "Jharkhand",
                "Odisha",
                "Chhattisgarh",
                "Uttarakhand",
                "Himachal Pradesh",
              ].map((state) => (
                <Link
                  key={state}
                  href={`/${state.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-gradient-to-r hover:from-brand/15 hover:to-rose-500/10 border border-white/10 hover:border-brand/40 text-slate-300 hover:text-white text-[11px] font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(239,68,68,0.12)]"
                >
                  {state}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-slate-300 text-xs text-center lg:text-left font-medium">
              <span>
                Copyright &copy; {new Date().getFullYear()} Sarkari Career Hub.
                All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-brand fill-brand animate-pulse" />
              <span>in India</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-slate-300 text-xs font-medium">
              {importantLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-brand transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-center text-slate-400 text-[10px] sm:text-xs mt-6 max-w-4xl mx-auto leading-relaxed border-t border-white/10 pt-5 select-none">
            Disclaimer: This website is for informational purposes only. Always
            verify details from official government sources before completing any application forms. We are not
            liable for any errors or decisions made based on this compiled information.
          </p>
        </div>
      </div>
    </footer>
  );
}
