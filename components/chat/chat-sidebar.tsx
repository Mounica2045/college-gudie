"use client"

import { motion } from "framer-motion"
import { 
  MessageSquarePlus, 
  LayoutDashboard, 
  Bookmark, 
  Bell, 
  Settings, 
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: MessageSquarePlus, label: "New Chat", href: "/chat", active: true },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Bookmark, label: "Saved Queries", href: "#" },
  { icon: Bell, label: "Announcements", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function ChatSidebar({ isCollapsed, onToggle }: ChatSidebarProps) {
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
        <Link href="/chat" className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 shrink-0">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <motion.span
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : "auto" }}
            className="font-bold text-lg text-foreground whitespace-nowrap overflow-hidden"
          >
            AI College Guide
          </motion.span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              item.active
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
          </Link>
        ))}
      </nav>

      {/* Recent Chats */}
      <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 1, height: isCollapsed ? 0 : "auto" }}
        className="p-3 border-t border-border/50 overflow-hidden"
      >
        <p className="text-xs font-medium text-muted-foreground mb-2 px-3">Recent Chats</p>
        <div className="space-y-1">
          {["CSE vs IT comparison", "Hostel fee inquiry", "Placement statistics"].map((chat) => (
            <button
              key={chat}
              className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors truncate"
            >
              {chat}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  )
}
