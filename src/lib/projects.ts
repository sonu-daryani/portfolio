import type { Profile } from '../types/profile'

const AI_KEYWORDS = ['ai', 'recruit', 'intalent', 'resume', 'parsing', 'ranking', 'llm', 'rag']

export function isAIProject(project: Profile['projects'][number]): boolean {
  const haystack = [project.name, project.description, project.detailedDescription ?? '']
    .join(' ')
    .toLowerCase()
  return AI_KEYWORDS.some((kw) => haystack.includes(kw))
}

export function uniqueTechs(projects: Profile['projects']): string[] {
  const set = new Set<string>()
  projects.forEach((p) => p.tech.forEach((t) => set.add(t)))
  return Array.from(set).sort()
}
