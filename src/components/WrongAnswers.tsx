import React from 'react';

interface WAProps {
  answers: Array<string>;
}

const WrongAnswers = ({ answers }: WAProps) => {
  return (
    <div className="wrong-answers">
      {answers.map((answer, idx) => (
        <div className="wrong" key={idx}>
          <span>{answer}</span> ❌
        </div>
      ))}
    </div>
  );
};

export default WrongAnswers;
