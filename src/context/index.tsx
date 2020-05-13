import React, { useState, useEffect, useContext } from 'react';

export const SELECTION = 'selection';
export const PLAYING = 'playing';
export const COMPLETE = 'complete';

type GameState = {
  phase: string;
  answerType: AnswerType;
  states: Array<State>;
  score: number;
  setPhase: (phase: string) => void;
  setAnswerType: (a: AnswerType) => void;
  sortBy: (item: string) => void;
  setScore: (score: number) => void;
};

interface GPProps {
  children: JSX.Element;
}

const GameContext = React.createContext<GameState>({} as GameState);

export const GameStateProvider = ({ children }: GPProps): JSX.Element => {
  const [states, setStates] = useState<Array<State>>([]);
  const [phase, setPhase] = useState<string>(SELECTION);
  const [score, setScore] = useState<number>(0);
  const [answerType, setAnswerType] = useState<AnswerType>('states');

  const sortBy = (name: string): void => {
    const sorted = [...states];

    switch (name) {
      case 'seq':
        sorted.sort((a: State, b: State) => a.seq - b.seq);
        break;

      case 'alpha':
        sorted.sort((a: State, b: State) => a.name.localeCompare(b.name));
        break;

      case 'capital':
        sorted.sort((a: State, b: State) => a.capital.localeCompare(b.capital));
        break;

      case 'shuffle':
        shuffle(sorted);
        break;
    }

    setStates(sorted);
  };

  const shuffle = (sorted: Array<State>) => {
    const halfSize = sorted.length >> 1;

    for (let i = 0; i < halfSize; ++i) {
      const randIdx = Math.floor(Math.random() * halfSize) + halfSize;

      const temp = sorted[randIdx];
      sorted[randIdx] = sorted[i];
      sorted[i] = temp;
    }
  };

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetch('data/states.json');
        const lstates = await response.json();

        setStates(lstates);
      } catch (err) {
        console.error({ err });
      }
    };

    loadStates();
  }, []);

  const state: GameState = {
    phase,
    answerType,
    states,
    score,
    setPhase,
    setAnswerType,
    sortBy,
    setScore,
  };

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export const useGameState = (): GameState => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error(
      'useGameState() but be used inside a GameStateProvider block.'
    );
  }

  return context;
};
