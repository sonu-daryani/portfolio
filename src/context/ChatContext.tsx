'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useChatStream, type ChatMsg } from '../hooks/useChatStream'

const GREETING: ChatMsg = {
  id: 'greet',
  role: 'assistant',
  content:
    "Hi! I'm SonuBot — ask me about Sonu's stack, projects, what he's currently learning, or how to hire him. I only answer from his real portfolio data.",
}

const SUGGESTIONS = [
  'What stack does Sonu work in day-to-day?',
  'Walk me through his AI platform work',
  'What is he currently learning?',
  'Is he available, and where?',
]

interface ChatContextValue {
  open: boolean
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void

  messages: ChatMsg[]
  streaming: boolean
  send: (text: string) => Promise<void>
  stop: () => void
  reset: () => void

  greeting: ChatMsg
  suggestions: string[]
}

const ChatContext = createContext<ChatContextValue | null>(null)

interface ChatProviderProps {
  children: ReactNode
  greeting?: ChatMsg
  suggestions?: string[]
}

export function ChatProvider({
  children,
  greeting = GREETING,
  suggestions = SUGGESTIONS,
}: ChatProviderProps) {
  const [open, setOpen] = useState(false)
  const stream = useChatStream({ initial: [greeting] })

  const openPanel = useCallback(() => setOpen(true), [])
  const closePanel = useCallback(() => setOpen(false), [])
  const togglePanel = useCallback(() => setOpen((o) => !o), [])

  const value = useMemo<ChatContextValue>(
    () => ({
      open,
      openPanel,
      closePanel,
      togglePanel,
      messages: stream.messages,
      streaming: stream.streaming,
      send: stream.send,
      stop: stream.stop,
      reset: stream.reset,
      greeting,
      suggestions,
    }),
    [
      open,
      openPanel,
      closePanel,
      togglePanel,
      stream.messages,
      stream.streaming,
      stream.send,
      stream.stop,
      stream.reset,
      greeting,
      suggestions,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChat() must be used inside <ChatProvider>')
  }
  return ctx
}
