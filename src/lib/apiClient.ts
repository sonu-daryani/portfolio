import axios, { AxiosError, type AxiosInstance } from 'axios'

/**
 * Normalized error shape that every API call resolves to (via requestHandler).
 * Components only ever see this — never a raw axios error or a thrown Error —
 * so error handling stays consistent across the app.
 */
export interface ApiError {
  /** HTTP status code, or 0 for network/timeout errors. */
  status: number
  /** Human-friendly message safe to show in the UI. */
  message: string
  /**
   * Machine-readable code: 'TIMEOUT' | 'NETWORK' | 'HTTP' | 'PARSE' | 'CANCELLED'
   * | 'UNKNOWN' or any axios error code (e.g. 'ERR_BAD_REQUEST').
   */
  code: string
  /** Original response body, if any. */
  payload?: unknown
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
})

apiClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => Promise.reject(toApiError(err)),
)

/** Translate any thrown value into an ApiError. */
export function toApiError(err: unknown): ApiError {
  if (axios.isCancel(err)) {
    return { status: 0, message: 'Request cancelled.', code: 'CANCELLED' }
  }
  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') {
      return { status: 0, message: 'Request timed out. Please try again.', code: 'TIMEOUT' }
    }
    if (!err.response) {
      return {
        status: 0,
        message: 'Network error. Please check your connection.',
        code: 'NETWORK',
      }
    }
    const data = err.response.data as
      | { error?: string; message?: string }
      | string
      | undefined
    const serverMessage =
      typeof data === 'string'
        ? data
        : data?.error || data?.message
    return {
      status: err.response.status,
      message: serverMessage || `Request failed (${err.response.status}).`,
      code: err.code || 'HTTP',
      payload: err.response.data,
    }
  }
  if (err instanceof Error) {
    return { status: 0, message: err.message || 'Unknown error.', code: 'UNKNOWN' }
  }
  return { status: 0, message: 'Unknown error.', code: 'UNKNOWN' }
}

/**
 * Type guard so callers can branch on `isApiError(err)` if they ever catch
 * something they didn't pipe through requestHandler.
 */
export function isApiError(value: unknown): value is ApiError {
  return (
    !!value &&
    typeof value === 'object' &&
    'status' in value &&
    'message' in value &&
    'code' in value
  )
}
