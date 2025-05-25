"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles, Brain, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"

export default function Home() {
  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7b2d8e 100%)",
      }}
    >
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl w-full text-center space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-2 sm:mb-4"
          >
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-pink-400 via-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" />
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2 sm:mb-3 tracking-tight"
          >
            Pet Finder AI
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-2 sm:space-y-3 mb-6 sm:mb-8"
          >
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold px-2 tracking-tight">
              Sistem Pakar Cerdas untuk Menemukan Hewan Peliharaan Ideal Anda
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 font-medium">
              Gunakan teknologi AI dengan metode forward chaining untuk menemukan hewan peliharaan yang sempurna sesuai
              dengan kepribadian dan gaya hidup Anda melalui serangkaian pertanyaan interaktif.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 mb-6 sm:mb-8 max-w-xs sm:max-w-none mx-auto"
          >
            {[
              { icon: Brain, title: "AI Powered", desc: "Teknologi sistem pakar canggih", color: "text-pink-400" },
              { icon: Target, title: "Akurat", desc: "Hasil yang dipersonalisasi", color: "text-purple-400" },
              { icon: Zap, title: "Cepat", desc: "Hanya beberapa menit", color: "text-yellow-400" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${feature.color} mb-2 sm:mb-3 mx-auto`}
                />
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 sm:mt-8"
          >
            <Link href="/consult">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-xl transform transition-all duration-300 hover:scale-105 border-0 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto tracking-tight"
              >
                <motion.div
                  className="flex items-center justify-center gap-2"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="truncate">Mulai Pencarian Pet Ideal</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center gap-6 sm:gap-8 lg:gap-12 mt-6 sm:mt-8 text-gray-300"
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">5+</div>
              <div className="text-xs sm:text-sm font-medium">Jenis Hewan</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">16</div>
              <div className="text-xs sm:text-sm font-medium">Pertanyaan Cerdas</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">99%</div>
              <div className="text-xs sm:text-sm font-medium">Akurasi</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
