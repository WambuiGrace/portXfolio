"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import { useBadges } from "@/components/badge-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  category: string
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { unlockBadge } = useBadges()

  // Track viewed projects for the badge
  const handleViewDetails = () => {
    // Check local storage for viewed projects
    const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "[]")
    if (!viewedProjects.includes(project.id)) {
      viewedProjects.push(project.id)
      localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects))

      // If 3 or more projects have been viewed, unlock the badge
      if (viewedProjects.length >= 3) {
        unlockBadge("project_enthusiast")
      }
    }
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500"
                style={{
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <DialogTrigger asChild onClick={handleViewDetails}>
                  <Button variant="secondary" size="sm" className="gap-1">
                    View Details <ChevronRight size={16} />
                  </Button>
                </DialogTrigger>
              </div>
            </div>

            <CardContent className="py-4 flex-grow">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-0 pb-4 flex justify-between">
              <Button variant="outline" size="sm" asChild className="gap-1">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={16} /> Code
                </a>
              </Button>
              <Button size="sm" asChild className="gap-1">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink size={16} />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription>{project.tags.join(" • ")}</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
              <Image src={project.image || "/weather.png"} alt={project.title} fill className="object-cover" />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold mb-2">Project Overview</h4>
                <p className="text-muted-foreground">
                  {project.description}
                  {/* Extended description could go here */} This project showcases my skills in building responsive,
                  interactive web applications with modern technologies. I focused on creating an intuitive user
                  interface with smooth animations and robust functionality.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className="text-sm py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Responsive design that works on all devices</li>
                  <li>Intuitive user interface with smooth animations</li>
                  <li>Robust authentication and authorization system</li>
                  <li>Performance optimized for fast loading times</li>
                  <li>Accessible design following WCAG guidelines</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" asChild className="gap-1">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={16} /> View Code
                </a>
              </Button>
              <Button asChild className="gap-1">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

