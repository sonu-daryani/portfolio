'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Profile } from '../types/profile'
import Button from './ui/Button'
import StatusPill from './ai/StatusPill'
import { Icon } from './ui/Icon'
import { useContactForm, type ContactPayload } from '../context/ContactContext'

interface ContactProps {
  profile: Profile
}

interface FormState {
  name: string
  email: string
  company: string
  message: string
  honeypot: string
}

const PRESETS = [
  "We're hiring a senior frontend / full stack — are you available?",
  'Looking for a frontend lead for a multi-tenant SaaS.',
  'Need help with a Next.js + NestJS product build.',
  'Have an AI-adjacent product surface that needs a strong UI engineer.',
]

const INITIAL: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
  honeypot: '',
}

export default function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState<FormState>(INITIAL)
  // All async / loading / error state is owned by the context — the component
  // only owns the input values themselves.
  const { submit, loading, succeeded, errorMessage, reset: resetSubmit } = useContactForm()

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    const payload: ContactPayload = {
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      message: form.message,
      honeypot: form.honeypot,
    }
    void submit(payload)
  }

  const reset = () => {
    setForm(INITIAL)
    resetSubmit()
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 sm:py-14 md:py-16">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
          <StatusPill label="inbox: open" tone="live" />
          <span className="text-theme-muted font-mono text-xs inline-flex items-center gap-1.5">
            <Icon.Pin size={12} /> {profile.availability.baseLocation}
          </span>
          <span className="text-theme-muted font-mono text-xs inline-flex items-center gap-1.5">
            <Icon.Branch size={12} /> {profile.availability.localModes.join(' / ')} ·{' '}
            {profile.availability.remoteOnlyElsewhere
              ? 'Remote-only elsewhere'
              : 'Open to relocation'}
          </span>
          <span className="text-theme-muted font-mono text-xs hidden sm:inline">
            avg. reply · {'<'} 24h IST
          </span>
        </div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme tracking-tight mb-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Let&apos;s ship something{' '}
          <span className="text-accent-light">solid</span>.
        </motion.h2>
        <p className="text-theme-muted text-base sm:text-lg max-w-2xl mb-10">
          Open to senior frontend / full stack / lead roles, multi-tenant SaaS builds, and
          AI-adjacent product surfaces. Drop a note below — you&apos;ll get a confirmation
          email, and I&apos;ll reply personally.
        </p>

        <motion.div
          className="chat-card rounded-2xl border border-theme-border bg-theme-card/65 backdrop-blur-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="chat-card-header flex items-center gap-2 px-4 py-3 border-b border-theme-border">
            <span className="ai-launcher-orb !h-7 !w-7">
              <Icon.Send size={12} />
            </span>
            <div className="min-w-0">
              <p className="text-theme text-sm font-semibold leading-tight">Reach out</p>
              <p className="text-theme-muted text-[11px] font-mono">
                forwards to {profile.email}
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
            </span>
          </div>

          {succeeded ? (
            <SuccessView email={form.email} onReset={reset} />
          ) : (
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <Field
                  label="Your name"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  disabled={loading}
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              <Field
                label="Company"
                hint="optional"
                value={form.company}
                onChange={update('company')}
                placeholder="Acme Inc."
                autoComplete="organization"
                disabled={loading}
              />
              <div>
                <label className="field-label" htmlFor="contact-message">
                  Message
                  <span className="field-required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  disabled={loading}
                  placeholder="Tell me about your project, role, or timeline..."
                  className="contact-textarea w-full rounded-xl px-3.5 py-2.5 text-sm leading-relaxed resize-y"
                />
                <p className="text-[10.5px] text-theme-muted/70 font-mono mt-1.5">
                  {form.message.length} / 4000 characters
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-mono text-theme-muted mr-1 inline-flex items-center">
                  <Icon.Sparkle size={12} className="mr-1 text-accent" /> Quick prompts:
                </span>
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, message: p }))}
                    className="chat-preset text-left text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-theme-border bg-theme-strong/30 text-theme-muted hover:text-theme hover:border-accent/40 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={update('honeypot')}
                className="hidden"
                aria-hidden="true"
              />

              {errorMessage ? (
                <p className="form-error" role="alert" aria-live="polite">
                  <span aria-hidden className="font-mono font-bold mt-0.5">!</span>
                  <span>{errorMessage}</span>
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-theme-muted font-mono leading-relaxed">
                  You&apos;ll receive a confirmation email at the address above.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  liquid
                  type="submit"
                  disabled={loading}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {loading ? (
                      <>
                        <Spinner /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Icon.Send size={14} />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
          <ContactTile
            icon={<Icon.Mail size={16} />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactTile
            icon={<Icon.Phone size={16} />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
          />
        </div>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button
            as="a"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            aria-label="LinkedIn"
          >
            <span className="inline-flex items-center gap-2">
              <Icon.Linkedin size={14} /> LinkedIn
            </span>
          </Button>
          <Button
            as="a"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            aria-label="GitHub"
          >
            <span className="inline-flex items-center gap-2">
              <Icon.Github size={14} /> GitHub
            </span>
          </Button>
          <Button
            as="a"
            href="/sonu-daryani-cv.pdf"
            download="Sonu_Daryani_CV.pdf"
            variant="ghost"
            size="sm"
            aria-label="Download CV"
          >
            <span className="inline-flex items-center gap-2">
              <Icon.Download size={14} /> CV
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
  autoComplete?: string
  disabled?: boolean
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  hint,
  autoComplete,
  disabled,
}: FieldProps) {
  const id = `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
        {required ? <span className="field-required">*</span> : null}
        {hint ? <span className="field-hint">{hint}</span> : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className="contact-input w-full rounded-xl px-3.5 py-2 text-sm"
      />
    </div>
  )
}

function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
      aria-hidden
    />
  )
}

interface SuccessViewProps {
  email: string
  onReset: () => void
}

function SuccessView({ email, onReset }: SuccessViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 sm:p-6 text-center"
    >
      <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-400/30 inline-flex items-center justify-center text-emerald-300 mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4 10-10" />
        </svg>
      </div>
      <h3 className="text-theme text-lg sm:text-xl font-semibold mb-2">
        Message received — talk soon!
      </h3>
      <p className="text-theme-muted text-sm leading-relaxed max-w-md mx-auto">
        Thanks for reaching out. I&apos;ve sent a confirmation to{' '}
        <span className="text-theme font-medium">{email}</span> and I&apos;ll personally
        connect with you very soon — usually within 24 hours.
      </p>
      <p className="text-theme-muted text-xs font-mono mt-3">
        Don&apos;t see the email? Check your spam folder.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" size="sm" liquid onClick={onReset}>
          Send another message
        </Button>
      </div>
    </motion.div>
  )
}

interface ContactTileProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}

function ContactTile({ icon, label, value, href }: ContactTileProps) {
  return (
    <a
      href={href}
      className="contact-tile flex items-center gap-3 rounded-2xl border border-theme-border bg-theme-card/70 backdrop-blur-md px-4 py-3 hover:border-accent/40 hover:bg-theme-card/90 transition group"
    >
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-accent/15 text-accent shrink-0">
        {icon}
      </span>
      <span className="min-w-0 flex flex-col">
        <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted">
          {label}
        </span>
        <span className="text-theme text-sm font-medium truncate">{value}</span>
      </span>
      <Icon.ArrowUpRight
        size={14}
        className="ml-auto text-theme-muted group-hover:text-accent transition"
      />
    </a>
  )
}
