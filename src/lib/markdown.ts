/**
 * Tiny inline-markdown renderer for AI chat replies. We intentionally do not
 * pull in a full markdown lib — only a handful of common patterns are
 * supported, and everything else is rendered as plain text.
 *
 * The renderer is deliberately defensive: even if the model leaks a markdown
 * table, raw `<br>`, or stray pipes, we degrade gracefully into readable lines
 * instead of dumping HTML/pipe-soup into the bubble.
 */

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const inlineRules: Array<[RegExp, string]> = [
  [/`([^`]+)`/g, '<code class="bg-black/25 px-1 rounded">$1</code>'],
  [/\*\*(.+?)\*\*/g, '<strong>$1</strong>'],
  [/\*(.+?)\*/g, '<em>$1</em>'],
  [
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-accent-light">$1</a>',
  ],
]

export function renderInline(line: string): string {
  let html = escape(line)
  for (const [re, replacement] of inlineRules) html = html.replace(re, replacement)
  return html
}

export interface MdLine {
  kind: 'bullet' | 'text'
  html: string
}

/** Lines that look like markdown table separators (`|---|---|`). */
function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{2,}\s*(\|\s*:?-{2,}\s*)+\|?\s*$/.test(line)
}

/** Split a `| col1 | col2 | col3 |` row into clean cells. */
function splitTableRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean)
}

/**
 * Pre-process raw model output so it always produces something the renderer
 * can handle:
 *   - normalize \r\n → \n
 *   - replace literal <br> / <br/> tags (escaped or not) with newlines
 *   - convert markdown tables into bullet lists
 */
function preprocess(text: string): string {
  // Normalize line endings + neutralize HTML line breaks (escaped or raw).
  let normalized = text
    .replace(/\r\n?/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;br\s*\/?&gt;/gi, '\n')

  const lines = normalized.split('\n')
  const out: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const next = lines[i + 1] ?? ''
    const isHeader =
      /^\s*\|.+\|\s*$/.test(line) && isTableSeparator(next)

    if (isHeader) {
      const headers = splitTableRow(line)
      i += 1 // skip the separator line
      // Walk subsequent table rows and convert them to bullet groups.
      while (i + 1 < lines.length && /^\s*\|.+\|\s*$/.test(lines[i + 1])) {
        i += 1
        const cells = splitTableRow(lines[i])
        const lead = cells[0] || '(row)'
        const rest = cells.slice(1)
        const pairs = rest
          .map((cell, idx) => (cell ? `**${headers[idx + 1] ?? ''}:** ${cell}` : null))
          .filter(Boolean) as string[]
        out.push(`- **${lead}** — ${pairs.join(' · ')}`)
      }
      continue
    }

    out.push(line)
  }

  return out.join('\n')
}

export function tokenizeMarkdown(text: string): MdLine[] {
  const cleaned = preprocess(text)
  return cleaned.split('\n').map((line) => {
    const isBullet = /^[-•]\s+/.test(line)
    return {
      kind: isBullet ? 'bullet' : 'text',
      html: renderInline(line.replace(/^[-•]\s+/, '')),
    }
  })
}
