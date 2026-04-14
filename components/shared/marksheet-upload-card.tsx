"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MarksheetUploadCardProps {
  onUploadComplete?: (file: File) => void
  className?: string
}

export function MarksheetUploadCard({ onUploadComplete, className }: MarksheetUploadCardProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success">("idle")
  const [progress, setProgress] = useState(0)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile)
    setUploadState("uploading")
    setProgress(0)

    // Simulate upload
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadState("success")
          onUploadComplete?.(selectedFile)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const reset = () => {
    setFile(null)
    setUploadState("idle")
    setProgress(0)
  }

  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Marksheet Upload</h3>
          <p className="text-sm text-muted-foreground">Check course eligibility</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {uploadState === "idle" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center",
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border/50 hover:border-primary/50"
            )}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Upload className={cn(
              "w-8 h-8 mx-auto mb-3 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
            <p className="text-sm font-medium text-foreground mb-1">
              Drop your marksheet here
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, JPG, PNG up to 5MB
            </p>
          </motion.div>
        )}

        {uploadState === "uploading" && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-6 bg-muted/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm font-medium text-foreground truncate">
                {file?.name}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Uploading... {progress}%
            </p>
          </motion.div>
        )}

        {uploadState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-6 bg-green-500/10 border border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Upload complete!</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {file?.name}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={reset}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-background/50">
              <p className="text-xs font-medium text-foreground mb-2">Eligible Courses:</p>
              <div className="flex flex-wrap gap-2">
                {["B.Tech CSE", "B.Tech IT", "BCA"].map((course) => (
                  <span 
                    key={course}
                    className="px-2 py-1 rounded text-xs bg-primary/20 text-primary"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
