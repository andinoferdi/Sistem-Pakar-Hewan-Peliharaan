import { rules } from "@/data/rules"
import { questions } from "@/data/questions"

interface InferenceResult {
  result: string
  appliedRules: string[]
}

export function runInference(answers: boolean[]): InferenceResult {
  // Convert answers array to facts object
  const facts: Record<string, boolean> = {}

  // Initialize facts from answers
  questions.forEach((question, index) => {
    if (index < answers.length) {
      facts[question.factKey] = answers[index]
    }
  })

  // Keep track of applied rules
  const appliedRules: string[] = []

  // Run forward chaining until no new facts are derived
  let newFactsAdded = true
  while (newFactsAdded) {
    newFactsAdded = false

    for (const rule of rules) {
      // Skip rules that have already been applied
      if (appliedRules.includes(rule.id)) continue

      // Check if rule condition is satisfied
      if (rule.condition(facts) && !facts[rule.conclusion]) {
        // Apply the rule
        facts[rule.conclusion] = true
        appliedRules.push(rule.id)
        newFactsAdded = true
      }
    }
  }

  // Determine the result based on derived facts
  let result = "Tidak dapat menentukan jenis hewan"

  // Check for pet conclusions first (most specific)
  if (facts.isPetDog) result = "isPetDog"
  else if (facts.isPetRabbit) result = "isPetRabbit"
  else if (facts.isPetBird) result = "isPetBird"
  else if (facts.isPetFish) result = "isPetFish"
  else if (facts.isCat) result = "isCat"
  // Check for general animal types if no pet type was found
  else if (facts.isDog) result = "isDog"
  else if (facts.isRabbit) result = "isRabbit"
  else if (facts.isSongbird) result = "isSongbird"
  else if (facts.isOrnamentalFish) result = "isOrnamentalFish"

  // Format the applied rules for display
  const formattedRules = appliedRules.map((ruleId) => {
    const rule = rules.find((r) => r.id === ruleId)
    return rule ? `${rule.id}: ${rule.description}` : ruleId
  })

  return {
    result,
    appliedRules: formattedRules,
  }
}
