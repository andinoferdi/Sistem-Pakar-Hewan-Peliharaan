"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { QuestionCard } from "@/components/question-card"
import { useStore } from "@/lib/store"
import { getAllQuestions } from "@/data/questions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"

const DEFAULT_QUESTION = {
  id: "default",
  text: "Apakah hewan ini memiliki bulu?",
  factKey: "hasFur",
}

export default function ConsultPage() {
  const router = useRouter()
  const {
    currentQuestionIndex,
    setAnswer,
    goToPreviousQuestion,
    resetConsultation,
    totalQuestions,
    answers,
    questionHistory,
    getProgressInfo,
  } = useStore()
  const [questions, setQuestions] = useState<
    Array<{
      id: string
      text: string
      factKey: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    resetConsultation()
    const allQuestions = getAllQuestions()
    setQuestions(allQuestions)
    setIsLoading(false)
  }, [resetConsultation])

  // Handle navigation to result page in useEffect
  useEffect(() => {
    if (!isLoading && currentQuestionIndex >= totalQuestions) {
      router.push("/result")
    }
  }, [currentQuestionIndex, totalQuestions, router, isLoading])

  const handleAnswer = (answer: boolean) => {
    setAnswer(currentQuestionIndex, answer)
    // Navigation will be handled by useEffect above
  }

  const handlePrevious = () => {
    goToPreviousQuestion()
  }

  if (isLoading) {
    return (
      <div
        className="flex min-h-[100dvh] min-h-screen items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7b2d8e 100%)",
          minHeight: '100dvh', // Dynamic viewport height for mobile
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-3 border-pink-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Don't render if we've finished all questions (useEffect will handle navigation)
  if (currentQuestionIndex >= totalQuestions) {
    return null
  }

  const currentQuestion =
    questions.length > 0 && currentQuestionIndex < questions.length ? questions[currentQuestionIndex] : DEFAULT_QUESTION

  const canGoBack = questionHistory.length > 1

  // Get accurate progress information from the store
  const progressInfo = getProgressInfo()
  const accurateProgress = progressInfo.percentage

  // Debug logging
  console.log("=== Progress Debug ===")
  console.log("Current question index:", currentQuestionIndex)
  console.log("Question history:", questionHistory)
  console.log("Answers array:", answers)
  console.log("Progress Info:", progressInfo)
  console.log("=====================")

  // Question number should be based on position in question history
  const currentQuestionNumber = questionHistory.length

  return (
    <main
      className="min-h-[100dvh] min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7b2d8e 100%)",
        minHeight: '100dvh', // Dynamic viewport height for mobile
      }}
    >
      <ParticleBackground />

      <div className="relative z-10 flex min-h-[100dvh] min-h-screen flex-col py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0"
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 sm:gap-2 text-white hover:bg-white/10 text-xs sm:text-sm p-2 sm:p-3"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Kembali ke Beranda</span>
              <span className="xs:hidden">Kembali</span>
            </Button>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 text-gray-300 text-xs sm:text-sm">
            <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium hidden xs:inline">Smart AI Analysis</span>
            <span className="font-medium xs:hidden">Smart AI</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-2 sm:py-4 min-h-0">
          <div className="max-w-4xl w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 mb-6 mx-auto w-fit">
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>Progres: {accurateProgress}%</span>

                  <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                      initial={{ width: `${accurateProgress}%` }}
                      animate={{ width: `${accurateProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 sm:mt-6 lg:mt-8"
            >
              <QuestionCard
                question={currentQuestion.text}
                factKey={currentQuestion.factKey}
                onAnswerYes={() => handleAnswer(true)}
                onAnswerNo={() => handleAnswer(false)}
                onPrevious={handlePrevious}
                canGoBack={canGoBack}
                questionNumber={currentQuestionNumber}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
