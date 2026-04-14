"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, File, X, CheckCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  status: "uploading" | "complete" | "error"
  progress: number
}

const initialFiles: UploadedFile[] = [
  { id: "1", name: "admission_guidelines_2024.pdf", size: "2.4 MB", type: "PDF", status: "complete", progress: 100 },
  { id: "2", name: "fee_structure.docx", size: "1.2 MB", type: "DOCX", status: "complete", progress: 100 },
  { id: "3", name: "placement_report_2023.pdf", size: "5.8 MB", type: "PDF", status: "complete", progress: 100 },
]

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles)
  const [isDragging, setIsDragging] = useState(false)

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
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }, [])

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.name.split('.').pop()?.toUpperCase() || "FILE",
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles(prev => [...prev, ...uploadedFiles])

    // Simulate upload progress
    uploadedFiles.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, status: "complete", progress: 100 } : f
            )
          )
        } else {
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            )
          )
        }
      }, 200)
    })
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border/50 hover:border-primary/50"
        )}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "p-4 rounded-full transition-colors",
            isDragging ? "bg-primary/20" : "bg-muted/50"
          )}>
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports PDF, DOC, DOCX files up to 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Files Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-semibold text-foreground">Uploaded Documents</h3>
        </div>
        
        <div className="divide-y divide-border/50">
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <File className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{file.type}</span>
                    <span>•</span>
                    <span>{file.size}</span>
                  </div>
                  
                  {file.status === "uploading" && (
                    <div className="mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {file.status === "complete" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {files.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No files uploaded yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
