"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, TrendingUp, BookOpen } from "lucide-react"

const stats = [
  { label: "Active Users", value: "1,234", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Queries Today", value: "456", change: "+8%", icon: MessageSquare, color: "text-accent" },
  { label: "Avg. Response Time", value: "1.2s", change: "-15%", icon: TrendingUp, color: "text-green-500" },
  { label: "Popular Course", value: "CSE", change: "Top", icon: BookOpen, color: "text-chart-4" },
]

const topQuestions = [
  { question: "What is the fee structure for B.Tech?", count: 234 },
  { question: "How to apply for scholarships?", count: 189 },
  { question: "What are the placement statistics?", count: 167 },
  { question: "Is hostel mandatory for first year?", count: 145 },
  { question: "What is the admission process?", count: 132 },
]

const popularCourses = [
  { name: "Computer Science", queries: 567, percentage: 35 },
  { name: "Data Science", queries: 423, percentage: 26 },
  { name: "Mechanical Engineering", queries: 312, percentage: 19 },
  { name: "Electronics", queries: 198, percentage: 12 },
  { name: "Civil Engineering", queries: 128, percentage: 8 },
]

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium ${
                stat.change.startsWith("+") ? "text-green-500" : 
                stat.change.startsWith("-") ? "text-red-500" : 
                "text-muted-foreground"
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Most Asked Questions</h3>
          <div className="space-y-3">
            {topQuestions.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <p className="text-sm text-foreground truncate">{item.question}</p>
                </div>
                <span className="text-sm font-medium text-primary shrink-0 ml-2">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Popular Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Courses</h3>
          <div className="space-y-4">
            {popularCourses.map((course, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{course.name}</span>
                  <span className="text-sm text-muted-foreground">{course.queries} queries</span>
                </div>
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
