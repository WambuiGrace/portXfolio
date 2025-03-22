"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type TimelineEvent = {
  year: string
  title: string
  description: string
  tags: string[]
  icon: React.ReactNode
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2020",
    title: "Started Learning Web Development",
    description: "Began my journey into web development with HTML, CSS, and JavaScript basics.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: (
      <svg
        xmlns="https://www.pexels.com/photo/photo-of-a-html-code-16023919/"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-code"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    year: "2021",
    title: "First Freelance Project",
    description:
      "Completed my first freelance website for a local business. This was a pivotal moment in applying my skills to real-world projects.",
    tags: ["Freelance", "WordPress", "Responsive Design"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-briefcase"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    year: "2022",
    title: "Freelance and open source",
    description: "Focusing on web technologies and user experience design.",
    tags: ["Open source", "UX Design", "Freelance"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-graduation-cap"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
  {
    year: "2023",
    title: "Junior Developer Role",
    description:
      "Joined a tech startup as a Junior Frontend Developer, working on React applications and improving my skills in modern JavaScript frameworks.",
    tags: ["React", "TypeScript", "Redux"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-rocket"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    year: "2024",
    title: "Lead Developer",
    description:
      "Promoted to Lead Developer, leading a team of 5 and overseeing the development of the company's flagship product.",
    tags: ["Leadership", "Next.js", "API Design"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-users"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    year: "Present",
    title: "Graduated to Freelance Developer",
    description:
      "Currently working as a freelance developer while contributing to open source projects and continuing to learn new technologies.",
    tags: ["Freelance", "Open Source", "Full Stack"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-globe"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 0 0 20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
]

export default function Timeline() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 rounded-full" />

      <div className="space-y-16">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: index * 0.2 },
              },
            }}
            className={`flex ${index % 2 === 0 ? "flex-row-reverse" : ""} items-center justify-center`}
          >
            <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "pl-8"}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-2 font-bold text-primary">{event.year}</div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="mb-4 text-muted-foreground">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="z-10 flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg">
              {event.icon}
            </div>

            <div className="w-5/12" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

