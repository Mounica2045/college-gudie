"use client"

import { motion } from "framer-motion"
import { HelpCircle, AlertTriangle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type EmotionState = "confused" | "stressed" | "curious"

interface EmotionDetectionBadgeProps {
  emotion: EmotionState
  className?: string
}

const emotionConfig = {
  confused: {
    icon: HelpCircle,
    label: "Confused",
    description: "Need clarification?",
    color: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    iconColor: "text-amber-500",
  },
  stressed: {
    icon: AlertTriangle,
    label: "Stressed",
    description: "Take a deep breath",
    color: "bg-red-500/20 text-red-500 border-red-500/30",
    iconColor: "text-red-500",
  },
  curious: {
    icon: Sparkles,
    label: "Curious",
    description: "Great enthusiasm!",
    color: "bg-primary/20 text-primary border-primary/30",
    iconColor: "text-primary",
  },
}

export function EmotionDetectionBadge({ emotion, className }: EmotionDetectionBadgeProps) {
  const config = emotionConfig[emotion]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm",
        config.color,
        className
      )}
    >
      <motion.div
        animate={{ 
          rotate: emotion === "confused" ? [0, -10, 10, 0] : 0,
          scale: emotion === "stressed" ? [1, 1.1, 1] : 1,
        }}
        transition={{ 
          duration: 0.5, 
          repeat: emotion !== "curious" ? Infinity : 0,
          repeatDelay: 1
        }}
      >
        <Icon className={cn("w-4 h-4", config.iconColor)} />
      </motion.div>
      <div>
        <p className="text-xs font-semibold">{config.label}</p>
        <p className="text-[10px] opacity-80">{config.description}</p>
      </div>
    </motion.div>
  )
}

// Demo component showing all states
export function EmotionDetectionDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <EmotionDetectionBadge emotion="confused" />
      <EmotionDetectionBadge emotion="stressed" />
      <EmotionDetectionBadge emotion="curious" />
    </div>
  )
}
