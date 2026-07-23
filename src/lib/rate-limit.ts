// -----------------------------------------------------------------------------
// In-Memory Rate Limiter
//
// Simple sliding-window rate limiter using a Map of IP -> timestamp arrays.
// Suitable for single-instance deployments (e.g., Vercel serverless with
// in-memory state per cold start).
// -----------------------------------------------------------------------------

/** Timestamps (ms) of requests for each IP address. */
const requestLog = new Map<string, number[]>();

/** Interval handle for periodic cleanup. */
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

/** How often to run the cleanup sweep (5 minutes). */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Starts the periodic cleanup if it hasn't been started yet.
 * Removes entries whose most recent request is older than the largest
 * reasonable window (10 minutes) to prevent unbounded memory growth.
 */
function ensureCleanup(): void {
  if (cleanupInterval !== null) return;

  cleanupInterval = setInterval(() => {
    const cutoff = Date.now() - 10 * 60 * 1000;
    for (const [ip, timestamps] of requestLog) {
      // If the newest timestamp is older than the cutoff, drop the entry.
      if (timestamps.length === 0 || timestamps[timestamps.length - 1] < cutoff) {
        requestLog.delete(ip);
      }
    }
    // If the map is empty, stop the interval to avoid keeping Node alive.
    if (requestLog.size === 0 && cleanupInterval !== null) {
      clearInterval(cleanupInterval);
      cleanupInterval = null;
    }
  }, CLEANUP_INTERVAL_MS);

  // Allow the Node process to exit even if the interval is active.
  if (typeof cleanupInterval === 'object' && 'unref' in cleanupInterval) {
    cleanupInterval.unref();
  }
}

/**
 * Checks whether a request from the given IP should be allowed.
 *
 * @param ip        - Client IP address (or other unique identifier).
 * @param limit     - Maximum number of requests allowed within the window.
 *                    Defaults to 10.
 * @param windowMs  - Sliding window duration in milliseconds.
 *                    Defaults to 60 000 (60 seconds).
 * @returns An object with:
 *   - `success`   — `true` if the request is within the rate limit.
 *   - `remaining` — how many requests the client has left in the current window.
 */
export function rateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60_000,
): { success: boolean; remaining: number } {
  ensureCleanup();

  const now = Date.now();
  const windowStart = now - windowMs;

  // Get or initialize the timestamps array for this IP.
  let timestamps = requestLog.get(ip);
  if (!timestamps) {
    timestamps = [];
    requestLog.set(ip, timestamps);
  }

  // Remove timestamps outside the current window.
  // Because timestamps are appended in order, we can binary-search or
  // simply filter from the front.
  while (timestamps.length > 0 && timestamps[0] < windowStart) {
    timestamps.shift();
  }

  // Check if the limit has been reached.
  if (timestamps.length >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  // Record this request.
  timestamps.push(now);

  return {
    success: true,
    remaining: limit - timestamps.length,
  };
}
