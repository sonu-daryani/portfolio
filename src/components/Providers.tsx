'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { ChatProvider } from '../context/ChatContext'
import { ContactProvider } from '../context/ContactContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ContactProvider>
        <ChatProvider>{children}</ChatProvider>
      </ContactProvider>
    </ThemeProvider>
  )
}
