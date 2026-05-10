'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import ChatPanel from './ChatPanel'
import { useChat } from '../../context/ChatContext'

export default function AILauncher() {
  const { open, togglePanel } = useChat()

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        onClick={togglePanel}
        className="ai-launcher fixed bottom-5 right-5 z-40 rounded-full p-3 shadow-2xl text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <span className="ai-launcher-glow" aria-hidden />
        {open ? (
          <Icon.Close className="relative z-10" size={22} />
        ) : (
          <Icon.Sparkle className="relative z-10" size={22} />
        )}
      </motion.button>

      <AnimatePresence>{open ? <ChatPanel /> : null}</AnimatePresence>
    </>
  )
}
