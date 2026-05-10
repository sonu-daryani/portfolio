'use client'

import { useCallback, useRef, useState } from 'react'
import { streamChat } from '../lib/chatStream'
import { isApiError } from '../lib/apiClient'

export interface ChatMsg {
  id: string
  role: 'user' | 'assistant'
  content: string
  pending?: boolean
  error?: boolean
}

interface UseChatStreamArgs {
  /** Initial messages (e.g. greeting). */
  initial?: ChatMsg[]
  /** Endpoint that returns NDJSON {delta?, done?, error?} lines. */
  endpoint?: string
}

interface ChatStream {
  messages: ChatMsg[]
  streaming: boolean
  send: (text: string) => Promise<void>
  stop: () => void
  reset: () => void
}

let messageCounter = 0
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${++messageCounter}`

export function useChatStream({
  initial = [],
  endpoint,
}: UseChatStreamArgs = {}): ChatStream {
  const [messages, setMessages] = useState<ChatMsg[]>(initial)
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages(initial)
    setStreaming(false)
    // initial is treated as a one-time seed — intentionally not in deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim()
      if (!text || streaming) return

      const userMsg: ChatMsg = { id: nextId('u'), role: 'user', content: text }
      const assistantId = nextId('a')
      const assistantMsg: ChatMsg = {
        id: assistantId,
        role: 'assistant',
        content: '',
        pending: true,
      }

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      const history = [...messages, userMsg]
        .filter((m) => !m.error && !m.pending)
        .map(({ role, content }) => ({ role, content }))

      let acc = ''
      let firstChunk = true

      try {
        await streamChat({
          messages: history,
          endpoint,
          signal: controller.signal,
          onEvent: (ev) => {
            if (ev.error) throw new Error(ev.error)
            if (typeof ev.delta === 'string') {
              acc += ev.delta
              const isFirst = firstChunk
              firstChunk = false
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: acc, pending: isFirst ? false : m.pending }
                    : m,
                ),
              )
            }
            if (ev.done) {
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, pending: false } : m)),
              )
            }
          },
        })
      } catch (err) {
        const wasAborted = err instanceof DOMException && err.name === 'AbortError'
        const message = wasAborted
          ? 'Stopped.'
          : isApiError(err)
            ? err.message
            : err instanceof Error
              ? err.message
              : 'Something went wrong.'
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  pending: false,
                  error: !wasAborted,
                  content: m.content || `⚠ ${message}`,
                }
              : m,
          ),
        )
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [messages, streaming, endpoint],
  )

  return { messages, streaming, send, stop, reset }
}
