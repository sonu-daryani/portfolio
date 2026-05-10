import type { Profile } from '../types/profile'

export const profile: Profile = {
  name: 'Sonu Daryani',
  title: 'Senior Frontend Engineer | Full Stack Developer | Frontend Lead',
  tagline:
    'Frontend-led full stack engineer building multi-tenant SaaS with Next.js, NestJS, and Azure',
  image: '/profile.jpeg',
  email: 'sonudaryani135@gmail.com',
  phone: '+91 8178323382',
  location: 'Delhi NCR, India',
  about: `Senior Frontend & Full Stack Engineer with around 3 years of experience building multi-tenant SaaS platforms with Next.js, TypeScript, and NestJS. Currently Frontend Lead at IntalentAI, where I own UI architecture for an AI-driven recruitment platform — including Sanya AI screening — and ship complex data, scheduling, and validation flows on Azure and AWS. I'm not an AI researcher: I build the product surface around AI features, and I'm actively levelling up in GenAI, system design, and cloud platforms. Open to Associate / SDE roles where I can own features end to end.`,
  availability: {
    baseLocation: 'Delhi NCR',
    localModes: ['Onsite', 'Hybrid', 'Remote'],
    remoteOnlyElsewhere: true,
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/sonu-daryani-248a18202/',
    github: 'https://github.com/sonu-daryani',
    intalent: 'https://intalent.ai/',
    unlocklife: 'https://www.unlocklife.today/',
    winity: 'https://winity.life',
  },
  skills: {
    languages: ['JavaScript', 'TypeScript', 'SQL'],
    frameworks: [
      'React',
      'Next.js',
      'Redux',
      'Tailwind CSS',
      'MUI',
      'Angular',
      'React Native',
    ],
    backend: [
      'NestJS',
      'Node.js',
      'GraphQL',
      'REST APIs',
      'JWT Auth',
      'PostgreSQL',
      'MongoDB',
      'Prisma ORM',
    ],
    cloud: [
      'Azure (AKS, Functions, Storage, Queue, Communication Services)',
      'Microsoft Graph',
      'AWS (ECS, ElastiCache, EC2)',
      'Temporal',
    ],
    tools: [
      'Jest',
      'React Testing Library',
      'Webpack',
      'Babel',
      'Figma',
      'Git',
      'GitHub',
      'VS Code',
      'Cursor',
    ],
  },
  experience: [
    {
      role: 'Senior Software Engineer (Frontend Lead)',
      company: 'IntalentAI',
      period: "Jan '26 – Present",
      location: 'Remote',
      website: 'https://intalent.ai/',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fintalent.ai%2F?w=1200',
      points: [
        'Lead frontend architecture for an AI-powered recruitment platform built on Next.js, including the Sanya AI screening product.',
        'Built resume parsing workflows, validation pipelines, and scheduling systems orchestrated with Temporal.',
        'Collaborate with the Python ML team to embed candidate-matching models into hiring flows on the product surface.',
        'Designed multi-tenant frontend with RBAC and JWT auth, integrated with Azure Functions, Storage, Queue, Communication Services, and Microsoft Graph.',
      ],
    },
    {
      role: 'Software Engineer – Full Stack',
      company: 'Crownstack Technologies Pvt. Ltd.',
      period: "Feb '24 – Jan '26",
      location: 'Onsite',
      website: 'https://crownstack.com/',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcrownstack.com%2F?w=1200',
      points: [
        'Built Next.js applications integrated with NestJS microservices.',
        'Developed complex UI systems including faceted search and scheduling modules.',
        'Integrated Microsoft Graph APIs, Azure services, and authentication systems.',
        'Improved development velocity by adopting AI-assisted coding tools across the team.',
        'Collaborated across product, design, and QA on IntalentAI, UnlockLife, LX Medical, and Quicklabs.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Deepneura Technologies LLP',
      period: "Jan '23 – Feb '24",
      location: 'Remote',
      website: 'https://deepneura.com/',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdeepneura.com%2F?w=1200',
      points: [
        'Developed React and Angular UI for AI-driven internal platforms.',
        'Integrated APIs and backend services for secure data handling.',
        'Delivered high-quality UI aligned with the in-house product design system.',
      ],
    },
  ],
  projects: [
    {
      name: 'Sanya AI (within IntalentAI)',
      description:
        'Standalone AI screening & interview product inside the IntalentAI hiring platform. Owns parsing, validation, and scheduling on Temporal with custom video review on Azure.',
      detailedDescription:
        'Sanya AI is the AI screening and interview product built into the IntalentAI hiring platform. I lead the frontend for it: a multi-tenant Next.js app where recruiters configure screening flows, candidates take async video interviews, and reviewers go through a custom HLS player. Parsing, validation, and scheduling are orchestrated with Temporal, and recordings live on Azure Storage with HLS/m3u8 playback. The work is heavy on careful UI for stateful flows, RBAC, and reliable handoffs to the Python ML services that score candidates.',
      tech: ['Next.js', 'TypeScript', 'Python', 'Temporal', 'PostgreSQL', 'Azure'],
      link: 'https://intalent.ai/',
      date: 'Jun 2026',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fintalent.ai%2F?w=1200',
    },
    {
      name: 'IntalentAI',
      description:
        'Multi-tenant Next.js recruitment platform — RBAC, faceted JSONB search, scheduling, dynamic pricing, and Azure Queue / Microsoft Graph integrations.',
      detailedDescription:
        'IntalentAI is the broader hiring platform Sanya AI sits inside. I lead frontend architecture for it — multi-tenant Next.js with strict RBAC, JWT auth, and pixel-perfect UI for recruiter and candidate flows. The work covers faceted search over PostgreSQL JSONB, scheduling and dynamic pricing modules, and integrations with Azure Functions, Queue, and Microsoft Graph to keep automation pipelines and calendars in sync.',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Azure'],
      link: 'https://intalent.ai/',
      date: 'Jun 2025',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fintalent.ai%2F?w=1200',
    },
    {
      name: 'Winity.life',
      description:
        'Blockchain wallet platform — multi-chain transactions, KYC (Sumsub), payments (Reap), and AWS ECS / ElastiCache / EC2 backing the wallet APIs.',
      detailedDescription:
        'Winity.life is a fintech and blockchain platform where I worked on wallet APIs and multi-chain transaction flows across Ethereum, Solana, Tron, and Polygon. Sumsub handles KYC, Reap handles payments, and AWS ECS / ElastiCache / EC2 keeps the wallet services scalable and secure. I contributed to backend APIs in NestJS plus React and React Native admin/client surfaces for wallet lifecycle and transaction visibility.',
      tech: ['NestJS', 'React', 'React Native', 'Zustand', 'Blockchain', 'AWS'],
      link: 'https://winity.life',
      date: 'Sep 2025',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwinity.life%2F?w=1200',
    },
    {
      name: 'UnlockLife',
      description:
        'Scheduling-heavy event and community platform — calendar workflows, registration pipelines, Redux-driven state, MUI + Tailwind UI system.',
      detailedDescription:
        'UnlockLife is a community-driven events platform where I built scheduling-heavy event workflows and reusable UI components with real-time API integrations. The state model leans on Redux for predictable session/registration flows, and MUI + Tailwind drive a consistent, responsive component library across desktop and mobile.',
      tech: ['Next.js', 'TypeScript', 'Redux', 'MUI', 'Tailwind CSS'],
      link: 'https://www.unlocklife.today/',
      date: 'Mar 2024',
      previewImage:
        'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.unlocklife.today%2F?w=1200',
    },
    {
      name: 'LX Medical',
      description:
        'Healthcare web platform with responsive interfaces, structured data workflows, and reliable form/table interactions for clinical operations.',
      detailedDescription:
        'LX Medical is a healthcare-oriented product where I focused on responsive, patient-friendly interfaces and robust internal workflows for data-heavy operations. Modular components, optimized form and table interactions, and dependable API-driven states for day-to-day clinical/business operations were the priorities.',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      link: 'https://lx-medical.com/',
      date: 'Mar 2024',
      previewImage: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Flx-medical.com%2F?w=1200',
    },
    {
      name: 'Wearo Ecommerce',
      description:
        'Side project — modern Next.js storefront with product browsing, mobile-first responsive UI, and a streamlined buyer journey.',
      detailedDescription:
        'Wearo Ecommerce is a personal side project focused on a modern Next.js storefront. I built the core buyer journey from product discovery through checkout-ready flows with mobile-first responsiveness, fast page rendering, and a clean filtering/browsing experience. Reusable UI blocks keep catalog updates and branding consistent.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      link: 'https://wearo-ecommerce.vercel.app',
      date: 'Apr 2026',
      previewImage:
        'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwearo-ecommerce.vercel.app%2F?w=1200',
    },
    {
      name: 'StreamFlix',
      description:
        'Next.js streaming-style demo — browse titles, responsive catalog UI, and a polished viewing experience inspired by modern OTT layouts.',
      detailedDescription:
        'StreamFlix is a portfolio streaming platform built with Next.js: catalog browsing, responsive grids and detail surfaces, and playback-oriented layouts inspired by mainstream OTT apps. Deployed on Vercel for fast global delivery; focused on performance, accessible navigation, and a cohesive dark UI suitable for video-heavy experiences.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      link: 'https://streamflix-nu-nine.vercel.app/',
      date: 'May 2026',
      previewImage:
        'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstreamflix-nu-nine.vercel.app%2F?w=1200',
    },
  ],
  achievements: [
    'Rockstar Rookie Award – Crownstack',
    'Best Content Award – Crownstack',
    'Project Hero Award – Crownstack',
    '500+ DSA problems solved (LeetCode, GfG)',
    'Secretary – Forum of Chemical Engineering, BIET Jhansi',
    'Head of Design – Drone Learners Club',
    'Winner – Techzion, BIET Jhansi',
  ],
  education: {
    degree: 'B.Tech – Chemical Engineering',
    institute: 'Bundelkhand Institute of Engineering and Technology, Jhansi',
    period: '2018 – 2022',
  },
  certification: 'Full Stack Web Development – AccioJob',
  learning: [
    {
      area: 'Generative AI',
      detail: 'LLM app patterns, RAG, prompt design, evals — currently going deep on production GenAI workflows.',
    },
    {
      area: 'System Design',
      detail: 'Scalable multi-tenant SaaS, queue-driven workflows, data modeling for high-throughput product surfaces.',
    },
    {
      area: 'Cloud Platforms',
      detail: 'Going deeper on Azure (AKS, Functions, Queue) and AWS (ECS, ElastiCache) beyond day-to-day usage.',
    },
  ],
}
