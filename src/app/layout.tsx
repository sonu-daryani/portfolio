import type { Metadata } from 'next'
import ChatBootstrap from '../components/ChatBootstrap'
import Providers from '../components/Providers'
import Shell from '../components/Shell'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sonu Daryani | Senior Frontend & Full Stack Engineer',
  description:
    'Sonu Daryani — Senior Frontend Engineer / Full Stack Developer / Frontend Lead. Next.js, TypeScript, NestJS, Azure. Multi-tenant SaaS with AI features. Based in Delhi NCR.',
  metadataBase: new URL('https://sonudaryani.dev'),
  openGraph: {
    title: 'Sonu Daryani | Senior Frontend & Full Stack Engineer',
    description:
      'Frontend-led full stack engineer. Next.js, TypeScript, NestJS, Azure. Lead frontend on an AI recruitment platform; growing in GenAI, system design, cloud.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sonu Daryani | Senior Frontend & Full Stack Engineer',
    description:
      'Frontend-led full stack engineer building multi-tenant SaaS with Next.js, NestJS, Azure.',
  },
}

const themeBootstrap = `(function() {
  try {
    var k = 'portfolio-theme';
    var v = localStorage.getItem(k);
    var el = document.documentElement;
    el.classList.remove('dark', 'light');
    el.classList.add(v === 'light' ? 'light' : 'dark');
  } catch (e) {}
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <Providers>
          <Shell>{children}</Shell>
          <ChatBootstrap />
        </Providers>
      </body>
    </html>
  )
}
