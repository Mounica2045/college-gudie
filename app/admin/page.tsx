"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FileUpload } from "@/components/admin/file-upload"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { AnnouncementsManager } from "@/components/admin/announcements-manager"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HelpCircle, Settings as SettingsIcon } from "lucide-react"

function FAQsManager() {
  const faqs = [
    { question: "What are the admission requirements?", answer: "10th and 12th certificates, entrance exam scores..." },
    { question: "What is the fee structure?", answer: "Varies by course, typically ranging from..." },
    { question: "Are scholarships available?", answer: "Yes, merit-based and need-based scholarships..." },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Manage FAQs</h3>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Add FAQ
        </button>
      </div>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card rounded-xl p-4">
            <p className="font-medium text-foreground mb-2">{faq.question}</p>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Settings</h3>
      
      <div className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground block mb-1">AI Response Delay</label>
          <select className="w-full px-3 py-2 rounded-lg bg-input/50 border border-border/50 text-foreground">
            <option>1 second</option>
            <option>2 seconds</option>
            <option>3 seconds</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground block mb-1">Max File Upload Size</label>
          <select className="w-full px-3 py-2 rounded-lg bg-input/50 border border-border/50 text-foreground">
            <option>5 MB</option>
            <option>10 MB</option>
            <option>25 MB</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Enable Voice Input</p>
            <p className="text-sm text-muted-foreground">Allow users to speak their queries</p>
          </div>
          <button className="w-12 h-6 rounded-full bg-primary relative">
            <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Maintenance Mode</p>
            <p className="text-sm text-muted-foreground">Temporarily disable the chat</p>
          </div>
          <button className="w-12 h-6 rounded-full bg-muted/50 relative">
            <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <FileUpload />
      case "faqs":
        return <FAQsManager />
      case "analytics":
        return <AdminAnalytics />
      case "announcements":
        return <AnnouncementsManager />
      case "settings":
        return <SettingsPanel />
      default:
        return <FileUpload />
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case "upload":
        return "Upload Documents"
      case "faqs":
        return "Manage FAQs"
      case "analytics":
        return "Student Analytics"
      case "announcements":
        return "Announcements"
      case "settings":
        return "Settings"
      default:
        return "Admin Panel"
    }
  }

  return (
    <div className="h-screen flex animated-gradient">
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-foreground">{getTitle()}</h1>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
              <AvatarFallback className="bg-primary/20 text-primary font-medium">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-background/50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
