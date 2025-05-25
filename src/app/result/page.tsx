"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"
import { useStore } from "@/lib/store"
import { runInference } from "@/lib/inference"
import { ArrowLeft, RotateCcw, Sparkles, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"

export default function ResultPage() {
  const router = useRouter()
  const { answers, resetConsultation } = useStore()
  const [result, setResult] = useState<string | null>(null)
  const [appliedRules, setAppliedRules] = useState<string[]>([])

  useEffect(() => {
    if (answers.length === 0) {
      router.push("/consult")
      return
    }

    const { result: inferredResult, appliedRules: rules } = runInference(answers)
    setResult(inferredResult)
    setAppliedRules(rules)
  }, [answers, router])

  const handleReset = () => {
    resetConsultation()
    router.push("/consult")
  }

  if (!result) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7b2d8e 100%)",
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

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7b2d8e 100%)",
      }}
    >
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col py-3 sm:py-4 lg:py-6 px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-4 sm:mb-6 relative"
        >
          <div className="absolute left-0">
            <Link href="/consult">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 text-white hover:bg-white/10 text-xs sm:text-sm p-2 sm:p-3"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Kembali</span>
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </motion.div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
              <span className="hidden xs:inline">Hasil Analisis AI</span>
              <span className="xs:hidden">Hasil AI</span>
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ResultCard animalType={result} appliedRules={appliedRules} />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 mb-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
                <Button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold shadow-xl border-0 gap-2 w-full xs:w-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  Coba Lagi
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-4 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold gap-2 w-full xs:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Ke Beranda
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
