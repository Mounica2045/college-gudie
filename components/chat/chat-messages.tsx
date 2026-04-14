"use client"

import { motion } from "framer-motion"
import { GraduationCap, User } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-full text-center"
        >
          <div className="p-4 rounded-2xl bg-primary/10 mb-4">
            <GraduationCap className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Welcome to AI College Guide
          </h3>
          <p className="text-muted-foreground max-w-md">
            Ask me anything about colleges, courses, admissions, placements, or career guidance. 
            I am here to help you make informed decisions about your education.
          </p>
        </motion.div>
      )}

      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "flex gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "assistant" && (
            <div className="p-2 rounded-lg bg-primary/20 h-fit shrink-0">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
          )}
          
          <div
            className={cn(
              "max-w-[70%] px-4 py-3 rounded-2xl",
              message.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "glass-card rounded-bl-md"
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {message.role === "user" && (
            <div className="p-2 rounded-lg bg-muted h-fit shrink-0">
              <User className="w-5 h-5 text-foreground" />
            </div>
          )}
        </motion.div>
      ))}

      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <div className="p-2 rounded-lg bg-primary/20 h-fit">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
