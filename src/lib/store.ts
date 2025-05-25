import { create } from "zustand"
import { questions } from "@/data/questions"

// Define a default number of questions in case we can't get the actual count
const DEFAULT_QUESTION_COUNT = 16

interface ConsultationState {
  currentQuestionIndex: number
  answers: boolean[]
  totalQuestions: number
  questionHistory: number[]

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

  setAnswer: (index, answer) =>
    set((state) => {
      const newAnswers = [...state.answers]
      newAnswers[index] = answer

      const newHistory = [...state.questionHistory]
      const nextIndex = state.currentQuestionIndex + 1

      // Tambahkan pertanyaan berikutnya ke history
      if (!newHistory.includes(nextIndex)) {
        newHistory.push(nextIndex)
      }

      return {
        answers: newAnswers,
        currentQuestionIndex: nextIndex,
        questionHistory: newHistory,
      }
    }),

  goToPreviousQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex <= 0) return state

      const previousIndex = state.currentQuestionIndex - 1

      // Remove the answer for current question
      const newAnswers = [...state.answers]
      delete newAnswers[state.currentQuestionIndex]

      // Update history - remove current question from history
      const newHistory = [...state.questionHistory]
      newHistory.pop()

      return {
        currentQuestionIndex: previousIndex,
        questionHistory: newHistory,
        answers: newAnswers,
      }
    }),

  resetConsultation: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
      questionHistory: [0], // Reset dengan pertanyaan pertama
    }),
}))
