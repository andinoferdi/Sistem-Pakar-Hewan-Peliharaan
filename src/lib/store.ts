import { create } from "zustand"
import { questions } from "@/data/questions"
import { runInference } from "@/lib/inference"

// Define a default number of questions in case we can't get the actual count
const DEFAULT_QUESTION_COUNT = 16

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
}

export const useStore = create<ConsultationState>((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  totalQuestions: questions.length || DEFAULT_QUESTION_COUNT,
  questionHistory: [0], // Mulai dengan pertanyaan pertama di history
  skippedQuestions: [],

  setAnswer: (index, answer) =>
    set((state) => {
      const newAnswers = [...state.answers]
      newAnswers[index] = answer

      const newHistory = [...state.questionHistory]
      const newSkipped = [...state.skippedQuestions]

      // Use forward chaining inference to find next relevant question
      const inferenceResult = runInference(newAnswers)
      const nextIndex = inferenceResult.nextRelevantQuestion
      
      if (nextIndex !== null) {
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
    }),

  goToPreviousQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex <= 0 || state.questionHistory.length <= 1) return state

      // Get the current question index before removing from history
      const currentQuestionIndex = state.currentQuestionIndex
      
      // Remove current question from history
      const newHistory = [...state.questionHistory]
      newHistory.pop()
      
      const previousIndex = newHistory[newHistory.length - 1]

      // Create a clean answers array by only keeping answers up to previousIndex
      const newAnswers: boolean[] = []
      for (let i = 0; i <= previousIndex; i++) {
        if (state.answers[i] !== undefined) {
          newAnswers[i] = state.answers[i]
        }
      }
      // All answers after previousIndex are automatically excluded

      // Clear skipped questions that might be relevant again
      const newSkipped = state.skippedQuestions.filter(q => q <= previousIndex)

      console.log('Going back from question', currentQuestionIndex, 'to question', previousIndex)
      console.log('Old answers:', state.answers)
      console.log('New answers:', newAnswers)

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
      questionHistory: [0], // Reset dengan pertanyaan pertama
      skippedQuestions: [],
    }),
}))
