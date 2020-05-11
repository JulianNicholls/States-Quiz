import React from 'react';

import { PLAYING, useGameState } from '../context';

const SelectGame = (): JSX.Element => {
  const { setPhase, setAnswerType, sortBy } = useGameState();

  const setNames = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswerType(e.currentTarget.value as AnswerType);
  };

  const setOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortBy(e.currentTarget.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Select game</h2>
      <form
        id="select-game"
        onSubmit={(e) => {
          e.preventDefault();
          setPhase(PLAYING);
        }}
      >
        <select onChange={setNames}>
          <option value="states">State Names</option>
          <option value="capitals">State Capitals</option>
        </select>

        <select onChange={setOrder}>
          <option value="alpha">Alphabetical by State</option>
          <option value="capital">Alphabetical by Capital</option>
          <option value="seq">West to East</option>
          <option value="shuffle">Random Order</option>
        </select>

        <button className="btn-large">Go</button>
      </form>
    </div>
  );
};

export default SelectGame;
