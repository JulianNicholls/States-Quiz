interface SQProps {
  answers: Array<string>;
  index: number;
  answerClick: (correct: boolean, answer: string) => void;
}

const StatesQuestions = ({ answers, index, answerClick }: SQProps) => {
  if (answers.length === 0) return null;

  const randomNotIn = (size: number, min: number, used: Array<number>): number => {
    let num = -1;

    while (num < 0 || used.includes(num)) {
      if (size - min < 4) num = Math.floor(Math.random() * size);
      else num = Math.floor(Math.random() * (size - min)) + min;
    }

    return num;
  };

  const used: Array<number> = [index];

  for (let i = 0; i < 3; ++i) {
    const num = randomNotIn(answers.length, index, used);

    if (Math.random() < 0.5) used.push(num);
    else used.unshift(num);
  }

  return (
    <div className="states-questions">
      {used.map((num) => (
        <div
          key={num}
          className="option"
          onClick={() => answerClick(num === index, answers[num])}
        >
          {answers[num]}
        </div>
      ))}
    </div>
  );
};

export default StatesQuestions;
