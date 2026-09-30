import Link from "@/i18n/link";
import { Code2, Plus } from "lucide-react";
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
import type { Metadata } from "next";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { formatDate } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").pm.rfps.metaTitle };
}

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  deadline: string | null;
  created_at: string;
}

export default async function PmRfpsPage({
  searchParams, params }: {
  searchParams: Promise<Record<string, string | undefined>>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("pm").rfps;
  const lang = getLang();
  const session = await requireRole(["property_manager", "real_estate_agent"]);
  const sp = await searchParams;

  let posts: PostRow[] = [];
  if (!isDemoMode()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("rfp_posts")
      .select("id,title,slug,status,deadline,created_at")
      .eq("posted_by_user_id", session.userId)
      .order("created_at", { ascending: false });
    posts = (data as PostRow[] | null) ?? [];
  }

  return (
    <div>
      <PageHeader
        title={t.title}
        description={t.description}
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/widgets?w=bids" className={buttonVariants({ variant: "outline" })}>
              <Code2 className="size-4" /> {t.showOnSite}
            </Link>
            <Link href="/pm-dashboard/rfps/new" className={buttonVariants()}>
              <Plus className="size-4" /> {t.post}
            </Link>
          </div>
        }
      />

      {sp.posted === "1" && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <strong>{t.postedStrong}</strong> {t.postedBody}
        </div>
      )}

      {posts.length === 0 ? (
        <EmptyState
          title={t.emptyTitle}
          description={t.emptyDescription}
        >
          <Link href="/pm-dashboard/rfps/new" className={buttonVariants()}>
            {t.post}
          </Link>
        </EmptyState>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.colTitle}</TableHead>
                <TableHead>{t.colStatus}</TableHead>
                <TableHead>{t.colDeadline}</TableHead>
                <TableHead className="text-right">{t.colInterests}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.deadline ? formatDate(p.deadline, lang) : t.noDeadline}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/pm-dashboard/rfps/${p.id}/interests`}
                      className="font-medium text-primary hover:underline"
                    >
                      {t.viewVendors}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
