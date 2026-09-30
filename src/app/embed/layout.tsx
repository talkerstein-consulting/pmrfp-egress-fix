import type { Metadata } from "next";
import { clientMessages } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/provider";
import { fontVariables } from "../fonts";
import "../globals.css";

// Widget pages live inside other people's websites. They're not pages of
// ours to rank, so keep them out of search indexes.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The iframe should show the host page through its corners, and a full-height
// body would stop the widget from reporting its real size.
const FRAME_CSS = "html,body{background:transparent!important;min-height:0!important;height:auto!important}";

// Widgets are their own root layout: they sit outside app/[lang] (their URLs
// are embedded on other sites and never get a language prefix).
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${fontVariables} antialiased`}>
      <body>
        <style>{FRAME_CSS}</style>
        {/* Widgets are English; the provider keeps shared client components working here. */}
        <I18nProvider lang="en" messages={clientMessages("en")}>{children}</I18nProvider>
      </body>
    </html>
  );
}
