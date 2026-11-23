/**
 * Provider-agnostic LLM configuration.
 *
 * Point the chatbot at any model by setting just a URL and a key:
 *
 *   AI_API_URL=https://api.openai.com/v1            (base URL or full endpoint)
 *   AI_API_KEY=sk-...
 *   AI_MODEL=gpt-4o-mini
 *
 * Works with any OpenAI-compatible server (OpenAI, OpenRouter, Groq, Together,
 * Mistral, DeepSeek, Gemini's OpenAI endpoint, vLLM, LM Studio, LiteLLM, ...)
 * and with native Ollama (local or cloud).
 *
 * Optional: AI_API_FORMAT=openai | ollama  (auto-detected from the URL if unset)
 *
 * Legacy OLLAMA_HOST / OLLAMA_API_KEY / OLLAMA_AGENT_MODEL still work.
 */

export type ApiFormat = 'openai' | 'ollama'

export interface LlmConfig {
  endpoint: string
  apiKey: string | undefined
  model: string
  format: ApiFormat
}

const env = (name: string): string | undefined => {
  const v = process.env[name]?.trim()
  return v ? v : undefined
}

function detectFormat(url: string): ApiFormat {
  const explicit = env('AI_API_FORMAT')?.toLowerCase()
  if (explicit === 'openai' || explicit === 'ollama') return explicit
  if (/\/api\/chat\/?$/.test(url)) return 'ollama'
  if (/\/chat\/completions\/?$/.test(url)) return 'openai'
  if (/ollama\.com|:11434/.test(url)) return 'ollama'
  return 'openai'
}

function resolveEndpoint(rawUrl: string, format: ApiFormat): string {
  const url = rawUrl.replace(/\/+$/, '')
  // Already a full endpoint: use as-is.
  if (/\/chat\/completions$/.test(url) || /\/api\/chat$/.test(url)) return url
  return format === 'ollama' ? `${url}/api/chat` : `${url}/chat/completions`
}

export function getLlmConfig(): LlmConfig {
  const rawUrl = env('AI_API_URL') || env('OLLAMA_HOST') || 'https://ollama.com'
  const format = detectFormat(rawUrl)
  return {
    endpoint: resolveEndpoint(rawUrl, format),
    apiKey: env('AI_API_KEY') || env('OLLAMA_API_KEY'),
    model: env('AI_MODEL') || env('OLLAMA_AGENT_MODEL') || 'gpt-oss:120b',
    format,
  }
}

/** Build the provider-specific request body. */
export function buildRequestBody(
  cfg: LlmConfig,
  messages: { role: string; content: string }[],
): string {
  if (cfg.format === 'ollama') {
    return JSON.stringify({
      model: cfg.model,
      stream: true,
      messages,
      options: { temperature: 0.5, num_predict: 512 },
    })
  }
  return JSON.stringify({
    model: cfg.model,
    stream: true,
    messages,
    temperature: 0.5,
    max_tokens: 512,
  })
}

/**
 * Parse one streamed line from either format (Ollama NDJSON or OpenAI SSE).
 * Returns null for lines that carry nothing useful.
 */
export function parseStreamLine(
  rawLine: string,
): { delta?: string; done?: boolean; error?: string } | null {
  let line = rawLine.trim()
  if (!line || line.startsWith(':') || line.startsWith('event:')) return null
  if (line.startsWith('data:')) line = line.slice(5).trim()
  if (line === '[DONE]') return { done: true }

  try {
    const p = JSON.parse(line) as {
      error?: string | { message?: string }
      done?: boolean
      message?: { content?: string }
      choices?: {
        delta?: { content?: string | null }
        finish_reason?: string | null
      }[]
    }
    if (p.error) {
      return { error: typeof p.error === 'string' ? p.error : p.error.message || 'Upstream error' }
    }
    // OpenAI-compatible
    const choice = p.choices?.[0]
    if (choice) {
      const out: { delta?: string; done?: boolean } = {}
      if (typeof choice.delta?.content === 'string' && choice.delta.content) {
        out.delta = choice.delta.content
      }
      if (choice.finish_reason) out.done = true
      return out
    }
    // Ollama
    const out: { delta?: string; done?: boolean } = {}
    if (typeof p.message?.content === 'string' && p.message.content) out.delta = p.message.content
    if (p.done) out.done = true
    return out
  } catch {
    return null
  }
}
