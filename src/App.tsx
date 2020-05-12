import React from 'react';

import SelectGame from './components/SelectGame';
import Quiz from './components/Quiz';

import './App.css';
import GameComplete from './components/GameComplete';
import { useGameState, PLAYING, COMPLETE } from './context';

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
