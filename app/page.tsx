import { Suspense } from "react"
import ChatBot from "@/components/chat-bot"
import WelcomeAnimation from "@/components/welcome-animation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <Navbar />

      {/* Hero section with animation */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <WelcomeAnimation />
        </div>

        <div className="z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Hello, I'm Grace Wambui
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Creative Developer & Designer crafting engaging digital experiences
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown size={32} className="text-primary" />
        </div>
      </section>

      {/* Chat bot floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Suspense fallback={<div>Loading chat...</div>}>
          <ChatBot />
        </Suspense>
      </div>
    </main>
  )
}

