import { useQuestionStore } from '../store/useStore';
import Question from './Question';

const Game = () => {
    const questions = useQuestionStore(state => state.questions);
    const currentQuestion = useQuestionStore(state => state.currentQuestion);

    const questionInfo = questions[currentQuestion];
    return (
        <div className='mt-24'>
            <Question info={questionInfo} />
        </div>
    );
};

export default Game;
