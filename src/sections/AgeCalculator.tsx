"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  AlertCircle, 
  Info, 
  Users, 
  Copy, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  CalendarDays,
  History,
  TrendingUp,
  Share2,
  Percent,
  Activity,
  Calculator as CalculatorIcon,
  Layers,
  Wrench
} from "lucide-react";
import { articles, ageCategories, eligibilityTips, ageFacts, tools } from "@/data/tools";

// Helper to render icon by name
const ToolIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Percent": return <Percent className={className} />;
    case "Activity": return <Activity className={className} />;
    case "Calculator": return <CalculatorIcon className={className} />;
    case "TrendingUp": return <TrendingUp className={className} />;
    default: return <Layers className={className} />;
  }
};

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: { days: number; date: string };
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTargetDate(today);
  }, []);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    if (birth > target) {
      setResult(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const nextBirthday = new Date(birth);
    nextBirthday.setFullYear(target.getFullYear());
    
    // If birthday already passed this year, set to next year
    const birthdayThisYear = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (birthdayThisYear < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    } else {
      nextBirthday.setFullYear(target.getFullYear());
    }
    
    const daysUntil = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthday: {
        days: daysUntil === 366 || daysUntil === 365 ? 0 : daysUntil,
        date: nextBirthday.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      }
    });
  };

  useEffect(() => {
    if (birthDate) {
      calculateAge();
    } else {
      setResult(null);
    }
  }, [birthDate, targetDate]);

  const copyResult = () => {
    if (!result) return;
    const text = `My Age: ${result.years} Years, ${result.months} Months, ${result.days} Days. Calculated using Age Calculator.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What is a 'Crucial Date' in government exams?",
      a: "The crucial date is the specific cut-off date mentioned in the recruitment notification. Your age must fall within the prescribed limits exactly on this date. For example, UPSC often uses August 1st, while SSC uses January 1st."
    },
    {
      q: "How do I calculate age relaxation?",
      a: "Age relaxation is usually added to the upper age limit. If the limit is 30 years and you have a 3-year OBC relaxation, your effective upper limit becomes 33 years."
    },
    {
      q: "Does this calculator account for leap years?",
      a: "Yes, our calculator uses standard date objects which automatically account for leap years (February 29th) during calculations."
    },
    {
      q: "Which date of birth should I use?",
      a: "Always use the Date of Birth mentioned in your Matriculation (10th) or Secondary School Certificate, as this is the primary document verified by recruitment boards."
    }
  ];

  return (
    <div className="min-h-screen bg-off-white pt-20 pb-16">
      {/* Modern Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Professional Utility Tool
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy mb-6 leading-tight">
                Calculate Age for <span className="text-brand">Job Eligibility</span>
              </h1>
              <p className="text-body-text text-lg md:text-xl leading-relaxed mb-8">
                Accurate, fast, and easy-to-use age calculator designed for government job aspirants. 
                Verify your eligibility against crucial dates instantly.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  100% Accurate
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  Leap Year Aware
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-status-green" />
                  Free Forever
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-72 h-72 bg-brand/5 rounded-3xl rotate-6 absolute -inset-4" />
              <div className="w-72 h-72 bg-white border-2 border-slate-100 rounded-3xl shadow-xl relative flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand/20">
                  <CalendarDays className="w-10 h-10 text-white" />
                </div>
                <p className="text-navy font-bold text-xl mb-2">Trusted by 10k+</p>
                <p className="text-slate-500 text-sm">Students monthly for exam eligibility checks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Calculator Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Calculator Card */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-1 bg-slate-100" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-navy">Enter Details</h2>
                    <p className="text-slate-500 text-sm">Fill in your dates to calculate</p>
                  </div>
                  <History className="w-6 h-6 text-slate-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-navy flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full h-14 border-2 border-slate-100 bg-slate-50/50 rounded-2xl px-5 text-navy focus:outline-none focus:border-brand focus:bg-white transition-all duration-300 font-semibold"
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">As per your 10th class marksheet</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-navy flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Calculate As Of
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full h-14 border-2 border-slate-100 bg-slate-50/50 rounded-2xl px-5 text-navy focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-semibold"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">The "Crucial Date" from notification</p>
                  </div>
                </div>

                {/* Quick Selection */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tight mr-2">Presets:</span>
                  {[18, 21, 25, 30].map((age) => (
                    <button
                      key={age}
                      onClick={() => {
                        const date = new Date();
                        date.setFullYear(date.getFullYear() - age);
                        setBirthDate(date.toISOString().split("T")[0]);
                      }}
                      className="px-4 py-2 bg-slate-50 border border-slate-100 hover:border-brand/30 hover:bg-brand/5 rounded-xl text-xs font-bold text-navy transition-all duration-200"
                    >
                      {age} Years Ago
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setBirthDate("");
                      setTargetDate(new Date().toISOString().split("T")[0]);
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-brand transition-all ml-auto"
                  >
                    Reset Form
                  </button>
                </div>

                {/* Result Display */}
                {result ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-4">
                        <button 
                          onClick={copyResult}
                          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
                          title="Copy Result"
                        >
                          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <div className="relative flex flex-col items-center">
                        <span className="text-brand font-bold text-xs uppercase tracking-[0.2em] mb-6">Calculation Results</span>
                        
                        <div className="grid grid-cols-3 gap-4 md:gap-12 text-center w-full max-w-md">
                          <div>
                            <div className="text-4xl md:text-6xl font-extrabold mb-1">{result.years}</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Years</div>
                          </div>
                          <div>
                            <div className="text-4xl md:text-6xl font-extrabold mb-1">{result.months}</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Months</div>
                          </div>
                          <div>
                            <div className="text-4xl md:text-6xl font-extrabold mb-1">{result.days}</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Days</div>
                          </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                              <span className="text-2xl">🎂</span>
                            </div>
                            <div className="text-left">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Birthday</p>
                              <p className="font-bold text-sm">{result.nextBirthday.date}</p>
                            </div>
                          </div>
                          <div className="px-6 py-3 bg-brand rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-brand/20">
                            {result.nextBirthday.days} Days Left
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Extended Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {ageFacts.map((fact, i) => (
                        <div
                          key={i}
                          className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-brand/20 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{fact.icon}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{fact.label}</span>
                          </div>
                          <div className="text-lg font-bold text-navy">{fact.getValue(result.totalDays)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-navy font-bold text-lg mb-2">Ready to Calculate?</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Select your date of birth above to see your exact age breakdown</p>
                  </div>
                )}
              </div>
            </div>

            {/* Eligibility Table */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy">Exam Eligibility Guide</h3>
                  <p className="text-slate-500 text-sm">Quick reference for major government exams</p>
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                  Updated 2026
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organization</th>
                      <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Crucial Date</th>
                      <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age Limit</th>
                      <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Attempts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {eligibilityTips.map((tip, i) => (
                      <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="py-5 px-8">
                          <div className="font-bold text-navy group-hover:text-brand transition-colors">{tip.exam}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{tip.relaxation}</div>
                        </td>
                        <td className="py-5 px-8">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                            <Clock className="w-3 h-3" />
                            {tip.crucialDate}
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <div className="text-sm font-bold text-slate-700">{tip.generalAge}</div>
                        </td>
                        <td className="py-5 px-8 text-right">
                          <div className="text-[11px] font-bold text-slate-500">{tip.note}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How it Works Section */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-navy mb-8 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand" />
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/20 transition-all">
                    <h4 className="font-bold text-navy mb-3 flex items-start gap-2 text-sm md:text-base">
                      <span className="w-6 h-6 bg-brand/10 text-brand rounded-lg flex items-center justify-center shrink-0 text-xs">Q</span>
                      {faq.q}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Calculation Guide */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">How to Calculate Age Manually?</h3>
                  <p className="text-slate-500 text-sm">Step-by-step guide for manual verification</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-navy text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 text-sm md:text-base">Align the Dates</h4>
                    <p className="text-slate-500 text-sm">Write the 'Calculation Date' (Crucial Date) on top and your 'Date of Birth' below it in YYYY-MM-DD format.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-navy text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 text-sm md:text-base">Subtract the Days</h4>
                    <p className="text-slate-500 text-sm">If DOB day is greater than calculation day, borrow 30/31 days from the months column (depending on the month).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-navy text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 text-sm md:text-base">Subtract the Months & Years</h4>
                    <p className="text-slate-500 text-sm">Continue subtracting months and then years. Borrow 12 months from the years column if needed.</p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4" />
                    Pro Tip
                  </h5>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Always cross-verify your manual calculation with an online tool like ours to ensure accuracy, especially when you are close to the age limit. 
                    Even a 1-day difference can lead to application rejection!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Age Categories Sidebar */}
            <div className="bg-navy rounded-3xl shadow-xl overflow-hidden text-white">
              <div className="p-8 pb-4">
                <h3 className="text-xl font-bold mb-2">Career Stages</h3>
                <p className="text-slate-400 text-sm">Age-based job categories</p>
              </div>
              <div className="p-4 space-y-3">
                {ageCategories.map((cat, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.label}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${cat.color} text-white`}>
                        {cat.minAge}-{cat.maxAge}Y
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{cat.description}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 pt-4">
                <button className="w-full py-4 bg-brand hover:bg-brand-hover rounded-2xl font-bold text-sm transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2">
                  Browse Jobs by Age <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* More Tools Sidebar */}
            <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">More Utility Tools</h3>
                  <p className="text-xs text-slate-500">Other calculators for you</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {tools.filter(t => t.slug !== "age-calculator").map((tool, i) => (
                  <Link 
                    key={i} 
                    href={tool.href}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                  >
                    <div className="w-10 h-10 bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-100 rounded-xl flex items-center justify-center transition-all">
                      <ToolIcon name={tool.icon} className="w-5 h-5 text-slate-600 group-hover:text-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-navy group-hover:text-brand transition-colors truncate">{tool.title}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{tool.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
