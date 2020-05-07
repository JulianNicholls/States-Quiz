import React from 'react';

interface WAProps {
  answers: Array<Wrong>;
}

const WrongAnswers = ({ answers }: WAProps) => {
  return (
    <div className="wrong-answers">
      {answers.map(({ answer, correct }, idx) => (
        <div className="wrong" key={idx}>
          <span className="answer">{answer}</span> ❌<br />
          <span className="correct">{correct}</span>
        </div>
      ))}
    </div>
  );
};

export default WrongAnswers;
