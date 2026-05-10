# Sonu Daryani – AI Full Stack Portfolio

A multi-page, AI-driven portfolio built with **Next.js (App Router)**, **TypeScript**, **Three.js** (@react-three/fiber), **Framer Motion**, and **Tailwind CSS**. Includes a built-in AI chatbot (**SonuBot**) that runs on **Ollama Cloud** and is grounded in the real profile data.

## Features

- App Router routing: `/`, `/about`, `/experience`, `/projects`, `/contact`
- 3D animated background (displacement sphere + particle field)
- AI chatbot grounded in profile data, streamed from Ollama Cloud (`/api/chat`)
- Light + dark theme with no flash on first paint
- Polished UI: terminal intro, status pills, role chips, timeline, project filter

## Quick start

```bash
npm install
cp .env.example .env.local
# fill in OLLAMA_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

### AI chatbot
| Variable             | Default                   | Notes                                       |
| -------------------- | ------------------------- | ------------------------------------------- |
| `OLLAMA_API_KEY`     | _(required for chatbot)_  | Get one at https://ollama.com/account/keys  |
| `OLLAMA_HOST`        | `https://ollama.com`      | Override if you proxy or self-host          |
| `OLLAMA_AGENT_MODEL` | `gpt-oss:120b`            | Any Ollama-Cloud-compatible model id        |

If `OLLAMA_API_KEY` is unset the site still runs; the chatbot just shows a friendly "offline" notice and points visitors at the contact form / email instead.

### Contact form (SMTP)
| Variable      | Default          | Notes                                            |
| ------------- | ---------------- | ------------------------------------------------ |
| `SMTP_HOST`   | _(required)_     | e.g. `smtp.gmail.com`                            |
| `SMTP_PORT`   | `587`            | Port number                                      |
| `SMTP_SECURE` | `0`              | `1` / `true` for SSL (port 465), else STARTTLS   |
| `SMTP_USER`   | _(required)_     | Login user                                       |
| `SMTP_PASS`   | _(required)_     | App password (Gmail: generate one in security)   |
| `SMTP_FROM`   | falls back to `SMTP_USER` | Address shown in the From: header       |

The `/api/contact` route sends two emails per submission: a notification to the owner, and a thank-you auto-reply to the sender confirming receipt and promising a personal reply within 24h.

## Build

```bash
npm run build
npm run start
```

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript 5
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion 11
- Tailwind CSS 3
- Ollama Cloud (`/api/chat` route handler, edge runtime, NDJSON streaming)

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout, theme bootstrap
│   ├── page.tsx             # Home (Hero)
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   ├── contact/page.tsx
│   ├── api/chat/route.ts    # Ollama Cloud streaming proxy
│   └── globals.css
├── components/
│   ├── Shell.tsx            # Visual chrome (nav + footer + 3D bg + chatbot)
│   ├── Hero / About / Experience / Projects / Contact / Nav / Footer ...
│   ├── ai/AILauncher.tsx    # Floating SonuBot chat panel (streaming)
│   └── ui/                  # Button, Card, Modal, Icon
├── data/profile.ts          # Single source of truth for content
├── lib/systemPrompt.ts      # Grounded prompt builder (uses profile.ts)
└── types/profile.ts
```

## Type checking

```bash
npm run typecheck
```
