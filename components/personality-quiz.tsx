"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useBadges } from "@/components/badge-provider"

type Question = {
  id: number
  question: string
  options: string[]
}

type Result = {
  title: string
  description: string
  badge: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "How do you approach a new project?",
    options: [
      "I plan everything meticulously before starting",
      "I dive right in and figure it out as I go",
      "I research similar projects for inspiration first",
      "I collaborate with others to brainstorm ideas",
    ],
  },
  {
    id: 2,
    question: "What's your preferred work environment?",
    options: [
      "Quiet and isolated, focused on deep work",
      "Collaborative and social, with lots of interaction",
      "Flexible and changing, different each day",
      "Structured and organized, with clear routines",
    ],
  },
  {
    id: 3,
    question: "What challenges excite you the most?",
    options: [
      "Technical problems that require innovative solutions",
      "Creative challenges that allow artistic expression",
      "Organizational challenges that improve efficiency",
      "Social challenges that help people connect",
    ],
  },
  {
    id: 4,
    question: "How do you handle deadlines?",
    options: [
      "I work ahead and finish early",
      "I work steadily and consistently",
      "I tend to work best under pressure",
      "I adapt my approach based on the project's needs",
    ],
  },
  {
    id: 5,
    question: "What's your favorite part of the development process?",
    options: [
      "Planning and architecting solutions",
      "Implementing core functionality",
      "Designing user interfaces",
      "Testing and refining the product",
    ],
  },
]

const results: Result[] = [
  {
    title: "The Visionary",
    description:
      "You see the big picture and excel at creating innovative solutions to complex problems. Your creative thinking and strategic approach make you excellent at planning and conceptualizing projects.",
    badge: "Visionary",
  },
  {
    title: "The Craftsperson",
    description:
      "You have a keen eye for detail and take pride in producing high-quality work. Your methodical approach and commitment to excellence make you valuable for implementing polished solutions.",
    badge: "Craftsperson",
  },
  {
    title: "The Innovator",
    description:
      "You thrive on challenges and are always looking for new ways to solve problems. Your adaptability and quick thinking make you excellent in fast-paced, changing environments.",
    badge: "Innovator",
  },
  {
    title: "The Communicator",
    description:
      "You excel at collaboration and bringing people together. Your empathy and communication skills make you valuable for team projects and client-facing roles.",
    badge: "Communicator",
  },
]

export default function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null)
  const { unlockBadge } = useBadges()

  const handleAnswer = (index: number) => {
    setCurrentAnswer(index)
  }

  const goToNext = () => {
    if (currentAnswer === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = currentAnswer
    setAnswers(newAnswers)
    setCurrentAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const counts = [0, 0, 0, 0]
      newAnswers.forEach((answer) => {
        counts[answer]++
      })

      // Find the highest count (if tie, take the first one)
      const maxIndex = counts.indexOf(Math.max(...counts))
      setResult(results[maxIndex])
      setShowResult(true)

      // Unlock the curious badge when quiz is completed
      unlockBadge("curious")
    }
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setCurrentAnswer(null)
    setShowResult(false)
    setResult(null)
  }

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Personality Quiz</CardTitle>
        <CardDescription>Discover your developer personality type by answering a few quick questions</CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <h3 className="text-xl font-medium mb-4">{questions[currentQuestion].question}</h3>
              <RadioGroup value={currentAnswer?.toString()} className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={`option-${index}`}
                      value={index.toString()}
                      onClick={() => handleAnswer(index)}
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-base py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={goToPrevious} disabled={currentQuestion === 0}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={goToNext} disabled={currentAnswer === null}>
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  "See Results"
                )}
              </Button>
            </CardFooter>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent className="text-center">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">{result?.badge}</div>
              <h3 className="text-2xl font-bold mb-4">{result?.title}</h3>
              <p className="text-muted-foreground mb-6">{result?.description}</p>
              <div className="p-4 bg-muted rounded-lg mb-4">
                <p className="italic">
                  "This personality type often excels in roles that require{" "}
                  {result?.title === "The Visionary" && "strategic thinking and innovation"}
                  {result?.title === "The Craftsperson" && "attention to detail and quality craftsmanship"}
                  {result?.title === "The Innovator" && "creative problem-solving and adaptability"}
                  {result?.title === "The Communicator" && "collaboration and effective communication"}
                  ."
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={restartQuiz}>Take Quiz Again</Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

