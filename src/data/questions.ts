export interface Question {
  id: string
  text: string
  factKey: string
}

export const questions: Question[] = [
  // Mammal questions
  {
    id: "q1",
    text: "Apakah hewan ini memiliki bulu?",
    factKey: "hasFur",
  },
  {
    id: "q2",
    text: "Apakah hewan ini menghasilkan susu?",
    factKey: "givesMilk",
  },

  // Bird questions
  {
    id: "q3",
    text: "Apakah hewan ini memiliki sayap?",
    factKey: "hasWings",
  },
  {
    id: "q4",
    text: "Apakah hewan ini bisa bernyanyi/berkicau?",
    factKey: "sings",
  },
  {
    id: "q5",
    text: "Apakah hewan ini tinggal di dalam sangkar?",
    factKey: "livesInCage",
  },

  // Fish questions
  {
    id: "q6",
    text: "Apakah hewan ini bisa berenang?",
    factKey: "swims",
  },
  {
    id: "q7",
    text: "Apakah hewan ini memiliki sisik?",
    factKey: "hasScales",
  },
  {
    id: "q8",
    text: "Apakah hewan ini berwarna-warni?",
    factKey: "isColorful",
  },
  {
    id: "q9",
    text: "Apakah hewan ini dapat hidup di dalam akuarium?",
    factKey: "livesInAquarium",
  },

  // Carnivore questions
  {
    id: "q10",
    text: "Apakah hewan ini memakan daging?",
    factKey: "eatsMeat",
  },
  {
    id: "q11",
    text: "Apakah hewan ini mengeong?",
    factKey: "meows",
  },
  {
    id: "q12",
    text: "Apakah hewan ini menggonggong?",
    factKey: "barks",
  },

  // Rabbit questions
  {
    id: "q13",
    text: "Apakah hewan ini memiliki telinga panjang?",
    factKey: "hasLongEars",
  },
  {
    id: "q14",
    text: "Apakah hewan ini suka melompat?",
    factKey: "hops",
  },
  {
    id: "q15",
    text: "Apakah bulunya lembut?",
    factKey: "hasSoftFur",
  },

  // Dog specific
  {
    id: "q16",
    text: "Apakah hewan ini setia kepada manusia?",
    factKey: "isLoyalToHuman",
  },
]

// Function to get all questions
export function getAllQuestions(): Question[] {
  try {
    // Make a copy of the questions array to avoid mutation issues
    return [...questions]
  } catch (error) {
    console.error("Error in getAllQuestions:", error)
    return []
  }
}

// Function to get questions for a specific animal path
export function getQuestionsForAnimal(animalType: string): Question[] {
  try {
    switch (animalType.toLowerCase()) {
      case "cat":
      case "kucing":
        return questions.filter((q) => ["hasFur", "givesMilk", "eatsMeat", "meows"].includes(q.factKey))

      case "dog":
      case "anjing":
        return questions.filter((q) =>
          ["hasFur", "givesMilk", "eatsMeat", "barks", "isLoyalToHuman"].includes(q.factKey),
        )

      case "bird":
      case "burung":
        return questions.filter((q) => ["hasWings", "sings", "livesInCage"].includes(q.factKey))

      case "rabbit":
      case "kelinci":
        return questions.filter((q) => ["hasFur", "givesMilk", "hasLongEars", "hops", "hasSoftFur"].includes(q.factKey))

      case "fish":
      case "ikan":
        return questions.filter((q) => ["swims", "hasScales", "isColorful", "livesInAquarium"].includes(q.factKey))

      default:
        return [...questions]
    }
  } catch (error) {
    console.error("Error in getQuestionsForAnimal:", error)
    return []
  }
}
