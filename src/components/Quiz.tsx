import React, { useState, useEffect } from 'react';

import FillableImage from './FillableImage';
import StatesQuestions from './StatesQuestions';

interface QProps {
  mapsrc: string;
  states: Array<State>;
}

const QUESTION_COLOUR = 0x4d4dff;
const CORRECT_COLOUR = 0x00d600;
const WRONG_COLOUR = 0xff4040;

const Quiz = ({ mapsrc, states }: QProps) => {
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [fills, setFills] = useState<Array<Fill>>([]);
  const [sortedStates, setSortedStates] = useState<Array<State>>([]);

  useEffect(() => {
    const sortedBy = (name: string): Array<State> => {
      const sorted = [...states];

      if (name === 'seq') sorted.sort((a: State, b: State) => a.seq - b.seq);

      return sorted;
    };

    if (states.length !== 0) {
      const sorted = sortedBy('seq');

      const initial = [
        { x: sorted[0].x, y: sorted[0].y, colour: QUESTION_COLOUR },
      ];

      setSortedStates(sorted);
      setFills(initial);
    }
  }, [states]);

  const answerClick = (correct: boolean) => {
    const newFills = [
      ...fills,
      {
        x: sortedStates[index + 1].x,
        y: sortedStates[index + 1].y,
        colour: QUESTION_COLOUR,
      },
    ];

    newFills[index].colour = correct ? CORRECT_COLOUR : WRONG_COLOUR;

    if (correct) setScore(score + 1);

    setFills(newFills);
    setIndex(index + 1);
  };

  return (
    <div className="quiz-holder">
      <FillableImage src={mapsrc} fills={fills} />
      <StatesQuestions
        states={sortedStates}
        index={index}
        answerClick={answerClick}
      />
    </div>
  );
};

export default Quiz;
