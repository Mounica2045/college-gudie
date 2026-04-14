"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight, Code, BarChart, Palette, Database, Brain, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const careerPaths = [
  { 
    name: "Computer Science Engineering", 
    match: 95, 
    icon: Code,
    description: "Strong coding skills with logical thinking"
  },
  { 
    name: "Data Analytics", 
    match: 88, 
    icon: BarChart,
    description: "Statistical analysis without heavy math"
  },
  { 
    name: "UI/UX Design", 
    match: 82, 
    icon: Palette,
    description: "Creative design with user focus"
  },
  { 
    name: "Database Administration", 
    match: 78, 
    icon: Database,
    description: "Data management and optimization"
  },
  { 
    name: "AI/ML Engineering", 
    match: 70, 
    icon: Brain,
    description: "Machine learning with moderate math"
  },
  { 
    name: "Web Development", 
    match: 92, 
    icon: Globe,
    description: "Full-stack development skills"
  },
]

export function CareerPredictor() {
  const [input, setInput] = useState("I like coding but weak in math")
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(careerPaths.slice(0, 3))

  const handlePredict = () => {
    setShowResults(true)
    // Simulate different results based on input
    const shuffled = [...careerPaths].sort(() => Math.random() - 0.5)
    setResults(shuffled.slice(0, 3))
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-accent/20">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Career Path Predictor</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Tell us about your interests and strengths to get personalized career recommendations.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="E.g., I enjoy problem-solving but struggle with physics..."
          className="flex-1 px-4 py-2.5 rounded-lg bg-input/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
        />
        <Button onClick={handlePredict} className="gap-2 bg-primary hover:bg-primary/90">
          Predict
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <p className="text-sm font-medium text-foreground">Recommended Paths:</p>
            {results.map((path, index) => (
              <motion.div
                key={path.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <path.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{path.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{path.description}</p>
                </div>
                <div className="shrink-0">
                  <span className="text-sm font-semibold text-primary">{path.match}%</span>
                  <span className="text-xs text-muted-foreground ml-1">match</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
