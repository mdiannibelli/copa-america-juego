import { create } from 'zustand';
import { QuestionType } from '../types/question';
import { API_URL } from '../constants';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware';

interface State {
    questions: QuestionType[]
    currentQuestion: number
    score: number
    fetchQuestions: (limit: number) => void
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void;
    goPreviousQuestion: () => void;
}

export const useQuestionStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        score: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch(API_URL);
            const data = await res.json();
            const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
            set(state => ({ ...state, questions: questions }));
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions, score } = get();
            const newQuestions = structuredClone(questions);

            const questionIndex = newQuestions.findIndex(q => q.id === questionId);
            const questionInfo = newQuestions[questionIndex];

            const isCorrectAnswer = questionInfo.correctAnswer === answerIndex;
            if (isCorrectAnswer) {
                confetti();
                set({ score: score + 1 });
            }

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectAnswer,
                userSelectedAnswer: answerIndex
            };

            set(state => ({ ...state, questions: newQuestions }));
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion });
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;
            if (currentQuestion >= 0) {
                set({ currentQuestion: previousQuestion });
            }
        }
    };
}, {
    name: 'questions'
}));