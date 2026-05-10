import type { AxiosResponse } from 'axios'
import { toApiError, type ApiError } from './apiClient'

/**
 * Discriminated result type. Successful calls expose `data`; failed calls
 * expose `error`. No exceptions cross the boundary.
 */
export type Result<T> = { ok: true; data: T } | { ok: false; error: ApiError }

/**
 * Wrap an axios (or axios-like) promise so it never throws.
 *
 *   const res = await requestHandler(apiClient.post<{ ok: boolean }>('/api/contact', body))
 *   if (!res.ok) {
 *     showToast(res.error.message)
 *     return
 *   }
 *   useData(res.data) // typed as { ok: boolean }
 *
 * Anything that returns `{ data }` (axios responses, or hand-rolled wrappers
 * that mimic that shape) is supported.
 */
export async function requestHandler<T>(
  promise: Promise<AxiosResponse<T> | { data: T }>,
): Promise<Result<T>> {
  try {
    const res = await promise
    return { ok: true, data: res.data }
  } catch (err) {
    return { ok: false, error: toApiError(err) }
  }
}

/**
 * Helper for callers that want a single success-or-throw API while still
 * benefiting from the normalized ApiError shape.
 */
export async function unwrap<T>(promise: Promise<Result<T>>): Promise<T> {
  const res = await promise
  if (!res.ok) throw res.error
  return res.data
}
