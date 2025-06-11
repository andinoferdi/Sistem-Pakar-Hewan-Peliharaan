"use client"

import { motion } from "framer-motion"
import { PawPrint, Heart, Star, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function ParticleBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particles = [
    { icon: PawPrint, color: "text-pink-400/30", size: 16 },
    { icon: Heart, color: "text-purple-400/30", size: 14 },
    { icon: Star, color: "text-yellow-400/30", size: 12 },
    { icon: Sparkles, color: "text-blue-400/30", size: 18 },
  ]

  if (!isClient) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ height: "100%" }}>
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => {
        const ParticleIcon = particles[i % particles.length].icon
        const color = particles[i % particles.length].color
        const size = particles[i % particles.length].size

        return (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            initial={{ opacity: 0.4 }}
            animate={{
              x: [i * 100, i * 100 + 100, i * 100],
              y: [i * 50, i * 50 + 50, i * 50],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <ParticleIcon size={size} />
          </motion.div>
        )
      })}

      {/* Floating orbs */}
      {[...Array(10)].map((_, i) => {
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${
                [
                  "rgba(236, 72, 153, 0.15)",
                  "rgba(168, 85, 247, 0.15)",
                  "rgba(59, 130, 246, 0.15)",
                  "rgba(34, 197, 94, 0.15)",
                ][i % 4]
              }, transparent)`,
              width: 40 + i * 5,
              height: 40 + i * 5,
            }}
            initial={{ opacity: 0.3 }}
            animate={{
              x: [i * 150, i * 150 + 150, i * 150],
              y: [i * 80, i * 80 + 80, i * 80],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )
      })}

      {/* Gentle twinkling stars */}
      {[...Array(8)].map((_, i) => {
        return (
          <motion.div
            key={`twinkle-${i}`}
            className="absolute"
            initial={{
              x: i * 200,
              y: i * 100,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <Star className="w-3 h-3 text-yellow-400/40 fill-current" />
          </motion.div>
        )
      })}
    </div>
  )
}
