import type { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { profile } from '../../../data/profile'
import {
  corsDeniedResponse,
  isAllowedOrigin,
  rateLimit,
  rateLimitedResponse,
} from '../../../lib/apiGuard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return new Response(null, { status: 204 })
}

interface ContactPayload {
  name?: string
  email?: string
  company?: string
  message?: string
  honeypot?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

let transporterPromise: Promise<nodemailer.Transporter> | null = null

function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === '1' || process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }),
    )
  }
  return transporterPromise
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) return corsDeniedResponse()
  if (!rateLimit(req, { windowMs: 10 * 60_000, max: 5, scope: 'contact' })) {
    return rateLimitedResponse()
  }

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return jsonError(
      503,
      'Contact form is offline at the moment. Please email sonudaryani135@gmail.com directly.',
    )
  }

  let body: ContactPayload
  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return jsonError(400, 'Invalid request body.')
  }

  if (body.honeypot && body.honeypot.length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }

  const name = (body.name || '').trim().slice(0, 120)
  const email = (body.email || '').trim().slice(0, 200)
  const company = (body.company || '').trim().slice(0, 200)
  const message = (body.message || '').trim().slice(0, 4000)

  if (!name || name.length < 2) return jsonError(400, 'Please enter your name.')
  if (!email || !EMAIL_RE.test(email)) return jsonError(400, 'Please enter a valid email.')
  if (!message || message.length < 10) return jsonError(400, 'Please add a few words about your enquiry.')

  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER!
  const ownerInbox = profile.email

  const userAgent = req.headers.get('user-agent') || ''
  const referer = req.headers.get('referer') || ''

  const notifySubject = `📬 New portfolio enquiry — ${name}`
  const notifyText = [
    `New message from your portfolio site.`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    ``,
    `Message:`,
    message,
    ``,
    `---`,
    `User-Agent: ${userAgent}`,
    referer ? `Referer:    ${referer}` : null,
  ]
    .filter(Boolean)
    .join('\n')
  const notifyHtml = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#1e293b;max-width:560px">
      <h2 style="margin:0 0 12px;color:#7c3aed">📬 New portfolio enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Name</td><td><b>${escapeHtml(name)}</b></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b">Company</td><td>${escapeHtml(company)}</td></tr>` : ''}
      </table>
      <h3 style="margin:18px 0 6px;font-size:14px;color:#475569">Message</h3>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;white-space:pre-wrap">${escapeHtml(
        message,
      )}</div>
      <p style="margin:18px 0 0;font-size:11px;color:#94a3b8;font-family:ui-monospace,SFMono-Regular,Menlo,monospace">
        Sent from sonudaryani.dev/contact
      </p>
    </div>
  `

  const replySubject = `Thanks for reaching out, ${name.split(/\s+/)[0]} — I'll be in touch soon`
  const replyText = [
    `Hi ${name.split(/\s+/)[0]},`,
    ``,
    `Thanks for reaching out through my portfolio. I've received your message and will personally connect with you soon — usually within 24 hours.`,
    ``,
    `Here's a copy of what you sent for your records:`,
    ``,
    `> ${message.replace(/\n/g, '\n> ')}`,
    ``,
    `In the meantime, feel free to:`,
    `• Browse projects: https://sonudaryani.dev/projects`,
    `• Connect on LinkedIn: ${profile.links.linkedin}`,
    `• Check out my GitHub: ${profile.links.github}`,
    ``,
    `Talk soon,`,
    `Sonu Daryani`,
    `Senior Full Stack & Frontend Lead · Delhi NCR`,
  ].join('\n')
  const replyHtml = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1e293b;max-width:560px">
      <p style="margin:0 0 14px">Hi <b>${escapeHtml(name.split(/\s+/)[0])}</b>,</p>
      <p style="margin:0 0 14px">
        Thanks for reaching out through my portfolio. I've received your message and will personally connect with you soon — usually within 24 hours.
      </p>
      <p style="margin:0 0 8px;color:#475569;font-size:13px">Here's a copy of what you sent:</p>
      <blockquote style="margin:0 0 18px;padding:12px 14px;background:#f8fafc;border-left:3px solid #7c3aed;border-radius:6px;color:#334155;white-space:pre-wrap">${escapeHtml(
        message,
      )}</blockquote>
      <p style="margin:0 0 6px;color:#475569;font-size:13px">In the meantime:</p>
      <ul style="margin:0 0 18px;padding-left:18px;color:#334155">
        <li><a href="https://sonudaryani.dev/projects" style="color:#7c3aed">Browse projects</a></li>
        <li><a href="${profile.links.linkedin}" style="color:#7c3aed">Connect on LinkedIn</a></li>
        <li><a href="${profile.links.github}" style="color:#7c3aed">Check out my GitHub</a></li>
      </ul>
      <p style="margin:0">Talk soon,<br/><b>Sonu Daryani</b></p>
      <p style="margin:4px 0 0;font-size:12px;color:#64748b">Senior Full Stack &amp; Frontend Lead · Delhi NCR</p>
      <hr style="margin:22px 0;border:none;border-top:1px solid #e2e8f0" />
      <p style="margin:0;font-size:11px;color:#94a3b8;font-family:ui-monospace,SFMono-Regular,Menlo,monospace">
        This is an automated reply confirming receipt. I read every message and will respond from this address personally.
      </p>
    </div>
  `

  try {
    const transporter = await getTransporter()

    await transporter.sendMail({
      from: { name: `${profile.name} Portfolio`, address: fromAddress },
      to: ownerInbox,
      replyTo: { name, address: email },
      subject: notifySubject,
      text: notifyText,
      html: notifyHtml,
    })

    await transporter
      .sendMail({
        from: { name: profile.name, address: fromAddress },
        to: { name, address: email },
        replyTo: ownerInbox,
        subject: replySubject,
        text: replyText,
        html: replyHtml,
      })
      .catch(() => {
        /* don't fail the user submission if auto-reply bounces */
      })

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error'
    return jsonError(502, `Could not send your message right now. Please try again or email directly. (${detail.slice(0, 160)})`)
  }
}
