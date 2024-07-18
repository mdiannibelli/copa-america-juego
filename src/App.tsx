import Game from './components/Game';
import Start from './components/Start';
import { useQuestionStore } from './store/useStore';


function App() {
  const questions = useQuestionStore(state => state.questions);
  console.log(questions);

  return (
    <main className="min-h-screen relative flex flex-col items-center">
      <span className='text-xl font-semibold mt-24'>¿Qué tanto sabes de...?</span>
      <h1 className="text-8xl font-semibold mt-2">Copa América 2024</h1>
      {questions.length === 0 && (
        <>
          <div className='w-full flex justify-center items-center relative top-[24rem]'>
            <Start />
          </div>
          <div className='absolute w-full h-full bg-copa-america -z-20 opacity-25' />
        </>
      )}
      {questions.length > 0 && (
        <>
          <Game />
          <div className='absolute w-full h-full bg-copa-america2 -z-10 opacity-30' />
        </>
      )}



    </main>
  );
}

export default App;
