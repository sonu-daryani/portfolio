'use client'

import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from '../context/ThemeContext'
import { ContactProvider } from '../context/ContactContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <ContactProvider>{children}</ContactProvider>
      </ThemeProvider>
    </LazyMotion>
  )
}
