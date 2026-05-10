'use client'

import { useCallback, useRef, useState } from 'react'
import type { AxiosResponse } from 'axios'
import type { ApiError } from '../lib/apiClient'
import { requestHandler, type Result } from '../lib/requestHandler'

interface UseAsyncState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

export interface UseAsync<TArgs extends unknown[], T> extends UseAsyncState<T> {
  /** Run the underlying request. Always resolves — never throws. */
  run: (...args: TArgs) => Promise<Result<T>>
  /** Clear data, error, and loading flags. */
  reset: () => void
  /** True if a request has finished and produced data without error. */
  succeeded: boolean
}

/**
 * Drop-in async-state hook. Pass it any function that returns an axios-shaped
 * promise (`{ data }`); you get back `{ data, error, loading, run, reset }`.
 * Components stay free of try/catch and manual setLoading/setError calls:
 *
 *   const submit = useAsync((payload: ContactPayload) =>
 *     apiClient.post<{ ok: boolean }>('/api/contact', payload),
 *   )
 *
 *   <button disabled={submit.loading} onClick={() => submit.run(form)}>
 *     {submit.loading ? 'Sending…' : 'Send'}
 *   </button>
 *   {submit.error && <p>{submit.error.message}</p>}
 *
 * Last-write-wins: if `run` is called again before the previous call settles,
 * the older response is discarded so state never flickers backwards.
 */
export function useAsync<TArgs extends unknown[], T>(
  fn: (...args: TArgs) => Promise<AxiosResponse<T> | { data: T }>,
): UseAsync<TArgs, T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  })
  const runIdRef = useRef(0)

  const run = useCallback<UseAsync<TArgs, T>['run']>(
    async (...args) => {
      const myRun = ++runIdRef.current
      setState((prev) => ({ data: prev.data, error: null, loading: true }))

      const result = await requestHandler<T>(fn(...args))

      // Drop stale results so a slow earlier call can't overwrite a fresh one.
      if (runIdRef.current !== myRun) return result

      setState(
        result.ok
          ? { data: result.data, error: null, loading: false }
          : (prev) => ({ data: prev.data, error: result.error, loading: false }),
      )
      return result
    },
    [fn],
  )

  const reset = useCallback(() => {
    runIdRef.current += 1
    setState({ data: null, error: null, loading: false })
  }, [])

  return {
    ...state,
    run,
    reset,
    succeeded: !state.loading && !state.error && state.data !== null,
  }
}
