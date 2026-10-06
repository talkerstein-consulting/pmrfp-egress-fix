/** Only the cookieless anonymous read client may use this policy. */
export const PUBLIC_DATA_TAG = "supabase-public-data";
export const PUBLIC_DATA_TTL = 300;

type CachedInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

export function createPublicReadFetch(baseUrl: string, anonKey: string, transport: typeof fetch = (...args) => fetch(...args)): typeof fetch {
  const origin = new URL(baseUrl).origin;
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
    if (publicRead) options.next = { revalidate: PUBLIC_DATA_TTL, tags: [PUBLIC_DATA_TAG] };
    else options.next = { revalidate: 0 };
    return transport(input, options);
  };
}
