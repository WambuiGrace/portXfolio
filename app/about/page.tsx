import Timeline from "@/components/timeline"
import PersonalityQuiz from "@/components/personality-quiz"
import IntroVideo from "@/components/intro-video"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">About Me</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="rounded-full overflow-hidden w-64 h-64 mb-6 border-4 border-primary">
              <img src="/icon.png?height=256&width=256" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Grace Wambui</h2>
            <p className="text-muted-foreground text-center mb-4">Creative Developer & Designer</p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/grace-mwangi-4201a4240/" className="text-primary hover:text-primary/80">
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
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://github.com/WambuiGrace" className="text-primary hover:text-primary/80">
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
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://x.com/_wambui254_?s=21" className="text-primary hover:text-primary/80">
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
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="video">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="video">Intro Video</TabsTrigger>
                <TabsTrigger value="bio">Bio</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="min-h-[300px]">
                <IntroVideo />
              </TabsContent>

              <TabsContent value="bio">
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-2xl font-bold mb-4">Hello, I'm Grace Wambui</h3>
                  <p className="mb-4">
                    I'm a passionate developer and designer with a background in creating engaging digital experiences.
                    My journey in the digital world started 5 years ago when I discovered my passion for combining
                    creative design with technical development.
                  </p>
                  <p className="mb-4">
                    With expertise in front-end technologies like React, Next.js, and modern CSS frameworks, I enjoy
                    building interactive and accessible web applications that focus on user experience.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new design trends, contributing to open-source
                    projects, and occasionally playing the guitar. I believe in continuous learning and pushing creative
                    boundaries in every project I undertake.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
          <Timeline />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Get to Know Me Better</h2>
          <div className="max-w-3xl mx-auto">
            <PersonalityQuiz />
          </div>
        </section>
      </div>
    </main>
  )
}

