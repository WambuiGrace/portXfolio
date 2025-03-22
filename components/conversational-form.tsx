"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useBadges } from "@/components/badge-provider"

type Message = {
  id: string
  text: string
  sender: "bot" | "user"
  isQuestion?: boolean
  field?: string
}

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ConversationalForm() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi there! I'd love to know more about your project. What's your name?",
      sender: "bot",
      isQuestion: true,
      field: "name",
    },
  ])

  const [currentStep, setCurrentStep] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { unlockBadge } = useBadges()

  const steps = [
    {
      field: "name",
      question: "👋 Hi there! I'd love to know more about your project. What's your name?",
      nextQuestion: (name: string) => `Nice to meet you, ${name}! What's your email address so I can get back to you?`,
    },
    {
      field: "email",
      nextQuestion: () => "Great! What's the subject or purpose of your message?",
    },
    {
      field: "subject",
      nextQuestion: () => "Fantastic! Now, please tell me more about your project or how I can help you.",
    },
    {
      field: "message",
      nextQuestion: () =>
        "Thank you for all the information! Is there anything else you'd like to add before I submit your message?",
    },
  ]

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    // Focus the input after each step
    if (currentStep < steps.length) {
      inputRef.current?.focus()
    }
  }, [messages, currentStep, steps.length])

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isSubmitting) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])

    // Update form data
    const currentField = steps[currentStep].field as keyof FormData
    setFormData((prev) => ({
      ...prev,
      [currentField]: inputValue,
    }))

    // Clear input and show typing indicator
    setInputValue("")
    setIsSubmitting(true)

    // Simulate bot response
    setTimeout(() => {
      setIsSubmitting(false)

      if (currentStep < steps.length - 1) {
        // Move to next question
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)

        let nextQuestionText = ""
        if (nextStep === 1) {
          // Custom response for name
          nextQuestionText = steps[0].nextQuestion(inputValue)
        } else {
          nextQuestionText = steps[nextStep - 1].nextQuestion("")
        }

        const botMessage: Message = {
          id: Date.now().toString(),
          text: nextQuestionText,
          sender: "bot",
          isQuestion: true,
          field: steps[nextStep].field,
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // Final step - confirmation
        const botMessage: Message = {
          id: Date.now().toString(),
          text: steps[currentStep].nextQuestion(""),
          sender: "bot",
          isQuestion: true,
        }
        setMessages((prev) => [...prev, botMessage])
        setCurrentStep(currentStep + 1)
      }
    }, 1000)
  }

  const handleFormSubmit = () => {
    setIsSubmitting(true)

    // Add submission message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "No, that's all. Thank you!",
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Success message
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Thanks ${formData.name}! Your message has been sent successfully. I'll get back to you at ${formData.email} as soon as possible.`,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])

      // Unlock the contact badge
      unlockBadge("contact")

      toast({
        title: "Message sent!",
        description: "I'll get back to you as soon as possible.",
      })
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (currentStep < steps.length) {
        handleSendMessage()
      } else {
        handleFormSubmit()
      }
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 rounded-lg bg-secondary/20">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                  <AvatarFallback>YN</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}

          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        {currentStep < steps.length ? (
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              type={steps[currentStep].field === "email" ? "email" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Type your ${steps[currentStep].field}...`}
              disabled={isSubmitting}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={isSubmitting || inputValue.trim() === ""} size="icon">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        ) : currentStep === steps.length ? (
          <div className="flex space-x-2">
            <Button onClick={handleFormSubmit} disabled={isSubmitting} className="flex-grow">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">Your message has been sent. Thank you!</div>
        )}
      </div>
    </div>
  )
}

