import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { PGlite } from "@electric-sql/pglite";
import { asAnon, asUser, createTestDb } from "./harness";

/** Talent migration (20260928000001): the talent role, public profiles, private phone, server-only writes. */
const TALENT = "20260928000001_talent.sql";
let db: PGlite;
const ids = { worker: randomUUID(), hidden: randomUUID(), employer: randomUUID(), stranger: randomUUID(), org: randomUUID() };

async function rows<T = Record<string, unknown>>(sql: string, params: unknown[] = []) {
  return (await db.query<T>(sql, params)).rows;
}

beforeAll(async () => {
  db = await createTestDb([TALENT]);
  await db.exec(readFileSync(join(process.cwd(), "supabase", "migrations", TALENT), "utf8")); // safe to re-run
  const users: [string, string, string][] = [
    [ids.worker, "Worker", "talent"],
    [ids.hidden, "Hidden", "talent"],
    [ids.employer, "Employer", "property_manager"],
    [ids.stranger, "Stranger", "super_admin"],
  ];
  for (const [id, name, role] of users) {
    await db.query(`insert into auth.users (id, email, raw_user_meta_data) values ($1,$2,$3)`, [
      id,
      `${name}@example.com`,
      JSON.stringify({ full_name: name, primary_role: role }),
    ]);
  }
  await db.query(`insert into organizations (id, name, slug, organization_type, profile_status) values ($1,'Acme','acme','property_manager','approved')`, [ids.org]);
  await db.query(`insert into organization_members (organization_id, user_id, role) values ($1,$2,'owner')`, [ids.org, ids.employer]);
  await db.query(`insert into talent_profiles (user_id, handle, display_name, availability) values ($1,'sam-worker','Sam Worker','available_now')`, [ids.worker]);
  await db.query(`insert into talent_profiles (user_id, handle, display_name, published) values ($1,'hidden-one','Hidden One',false)`, [ids.hidden]);
  await db.query(`insert into talent_private (user_id, phone) values ($1,'416-555-0100')`, [ids.worker]);
  await db.query(`insert into talent_endorsements (talent_user_id, organization_id, note) values ($1,$2,'Solid on every site we put him on.')`, [ids.worker, ids.org]);
  await db.query(`insert into talent_endorsements (talent_user_id, organization_id, note) values ($1,$2,'Great work on the hidden profile.')`, [ids.hidden, ids.org]);
  await db.query(`insert into talent_contacts (talent_user_id, organization_id, sender_id) values ($1,$2,$3)`, [ids.worker, ids.org, ids.employer]);
});

describe("talent", () => {
  it("accepts 'talent' as a sign-up role but still blocks admin roles", async () => {
    const roles = await rows<{ id: string; primary_role: string }>("select id, primary_role from users_profile where id = any($1)", [[ids.worker, ids.stranger]]);
    expect(roles.find((r) => r.id === ids.worker)?.primary_role).toBe("talent");
    expect(roles.find((r) => r.id === ids.stranger)?.primary_role).toBe("trade");
  });

  it("shows the public only published profiles, with endorsements", async () => {
    const handles = await asAnon(db, () => rows<{ handle: string }>("select handle from talent_profiles order by handle"));
    expect(handles.map((r) => r.handle)).toEqual(["sam-worker"]);
    const endorsements = await asAnon(db, () => rows("select * from talent_endorsements"));
    expect(endorsements).toHaveLength(1);
  });

  it("lets the owner see and edit their own hidden profile", async () => {
    const own = await asUser(db, ids.hidden, () => rows("select handle from talent_profiles where user_id = $1", [ids.hidden]));
    expect(own).toHaveLength(1);
    await asUser(db, ids.hidden, () => db.query(`update talent_profiles set headline = 'Carpenter' where user_id = $1`, [ids.hidden]));
    expect((await rows<{ headline: string }>("select headline from talent_profiles where user_id = $1", [ids.hidden]))[0].headline).toBe("Carpenter");
  });

  it("stops anyone editing someone else's profile", async () => {
    await asUser(db, ids.employer, () => db.query(`update talent_profiles set display_name = 'Hacked' where user_id = $1`, [ids.worker]));
    expect((await rows<{ display_name: string }>("select display_name from talent_profiles where user_id = $1", [ids.worker]))[0].display_name).toBe("Sam Worker");
    await expect(
      asUser(db, ids.employer, () => db.query(`insert into talent_profiles (user_id, handle, display_name) values ($1,'fake-sam','Fake')`, [ids.worker])),
    ).rejects.toThrow();
  });

  it("keeps the phone number private to its owner", async () => {
    expect(await asAnon(db, () => rows("select * from talent_private"))).toHaveLength(0);
    expect(await asUser(db, ids.employer, () => rows("select * from talent_private"))).toHaveLength(0);
    expect(await asUser(db, ids.worker, () => rows("select * from talent_private"))).toHaveLength(1);
  });

  it("only lets the server write endorsements and contacts", async () => {
    await expect(
      asUser(db, ids.employer, () =>
        db.query(`insert into talent_endorsements (talent_user_id, organization_id, note) values ($1,$2,'Fake endorsement here.')`, [ids.hidden, ids.org]),
      ),
    ).rejects.toThrow();
    await expect(
      asUser(db, ids.employer, () => db.query(`insert into talent_contacts (talent_user_id, organization_id) values ($1,$2)`, [ids.worker, ids.org])),
    ).rejects.toThrow();
  });

  it("shows a company its own contacts and no one else", async () => {
    expect(await asUser(db, ids.employer, () => rows("select * from talent_contacts"))).toHaveLength(1);
    expect(await asUser(db, ids.worker, () => rows("select * from talent_contacts"))).toHaveLength(0);
    expect(await asAnon(db, () => rows("select * from talent_contacts"))).toHaveLength(0);
  });
});
