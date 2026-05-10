import About from '../../components/About'
import { profile } from '../../data/profile'

export const metadata = {
  title: 'About | Sonu Daryani',
  description: 'AI-driven full-stack engineer building production SaaS — focus areas, stack, education.',
}

export default function AboutPage() {
  return <About profile={profile} />
}
