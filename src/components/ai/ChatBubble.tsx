'use client'

import type { ChatMsg } from '../../hooks/useChatStream'
import { tokenizeMarkdown } from '../../lib/markdown'
import { cn } from '../../lib/utils'

interface ChatBubbleProps {
  msg: ChatMsg
}

export default function ChatBubble({ msg }: ChatBubbleProps) {
  const isUser = msg.role === 'user'
  const lines = tokenizeMarkdown(msg.content)

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={cn(
          'chat-bubble max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words',
          isUser
            ? 'bg-accent/85 text-on-accent rounded-br-md'
            : msg.error
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-200 rounded-bl-md'
              : 'bg-theme-strong/55 text-theme rounded-bl-md',
        )}
      >
        {lines.map((line, i) =>
          line.kind === 'bullet' ? (
            <span
              key={i}
              className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-accent-light"
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ) : (
            <span
              key={i}
              className="block"
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ),
        )}
        {msg.pending ? <TypingDots /> : null}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="ai-typing inline-flex items-center gap-1 ml-1 align-middle">
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70 animate-pulse" />
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70 animate-pulse [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70 animate-pulse [animation-delay:240ms]" />
    </span>
  )
}
