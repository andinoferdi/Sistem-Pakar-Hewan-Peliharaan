export interface QuestionExplanation {
  factKey: string
  explanation: string
  funFact: string
}

export const questionExplanations: QuestionExplanation[] = [
  {
    factKey: "hasFur",
    explanation:
      "Bulu adalah karakteristik utama mamalia. Sistem AI menggunakan informasi ini untuk mengklasifikasikan hewan ke dalam kategori mamalia, yang merupakan langkah pertama dalam proses identifikasi.",
    funFact: "Tahukah Anda? Bulu mamalia terdiri dari protein keratin yang sama dengan rambut manusia dan kuku!",
  },
  {
    factKey: "givesMilk",
    explanation:
      "Kemampuan menghasilkan susu adalah ciri khas mamalia betina. Ini membantu AI memastikan klasifikasi mamalia dan membedakannya dari kelompok hewan lain.",
    funFact: "Susu mamalia mengandung antibodi yang membantu melindungi bayi dari penyakit!",
  },
  {
    factKey: "hasWings",
    explanation:
      "Sayap adalah karakteristik unik burung. Tidak ada hewan peliharaan lain yang memiliki sayap sejati, sehingga ini menjadi penanda pasti untuk klasifikasi burung.",
    funFact: "Sayap burung tidak hanya untuk terbang, tapi juga untuk mengatur suhu tubuh dan menarik pasangan!",
  },
  {
    factKey: "sings",
    explanation:
      "Kemampuan bernyanyi atau berkicau membantu AI mengidentifikasi burung penyanyi. Ini penting untuk membedakan burung peliharaan dari burung liar.",
    funFact: "Burung belajar bernyanyi seperti manusia belajar berbicara - dengan meniru suara orang tua mereka!",
  },
  {
    factKey: "livesInCage",
    explanation:
      "Informasi tempat tinggal membantu AI menentukan apakah ini burung peliharaan atau bukan. Burung peliharaan umumnya dipelihara dalam sangkar.",
    funFact: "Burung peliharaan yang bahagia akan bernyanyi lebih sering dan memiliki bulu yang lebih cerah!",
  },
  {
    factKey: "swims",
    explanation:
      "Kemampuan berenang adalah indikator utama untuk ikan. AI menggunakan ini sebagai langkah awal untuk mengklasifikasikan hewan akuatik.",
    funFact: "Ikan dapat berenang sejak lahir tanpa perlu belajar, berbeda dengan mamalia yang harus belajar!",
  },
  {
    factKey: "hasScales",
    explanation:
      "Sisik adalah karakteristik khas ikan. Kombinasi berenang dan memiliki sisik memberikan kepastian tinggi bahwa hewan ini adalah ikan.",
    funFact: "Sisik ikan tumbuh seiring bertambahnya usia, seperti cincin pohon yang menunjukkan umur!",
  },
  {
    factKey: "isColorful",
    explanation:
      "Warna-warni pada ikan sering menunjukkan bahwa ikan tersebut adalah ikan hias. Ikan liar cenderung memiliki warna yang lebih kamuflase.",
    funFact: "Ikan hias dapat mengubah warna berdasarkan mood, kesehatan, dan kondisi lingkungan!",
  },
  {
    factKey: "livesInAquarium",
    explanation:
      "Tempat tinggal di akuarium adalah indikator kuat bahwa ini adalah ikan peliharaan, bukan ikan liar di habitat alami.",
    funFact: "Akuarium pertama dibuat pada tahun 1850-an dan awalnya disebut 'aquatic vivarium'!",
  },
  {
    factKey: "eatsMeat",
    explanation:
      "Diet karnivora membantu AI mengklasifikasikan mamalia menjadi karnivora. Ini penting untuk membedakan kucing/anjing dari herbivora seperti kelinci.",
    funFact:
      "Gigi karnivora dirancang khusus untuk merobek daging, dengan gigi taring yang tajam dan geraham yang kuat!",
  },
  {
    factKey: "meows",
    explanation:
      "Suara mengeong adalah karakteristik unik kucing. Tidak ada hewan lain yang mengeong, sehingga ini menjadi penanda pasti untuk identifikasi kucing.",
    funFact:
      "Kucing dewasa jarang mengeong ke kucing lain - mereka mengeong khusus untuk berkomunikasi dengan manusia!",
  },
  {
    factKey: "barks",
    explanation:
      "Suara menggonggong adalah ciri khas anjing. AI menggunakan ini untuk membedakan anjing dari karnivora lain seperti kucing.",
    funFact: "Gonggongan anjing memiliki berbagai arti: peringatan, kegembiraan, ketakutan, atau permintaan perhatian!",
  },
  {
    factKey: "hasLongEars",
    explanation:
      "Telinga panjang adalah ciri fisik khas kelinci. Ini membantu AI membedakan kelinci dari mamalia kecil lainnya.",
    funFact: "Telinga panjang kelinci berfungsi seperti AC alami - membantu mengatur suhu tubuh mereka!",
  },
  {
    factKey: "hops",
    explanation:
      "Cara bergerak dengan melompat adalah karakteristik unik kelinci. Kaki belakang yang kuat memungkinkan mereka melompat dengan efisien.",
    funFact: "Kelinci dapat melompat hingga 1 meter tingginya dan 3 meter jauhnya dalam sekali lompat!",
  },
  {
    factKey: "hasSoftFur",
    explanation:
      "Bulu yang sangat lembut adalah ciri khas kelinci peliharaan. Ini membantu membedakan kelinci peliharaan dari kelinci liar yang bulunya lebih kasar.",
    funFact: "Bulu kelinci Angora sangat lembut dan hangat, sering digunakan untuk membuat pakaian mewah!",
  },
  {
    factKey: "isLoyalToHuman",
    explanation:
      "Kesetiaan kepada manusia adalah trait yang telah dikembangkan anjing selama ribuan tahun domestikasi. Ini membedakan anjing peliharaan dari anjing liar.",
    funFact: "Anjing adalah hewan pertama yang didomestikasi manusia, sekitar 15.000-30.000 tahun yang lalu!",
  },
]

export function getExplanation(factKey: string): QuestionExplanation {
  const explanation = questionExplanations.find((exp) => exp.factKey === factKey)
  return (
    explanation || {
      factKey,
      explanation:
        "Pertanyaan ini membantu sistem AI mengidentifikasi karakteristik unik hewan untuk memberikan hasil yang akurat.",
      funFact: "Setiap karakteristik hewan memiliki fungsi evolusioner yang unik dan menarik!",
    }
  )
}
