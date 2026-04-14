"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Announcement {
  id: string
  title: string
  content: string
  type: "important" | "info" | "update"
  date: string
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "JEE Main 2024 Results Declared",
    content: "Check your results on the official JEE website. Counseling dates will be announced soon.",
    type: "important",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "New Scholarship Program Launched",
    content: "Merit-based scholarships now available for students scoring above 90%.",
    type: "info",
    date: "2024-01-14",
  },
  {
    id: "3",
    title: "Admission Deadline Extended",
    content: "Last date for B.Tech admissions extended to January 31, 2024.",
    type: "update",
    date: "2024-01-13",
  },
]

export function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "info" as const,
  })

  const handleAdd = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        ...newAnnouncement,
        date: new Date().toISOString().split('T')[0],
      }
      setAnnouncements(prev => [announcement, ...prev])
      setNewAnnouncement({ title: "", content: "", type: "info" })
      setShowForm(false)
    }
  }

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "important":
        return "bg-destructive/20 text-destructive"
      case "update":
        return "bg-primary/20 text-primary"
      default:
        return "bg-accent/20 text-accent"
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Manage Announcements</h3>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Announcement
        </Button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-xl p-6 overflow-hidden"
          >
            <h4 className="font-medium text-foreground mb-4">New Announcement</h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Title</label>
                <Input
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter announcement title"
                  className="bg-input/50"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Content</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter announcement content"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-input/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Type</label>
                <div className="flex gap-2">
                  {(["info", "important", "update"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewAnnouncement(prev => ({ ...prev, type }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                        newAnnouncement.type === type
                          ? getTypeColor(type)
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>
                  Add Announcement
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcements List */}
      <div className="space-y-3">
        <AnimatePresence>
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {announcement.date}
                    </div>
                  </div>
                  <h4 className="font-medium text-foreground mb-1">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(announcement.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {announcements.length === 0 && (
          <div className="glass-card rounded-xl p-8 text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No announcements yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
