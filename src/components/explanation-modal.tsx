"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Lightbulb, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  question: string
  explanation: string
  funFact: string
}

export function ExplanationModal({ isOpen, onClose, question, explanation, funFact }: ExplanationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-3 lg:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col"
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full">
              <CardHeader className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 pb-2 sm:pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white">Mengapa Pertanyaan Ini?</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/10 rounded-full p-1 h-6 w-6 sm:h-8 sm:w-8"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                {/* Current Question */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2">Pertanyaan Saat Ini:</h3>
                  <p className="text-purple-100 text-xs sm:text-sm italic leading-relaxed">&ldquo;{question}&rdquo;</p>
                </div>

                {/* Explanation */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    Penjelasan AI
                  </h3>
                  <p className="text-purple-100 leading-relaxed text-xs sm:text-sm">{explanation}</p>
                </div>

                {/* Fun Fact */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-400/20">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    Fakta Menarik
                  </h3>
                  <p className="text-yellow-100 leading-relaxed text-xs sm:text-sm">{funFact}</p>
                </div>
              </CardContent>

              <div className="p-3 sm:p-4 flex-shrink-0">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold"
                  >
                    Mengerti, Lanjutkan!
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
