'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia('(pointer: fine)').matches
}

/** SSR / first paint: skip tilt until we know pointer type */
function getServerSnapshot() {
  return false
}

/**
 * True when the primary input is precise (e.g. mouse). False for most phones /
 * tablets — avoids expensive 3D tilt springs during touch scrolling.
 */
export function usePointerFine() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
