import { tokenizeMarkdown } from './src/lib/markdown.ts'

const sample = `| Project | Role |
|---|---|
| Sanya AI | Frontend Lead |
| IntalentAI | Lead |

Normal **bold** text.<br>Next line<br/>And another.`

for (const line of tokenizeMarkdown(sample)) {
  console.log(line.kind.padEnd(7), '|', line.html)
}
