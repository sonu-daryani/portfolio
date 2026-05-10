import Contact from '../../components/Contact'
import { profile } from '../../data/profile'

export const metadata = {
  title: 'Contact | Sonu Daryani',
  description: 'Open to senior & lead roles, AI-product engagements, and contracts.',
}

export default function ContactPage() {
  return <Contact profile={profile} />
}
