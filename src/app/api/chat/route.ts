import type { NextRequest } from 'next/server'
import { profile } from '../../../data/profile'
import { buildSystemPrompt } from '../../../lib/systemPrompt'
import {
  corsDeniedResponse,
  isAllowedOrigin,
  rateLimit,
  rateLimitedResponse,
} from '../../../lib/apiGuard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatBody {
  messages: ChatMessage[]
}

const OLLAMA_BASE = process.env.OLLAMA_HOST || 'https://ollama.com'
const OLLAMA_MODEL = process.env.OLLAMA_AGENT_MODEL || 'gpt-oss:120b'

const MAX_HISTORY = 12
const MAX_CONTENT_CHARS = 4000

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

/**
 * Wrap user content in delimiters so the model treats it as data, not as
 * instructions. Strip null/control bytes that wouldn't be human input but might
 * confuse a tokenizer or be used to escape delimiters.
 */
function sanitizeUserContent(content: string): string {
  const stripped = content
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<\/?user_message>/gi, '')
    .slice(0, MAX_CONTENT_CHARS)
  return `<user_message>\n${stripped}\n</user_message>`
}

export async function OPTIONS() {
  return new Response(null, { status: 204 })
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return corsDeniedResponse()
  if (!rateLimit(req, { windowMs: 60_000, max: 20, scope: 'chat' })) {
    return rateLimitedResponse()
  }

  const apiKey = process.env.OLLAMA_API_KEY
  if (!apiKey) {
    return jsonError(
      503,
      'The AI assistant is currently offline. Please use the contact form below or email sonudaryani135@gmail.com.',
    )
  }

  let body: ChatBody
  try {
    body = (await req.json()) as ChatBody
  } catch {
    return jsonError(400, 'Invalid JSON body.')
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonError(400, 'messages[] is required.')
  }

  const cleanMessages = body.messages
    .filter(
      (m): m is ChatMessage =>
        !!m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'),
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content:
        m.role === 'user' ? sanitizeUserContent(m.content) : m.content.slice(0, MAX_CONTENT_CHARS),
    }))

  if (cleanMessages.length === 0) {
    return jsonError(400, 'No valid user/assistant messages.')
  }

  const systemPrompt = buildSystemPrompt(profile)

  const upstream = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...cleanMessages],
      options: {
        temperature: 0.5,
        num_predict: 512,
      },
    }),
  }).catch(
    (err) =>
      new Response(JSON.stringify({ error: `Upstream fetch failed: ${err.message}` }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      }),
  )

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '')
    return jsonError(
      upstream.status || 502,
      `AI service error${text ? `: ${text.slice(0, 300)}` : ''}`,
    )
  }

  const stream = relayUpstream(upstream.body)

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
    },
  })
}

/** Convert Ollama's NDJSON stream into our minimal {delta, done, error} stream. */
function relayUpstream(upstreamBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamBody.getReader()
      let buffer = ''

      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))
      }

      try {
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
              const parsed = JSON.parse(line) as {
                message?: { content?: string }
                done?: boolean
                error?: string
              }
              if (parsed.error) {
                send({ error: parsed.error })
                continue
              }
              const delta = parsed.message?.content
              if (typeof delta === 'string' && delta.length > 0) send({ delta })
              if (parsed.done) send({ done: true })
            } catch {
              // ignore malformed line
            }
          }
        }
      } catch (err) {
        send({ error: err instanceof Error ? err.message : 'Stream error' })
      } finally {
        send({ done: true })
        controller.close()
      }
    },
  })
}
