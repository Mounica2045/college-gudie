"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mic, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

const quickSuggestions = [
  "Admissions",
  "Fees",
  "Placements",
  "Hostel",
  "Courses",
]

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleSuggestion = (suggestion: string) => {
    onSend(`Tell me about ${suggestion.toLowerCase()}`)
  }

  return (
    <div className="p-4 border-t border-border/50 glass-card">
      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickSuggestions.map((suggestion) => (
          <motion.button
            key={suggestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSuggestion(suggestion)}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="w-5 h-5" />
          <span className="sr-only">Attach file</span>
        </Button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about colleges, courses, admissions..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsRecording(!isRecording)}
          className={cn(
            "shrink-0 transition-colors",
            isRecording
              ? "text-destructive animate-pulse"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic className="w-5 h-5" />
          <span className="sr-only">Voice input</span>
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          <Send className="w-5 h-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
