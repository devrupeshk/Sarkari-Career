export interface ToolItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  href: string;
  featured?: boolean;
}

export interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export interface AgeCategory {
  label: string;
  minAge: number;
  maxAge: number;
  color: string;
  description: string;
}

export interface EligibilityTip {
  exam: string;
  crucialDate: string;
  generalAge: string;
  relaxation: string;
  note: string;
}

export const tools: ToolItem[] = [
  {
    slug: "age-calculator",
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes",
    icon: "Cake",
    category: "Utility",
    href: "/tool/age-calculator",
    featured: true,
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    description: "Resize and compress images to specific dimensions and file sizes",
    icon: "Image",
    category: "Utility",
    href: "/tool/image-resizer",
    featured: true,
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage increase/decrease, and more",
    icon: "Percent",
    category: "Utility",
    href: "/percentage-calculator",
    featured: true,
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and health category",
    icon: "Activity",
    category: "Health",
    href: "/bmi-calculator",
    featured: true,
  },
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Estimate your income tax based on new tax regime slabs",
    icon: "Calculator",
    category: "Finance",
    href: "/income-tax-calculator",
  },
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    description: "Calculate compound interest with different compounding periods",
    icon: "TrendingUp",
    category: "Finance",
    href: "/compound-interest",
  },
];

export const articles: ArticleItem[] = [
  {
    slug: "age-calculation-guide",
    title: "Age Calculation: Everything You Need to Know About Government Job Eligibility",
    category: "Career Guide",
    date: "2026-05-10",
    readTime: "8 min read",
    excerpt: "Understanding how age is calculated for government job applications, including crucial DoB to specific date calculations and relaxation rules.",
    content: `Age calculation plays a crucial role in government job eligibility. Every recruitment notification specifies age limits, and understanding how to calculate your exact age as of the crucial date is essential for every candidate.

## Why Age Matters in Government Jobs

Government jobs in India have strict age eligibility criteria because:
- Different posts have different age requirements (usually 18-56 years)
- Age relaxation is provided for reserved categories
- The crucial date for age calculation varies by organization

## Understanding the Crucial Date

The "crucial date" or "cut-off date" is the date as of which your age is calculated. This date varies:
- UPSC exams: Use 1st August of the year
- SSC exams: Use 1st January of the year
- Railway exams: Usually 1st July of the year
- State exams: Varies by state

## Age Relaxation Rules

The Government of India provides age relaxation under:
- SC/ST: 5 years
- OBC: 3 years
- PwD: 10 years (plus category relaxation)
- Ex-servicemen: Military service duration + 3 years
- Government employees: As per rules

## How to Calculate Your Age

Your age on the crucial date is calculated from your Date of Birth (DoB) mentioned in:
- Matriculation Certificate
- Date of Birth Certificate
- School Leaving Certificate

### Example Calculation
If your DoB is 15th August 1995 and the crucial date is 1st January 2026:
- Years: 30 years (from 15 Aug 1995 to 15 Aug 2025)
- Additional months: 4 months 17 days (15 Aug to 1 Jan)
- Total Age: 30 years 4 months 17 days

## Important Tips

1. Always keep your birth certificate safe
2. Ensure DoB matches in all documents
3. Calculate age for each exam separately
4. Don't rely on approximate age calculations

## Common Mistakes to Avoid

- Using current date instead of crucial date
- Ignoring month calculations
- Forgetting to check year boundaries
- Not considering leap years properly`,
    tags: ["age calculation", "eligibility", "government jobs", "career guide"],
    featured: true,
  },
  {
    slug: "government-job-age-limits",
    title: "Complete Guide to Age Limits for Major Government Exams in 2026",
    category: "Exam Guide",
    date: "2026-05-08",
    readTime: "12 min read",
    excerpt: "Detailed breakdown of age limits for UPSC, SSC, Railway, Bank, and State PSC exams with reservation benefits.",
    content: `Preparing for government exams requires a thorough understanding of age eligibility criteria. This comprehensive guide covers age limits for all major government job categories in India.

## UPSC Civil Services

- Minimum Age: 21 years
- Maximum Age: 32 years (General)
- Attempts: 6 (General), 9 (OBC), Unlimited (SC/ST)

## SSC Combined Graduate Level

- Age Limit: 18-32 years (General)
- Relaxation: Up to 40 years for PwD
- Educational Qualification: Bachelor's degree

## Railway Exams (RRB)

- Minimum Age: 18 years
- Maximum Age: 33 years (varies by post)
- Graduate Level posts: 18-35 years

## Bank Exams (PO/Clerk)

- PO: 20-30 years (General)
- Clerk: 20-28 years (General)
- Special provisions for expert candidates`,
    tags: ["UPSC", "SSC", "Railway", "Bank", "Age Limit"],
    featured: true,
  },
];

export const ageCategories: AgeCategory[] = [
  { label: "Entry Level", minAge: 18, maxAge: 25, color: "bg-emerald-500", description: "Fresh graduates & entry positions" },
  { label: "Mid Career", minAge: 25, maxAge: 35, color: "bg-blue-500", description: "Experienced professionals" },
  { label: "Senior Level", minAge: 35, maxAge: 45, color: "bg-purple-500", description: "Senior positions & promotions" },
  { label: "Expert Level", minAge: 45, maxAge: 56, color: "bg-orange-500", description: "Top positions & special roles" },
];

export const eligibilityTips: EligibilityTip[] = [
  { exam: "UPSC Civil Services", crucialDate: "1st August 2026", generalAge: "21-32 Years", relaxation: "SC/ST: 37, OBC: 35", note: "6 attempts for General" },
  { exam: "SSC CGL/CHSL", crucialDate: "1st January 2026", generalAge: "18-32 Years", relaxation: "SC/ST: 37, OBC: 35", note: "Age as on 01.01.2026" },
  { exam: "Railway RRB", crucialDate: "1st July 2026", generalAge: "18-33 Years", relaxation: "SC/ST: 38, OBC: 36", note: "Varies by post level" },
  { exam: "Bank PO/Clerk", crucialDate: "As per notification", generalAge: "20-30 Years", relaxation: "SC/ST: 35, OBC: 33", note: "Varies by bank" },
];

export const ageFacts = [
  { label: "Total Days Lived", icon: "📅", getValue: (d: number) => d.toLocaleString() },
  { label: "Total Hours", icon: "⏰", getValue: (d: number) => (d * 24).toLocaleString() },
  { label: "Total Minutes", icon: "⏱️", getValue: (d: number) => (d * 24 * 60).toLocaleString() },
  { label: "Total Seconds", icon: "⌚", getValue: (d: number) => (d * 24 * 60 * 60).toLocaleString() },
  { label: "Weekdays Worked", icon: "💼", getValue: (d: number) => Math.floor(d * 5 / 7).toLocaleString() },
  { label: "Weekend Days", icon: "🎉", getValue: (d: number) => Math.floor(d * 2 / 7).toLocaleString() },
];