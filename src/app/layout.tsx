import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "@/lib/store-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pet Finder AI - Sistem Pakar Hewan Peliharaan",
  description:
    "Aplikasi sistem pakar untuk menentukan jenis hewan peliharaan menggunakan metode forward chaining dengan teknologi AI",
  keywords: "sistem pakar, hewan peliharaan, AI, forward chaining, kucing, anjing, burung, kelinci, ikan hias",
  authors: [{ name: "Kelompok 1 B4" }],
  openGraph: {
    title: "Pet Finder AI - Sistem Pakar Hewan Peliharaan",
    description: "Temukan hewan peliharaan ideal Anda dengan teknologi AI",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
