import type { NextRequest } from 'next/server'

/**
 * Same-origin / explicit-allow-list gate. Browsers always send `Origin` for
 * cross-origin fetches, so we use it as the primary signal. Non-browser tools
 * (curl, scripts) typically don't, which is exactly what we want to reject for
 * `/api/chat`.
 */
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  const host = req.headers.get('host')
  const allowList = parseAllowList(process.env.ALLOWED_ORIGINS)

  // Allow explicit env-configured origins regardless of host.
  if (origin && allowList.includes(origin)) return true

  // Same-origin: origin must match the request host.
  if (origin && host) {
    try {
      const o = new URL(origin)
      if (o.host === host) return true
    } catch {
      // fall through
    }
  }

  // Some browsers (esp. older Safari) skip Origin on same-origin GETs but still
  // send Referer. We accept that as a fallback for same-origin only.
  if (!origin && referer && host) {
    try {
      const r = new URL(referer)
      if (r.host === host) return true
    } catch {
      // fall through
    }
  }

  return false
}

function parseAllowList(env?: string): string[] {
  if (!env) return []
  return env
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function corsDeniedResponse(): Response {
  return new Response(
    JSON.stringify({ error: 'Forbidden: requests must originate from the portfolio site.' }),
    {
      status: 403,
      headers: { 'content-type': 'application/json' },
    },
  )
}

/**
 * Best-effort in-memory rate limit. In serverless environments instances are
 * short-lived, so this only catches obvious bursts from a single warm instance —
 * fine as a polite-bot deterrent in front of more serious controls upstream.
 */
const buckets = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitOptions {
  windowMs: number
  max: number
  /** Optional namespace so different routes don't share buckets. */
  scope?: string
}

export function rateLimit(req: NextRequest, opts: RateLimitOptions): boolean {
  const ip = clientIp(req)
  const key = `${opts.scope || 'default'}:${ip}`
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs })
    cleanup(now)
    return true
  }
  if (entry.count >= opts.max) return false
  entry.count += 1
  return true
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

let lastCleanup = 0
function cleanup(now: number) {
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) buckets.delete(k)
  }
}

export function rateLimitedResponse(): Response {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please slow down a bit.' }),
    {
      status: 429,
      headers: { 'content-type': 'application/json', 'retry-after': '30' },
    },
  )
}
