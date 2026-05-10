'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { apiClient } from '../lib/apiClient'
import { useAsync } from '../hooks/useAsync'

export interface ContactPayload {
  name: string
  email: string
  company?: string
  message: string
  honeypot?: string
}

interface ContactResponse {
  ok: boolean
  error?: string
}

interface ContactContextValue {
  /** True while the request is in flight. */
  loading: boolean
  /** True after a successful submission, until `reset()` is called. */
  succeeded: boolean
  /** Last error, if any (validation or server). */
  errorMessage: string | null
  /** Submit a contact-form payload. Returns true on success, false on failure. */
  submit: (payload: ContactPayload) => Promise<boolean>
  /** Clear status + last error so the form can be reused. */
  reset: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(payload: ContactPayload): string | null {
  if (payload.name.trim().length < 2) return 'Please enter your name.'
  if (!EMAIL_RE.test(payload.email.trim())) return 'Please enter a valid email address.'
  if (payload.message.trim().length < 10)
    return 'A few more words about your enquiry, please.'
  return null
}

export function ContactProvider({ children }: { children: ReactNode }) {
  // Local validation errors live here so they share UI with server errors —
  // both flow through `errorMessage` for one consistent error surface.
  const [validationError, setValidationError] = useState<string | null>(null)

  const submitRequest = useAsync((payload: ContactPayload) =>
    apiClient.post<ContactResponse>('/api/contact', payload),
  )

  const submit = useCallback(
    async (payload: ContactPayload): Promise<boolean> => {
      const validationMsg = validate(payload)
      if (validationMsg) {
        setValidationError(validationMsg)
        submitRequest.reset()
        return false
      }
      setValidationError(null)

      const res = await submitRequest.run(payload)
      if (!res.ok) return false
      // Server may still respond 200 with { ok: false, error: ... }
      if (res.data && res.data.ok === false) {
        return false
      }
      return Boolean(res.data?.ok)
    },
    [submitRequest],
  )

  const reset = useCallback(() => {
    setValidationError(null)
    submitRequest.reset()
  }, [submitRequest])

  const errorMessage = useMemo(() => {
    if (validationError) return validationError
    if (submitRequest.error) return submitRequest.error.message
    if (submitRequest.data && submitRequest.data.ok === false) {
      return submitRequest.data.error || 'Could not send your message.'
    }
    return null
  }, [validationError, submitRequest.error, submitRequest.data])

  const succeeded = !!submitRequest.data?.ok && !validationError

  const value = useMemo<ContactContextValue>(
    () => ({
      loading: submitRequest.loading,
      succeeded,
      errorMessage,
      submit,
      reset,
    }),
    [submitRequest.loading, succeeded, errorMessage, submit, reset],
  )

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}

export function useContactForm(): ContactContextValue {
  const ctx = useContext(ContactContext)
  if (!ctx) {
    throw new Error('useContactForm() must be used inside <ContactProvider>')
  }
  return ctx
}
