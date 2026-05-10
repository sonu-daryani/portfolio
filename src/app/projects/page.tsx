import Projects from '../../components/Projects'
import { profile } from '../../data/profile'

export const metadata = {
  title: 'Projects | Sonu Daryani',
  description: 'Production AI, recruitment, fintech, scheduling, and commerce builds.',
}

export default function ProjectsPage() {
  return <Projects profile={profile} />
}
