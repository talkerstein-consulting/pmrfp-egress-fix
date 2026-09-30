import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { hasLocale } from "@/i18n/config";
import { setLangFrom } from "@/i18n/server";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await setLangFrom(params);
  const { lang } = await params;
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter lang={hasLocale(lang) ? lang : "en"} />
    </div>
  );
}
