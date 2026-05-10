import Experience from '../../components/Experience'
import { profile } from '../../data/profile'

export const metadata = {
  title: 'Experience | Sonu Daryani',
  description: '4+ years across AI, fintech, scheduling, and SaaS. Career timeline.',
}

export default function ExperiencePage() {
  return <Experience profile={profile} />
}
