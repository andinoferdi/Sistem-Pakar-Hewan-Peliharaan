import { create } from "zustand"
import { questions } from "@/data/questions"

// Define a default number of questions in case we can't get the actual count
const DEFAULT_QUESTION_COUNT = 16

interface ConsultationState {
  currentQuestionIndex: number
  answers: boolean[]
  totalQuestions: number

  // Actions
  setAnswer: (index: number, answer: boolean) => void
  resetConsultation: () => void
}

export const useStore = create<ConsultationState>((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  totalQuestions: questions.length || DEFAULT_QUESTION_COUNT,

  setAnswer: (index, answer) =>
    set((state) => {
      const newAnswers = [...state.answers]
      newAnswers[index] = answer

      return {
        answers: newAnswers,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }
    }),

  resetConsultation: () =>
    set({
      currentQuestionIndex: 0,
      answers: [],
    }),
}))
