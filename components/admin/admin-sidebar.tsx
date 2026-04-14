"use client"

import { motion } from "framer-motion"
import { 
  Upload, 
  HelpCircle, 
  BarChart3, 
  Bell, 
  Settings, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Shield
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { icon: Upload, label: "Upload Documents", id: "upload" },
  { icon: HelpCircle, label: "Manage FAQs", id: "faqs" },
  { icon: BarChart3, label: "Student Analytics", id: "analytics" },
  { icon: Bell, label: "Announcements", id: "announcements" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export function AdminSidebar({ isCollapsed, onToggle, activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-full glass-card border-r border-border/50 flex flex-col relative"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 p-1.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 shrink-0">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : "auto" }}
            className="overflow-hidden"
          >
            <span className="font-bold text-lg text-foreground whitespace-nowrap block">AI College Guide</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              Admin Panel
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              activeTab === item.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : "auto" }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          </button>
        ))}
      </nav>

      {/* Back to App */}
      <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 1, height: isCollapsed ? 0 : "auto" }}
        className="p-3 border-t border-border/50 overflow-hidden"
      >
        <Link
          href="/dashboard"
          className="block w-full text-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </motion.aside>
  )
}
