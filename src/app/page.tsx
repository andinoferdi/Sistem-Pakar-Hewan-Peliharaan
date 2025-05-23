import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Sistem Pakar Hewan Peliharaan</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Temukan jenis hewan peliharaan yang cocok untuk Anda melalui serangkaian pertanyaan sederhana menggunakan
          sistem pakar berbasis forward chaining.
        </p>
        <div className="mt-8">
          <Link href="/consult">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
            >
              Mulai Konsultasi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
