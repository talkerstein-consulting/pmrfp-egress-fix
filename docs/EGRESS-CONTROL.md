# Public database bandwidth controls

The 6 October 2026 Supabase audit found PMRFP at 26.265 GB egress in the 29 September–29 October cycle. Checked days were 99.9–100% PostgREST traffic. Live logs showed repeated Node-origin queries for the RFP board, categories/photos, taxonomy, directory and case studies. File migration is not the immediate remedy.

## Behavior

- The cookieless anonymous public client caches successful database GET responses in Next's persistent Data Cache for 300 seconds. Complete query URLs and headers keep filters and page offsets distinct. Auth, RPC, storage, writes and unexpected user credentials bypass the cache.
- Cookie-authenticated and service clients remain uncached. Relevant successful server writes invalidate the public-data tag immediately. Direct browser/mobile or SQL-editor changes refresh through the five-minute TTL; changing permissions in the dashboard should be followed by a redeployment/cache purge if immediate public removal is required.
- RFP imports remain complete: 250-row pages keep response entries below the cache size limit for typical teaser payloads. Directory cards no longer retrieve full descriptions or contact fields. No RLS or paid-access rules are changed.
- Anonymous public requests without a Supabase session cookie skip Auth refresh. Protected routes and signed-in requests retain verification.
- Public GET/HEAD page requests share a Redis sliding-window limit of 120 requests per IP per minute. Excess requests receive HTTP 429 and Retry-After. Auth routes, private dashboards, assets, API handlers, webhooks, cron jobs and POST actions are excluded from this new bucket; existing mutation limits remain.

## Rate limiter activation

Configure either `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`, or the Vercel Marketplace aliases `KV_REST_API_URL` + `KV_REST_API_TOKEN`, in the deployment environment. No new Redis service or paid subscription is created by this change. When Redis is absent/unavailable, public requests are allowed; persistent public-data caching still applies. The public limiter deliberately never falls back to Supabase counters, which would add a database request per page. Rate keys are hashed IPs.

This limiter protects requests through the website. Direct requests to the Supabase endpoint, including mobile clients, do not pass through Vercel. Do not represent this as a Supabase-wide gateway limit. If logs later show direct abuse, investigate Supabase-side controls separately and preserve mobile access.

## Verification and rollout

Run unit/database tests, typecheck, targeted lint and a production build. Cache tests exercise actual Supabase SDK requests, page-offset separation, private-token exclusion and write invalidation. Limiter tests cover configured Redis, missing configuration, 429/retry headers and outages.

After deploying, compare the next complete hour/day of Supabase PostgREST request counts and egress with the baseline (roughly 9.3k API Gateway requests in the inspected hour). Confirm no cache-size errors and check fresh content after moderation/imports. Old accumulated egress will not decrease; assess the rate of new usage. Set a Vercel Firewall rate rule if protection must run before application functions or cover excluded widget routes; that is separate from this code change.

The existing Pro upgrade handles continuity while optimizing. It is not performed by this change. No schema migration or object/data deletion is required. Reverting the commit removes the code changes.
