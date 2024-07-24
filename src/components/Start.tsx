import { MAX_QUESTIONS } from '../constants';
import { useQuestionStore } from '../store/useStore';

const Start = () => {
    const fetchQuestions = useQuestionStore(state => state.fetchQuestions);

    const handleClick = () => {
        fetchQuestions(MAX_QUESTIONS);
    };
    return (
        <div className='mt-4'>
            <button onClick={handleClick} className='font-medium text-xl md:text-4xl border-[1px] border-blue-700 rounded-md py-4 px-8 hover:bg-blue-700 duration-300'>Click para empezar</button>
        </div>
    );
};

export default Start;
