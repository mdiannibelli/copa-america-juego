import { useQuestionStore } from '../store/useStore';
import type { QuestionType } from '../types/question';

interface Props {
    info: QuestionType
}

const Question = ({ info }: Props) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer);
    const handleAnswer = (answerIndex: number) => {
        selectAnswer(info.id, answerIndex);
    };

    const bgColor = (index: number) => {
        const { userSelectedAnswer, correctAnswer } = info;
        if (userSelectedAnswer == null) return 'bg-slate-300 hover:bg-opacity-50';
        if (index === correctAnswer) {
            return 'bg-green-500';
        }
        if (index !== correctAnswer) {
            return 'bg-red-500';
        }

    };
    return (
        <div className='flex flex-col justify-center items-center w-full bg-[#171763] h-full p-12 rounded'>
            <span className='text-xl bg-black bg-opacity-15 rounded-md px-4  py-2 max-w-[380px] text-center'>{info.question}</span>
            <div className='flex flex-col w-full mt-8'>
                {info.answers.map((answer, index) => (
                    <button disabled={info.userSelectedAnswer != null} onClick={() => handleAnswer(index)} key={index} className={`${bgColor(index)} ${(info.userSelectedAnswer != null && info.userSelectedAnswer !== index) && 'bg-opacity-50'} py-2 px-4 rounded-md my-2 w-full text-black text-xl duration-300`}>{answer}</button>
                ))}
            </div>
        </div >
    );
};

export default Question;
