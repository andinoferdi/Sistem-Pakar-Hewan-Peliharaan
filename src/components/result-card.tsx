"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAnimalDetails } from "@/data/animals"
import { Cat, Dog, Bird, Fish, Rabbit } from "lucide-react"

interface ResultCardProps {
  animalType: string
  appliedRules: string[]
}

export function ResultCard({ animalType, appliedRules }: ResultCardProps) {
  const animalDetails = getAnimalDetails(animalType)

  const getAnimalIcon = () => {
    switch (animalType.toLowerCase()) {
      case "cat":
      case "kucing":
      case "iscat":
        return <Cat className="h-16 w-16 text-blue-600" />
      case "dog":
      case "anjing":
      case "ispetdog":
        return <Dog className="h-16 w-16 text-blue-600" />
      case "bird":
      case "burung":
      case "ispetbird":
        return <Bird className="h-16 w-16 text-blue-600" />
      case "rabbit":
      case "kelinci":
      case "ispetrabbit":
        return <Rabbit className="h-16 w-16 text-blue-600" />
      case "fish":
      case "ikan hias":
      case "ispetfish":
        return <Fish className="h-16 w-16 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="pb-2 flex flex-col items-center">
          <div className="mb-4">{getAnimalIcon()}</div>
          <h2 className="text-2xl font-bold text-center text-blue-800">{animalDetails.name}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{animalDetails.description}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Aturan yang Terpenuhi:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {appliedRules.map((rule, index) => (
                <li key={index} className="text-gray-700">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
