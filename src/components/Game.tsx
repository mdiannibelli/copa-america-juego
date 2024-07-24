import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useQuestionStore } from '../store/useStore';
import Question from './Question';

const Game = () => {
    const questions = useQuestionStore(state => state.questions);
    const currentQuestion = useQuestionStore(state => state.currentQuestion);
    const goNextQuestion = useQuestionStore(state => state.goNextQuestion);
    const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion);
    const score = useQuestionStore(state => state.score);

    const questionInfo = questions[currentQuestion];
    return (
        <div className='mt-12'>
            <div className='flex justify-center items-center mb-2'>
                <h3 className='text-xl'>Score: <strong>{score}</strong></h3>
            </div>
            <Question info={questionInfo} />
            <div className='flex justify-center items-center my-4 gap-x-6'>
                <button className={`${currentQuestion === 0 ? 'bg-opacity-5' : 'bg-opacity-30'} bg-black bg-opacity-30 rounded py-2 px-4`} onClick={goPreviousQuestion} disabled={currentQuestion === 0}><IoArrowBack size={30} className=' text-white' /></button>
                {currentQuestion + 1} / {questions.length}
                <button className={`${currentQuestion > questions.length ? 'bg-opacity-5' : 'bg-opacity-30'} bg-black bg-opacity-30 rounded py-2 px-4`} onClick={goNextQuestion} disabled={currentQuestion > questions.length}><IoArrowForward size={30} /></button>
            </div>
        </div>
    );
};

export default Game;
