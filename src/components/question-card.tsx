"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface QuestionCardProps {
  question: string
  onAnswerYes: () => void
  onAnswerNo: () => void
}

export function QuestionCard({ question, onAnswerYes, onAnswerNo }: QuestionCardProps) {
  // Ensure we have a valid question text
  const questionText = question || "Pertanyaan tidak tersedia"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="pb-2">
          <h2 className="text-xl font-semibold text-center text-blue-800">Pertanyaan</h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center mb-8 py-4">{questionText}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onAnswerYes}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
              size="lg"
            >
              <Check className="mr-2 h-5 w-5" />
              Ya
            </Button>

            <Button
              onClick={onAnswerNo}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
              size="lg"
            >
              <X className="mr-2 h-5 w-5" />
              Tidak
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
