"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAnimalDetails } from "@/data/animals"
import { Cat, Dog, Bird, Fish, Rabbit, Heart, Star, CheckCircle, HelpCircle } from "lucide-react"

interface ResultCardProps {
  animalType: string
  appliedRules: string[]
}

export function ResultCard({ animalType, appliedRules }: ResultCardProps) {
  const animalDetails = getAnimalDetails(animalType)

  const getAnimalIcon = () => {
    const iconProps = { className: "h-12 w-12 sm:h-16 sm:w-16" }

    switch (animalType.toLowerCase()) {
      case "cat":
      case "kucing":
      case "iscat":
        return <Cat {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-orange-400" />
      case "dog":
      case "anjing":
      case "ispetdog":
        return <Dog {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-amber-400" />
      case "bird":
      case "burung":
      case "ispetbird":
        return <Bird {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400" />
      case "rabbit":
      case "kelinci":
      case "ispetrabbit":
        return <Rabbit {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-pink-400" />
      case "fish":
      case "ikan hias":
      case "ispetfish":
        return <Fish {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-cyan-400" />
      default:
        return <HelpCircle {...iconProps} className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      className="relative"
    >
      <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Celebration Header */}
        <CardHeader className="bg-white/5 text-center py-4 sm:py-6 lg:py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-3 sm:mb-4"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 sm:p-4 shadow-xl"
              >
                {getAnimalIcon()}
              </motion.div>

              {/* Floating stars */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${25 + i * 20}%`,
                    left: `${15 + i * 35}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                >
                  <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {animalDetails.id === "unknown" ? (
              <>
                <div className="text-orange-400 text-sm sm:text-base font-semibold mb-2">🤔 Hmm...</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight px-2 tracking-tight">
                  Tidak Dapat Ditentukan
                </h2>
                <div className="text-gray-300 text-xs sm:text-sm px-4 font-medium">
                  Maaf, sistem tidak dapat menentukan hewan peliharaan yang cocok berdasarkan jawaban Anda.
                </div>
              </>
            ) : (
              <>
                <div className="text-yellow-400 text-sm sm:text-base font-semibold mb-2">🎉 Selamat! 🎉</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight px-2 tracking-tight">
                  {animalDetails.name}
                </h2>
                <div className="text-gray-300 text-xs sm:text-sm px-4 font-medium">
                  adalah hewan peliharaan ideal untuk Anda!
                </div>
              </>
            )}
          </motion.div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-white/10"
          >
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center gap-2 tracking-tight">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
              Tentang Hewan Peliharaan Anda
            </h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-medium">{animalDetails.description}</p>
          </motion.div>

          {/* Applied Rules */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-white/10"
          >
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 tracking-tight">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              Aturan AI yang Terpenuhi
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {appliedRules.slice(0, 4).map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-medium">{rule}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
