"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, HelpCircle, Sparkles, ArrowLeft, Info } from "lucide-react"
import { ExplanationModal } from "@/components/explanation-modal"
import { getExplanation } from "@/data/explanations"

interface QuestionCardProps {
  question: string
  factKey: string
  onAnswerYes: () => void
  onAnswerNo: () => void
  onPrevious?: () => void
  canGoBack?: boolean
  questionNumber?: number
  totalEstimated?: number
}

export function QuestionCard({
  question,
  factKey,
  onAnswerYes,
  onAnswerNo,
  onPrevious,
  canGoBack = false,
  questionNumber = 1,
  totalEstimated = 8,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)
  const questionText = question || "Pertanyaan tidak tersedia"
  const explanation = getExplanation(factKey)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="relative max-h-[85vh] overflow-hidden"
      >
        <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-white/5 pb-3 sm:pb-4">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400" />
                </motion.div>
                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight">
                    Pertanyaan {questionNumber}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400" />
                </motion.div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExplanation(true)}
                  className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 p-1 h-6 w-6 sm:h-7 sm:w-7"
                >
                  <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 lg:p-6">
            {/* Question Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 sm:mb-5 lg:mb-6"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white leading-relaxed px-2 tracking-tight">
                {questionText}
              </p>
            </motion.div>

            {/* Answer Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-full xs:w-auto"
              >
                <Button
                  onClick={onAnswerYes}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-xl border-0 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] group w-full xs:w-auto tracking-tight"
                  size="lg"
                >
                  <motion.div className="flex items-center justify-center gap-2" whileHover={{ x: 1 }}>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    Ya
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="w-full xs:w-auto"
              >
                <Button
                  onClick={onAnswerNo}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-xl border-0 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] group w-full xs:w-auto tracking-tight"
                  size="lg"
                >
                  <motion.div className="flex items-center justify-center gap-2" whileHover={{ x: 1 }}>
                    <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    Tidak
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Previous Button */}
            {canGoBack && onPrevious && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-3 sm:mt-4"
              >
                <Button
                  onClick={onPrevious}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-3 sm:px-4 py-2 rounded-full gap-1 sm:gap-2 text-xs sm:text-sm font-semibold tracking-tight"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Pertanyaan Sebelumnya</span>
                  <span className="xs:hidden">Sebelumnya</span>
                </Button>
              </motion.div>
            )}

            {/* Progress hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-3 sm:mt-4 text-gray-300 text-xs sm:text-sm px-2 font-medium"
            >
              Pilih jawaban yang paling sesuai dengan hewan yang Anda pikirkan
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <ExplanationModal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        question={questionText}
        explanation={explanation.explanation}
        funFact={explanation.funFact}
      />
    </>
  )
}
