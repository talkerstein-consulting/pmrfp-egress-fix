/** Only the cookieless anonymous read client may use this policy. */
export const PUBLIC_DATA_TAG = "supabase-public-data";
export const PUBLIC_DATA_TTL = 300;
export const TAXONOMY_DATA_TAG = "supabase-public-taxonomy";
export const TAXONOMY_TABLES = new Set(["regions", "property_types", "trade_categories"]);

type CachedInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

export function createPublicReadFetch(baseUrl: string, anonKey: string, transport: typeof fetch = (...args) => fetch(...args)): typeof fetch {
  const origin = new URL(baseUrl).origin;
  // Share only concurrent anonymous GETs within this client instance. This is
  // not a distributed lock or a second TTL cache; Next remains the Data Cache.
  const pending = new Map<string, Promise<Response>>();
  return (input, init) => {
    const request = input instanceof Request ? input : null;
    const url = new URL(request?.url ?? String(input));
    const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
    const headers = new Headers(request?.headers);
    new Headers(init?.headers).forEach((value, key) => headers.set(key, value));
    const anonymous = headers.get("apikey") === anonKey && headers.get("authorization") === `Bearer ${anonKey}`;
    // Exclude RPCs, Auth, Storage, writes and any unexpected user credentials.
    // Range/Accept headers and the complete URL remain part of Next's cache key.
    const publicRead = anonymous && method === "GET" && url.origin === origin &&
      /^\/rest\/v1\/[^/]+$/.test(url.pathname) && !headers.has("cookie");
    const options: CachedInit = { ...init, headers, cache: publicRead ? "force-cache" : "no-store" };
    const taxonomy = TAXONOMY_TABLES.has(url.pathname.split("/").pop() ?? "");
    if (publicRead) options.next = { revalidate: taxonomy ? 3600 : PUBLIC_DATA_TTL, tags: [taxonomy ? TAXONOMY_DATA_TAG : PUBLIC_DATA_TAG] };
    else options.next = { revalidate: 0 };
    // Do not share cancellation or request-specific signals between callers.
    if (!publicRead || request || init?.signal || pending.size >= 512) return transport(input, options);
    const key = JSON.stringify([url.href, method, [...headers.entries()].sort(([a], [b]) => a.localeCompare(b))]);
    let response = pending.get(key);
    if (!response) {
      response = transport(input, options).then(
        (value) => { pending.delete(key); return value; },
        (error) => { pending.delete(key); throw error; },
      );
      pending.set(key, response);
    }
    // Each SDK consumer reads its own body; never hand out a consumed response.
    return response.then((value) => value.clone());
  };
}
