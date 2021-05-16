import { useState } from 'react';

import FillableImage from './FillableImage';
import StatesQuestions from './StatesQuestions';
import WrongAnswers from './WrongAnswers';
import { useGameState, COMPLETE } from '../context';

interface QProps {
  mapsrc: string;
}

const QUESTION_COLOUR = 0x5d5dff;
const CORRECT_COLOUR = 0x20d620;
const WRONG_COLOUR = 0xff4040;

const Quiz = ({ mapsrc }: QProps) => {
  const { answerType, states, setPhase, score, setScore } = useGameState();

  const [index, setIndex] = useState<number>(0);
  const [fills, setFills] = useState<Array<Fill>>([
    { x: states[0].x, y: states[0].y, colour: QUESTION_COLOUR },
  ]);
  const [badAnswers, setBadAnswers] = useState<Array<Wrong>>([]);

  const answerClick = (correct: boolean, answer: string) => {
    const newFills = [...fills];

    if (correct) {
      setScore(score + 1);
      newFills[index].colour = CORRECT_COLOUR;
    } else {
      const { name, capital } = states[index];

      const bad = [
        ...badAnswers,
        {
          answer,
          correct: answerType === 'capitals' ? `${capital}, ${name}` : name,
        },
      ];

      setBadAnswers(bad);

      newFills[index].colour = WRONG_COLOUR;
    }

    if (index === states.length - 1) return setPhase(COMPLETE);

    setFills([
      ...newFills,
      {
        x: states[index + 1].x,
        y: states[index + 1].y,
        colour: QUESTION_COLOUR,
      },
    ]);
    setIndex(index + 1);
  };

  return (
    <div className="quiz-holder">
      <FillableImage src={mapsrc} fills={fills} />

      <div className="questions-score">
        <StatesQuestions
          answers={states.map(({ name, capital }) =>
            answerType === 'capitals' ? capital : name
          )}
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
