'use client'

import { ChatProvider } from '../context/ChatContext'
import AILauncher from './ai/AILauncher'

/** Chat state is isolated here so streaming tokens do not re-render Shell / layout. */
export default function ChatBootstrap() {
  return (
    <ChatProvider>
      <AILauncher />
    </ChatProvider>
  )
}
