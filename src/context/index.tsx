import React, { useState, useEffect, useContext } from 'react';

export const SELECTION = 1;
export const PLAYING = 2;
export const XOMPLETE = 3;

interface GameState {
  phase: number;
  setPhase: (phase: number) => void;
  states: Array<State>;
  sortBy: (item: string) => void;
}

interface GPProps {
  children: JSX.Element;
}

const GameContext = React.createContext<GameState>({} as GameState);

export const GameProvider = ({ children }: GPProps): JSX.Element => {
  const [states, setStates] = useState<Array<State>>([]);
  const [phase, setPhase] = useState<number>(SELECTION);

  const sortBy = (name: string): void => {
    const sorted = [...states];

    if (name === 'seq') sorted.sort((a: State, b: State) => a.seq - b.seq);
    if (name === 'alpha')
      sorted.sort((a: State, b: State) => a.name.localeCompare(b.name));
    if (name === 'capital')
      sorted.sort((a: State, b: State) => a.capital.localeCompare(b.capital));

    if (name === 'shuffle') shuffle(sorted);

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
      } catch (e) {
        console.error({ e });
      }
    };

    loadStates();
  });

  const state: GameState = {
    phase,
    setPhase,
    sortBy,
    states,
  };

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export const useGameState = (): GameState => {
  const context = useContext(GameContext);

  if (context === undefined)
    throw new Error('useGameState() but be used inside a GameProvider block.');

  return context;
};
