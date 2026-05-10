'use client'

import { Icon } from '../ui/Icon'
import ChatPanel from './ChatPanel'
import { useChat } from '../../context/ChatContext'

export default function AILauncher() {
  const { open, togglePanel } = useChat()

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        onClick={togglePanel}
        className="ai-launcher fixed bottom-5 right-5 z-40 rounded-full p-3 shadow-2xl text-white opacity-0 motion-safe:animate-launcher-in motion-safe:hover:scale-105 motion-safe:active:scale-95 motion-reduce:opacity-100 motion-reduce:animate-none transition-transform"
      >
        <span className="ai-launcher-glow" aria-hidden />
        {open ? (
          <Icon.Close className="relative z-10" size={22} />
        ) : (
          <Icon.Sparkle className="relative z-10" size={22} />
        )}
      </button>

      {open ? <ChatPanel /> : null}
    </>
  )
}
