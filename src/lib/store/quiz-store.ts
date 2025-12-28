import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizAnswer {
  questionId: number;
  answer: any;
}

interface QuizStore {
  currentStep: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  result: {
    styleProfile: string;
    description: string;
    recommendedProducts: string[];
  } | null;

  saveAnswer: (questionId: number, answer: any) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetQuiz: () => void;
  completeQuiz: (result: QuizStore['result']) => void;
}

const quizQuestions = 10;

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      answers: [],
      isCompleted: false,
      result: null,

      saveAnswer: (questionId, answer) => {
        const answers = get().answers;
        const existingIndex = answers.findIndex((a) => a.questionId === questionId);

        if (existingIndex >= 0) {
          set({
            answers: answers.map((a, i) =>
              i === existingIndex ? { questionId, answer } : a
            )
          });
        } else {
          set({ answers: [...answers, { questionId, answer }] });
        }
      },

      nextStep: () => {
        const currentStep = get().currentStep;
        if (currentStep < quizQuestions) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const currentStep = get().currentStep;
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      goToStep: (step) => {
        if (step >= 1 && step <= quizQuestions) {
          set({ currentStep: step });
        }
      },

      resetQuiz: () => {
        set({
          currentStep: 1,
          answers: [],
          isCompleted: false,
          result: null
        });
      },

      completeQuiz: (result) => {
        set({ isCompleted: true, result });
      }
    }),
    {
      name: 'quiz-storage'
    }
  )
);
