import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ limit: vi.fn(), service: vi.fn(), window: vi.fn() }));
vi.mock("@upstash/redis", () => ({ Redis: class {} }));
vi.mock("@upstash/ratelimit", () => ({ Ratelimit: class {
  static slidingWindow = mocks.window;
  limit = mocks.limit;
} }));
vi.mock("@/lib/supabase/service", () => ({ createServiceClient: mocks.service }));
vi.mock("@/lib/supabase/config", () => ({ isServiceConfigured: () => true }));

describe("distributed public read limiting", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    for (const name of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN"]) vi.stubEnv(name, "");
  });
  afterEach(() => vi.unstubAllEnvs());
  const request = () => new Request("https://pmrfp.com/rfps", { headers: { "x-forwarded-for": "192.0.2.1" } });

  it("never queries Supabase when Redis is not configured", async () => {
    const { checkPublicReadLimit } = await import("@/lib/rate-limit");
    expect(await checkPublicReadLimit(request())).toBeNull();
    expect(mocks.service).not.toHaveBeenCalled();
  });
  it("uses the Vercel KV aliases and returns a 429 with retry headers for a blocked IP", async () => {
    vi.stubEnv("KV_REST_API_URL", "https://fixture.example");
    vi.stubEnv("KV_REST_API_TOKEN", "fixture-token");
    mocks.limit.mockResolvedValue({ success: false, limit: 120, remaining: 0, reset: Date.now() + 60000 });
    const { checkPublicReadLimit, rateLimitResponse } = await import("@/lib/rate-limit");
    const info = await checkPublicReadLimit(request());
    expect(info).not.toBeNull();
    const response = rateLimitResponse(info!);
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("Retry-After"))).toBeGreaterThan(0);
    expect(mocks.window).toHaveBeenCalledWith(120, "60 s");
    expect(mocks.limit).toHaveBeenCalledWith(expect.stringMatching(/^[a-f0-9]{64}$/));
    expect(mocks.service).not.toHaveBeenCalled();
  });
  it("allows ordinary requests below the limit", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fixture.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fixture-token");
    mocks.limit.mockResolvedValue({ success: true });
    const { checkPublicReadLimit } = await import("@/lib/rate-limit");
    expect(await checkPublicReadLimit(request())).toBeNull();
  });
  it("allows reads during Redis outages without adding database traffic", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fixture.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fixture-token");
    mocks.limit.mockRejectedValue(new Error("fixture outage"));
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { checkPublicReadLimit } = await import("@/lib/rate-limit");
    expect(await checkPublicReadLimit(request())).toBeNull();
    expect(mocks.service).not.toHaveBeenCalled();
    warning.mockRestore();
  });
});
