import { rules } from "@/data/rules"
import { questions } from "@/data/questions"

interface InferenceResult {
  result: string
  appliedRules: string[]
  nextRelevantQuestion: number | null
  derivedFacts: Record<string, boolean>
}



export function runInference(answers: boolean[]): InferenceResult {
  // Convert answers array to facts object
  const facts: Record<string, boolean> = {}

  // Initialize facts from answers
  questions.forEach((question, index) => {
    if (index < answers.length && answers[index] !== undefined) {
      facts[question.factKey] = answers[index]
    }
  })

  // Keep track of applied rules
  const appliedRules: string[] = []
  const derivedFacts: Record<string, boolean> = { ...facts }

  // Run forward chaining until no new facts are derived
  let newFactsAdded = true
  while (newFactsAdded) {
    newFactsAdded = false

    for (const rule of rules) {
      // Skip rules that have already been applied
      if (appliedRules.includes(rule.id)) continue

      // Check if rule condition is satisfied
      if (rule.condition(derivedFacts) && !derivedFacts[rule.conclusion]) {
        // Apply the rule
        derivedFacts[rule.conclusion] = true
        appliedRules.push(rule.id)
        newFactsAdded = true
      }
    }
  }

  // Determine the result based on derived facts
  let result = "Tidak dapat menentukan jenis hewan"

  // Check for pet conclusions first (most specific)
  if (derivedFacts.isPetDog) result = "isPetDog"
  else if (derivedFacts.isPetRabbit) result = "isPetRabbit"
  else if (derivedFacts.isPetBird) result = "isPetBird"
  else if (derivedFacts.isPetFish) result = "isPetFish"
  else if (derivedFacts.isCat) result = "isCat"
  // Check for general animal types if no pet type was found
  else if (derivedFacts.isDog) result = "isDog"
  else if (derivedFacts.isRabbit) result = "isRabbit"
  else if (derivedFacts.isSongbird) result = "isSongbird"
  else if (derivedFacts.isOrnamentalFish) result = "isOrnamentalFish"

  // Find next relevant question using forward chaining logic
  const nextRelevantQuestion = findNextRelevantQuestion(answers, derivedFacts)

  // Format the applied rules for display
  const formattedRules = appliedRules.map((ruleId) => {
    const rule = rules.find((r) => r.id === ruleId)
    return rule ? `${rule.id}: ${rule.description}` : ruleId
  })

  return {
    result,
    appliedRules: formattedRules,
    nextRelevantQuestion,
    derivedFacts,
  }
}

// Forward chaining approach to determine next question following decision tree
function findNextRelevantQuestion(answers: boolean[], derivedFacts: Record<string, boolean>): number | null {
  // Follow the exact decision tree logic from the diagram
  
  // Get current answers for decision tree navigation
  const currentAnswers: Record<string, boolean | undefined> = {}
  questions.forEach((question, index) => {
    currentAnswers[question.factKey] = index < answers.length ? answers[index] : undefined
  })
  
  // DECISION TREE LOGIC based on the provided diagram
  
  // Start: First question is always "Bulu?" (hasFur)
  if (currentAnswers.hasFur === undefined) {
    return 0 // q1: hasFur
  }
  
  // Branch 1: If hasFur = YES (MAMALIA path)
  if (currentAnswers.hasFur === true) {
    // Next question should be "Susu?" (givesMilk)
    if (currentAnswers.givesMilk === undefined) {
      return 1 // q2: givesMilk
    }
    
    // If both hasFur=true (MAMALIA CONFIRMED), skip non-mamalia questions
    if (currentAnswers.givesMilk === true) {
      // MAMALIA CONFIRMED - ask carnivore questions
      if (currentAnswers.eatsMeat === undefined) {
        return 9 // q10: eatsMeat
      }
    } else {
      // hasFur=true but givesMilk=false - still mamalia, ask carnivore questions
      if (currentAnswers.eatsMeat === undefined) {
        return 9 // q10: eatsMeat
      }
    }
    
    // Continue mamalia path...
    if (currentAnswers.eatsMeat === true) {
      // KARNIVORA path
      if (currentAnswers.meows === undefined) {
        return 10 // q11: meows
      }
      if (currentAnswers.meows === true) {
        // KUCING - skip barks
        return null // Complete
      }
      if (currentAnswers.meows === false && currentAnswers.barks === undefined) {
        return 11 // q12: barks
      }
    } else if (currentAnswers.eatsMeat === false) {
      // Non-carnivore mamalia (rabbit path)
      if (currentAnswers.hasLongEars === undefined) {
        return 12 // q13: hasLongEars
      }
      if (currentAnswers.hasLongEars === true && currentAnswers.hops === undefined) {
        return 13 // q14: hops
      }
      if (currentAnswers.hasLongEars === true && currentAnswers.hops === true) {
        // KELINCI path
        if (currentAnswers.hasSoftFur === undefined) {
          return 14 // q15: hasSoftFur
        }
      }
    }
  }
  
  // Branch 2: If hasFur = NO, ask "Sayap?" (hasWings)
  if (currentAnswers.hasFur === false) {
    if (currentAnswers.hasWings === undefined) {
      return 2 // q3: hasWings
    }
    
    // If hasWings = YES (BURUNG path)
    if (currentAnswers.hasWings === true) {
      // BURUNG - skip all mamalia and fish questions
      if (currentAnswers.sings === undefined) {
        return 3 // q4: sings
      }
      if (currentAnswers.sings === true) {
        // BURUNG PENYANYI
        if (currentAnswers.livesInCage === undefined) {
          return 4 // q5: livesInCage
        }
      }
    }
    
    // If hasWings = NO, ask "Berenang?" (swims)
    if (currentAnswers.hasWings === false) {
      if (currentAnswers.swims === undefined) {
        return 5 // q6: swims
      }
      
      // If swims = YES, continue fish path
      if (currentAnswers.swims === true) {
        if (currentAnswers.hasScales === undefined) {
          return 6 // q7: hasScales
        }
        if (currentAnswers.hasScales === true) {
          // IKAN - skip all non-fish questions
          if (currentAnswers.isColorful === undefined) {
            return 7 // q8: isColorful
          }
          if (currentAnswers.isColorful === true && currentAnswers.livesInAquarium === undefined) {
            return 8 // q9: livesInAquarium
          }
        }
      }
    }
  }
  
  // Check if we need loyalty question for dog
  if (derivedFacts.isMammal === true && currentAnswers.isLoyalToHuman === undefined && 
      (currentAnswers.barks === true || (currentAnswers.eatsMeat === true && currentAnswers.meows === false))) {
    return 15 // q16: isLoyalToHuman
  }
  
  return null // No more questions needed
}

// Legacy function for compatibility - now uses proper forward chaining
export function getNextQuestion(answers: boolean[]): number | null {
  const inferenceResult = runInference(answers)
  return inferenceResult.nextRelevantQuestion
}
