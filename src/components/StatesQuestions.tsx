import React from 'react';

interface SQProps {
  states: Array<State>;
  index: number;
  answerClick: (correct: boolean) => void;
}

const StatesQuestions = ({ states, index, answerClick }: SQProps) => {
  if (states.length === 0) return null;

  const randomNotIn = (size: number, min: number, used: Array<number>): number => {
    let num = -1;

    while (num < 0 || used.includes(num)) {
      if (size - min < 4) num = Math.floor(Math.random() * size);
      else num = Math.floor(Math.random() * (size - min)) + min;
    }

    return num;
  };

  const correctClicked = () => answerClick(true);
  const wrongClicked = () => answerClick(false);

  const used: Array<number> = [index];

  for (let i = 0; i < 3; ++i) {
    const num = randomNotIn(states.length, index, used);

    if (Math.random() < 0.5) used.push(num);
    else used.unshift(num);
  }

  return (
    <div className="states-questions">
      {used.map((num) => (
        <div
          key={num}
          className="answer"
          onClick={num === index ? correctClicked : wrongClicked}
        >
          {states[num].name}
        </div>
      ))}
    </div>
  );
};

export default StatesQuestions;
