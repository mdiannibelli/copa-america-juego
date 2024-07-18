export type QuestionType = {
    id: number
    question: string
    code: string
    answers: string[]
    correctAnswer: number
    isCorrectAnswer?: boolean
    userSelectedAnswer?: number
}