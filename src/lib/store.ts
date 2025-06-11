import { create } from "zustand"
import { questions } from "@/data/questions"
import { runInference } from "@/lib/inference"

// Define a default number of questions in case we can't get the actual count
const DEFAULT_QUESTION_COUNT = 16

interface ProgressInfo {
  percentage: number
  answeredCount: number
  estimatedTotal: number
  currentPath: string
  isComplete: boolean
}

interface ConsultationState {
  currentQuestionIndex: number
  answers: boolean[]
  totalQuestions: number
  questionHistory: number[]
  skippedQuestions: number[]

  // Actions
  setAnswer: (index: number, answer: boolean) => void
  goToPreviousQuestion: () => void
  resetConsultation: () => void
  getProgressInfo: () => ProgressInfo
}

export const useStore = create<ConsultationState>((set, get) => ({
  currentQuestionIndex: 0,
  answers: [],
  totalQuestions: questions?.length || DEFAULT_QUESTION_COUNT,
  questionHistory: [0], // Start with first question in history
  skippedQuestions: [],

  setAnswer: (index, answer) =>
    set((state) => {
      const newAnswers = [...state.answers]
      newAnswers[index] = answer

      const newHistory = [...state.questionHistory]
      const newSkipped = [...state.skippedQuestions]

      // Use forward chaining inference to find next relevant question
      try {
        const inferenceResult = runInference(newAnswers)
        const nextIndex = inferenceResult.nextRelevantQuestion

        if (nextIndex !== null && nextIndex < state.totalQuestions) {
          // Mark skipped questions
          for (let i = index + 1; i < nextIndex; i++) {
            if (!newSkipped.includes(i)) {
              newSkipped.push(i)
            }
          }

          // Add next question to history if not already there
          if (!newHistory.includes(nextIndex)) {
            newHistory.push(nextIndex)
          }

          return {
            answers: newAnswers,
            currentQuestionIndex: nextIndex,
            questionHistory: newHistory,
            skippedQuestions: newSkipped,
          }
        } else {
          // No more relevant questions based on forward chaining inference
          return {
            answers: newAnswers,
            currentQuestionIndex: state.totalQuestions, // This will trigger completion
            questionHistory: newHistory,
            skippedQuestions: newSkipped,
          }
        }
      } catch (error) {
        console.error("Error in inference:", error)
        // Fallback to next question
        return {
          answers: newAnswers,
          currentQuestionIndex: Math.min(index + 1, state.totalQuestions),
          questionHistory: newHistory,
          skippedQuestions: newSkipped,
        }
      }
    }),

  goToPreviousQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex <= 0 || state.questionHistory.length <= 1) return state

      // Remove current question from history
      const newHistory = [...state.questionHistory]
      newHistory.pop()

      const previousIndex = newHistory[newHistory.length - 1]

      // CRITICAL: Clear ALL answers after the previous question index
      // This ensures progress resets properly when going back
      const newAnswers = [...state.answers]

      // Clear answers for all questions after the previous index by removing them
      newAnswers.splice(previousIndex + 1)

      // IMPORTANT: Also clear the answer for the previous question itself
      // This ensures that when we go back, we haven't "answered" that question yet
      if (newAnswers.length > previousIndex) {
        newAnswers.splice(previousIndex)
      }

      // Clear skipped questions that are no longer relevant
      const newSkipped = state.skippedQuestions.filter((q) => q <= previousIndex)

      console.log("Going back from question", state.currentQuestionIndex, "to question", previousIndex)
      console.log("Clearing answers after index", previousIndex, "including the previous question itself")
      console.log("New answers array:", newAnswers)

      return {
        currentQuestionIndex: previousIndex,
        questionHistory: newHistory,
        answers: newAnswers,
        skippedQuestions: newSkipped,
      }
    }),

  resetConsultation: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      questionHistory: [0], // Reset with first question
      skippedQuestions: [],
    }),

  getProgressInfo: (): ProgressInfo => {
    const state = get()

    // Check if consultation is complete
    const isComplete = state.currentQuestionIndex >= state.totalQuestions

    // If complete, return 100%
    if (isComplete) {
      const totalAnswered = state.answers.filter((answer) => answer !== undefined && answer !== null).length
      return {
        percentage: 100,
        answeredCount: totalAnswered,
        estimatedTotal: totalAnswered,
        currentPath: "complete",
        isComplete: true,
      }
    }

    // CRITICAL FIX: Only count answers that come BEFORE the current question
    // This ensures that when you're at question 1, no questions are counted as "answered"
    const answersBeforeCurrent = state.answers.slice(0, state.currentQuestionIndex)
    const answeredCount = answersBeforeCurrent.filter((answer) => answer !== undefined && answer !== null).length

    // Special case: If we're at the first question (index 0), progress should be 0%
    if (state.currentQuestionIndex === 0) {
      return {
        percentage: 0,
        answeredCount: 0,
        estimatedTotal: 4, // Default estimate for starting
        currentPath: "starting",
        isComplete: false,
      }
    }

    // Determine the current consultation path and estimate total questions needed
    const currentAnswers: Record<string, boolean | undefined> = {}
    questions.forEach((question, index) => {
      if (index < answersBeforeCurrent.length && answersBeforeCurrent[index] !== undefined) {
        currentAnswers[question.factKey] = answersBeforeCurrent[index]
      }
    })

    // Estimate total questions based on current path
    let estimatedTotal = 4 // Conservative default estimate
    let currentPath = "starting"

    // Determine path based on answers so far
    if (currentAnswers.hasFur === true) {
      currentPath = "mammal"
      if (currentAnswers.eatsMeat === true) {
        currentPath = "carnivore"
        estimatedTotal = 4 // hasFur, eatsMeat, meows/barks, possibly loyalty
      } else if (currentAnswers.eatsMeat === false) {
        currentPath = "herbivore"
        estimatedTotal = 5 // hasFur, eatsMeat, hasLongEars, hops, hasSoftFur
      } else {
        estimatedTotal = 3 // Still determining carnivore vs herbivore
      }
    } else if (currentAnswers.hasFur === false) {
      if (currentAnswers.hasWings === true) {
        currentPath = "bird"
        estimatedTotal = 4 // hasFur, hasWings, sings, livesInCage
      } else if (currentAnswers.hasWings === false) {
        if (currentAnswers.swims === true) {
          currentPath = "fish"
          estimatedTotal = 5 // hasFur, hasWings, swims, hasScales, isColorful/livesInAquarium
        } else {
          estimatedTotal = 4 // Non-swimming, non-flying, non-mammal
        }
      } else {
        estimatedTotal = 3 // Still determining wings
      }
    } else {
      estimatedTotal = 2 // Just started, need to determine hasFur
    }

    // Calculate progress percentage based on current position
    let percentage = 0

    if (answeredCount === 0) {
      percentage = 0
    } else {
      // Calculate progress based on answered questions vs estimated total
      const baseProgress = (answeredCount / estimatedTotal) * 100

      // Cap progress at 90% until we're very close to completion
      if (answeredCount >= estimatedTotal - 1) {
        percentage = Math.min(baseProgress, 90)
      } else {
        percentage = Math.min(baseProgress, 80)
      }
    }

    console.log("=== Progress Calculation Debug ===")
    console.log("Current question index:", state.currentQuestionIndex)
    console.log("Answers before current:", answersBeforeCurrent)
    console.log("Answered count:", answeredCount)
    console.log("Estimated total:", estimatedTotal)
    console.log("Calculated percentage:", percentage)
    console.log("================================")

    return {
      percentage: Math.round(Math.max(0, percentage)),
      answeredCount,
      estimatedTotal,
      currentPath,
      isComplete: false,
    }
  },
}))
