"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { Award } from "lucide-react"

type Badge = {
  id: string
  name: string
  description: string
  unlocked: boolean
}

type BadgeContextType = {
  badges: Badge[]
  unlockBadge: (id: string) => void
  showBadges: boolean
  setShowBadges: (show: boolean) => void
}

const initialBadges: Badge[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Visited all main sections of the portfolio",
    unlocked: false,
  },
  {
    id: "curious",
    name: "Curious Mind",
    description: "Completed the personality quiz",
    unlocked: false,
  },
  {
    id: "project_enthusiast",
    name: "Project Enthusiast",
    description: "Viewed at least 3 projects in detail",
    unlocked: false,
  },
  {
    id: "contact",
    name: "Let's Connect",
    description: "Used the contact form to get in touch",
    unlocked: false,
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Enabled dark mode",
    unlocked: false,
  },
]

const BadgeContext = createContext<BadgeContextType>({
  badges: initialBadges,
  unlockBadge: () => {},
  showBadges: false,
  setShowBadges: () => {},
})

export function useBadges() {
  return useContext(BadgeContext)
}

export default function BadgeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [badges, setBadges] = useState<Badge[]>(initialBadges)
  const [showBadges, setShowBadges] = useState(false)
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set())
  const [viewedProjects, setViewedProjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Track page visits for the Explorer badge
    const currentPath = window.location.pathname
    if (!visitedPages.has(currentPath)) {
      const newVisitedPages = new Set(visitedPages)
      newVisitedPages.add(currentPath)
      setVisitedPages(newVisitedPages)

      // Check if all main sections have been visited
      const mainSections = ["/", "/about", "/projects", "/contact"]
      const hasVisitedAll = mainSections.every(
        (section) => newVisitedPages.has(section) || (section === "/" && newVisitedPages.has("/home")),
      )

      if (hasVisitedAll) {
        unlockBadge("explorer")
      }
    }
  }, [visitedPages])

  const unlockBadge = (id: string) => {
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === id && !badge.unlocked
          ? {
              ...badge,
              unlocked: true,
            }
          : badge,
      ),
    )

    const badge = badges.find((b) => b.id === id)
    if (badge && !badge.unlocked) {
      toast({
        title: `Badge Unlocked: ${badge.name}`,
        description: badge.description,
        icon: <Award className="h-5 w-5 text-primary" />,
      })
    }
  }

  return (
    <BadgeContext.Provider
      value={{
        badges,
        unlockBadge,
        showBadges,
        setShowBadges,
      }}
    >
      {children}
    </BadgeContext.Provider>
  )
}

