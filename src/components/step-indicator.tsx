"use client"

import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"

interface StepIndicatorProps {
  answeredQuestions: number // Number of questions actually answered
}

export function StepIndicator({ answeredQuestions = 0 }: StepIndicatorProps) {
  // Calculate progress based on answered questions
  // 1 question = 12.5% (1/8), 2 questions = 25% (2/8), etc.
  const progress = answeredQuestions === 0 ? 0 : Math.min((answeredQuestions / 8) * 100, 100)

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm tracking-tight">{answeredQuestions}</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm sm:text-lg tracking-tight">
              {answeredQuestions === 0 ? "Mulai Konsultasi" : `${answeredQuestions} Terjawab`}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{Math.round(progress)}%</div>
          <div className="text-gray-300 text-xs font-medium">Selesai</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 backdrop-blur-sm border border-white/20">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 sm:h-3 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            />
          </motion.div>
        </div>

        {/* Step indicators - show progress marks */}
        <div className="flex justify-between mt-2 sm:mt-3">
          {Array.from({ length: 8 }, (_, i) => {
            const stepNumber = i + 1
            const isCompleted = answeredQuestions >= stepNumber
            const isCurrent = answeredQuestions + 1 === stepNumber

            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                {isCompleted ? (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 fill-current" />
                  </motion.div>
                ) : (
                  <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-white/30" />
                )}
                <span className="text-xs text-gray-300 mt-1 font-medium tracking-tight">{stepNumber}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
