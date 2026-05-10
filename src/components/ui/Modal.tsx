'use client'

import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 motion-safe:animate-fade-in motion-reduce:animate-none"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Modal'}
        className="modal-surface relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-7 text-theme shadow-2xl motion-safe:animate-modal-in motion-reduce:animate-none"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
