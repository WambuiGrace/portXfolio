"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden border bg-card">
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster="/placeholder.svg?height=720&width=1280"
        onEnded={() => setIsPlaying(false)}
      >
        <source src="#" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <Button
            size="lg"
            className="rounded-full h-16 w-16 bg-primary/80 hover:bg-primary text-primary-foreground"
            onClick={togglePlay}
          >
            <Play size={30} />
          </Button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>

          <div className="text-white text-sm">Watch my introduction video</div>

          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
        </div>
      </div>
    </div>
  )
}

