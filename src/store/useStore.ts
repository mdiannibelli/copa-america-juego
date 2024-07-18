import { create } from 'zustand';
import { QuestionType } from '../types/question';
import { API_URL } from '../constants';
import confetti from 'canvas-confetti';

interface State {
    questions: QuestionType[]
    currentQuestion: number
    fetchQuestions: (limit: number) => void
    selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch(API_URL);
            const data = await res.json();
            const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
            set(state => ({ ...state, questions: questions }));
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            const newQuestions = structuredClone(questions);

            const questionIndex = newQuestions.findIndex(q => q.id === questionId);
            const questionInfo = newQuestions[questionIndex];

            const isCorrectAnswer = questionInfo.correctAnswer === answerIndex;
            if (isCorrectAnswer) confetti();

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectAnswer,
                userSelectedAnswer: answerIndex
            };

            set(state => ({ ...state, questions: newQuestions }));
        }
    };
});