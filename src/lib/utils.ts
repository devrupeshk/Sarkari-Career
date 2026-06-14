import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans HTML from the CMS/API so our custom stylesheet always wins.
 *
 * What we strip:
 *  - Full <style> blocks
 *  - Every inline `style="..."` attribute (prevents font/color/border overrides)
 *  - Legacy HTML presentation attributes: border, cellspacing, cellpadding, width, height, bgcolor, align, valign, color, face, size
 *
 * What we keep:
 *  - Structural / semantic HTML intact
 *  - href, target, rel on links
 *  - Table structure: <table>, <thead>, <tbody>, <tr>, <th>, <td>
 *
 * Table wrapping:
 *  - Every <table> is wrapped in <div class="table-responsive"> for mobile scrolling.
 */
export function cleanHtml(html: string | undefined): string {
  if (!html) return "";

  let cleaned = html;

  // 1. Remove <style> blocks entirely
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // 2. Strip ALL inline style attributes — our globals.css takes over completely
  cleaned = cleaned.replace(/\s+style\s*=\s*(["'])[\s\S]*?\1/gi, "");

  // 3. Remove legacy presentational attributes that browsers still honour
  //    (border, cellspacing, cellpadding, width, height, bgcolor, align, valign, color, face, size)
  cleaned = cleaned.replace(
    /\s+(border|cellspacing|cellpadding|width|height|bgcolor|align|valign|color|face|size)\s*=\s*(["'])[^"']*\2/gi,
    ""
  );
  // Also handle unquoted attribute values  e.g. border=1
  cleaned = cleaned.replace(
    /\s+(border|cellspacing|cellpadding|width|height|bgcolor|align|valign|color|face|size)\s*=\s*\S+/gi,
    ""
  );

  // 4. Wrap every bare <table> in a responsive scroll container
  //    Guard against double-wrapping (already wrapped from a previous pass)
  cleaned = cleaned.replace(
    /(?<!class="table-responsive">)<table([\s\S]*?)>([\s\S]*?)<\/table>/gi,
    '<div class="table-responsive"><table$1>$2</table></div>'
  );

  return cleaned;
}

/**
 * Extracts FAQ question/answer pairs from HTML containing <dl><dt>...<dd>... structure.
 * Returns array of { question, answer } objects.
 */
export function parseFaqFromHtml(html: string | undefined): { question: string; answer: string }[] {
  if (!html || typeof window === 'undefined') return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const dls = doc.querySelectorAll('dl');
    const faqs: { question: string; answer: string }[] = [];
    dls.forEach((dl) => {
      const dts = dl.querySelectorAll('dt');
      dts.forEach((dt) => {
        const question = dt.textContent?.replace(/^Q\d+\.?\s*/i, '').trim() || '';
        let answer = '';
        let next = dt.nextElementSibling;
        while (next && next.tagName.toLowerCase() === 'dd') {
          answer += (next.textContent?.trim() || '');
          next = next.nextElementSibling;
        }
        if (question && answer) {
          faqs.push({ question, answer });
        }
      });
    });
    return faqs;
  } catch {
    return [];
  }
}

/**
 * Removes all <dl>...</dl> blocks from HTML (used to avoid rendering FAQ twice).
 */
export function stripFaqFromHtml(html: string): string {
  return html.replace(/<dl[\s\S]*?<\/dl>/gi, '');
}

/**
 * Removes all hardcoded WhatsApp and Telegram invitation blocks from HTML.
 */
export function stripSocialChannelsFromHtml(html: string | undefined): string {
  if (!html) return "";
  let stripped = html;

  // Strip WhatsApp channel div with flex-wrap and display flex
  stripped = stripped.replace(/<div[^>]*?display:\s*flex;[^>]*?flex-wrap:\s*wrap;[^>]*?>[\s\S]*?Join WhatsApp Channel[\s\S]*?Join Group<\/a>\s*<\/div>/gi, "");

  // Strip Telegram channel div with flex-wrap and display flex
  stripped = stripped.replace(/<div[^>]*?display:\s*flex;[^>]*?flex-wrap:\s*wrap;[^>]*?>[\s\S]*?Join Telegram Channel[\s\S]*?Join Now<\/a>\s*<\/div>/gi, "");

  // Clean up any empty paragraphs or line breaks left immediately after them
  stripped = stripped.replace(/<p><\/p>\s*<br\s*\/?>/gi, "");

  return stripped;
}
