import { Suspense } from "react"
import ProjectCard from "@/components/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

const projects = [
  {
    id: 1,
    title: "Orbital oracle",
    description:
      "3D visualization that simulates the movement of satellites, asteroids, and debris in Earth's orbit. This tool shows the potential for collisions and provides an interactive way to explore how objects behave in space.",
    image: "/oracle.png?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Canva", "Tailwind CSS"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/WambuiGrace/spaceapp",
    category: "web",
  },
  {
    id: 2,
    title: "Dust Collector",
    description:
      "Dust refers to tiny amounts of cryptocurrency that are too small to be transacted due to network fees exceeding their value. This tool helps you reclaim value from these otherwise unusable assets by batching them together and moving them to Base's low-fee environment.",
    image: "/dust-collector.png?height=600&width=800",
    tags: ["Next JS", "tailwind CSS", "CSS Modules"],
    demoUrl: "https://collector-one.vercel.app/",
    githubUrl: "https://github.com/WambuiGrace/collector",
    category: "web",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A dynamic portfolio website built with Next.js, featuring interactive animations and a custom content management system.",
    image: "/portfolio.png?height=600&width=800",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Contentful"],
    demoUrl: "https://portxfolio-six.vercel.app/",
    githubUrl: "https://github.com/WambuiGrace/",
    category: "web",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current weather conditions and forecasts for multiple locations using a third-party API.",
    image: "/weather.png?height=600&width=800",
    tags: ["JavaScript", "Chart.js", "Weather API", "Responsive Design"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/WambuiGrace/JS-Projects/tree/main/weather-app",
    category: "design",
  },
  {
    id: 5,
    title: "Mobile Recipe App",
    description: "A cross-platform mobile application for discovering and saving recipes, built with React Native.",
    image: "/mobile.jpg?height=600&width=800",
    tags: ["React Native", "Expo", "Redux", "Firebase"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/WambuiGrace/",
    category: "design",
  },
  {
    id: 6,
    title: "Sheria Mtaani",
    description: "Empower Communities, Foster Education, Drive Change. Sheria Mtaani is dedicated to educating, empowering, and equipping communities for a better tomorrow.",
    image: "/sheria.png?height=600&width=800",
    tags: ["React", "TypeScript", "Storybook", "Jest"],
    demoUrl: "https://sheriamtaani.vercel.app/",
    githubUrl: "https://github.com/WambuiGrace/sheria",
    category: "design",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">My Projects</span>
        </h1>

        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<div>Loading projects...</div>}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<div>Loading projects...</div>}>
                {projects
                  .filter((project) => project.category === "web")
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<div>Loading projects...</div>}>
                {projects
                  .filter((project) => project.category === "mobile")
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="design" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense fallback={<div>Loading projects...</div>}>
                {projects
                  .filter((project) => project.category === "design")
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

