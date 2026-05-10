import { useEffect, useState } from 'react'

interface Options {
  /** Delay between characters while typing (ms). */
  typeMs?: number
  /** Delay between characters while deleting (ms). */
  deleteMs?: number
  /** Pause before starting to delete a fully-typed phrase (ms). */
  holdMs?: number
  /** Pause between phrases (ms). */
  betweenMs?: number
  /** Initial delay before typing begins (ms). */
  startDelayMs?: number
}

/**
 * Cycles through a list of phrases, typing then deleting each one. Returns the
 * current visible substring. Phrase array is read on each render so callers
 * don't need to memoize.
 */
export function useTypewriter(phrases: string[], opts: Options = {}) {
  const {
    typeMs = 55,
    deleteMs = 30,
    holdMs = 1400,
    betweenMs = 300,
    startDelayMs = 350,
  } = opts

  const [text, setText] = useState('')

  useEffect(() => {
    if (!phrases.length) return

    let phraseIdx = 0
    let charIdx = 0
    let deleting = false
    let timer: number | undefined

    const tick = () => {
      const current = phrases[phraseIdx]
      if (!deleting) {
        charIdx += 1
        setText(current.slice(0, charIdx))
        if (charIdx === current.length) {
          deleting = true
          timer = window.setTimeout(tick, holdMs)
          return
        }
        timer = window.setTimeout(tick, typeMs)
        return
      }
      charIdx -= 1
      setText(current.slice(0, Math.max(0, charIdx)))
      if (charIdx === 0) {
        deleting = false
        phraseIdx = (phraseIdx + 1) % phrases.length
        timer = window.setTimeout(tick, betweenMs)
        return
      }
      timer = window.setTimeout(tick, deleteMs)
    }

    timer = window.setTimeout(tick, startDelayMs)
    return () => {
      if (timer) window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.join('|')])

  return text
}
