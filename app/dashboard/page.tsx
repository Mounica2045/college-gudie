"use client"

import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CareerPredictor } from "@/components/dashboard/career-predictor"
import { 
  Bookmark, 
  Bell, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

const savedQueries = [
  { title: "CSE vs IT comparison", date: "2 hours ago" },
  { title: "Top engineering colleges in Mumbai", date: "Yesterday" },
  { title: "MBA admission requirements", date: "3 days ago" },
]

const recommendedCourses = [
  { name: "B.Tech Computer Science", college: "IIT Delhi", rating: 4.9 },
  { name: "B.Tech AI & ML", college: "BITS Pilani", rating: 4.8 },
  { name: "BCA", college: "Christ University", rating: 4.7 },
]

const announcements = [
  { title: "JEE Main 2024 Results Declared", type: "Important", time: "1 hour ago" },
  { title: "New Scholarship Program Launched", type: "New", time: "5 hours ago" },
  { title: "Admission Deadline Extended", type: "Update", time: "1 day ago" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen animated-gradient">
      <DashboardHeader />
      
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Welcome Card */}
          <motion.div variants={item} className="glass-card rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Welcome back, John!
                </h1>
                <p className="text-muted-foreground">
                  Continue exploring colleges and courses tailored for you.
                </p>
              </div>
              <Link 
                href="/chat"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Start New Chat
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Predictor */}
              <motion.div variants={item}>
                <CareerPredictor />
              </motion.div>

              {/* Saved Queries */}
              <motion.div variants={item} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Saved Queries</h3>
                  </div>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
                
                <div className="space-y-3">
                  {savedQueries.map((query, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{query.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {query.date}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommended Courses */}
              <motion.div variants={item} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <BookOpen className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Recommended Courses</h3>
                  </div>
                  <button className="text-sm text-primary hover:underline">Explore more</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendedCourses.map((course, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <p className="font-medium text-sm text-foreground mb-1">{course.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{course.college}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-primary">{course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Announcements */}
              <motion.div variants={item} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-destructive/20">
                    <Bell className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Announcements</h3>
                </div>
                
                <div className="space-y-3">
                  {announcements.map((announcement, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          announcement.type === "Important" 
                            ? "bg-destructive/20 text-destructive" 
                            : announcement.type === "New"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {announcement.type}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">{announcement.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {announcement.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={item} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Progress</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Queries Asked</span>
                      <span className="font-medium text-foreground">24</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-primary" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Colleges Explored</span>
                      <span className="font-medium text-foreground">12</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <div className="h-full w-1/2 rounded-full bg-accent" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Saved Items</span>
                      <span className="font-medium text-foreground">8</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                      <div className="h-full w-2/5 rounded-full bg-chart-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
