"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { QuestionCard } from "@/components/question-card"
import { StepIndicator } from "@/components/step-indicator"
import { useStore } from "@/lib/store"
import { getAllQuestions } from "@/data/questions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Define a default question to use as fallback
const DEFAULT_QUESTION = {
  id: "default",
  text: "Apakah hewan ini memiliki bulu?",
  factKey: "hasFur",
}

export default function ConsultPage() {
  const router = useRouter()
  const { currentQuestionIndex, answers, setAnswer, resetConsultation, totalQuestions } = useStore()
  const [questions, setQuestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset consultation when entering this page
    resetConsultation()

    // Get all questions and set them in state
    const allQuestions = getAllQuestions()
    setQuestions(allQuestions)
    setIsLoading(false)
  }, [resetConsultation])

  const handleAnswer = (answer: boolean) => {
    setAnswer(currentQuestionIndex, answer)

    // If this was the last question, navigate to results
    if (currentQuestionIndex === totalQuestions - 1) {
      router.push("/result")
    }
  }

  // Show loading state while questions are being loaded
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Safety check to ensure we have questions and the current index is valid
  const currentQuestion =
    questions.length > 0 && currentQuestionIndex < questions.length ? questions[currentQuestionIndex] : DEFAULT_QUESTION

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl w-full py-8 mt-8">
        <StepIndicator currentStep={currentQuestionIndex + 1} totalSteps={totalQuestions} />

        <div className="mt-8">
          <QuestionCard
            question={currentQuestion.text}
            onAnswerYes={() => handleAnswer(true)}
            onAnswerNo={() => handleAnswer(false)}
          />
        </div>
      </div>
    </main>
  )
}
