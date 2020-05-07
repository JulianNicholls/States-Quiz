import React, { useState, useEffect } from 'react';

import FillableImage from './FillableImage';
import StatesQuestions from './StatesQuestions';
import WrongAnswers from './WrongAnswers';
import { useGameState } from '../context';

interface QProps {
  mapsrc: string;
}

const QUESTION_COLOUR = 0x5d5dff;
const CORRECT_COLOUR = 0x20d620;
const WRONG_COLOUR = 0xff4040;

const Quiz = ({ mapsrc }: QProps) => {
  const { states } = useGameState();

  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [fills, setFills] = useState<Array<Fill>>([]);
  const [badAnswers, setBadAnswers] = useState<Array<Wrong>>([]);

  useEffect(() => {
    if (states.length !== 0) {
      const initial = [
        { x: states[0].x, y: states[0].y, colour: QUESTION_COLOUR },
      ];

      setFills(initial);
    }
  }, [states]);

  const answerClick = (correct: boolean, answer: string) => {
    const newFills = [
      ...fills,
      {
        x: states[index + 1].x,
        y: states[index + 1].y,
        colour: QUESTION_COLOUR,
      },
    ];

    if (correct) {
      setScore(score + 1);
      newFills[index].colour = CORRECT_COLOUR;
    } else {
      const bad = [
        ...badAnswers,
        { answer, correct: `${states[index].capital}, ${states[index].name}` },
      ];

      setBadAnswers(bad);

      newFills[index].colour = WRONG_COLOUR;
    }

    setFills(newFills);
    setIndex(index + 1);
  };

  return (
    <div className="quiz-holder">
      <FillableImage src={mapsrc} fills={fills} />
      <div className="questions-score">
        <StatesQuestions
          answers={states.map(({ capital }) => capital)}
          index={index}
          answerClick={answerClick}
        />
        <div className="score-holder">
          <div className="score">Score: {score}</div>
          <WrongAnswers answers={badAnswers} />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
