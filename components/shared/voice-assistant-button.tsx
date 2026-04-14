"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceAssistantButtonProps {
  onTranscript?: (text: string) => void
  className?: string
}

export function VoiceAssistantButton({ onTranscript, className }: VoiceAssistantButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        onTranscript?.("What are the admission requirements for B.Tech?")
      }, 3000)
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={toggleListening}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative p-3 rounded-full transition-colors",
          isListening
            ? "bg-destructive text-destructive-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          className
        )}
      >
        {/* Ripple effect when listening */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-destructive"
              />
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-destructive"
              />
            </>
          )}
        </AnimatePresence>

        <motion.div
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
        >
          {isListening ? (
            <MicOff className="w-5 h-5 relative z-10" />
          ) : (
            <Mic className="w-5 h-5 relative z-10" />
          )}
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-popover text-popover-foreground text-xs font-medium whitespace-nowrap shadow-lg"
          >
            Speak your question
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-medium whitespace-nowrap"
          >
            Listening...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
