import type { Metadata } from "next";
import { LogoMark } from "@/components/logo";
import { TryAgainButton } from "./try-again";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "en").misc.offline;
  return {
    title: t.title,
    robots: { index: false },
  };
}

// The service worker (public/sw.js) caches this page's HTML and nothing else,
// so it is styled inline: when there's no connection the site stylesheet may
// not load, and the page still has to look calm and on-brand.
const INDIGO = "#282B59";
// The system stack sits inside var(): an undefined font variable (stylesheet
// not loaded) would otherwise void the whole declaration and fall to serif.
const SYSTEM = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const SANS = `var(--font-lato, ${SYSTEM})`;
const HEADING = `var(--font-poppins, ${SYSTEM})`;

const styles = {
  screen: {
    position: "fixed",
    inset: 0,
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f5f7fb",
    color: "#0d0d0d",
    fontFamily: SANS,
  },
  card: { width: "100%", maxWidth: "380px", textAlign: "center" },
  mark: { width: "56px", height: "56px", margin: "0 auto 24px", color: INDIGO, overflow: "hidden" },
  heading: {
    margin: 0,
    fontFamily: HEADING,
    fontSize: "24px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: INDIGO,
  },
  body: { margin: "12px 0 0", fontSize: "15px", lineHeight: 1.55, color: "#3a3d4d" },
  note: { margin: "10px 0 28px", fontSize: "13px", lineHeight: 1.5, color: "#6a6e80" },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "44px",
    padding: "0 28px",
    border: "none",
    borderRadius: "999px",
    background: INDIGO,
    color: "#ffffff",
    fontFamily: SANS,
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;

export default async function OfflinePage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").offline;
  return (
    <main style={styles.screen}>
      <div style={styles.card}>
        <div style={styles.mark}>
          <LogoMark className="h-14 w-14" />
        </div>
        <h1 style={styles.heading}>{t.title}</h1>
        <p style={styles.body}>{t.body}</p>
        <p style={styles.note}>{t.note}</p>
        <TryAgainButton style={styles.button} label={t.tryAgain} />
      </div>
    </main>
  );
}
