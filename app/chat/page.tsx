"use client"

import { useState, useCallback } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessages, Message } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"

const sampleResponses: Record<string, string> = {
  admissions: `Great question about admissions! Here are the key points:

1. **Application Period**: Most colleges accept applications from January to June.
2. **Required Documents**: 
   - 10th & 12th mark sheets
   - Transfer certificate
   - Character certificate
   - Passport-size photos

3. **Entrance Exams**: Many colleges require JEE/CET scores for engineering programs.

Would you like more specific information about any particular college?`,
  
  fees: `Here's a general overview of college fees:

**Engineering Colleges (Annual)**
- Government: ₹40,000 - ₹80,000
- Private: ₹1,00,000 - ₹2,50,000

**Additional Costs**
- Hostel: ₹30,000 - ₹80,000/year
- Books & Materials: ₹10,000 - ₹20,000

💡 Many colleges offer scholarships based on merit and financial need. Would you like information about scholarship programs?`,

  placements: `Let me share placement insights:

**Average Placement Statistics**
- Placement Rate: 75-95% (top colleges)
- Average Package: ₹4-8 LPA
- Highest Package: ₹15-50 LPA (varies by college)

**Top Recruiting Companies**
TCS, Infosys, Wipro, Cognizant, Amazon, Google, Microsoft

Would you like specific placement data for any particular college or course?`,

  hostel: `Here's what you should know about hostel facilities:

**Types of Accommodation**
- Single occupancy: ₹60,000 - ₹1,00,000/year
- Double sharing: ₹40,000 - ₹60,000/year
- Triple sharing: ₹30,000 - ₹45,000/year

**Facilities Typically Included**
- WiFi connectivity
- Mess/cafeteria
- Laundry services
- 24/7 security
- Common rooms

Would you like recommendations for colleges with the best hostel facilities?`,

  courses: `Popular courses you can explore:

**Engineering**
- Computer Science (CSE)
- Information Technology (IT)
- Electronics & Communication (ECE)
- Mechanical Engineering

**Management**
- BBA, MBA
- BCA, MCA

**Sciences**
- B.Sc in various specializations
- B.Sc Data Science (trending!)

Would you like a detailed comparison of any specific courses?`,

  default: `Thank you for your question! I'd be happy to help you with information about:

- College admissions and requirements
- Course fees and scholarships
- Placement statistics and career prospects
- Hostel facilities and campus life
- Course comparisons and recommendations

Could you please be more specific about what you'd like to know?`
}

export default function ChatPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const lowerContent = content.toLowerCase()
      let responseKey = "default"
      
      if (lowerContent.includes("admission")) responseKey = "admissions"
      else if (lowerContent.includes("fee")) responseKey = "fees"
      else if (lowerContent.includes("placement")) responseKey = "placements"
      else if (lowerContent.includes("hostel")) responseKey = "hostel"
      else if (lowerContent.includes("course")) responseKey = "courses"

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: sampleResponses[responseKey],
      }

      setIsTyping(false)
      setMessages(prev => [...prev, assistantMessage])
    }, 1500)
  }, [])

  return (
    <div className="h-screen flex animated-gradient">
      {/* Sidebar */}
      <ChatSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />
        
        <main className="flex-1 flex flex-col min-h-0 bg-background/50">
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </main>
      </div>
    </div>
  )
}
