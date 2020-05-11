import React from 'react';

import Quiz from './components/Quiz';

import './App.css';
import { useGameState, SELECTION, PLAYING, COMPLETE } from './context';

const SelectGame = (): JSX.Element => {
  const { setPhase } = useGameState();

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Select game</h2>
      <button onClick={() => setPhase(PLAYING)}>Go</button>
    </div>
  );
};

const GameComplete = (): JSX.Element => {
  const { score } = useGameState();

  return <h2 style={{ textAlign: 'center' }}>Score: {score}</h2>;
};

function App(): JSX.Element {
  const { phase } = useGameState();

  return (
    <header>
      <h1>States Quiz</h1>
      <div className="container">
        {phase === COMPLETE ? (
          <GameComplete />
        ) : phase === PLAYING ? (
          <Quiz mapsrc="images/states.png" />
        ) : (
          <SelectGame />
        )}
      </div>
    </header>
  );
}

export default App;
