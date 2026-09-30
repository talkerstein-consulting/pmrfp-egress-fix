import Link from "@/i18n/link";
import { requireRole, isDemoMode } from "@/lib/access/access";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/public/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { formatDate } from "@/i18n/format";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.interests };
}

interface InterestRow {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
  rfp_posts: { title: string; slug: string } | { title: string; slug: string }[] | null;
}

export default async function InterestsPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("dash").interests;
  const session = await requireRole(["trade"]);

  let interests: InterestRow[] = [];
  if (!isDemoMode() && session.organization) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("rfp_interests")
      .select("id,status,message,created_at, rfp_posts(title,slug)")
      .eq("trade_organization_id", session.organization.id)
      .order("created_at", { ascending: false });
    interests = (data as InterestRow[] | null) ?? [];
  }

  return (
    <div>
      <PageHeader
        title={t.title}
        description={t.description}
      />

      {interests.length === 0 ? (
        <EmptyState
          title={t.emptyTitle}
          description={t.emptyBody}
        >
          <Link href="/dashboard/rfps" className={buttonVariants()}>
            {t.viewFeed}
          </Link>
        </EmptyState>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.colRfp}</TableHead>
                <TableHead>{t.colSubmitted}</TableHead>
                <TableHead>{t.colStatus}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interests.map((it) => {
                const rfp = Array.isArray(it.rfp_posts) ? it.rfp_posts[0] : it.rfp_posts;
                return (
                  <TableRow key={it.id}>
                    <TableCell className="font-medium">
                      {rfp ? (
                        <Link href={`/rfps/${rfp.slug}`} className="hover:text-teal-700">
                          {rfp.title}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(it.created_at, lang)}</TableCell>
                    <TableCell>
                      <StatusBadge status={it.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
