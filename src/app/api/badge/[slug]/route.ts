import { getBadgeInfo, type BadgeTier } from "@/lib/badge/data";
import { MARK_PATH, MARK_VIEWBOX, WORDMARK_PATHS, WORDMARK_VIEWBOX } from "@/lib/brand/logo-paths";

export const revalidate = 86400;

const C = {
  indigo: "#282B59",
  teal: "#91F2CF",
  tealInk: "#0C7A5A",
  border: "#E2E6F0",
  white: "#FFFFFF",
  slate: "#6A6E80",
  light: "#C7CAE3",
};

const FONT = "system-ui, -apple-system, Segoe UI, Arial, sans-serif";
const WORD_RATIO = 463 / 72; // wordmark width per unit of height

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

const mark = (x: number, y: number, size: number, fill: string) =>
  `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${MARK_VIEWBOX}"><path fill-rule="evenodd" clip-rule="evenodd" fill="${fill}" d="${MARK_PATH}"/></svg>`;

const wordmark = (x: number, y: number, h: number, fill: string) =>
  `<svg x="${x}" y="${y}" width="${(h * WORD_RATIO).toFixed(1)}" height="${h}" viewBox="${WORDMARK_VIEWBOX}" fill="${fill}">${WORDMARK_PATHS.map((d) => `<path d="${d}"/>`).join("")}</svg>`;

/**
 * Official mark + "pmrfp.com" wordmark, content centred in the frame so there's
 * no empty tail. Dark is see-through with a hairline edge, so it sits on any dark
 * footer. Sizes stay 214×54 / 188×32 so existing embeds keep their proportions.
 */
function renderBadge(tier: BadgeTier, found: boolean, theme: "light" | "dark", variant: "standard" | "compact"): string {
  const dark = theme === "dark";
  const frame = dark
    ? `fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.22"`
    : `fill="${C.white}" stroke="${C.border}"`;
  const markFill = dark ? C.teal : C.indigo;
  const wordFill = dark ? C.white : C.indigo;
  const sub = dark ? C.light : C.slate;
  const accent = dark ? C.teal : C.tealInk;
  // Only a live listing gets a tier claim; anything else just points at PMRFP.
  const label = !found ? "Find us on" : tier.verified ? "✓ Verified on" : "Listed on";
  const labelFill = found && tier.verified ? accent : sub;
  const aria = found ? `${tier.label} on PMRFP` : "Find us on PMRFP";

  if (variant === "compact") {
    const w = 188, h = 32, m = 20, wh = 13;
    const labelW = label.length * 5.1; // ~7.5px caps text
    const content = m + 7 + labelW + 5 + wh * WORD_RATIO;
    const x0 = (w - content) / 2;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(aria)}">
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="8" ${frame}/>
${mark(x0, 6, m, markFill)}
<text x="${(x0 + m + 7).toFixed(1)}" y="19.5" font-family="${FONT}" font-size="7.5" font-weight="600" letter-spacing="0.6" fill="${labelFill}">${escapeXml(label.toUpperCase())}</text>
${wordmark(x0 + m + 7 + labelW + 5, 9.5, wh, wordFill)}
</svg>`;
  }

  const w = 214, h = 54, m = 32, wh = 20;
  const content = m + 12 + wh * WORD_RATIO;
  const x0 = (w - content) / 2;
  const tx = x0 + m + 12;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(aria)}">
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="12" ${frame}/>
${mark(x0, 11, m, markFill)}
<text x="${tx.toFixed(1)}" y="21" font-family="${FONT}" font-size="8.5" font-weight="600" letter-spacing="1.1" fill="${labelFill}">${escapeXml(label.toUpperCase())}</text>
${wordmark(tx, 24.5, wh, wordFill)}
</svg>`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const theme = url.searchParams.get("theme") === "dark" ? "dark" : "light";
  const variant = url.searchParams.get("variant") === "compact" ? "compact" : "standard";

  const info = await getBadgeInfo(slug);
  const svg = renderBadge(info.tier, info.found, theme, variant);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
