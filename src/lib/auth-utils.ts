import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Stateless session-token helpers (HMAC-signed).
 * -----------------------------------------------
 * Tokens are `userId.expiresAt.signature` — no DB/session table needed,
 * so they work across serverless invocations and any database (SQLite,
 * Postgres / Neon, etc.).
 *
 * The secret is read from SESSION_SECRET env var, falling back to a
 * dev-only constant. In production you MUST set SESSION_SECRET.
 */

const SESSION_SECRET = process.env.SESSION_SECRET || 'shopzone_dev_secret_change_in_production_2024'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function sign(payload: string): string {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
}

/** Create a signed session token for the given userId. */
export function signToken(userId: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const payload = `${userId}.${expiresAt}`
  const signature = sign(payload)
  return `${payload}.${signature}`
}

/** Verify a token and return the userId, or null if invalid/expired. */
export function verifyToken(token: string | null): string | null {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [userId, expiresAtStr, signature] = parts
  const payload = `${userId}.${expiresAtStr}`

  // Constant-time signature comparison
  const expected = sign(payload)
  if (signature.length !== expected.length) return null
  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  } catch {
    return null
  }

  const expiresAt = parseInt(expiresAtStr, 10)
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return null

  return userId
}

/** Extract the bearer token from a Request's Authorization header (or ?token=). */
export function extractTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  const url = new URL(request.url)
  return url.searchParams.get('token')
}

/** Get the authenticated userId from a Request, or null. */
export function getUserIdFromRequest(request: Request): string | null {
  return verifyToken(extractTokenFromRequest(request))
}

// Backwards-compatible alias used by existing API routes
export function getUserIdFromToken(token: string | null): string | null {
  return verifyToken(token)
}

// Legacy helpers retained for any code that still imports them
export function generateToken(): string {
  return signToken('legacy')
}
