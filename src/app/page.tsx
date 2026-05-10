import Hero from '../components/Hero'
import { profile } from '../data/profile'

export default function HomePage() {
  return <Hero profile={profile} />
}
