/**
 * API client helpers for fetching data from the dashboard's public API.
 * The dashboard runs on a separate port (default: 3000 in development).
 * Set NEXT_PUBLIC_DASHBOARD_URL in .env.local to override.
 */

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ||
  process.env.DASHBOARD_URL ||
  "http://localhost:3001";

export type JobStatus = 'NEW' | 'STARTED' | 'ONLINE' | 'APPLY NOW' | 'OUT' | 'ALERT' | 'SOON' | 'EXTEND' | 'PDF' | 'DATE';

export interface ApiJobItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  education: string;
  state: string;
  designation?: string;
  status: JobStatus;
  lastDate: string;
  totalPosts: number;
  featured: boolean;
  tags: string | null;
  createdAt: string;
}

export interface ApiJobDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  education: string;
  state: string;
  totalPosts: number;
  ageLimit: string;
  qualification: string;
  applicationFee: string;
  salary: string;
  lastDate: string;
  status: JobStatus;
  notificationDate: string;
  onlineFormStart: string;
  admitCard: string;
  examDate: string;
  resultDate: string | null;
  selectionProcess: string;
  howToApply: string | null;
  applyLink: string;
  notificationPdf: string;
  syllabusPdf: string;
  description: string | null;
  officialWebsite: string | null;
  telegramLink: string | null;
  whatsappLink: string | null;
  applicantLogin: string | null;
  checkEligibility: string | null;
  customLinks: string | null;
  faqs?: string | null;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  secondaryKeywords: string | null;
  tags: string | null;
  schemaSuggestion: string | null;
  views: number;
  designation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingsResponse {
  jobs: ApiJobItem[];
  total: number;
  page: number;
  limit: number;
}

export interface FetchListingsOptions {
  category?: string;
  education?: string;
  state?: string;
  designation?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}

/**
 * Fetch paginated job listings from the dashboard public API.
 */
export async function fetchListings(
  options: FetchListingsOptions = {}
): Promise<ListingsResponse> {
  const params = new URLSearchParams();
  if (options.category)    params.set("category",    options.category);
  if (options.education)   params.set("education",   options.education);
  if (options.state)       params.set("state",       options.state);
  if (options.designation) params.set("designation", options.designation);
  if (options.search)      params.set("search",      options.search);
  if (options.featured)    params.set("featured",    "true");
  if (options.limit)       params.set("limit",       String(options.limit));
  if (options.page)        params.set("page",        String(options.page));

  const url = `${DASHBOARD_URL}/api/public/listings?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch listings: ${res.status} – ${text}`);
  }

  return res.json() as Promise<ListingsResponse>;
}

/**
 * Fetch a single job post by slug from the dashboard public API.
 */
export async function fetchJobBySlug(slug: string): Promise<ApiJobDetail | null> {
  const url = `${DASHBOARD_URL}/api/public/posts/${encodeURIComponent(slug)}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch job post: ${res.status} – ${text}`);
  }

  return res.json() as Promise<ApiJobDetail>;
}

export interface ApiEducationItem {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
}

export async function fetchEducations(): Promise<ApiEducationItem[]> {
  const url = `${DASHBOARD_URL}/api/public/educations`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch educations: ${res.status} – ${text}`);
  }

  return res.json() as Promise<ApiEducationItem[]>;
}

export interface ApiDesignationItem {
  id: string;
  name: string;
  slug: string;
  jobCount: number;
}

export async function fetchDesignations(): Promise<ApiDesignationItem[]> {
  const url = `${DASHBOARD_URL}/api/public/designations`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch designations: ${res.status} – ${text}`);
  }

  return res.json() as Promise<ApiDesignationItem[]>;
}

export interface ApiBlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  state: string;
  status: string;
  description: string;
  views: number;
  createdAt: string;
}

export async function fetchBlogs(): Promise<ApiBlogItem[]> {
  const url = `${DASHBOARD_URL}/api/blogs`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch blogs: ${res.status} – ${text}`);
  }
  return res.json() as Promise<ApiBlogItem[]>;
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlogItem | null> {
  const url = `${DASHBOARD_URL}/api/blogs?slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch blog post: ${res.status} – ${text}`);
  }
  return res.json() as Promise<ApiBlogItem>;
}

export interface ApiSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  telegramLink: string;
  whatsappLink: string;
  seoTitle: string;
  seoDescription: string;
  emailSubscriptionLink?: string;
}

export async function fetchSettings(): Promise<ApiSettings> {
  const url = `${DASHBOARD_URL}/api/public/settings`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch settings: ${res.status} – ${text}`);
  }
  return res.json() as Promise<ApiSettings>;
}
