"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"
import { useStore } from "@/lib/store"
import { runInference } from "@/lib/inference"
import { ArrowLeft, RotateCcw } from "lucide-react"

export default function ResultPage() {
  const router = useRouter()
  const { answers, resetConsultation } = useStore()
  const [result, setResult] = useState<string | null>(null)
  const [appliedRules, setAppliedRules] = useState<string[]>([])

  useEffect(() => {
    // If no answers, redirect back to consultation
    if (answers.length === 0) {
      router.push("/consult")
      return
    }

    // Run inference engine with current answers
    const { result: inferredResult, appliedRules: rules } = runInference(answers)
    setResult(inferredResult)
    setAppliedRules(rules)
  }, [answers, router])

  const handleReset = () => {
    resetConsultation()
    router.push("/consult")
  }

  if (!result) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Hasil Konsultasi</h1>

        <ResultCard animalType={result} appliedRules={appliedRules} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/consult">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Konsultasi
            </Button>
          </Link>

          <Button onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Mulai Ulang
          </Button>
        </div>
      </div>
    </main>
  )
}
