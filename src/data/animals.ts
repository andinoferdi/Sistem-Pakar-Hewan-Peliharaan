export interface AnimalDetails {
  id: string
  name: string
  description: string
  conclusionFact: string
}

export const animals: AnimalDetails[] = [
  {
    id: "cat",
    name: "Kucing",
    description:
      "Kucing adalah hewan peliharaan yang mandiri, lincah, dan suka bermain. Mereka adalah karnivora yang mengeong dan memiliki bulu yang lembut. Kucing sangat cocok untuk pemilik yang menginginkan hewan peliharaan yang tidak terlalu membutuhkan perhatian konstan.",
    conclusionFact: "isCat",
  },
  {
    id: "dog",
    name: "Anjing",
    description:
      "Anjing adalah hewan peliharaan yang setia, cerdas, dan bersahabat. Mereka adalah karnivora yang menggonggong dan sangat loyal kepada pemiliknya. Anjing membutuhkan perhatian dan aktivitas fisik yang cukup, serta sangat cocok untuk keluarga yang aktif.",
    conclusionFact: "isPetDog",
  },
  {
    id: "bird",
    name: "Burung",
    description:
      "Burung peliharaan adalah burung yang berkicau dan biasanya hidup di dalam sangkar. Mereka memiliki sayap dan sering dijadikan hewan peliharaan karena suaranya yang merdu. Burung cocok untuk pemilik yang menyukai suara alam dan tidak memiliki banyak ruang.",
    conclusionFact: "isPetBird",
  },
  {
    id: "rabbit",
    name: "Kelinci",
    description:
      "Kelinci peliharaan adalah mamalia dengan telinga panjang yang suka melompat. Mereka memiliki bulu yang lembut dan merupakan hewan peliharaan yang tenang dan lucu. Kelinci cocok untuk pemilik yang menginginkan hewan peliharaan yang tidak berisik dan mudah dirawat.",
    conclusionFact: "isPetRabbit",
  },
  {
    id: "fish",
    name: "Ikan",
    description:
      "Ikan hias adalah ikan yang berwarna-warni dan hidup di dalam akuarium. Mereka berenang, memiliki sisik, dan menjadi hewan peliharaan yang menenangkan untuk dilihat. Ikan hias cocok untuk pemilik yang menginginkan hewan peliharaan yang mudah dirawat dan tidak membutuhkan interaksi langsung.",
    conclusionFact: "isPetFish",
  },
]

export function getAnimalDetails(animalType: string): AnimalDetails {
  // Try to find by conclusion fact first (most accurate)
  const animalByConclusion = animals.find((animal) => animal.conclusionFact.toLowerCase() === animalType.toLowerCase())

  if (animalByConclusion) return animalByConclusion

  // Try to find by ID
  const animalById = animals.find((animal) => animal.id.toLowerCase() === animalType.toLowerCase())

  if (animalById) return animalById

  // Try to find by name
  const animalByName = animals.find((animal) => animal.name.toLowerCase() === animalType.toLowerCase())

  if (animalByName) return animalByName

  // Return default if not found
  return {
    id: "unknown",
    name: animalType,
    description: "Tidak ada informasi detail tentang hewan ini.",
    conclusionFact: "",
  }
}
