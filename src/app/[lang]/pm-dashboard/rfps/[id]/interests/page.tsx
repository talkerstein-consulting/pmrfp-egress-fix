import Link from "@/i18n/link";
import { requireRole, isDemoMode } from "@/lib/access/access";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/public/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { CloseRfpButton } from "@/components/dashboard/close-rfp-button";
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
import { regionName } from "@/i18n/terms";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").pm.interests.metaTitle };
}

type OrgRel = { name: string; slug: string; city: string | null; province: string | null };

interface InterestRow {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
  contact_revealed: boolean;
  organizations: OrgRel | OrgRel[] | null;
}

export default async function RfpInterestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await setLangFrom(params);
  const t = getT("pm").interests;
  const lang = getLang();
  await requireRole(["property_manager", "real_estate_agent"]);
  const { id } = await params;

  let interests: InterestRow[] = [];
  let rfpStatus: string | null = null;
  if (!isDemoMode()) {
    const supabase = await createClient();
    const [{ data: ints }, { data: rfp }] = await Promise.all([
      supabase
        .from("rfp_interests")
        .select("id,status,message,created_at,contact_revealed, organizations(name,slug,city,province)")
        .eq("rfp_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .from("rfp_posts")
        .select("status")
        .eq("id", id)
        .maybeSingle<{ status: string }>(),
    ]);
    interests = (ints as InterestRow[] | null) ?? [];
    rfpStatus = rfp?.status ?? null;
  }

  const closed =
    rfpStatus === "awarded" ||
    rfpStatus === "closed" ||
    rfpStatus === "expired" ||
    rfpStatus === "archived";

  return (
    <div>
      <PageHeader
        title={t.title}
        description={t.description}
      />

      {!isDemoMode() && (
        <div className="mb-6">
          <CloseRfpButton rfpId={id} alreadyClosed={closed} />
        </div>
      )}

      {interests.length === 0 ? (
        <EmptyState
          title={t.emptyTitle}
          description={t.emptyDescription}
        />
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.colCompany}</TableHead>
                <TableHead>{t.colMessage}</TableHead>
                <TableHead>{t.colStatus}</TableHead>
                <TableHead>{t.colSubmitted}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interests.map((it) => {
                const org = Array.isArray(it.organizations) ? it.organizations[0] : it.organizations;
                return (
                  <TableRow key={it.id}>
                    <TableCell className="font-medium">
                      {org ? (
                        <Link href={`/directory/${org.slug}`} className="hover:text-teal-700">
                          {org.name}
                          {org.city && (
                            <span className="block text-xs font-normal text-muted-foreground">
                              {[org.city, org.province && regionName(org.province, lang)].filter(Boolean).join(", ")}
                            </span>
                          )}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-normal text-muted-foreground">
                      {it.message ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={it.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(it.created_at, lang)}</TableCell>
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
