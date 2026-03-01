export interface ProfileLinks {
  linkedin: string
  github: string
  intalent: string
  unlocklife: string
  winity: string
}

export interface ProfileSkills {
  languages: string[]
  frameworks: string[]
  backend: string[]
  cloud: string[]
  tools: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  points: string[]
}

export interface ProjectItem {
  name: string
  description: string
  tech: string[]
  link: string
  date: string
}

export interface Education {
  degree: string
  institute: string
  period: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  image: string
  email: string
  phone: string
  location: string
  about: string
  links: ProfileLinks
  skills: ProfileSkills
  experience: ExperienceItem[]
  projects: ProjectItem[]
  achievements: string[]
  education: Education
  certification: string
}
