"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

type Message = {
  id: string
  text: string
  sender: "bot" | "user"
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "👋 Hi there! I'm the portfolio guide. Would you like to learn about my creator?",
    sender: "bot",
  },
]

const suggestions = [
  "Tell me about your journey",
  "Show me your projects",
  "What skills do you have?",
  "How can I contact you?",
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let response = ""
      const userMessageLower = input.toLowerCase()

      if (userMessageLower.includes("project")) {
        response =
          "I've worked on several exciting projects! Check out the Projects section to see interactive demos and GitHub repositories."
      } else if (userMessageLower.includes("contact") || userMessageLower.includes("hire")) {
        response =
          "You can reach out through the Contact section. There's a fun conversational form and my social links!"
      } else if (
        userMessageLower.includes("about") ||
        userMessageLower.includes("journey") ||
        userMessageLower.includes("experience")
      ) {
        response =
          "My journey is showcased in the About section through an interactive timeline. You can also watch a short video introduction!"
      } else if (userMessageLower.includes("skill")) {
        response =
          "I specialize in web development, UI/UX design, and creating interactive experiences. Check out the About section for more details!"
      } else {
        response =
          "Feel free to explore the portfolio! If you have specific questions about my projects, skills, or want to get in touch, just ask."
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-20 right-6 w-[350px] h-[500px] max-h-[80vh] shadow-xl rounded-2xl overflow-hidden flex flex-col bg-card border z-50"
          >
            <div className="p-4 border-b bg-primary text-primary-foreground flex justify-between items-center">
              <h3 className="font-semibold">Portfolio Guide</h3>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pt-2 pb-4">
                <p className="text-sm text-muted-foreground mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button onClick={() => setOpen(!open)} className="rounded-full h-14 w-14 shadow-lg" size="icon">
        <MessageCircle size={24} />
      </Button>
    </>
  )
}

