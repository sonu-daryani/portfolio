import { apiClient, toApiError, type ApiError } from './apiClient'

export interface ChatStreamEvent {
  delta?: string
  done?: boolean
  error?: string
}

export interface ChatRole {
  role: 'user' | 'assistant'
  content: string
}

export interface StreamChatArgs {
  messages: ChatRole[]
  endpoint?: string
  signal?: AbortSignal
  onEvent: (ev: ChatStreamEvent) => void
}

/**
 * Streams the chat endpoint as NDJSON. Axios doesn't expose a clean
 * ReadableStream API in the browser, so we use fetch here — but error shapes
 * still flow through `toApiError` so consumers get the same ApiError type as
 * the rest of the app.
 */
export async function streamChat({
  messages,
  endpoint = '/api/chat',
  signal,
  onEvent,
}: StreamChatArgs): Promise<void> {
  const url = (apiClient.defaults.baseURL ?? '') + endpoint

  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw toApiErrorFromUnknown(err)
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as
      | { error?: string }
      | null
    throw {
      status: res.status,
      message: data?.error || `Request failed (${res.status})`,
      code: 'HTTP',
      payload: data,
    } satisfies ApiError
  }
  if (!res.body) {
    throw {
      status: 0,
      message: 'No response body.',
      code: 'PARSE',
    } satisfies ApiError
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line) continue
      try {
        onEvent(JSON.parse(line) as ChatStreamEvent)
      } catch {
        // Ignore malformed line, keep streaming.
      }
    }
  }
}

function toApiErrorFromUnknown(err: unknown): ApiError {
  return toApiError(err)
}
