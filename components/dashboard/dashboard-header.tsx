"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, User, LogOut, Settings, MessageSquare } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6">
      <Link href="/dashboard" className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/20">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <span className="font-bold text-lg text-foreground">AI College Guide</span>
      </Link>

      <div className="flex items-center gap-3">
        <Button variant="outline" asChild className="gap-2">
          <Link href="/chat">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Chat with AI</span>
          </Link>
        </Button>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-muted/50 transition-colors">
              <Avatar className="h-9 w-9 border-2 border-primary/30">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-primary/20 text-primary font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="cursor-pointer text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
