import React from 'react';

import SelectGame from './components/SelectGame';
import Quiz from './components/Quiz';

import './App.css';
import { useGameState, SELECTION, PLAYING, COMPLETE } from './context';

const GameComplete = (): JSX.Element => {
  const { score, setPhase } = useGameState();

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Score: {score}</h2>;
      <button className="btn-large" onClick={() => setPhase(SELECTION)}></button>
    </div>
  );
};

function App(): JSX.Element {
  const { phase } = useGameState();

  return (
    <div className={phase}>
      <header>
        <h1>States Quiz</h1>
      </header>
      <div className="container">
        {phase === COMPLETE ? (
          <GameComplete />
        ) : phase === PLAYING ? (
          <Quiz mapsrc="images/states.png" />
        ) : (
          <SelectGame />
        )}
      </div>
    </div>
  );
}

export default App;
