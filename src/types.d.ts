type Point2D = {
  x: number;
  y: number;
};

interface State extends Point2D {
  name: string;
  capital: string;
  seq?: number;
}

interface Fill extends Point2D {
  colour: number;
}

interface Wrong {
  answer: string;
  correct: string;
}

type AnswerType = 'states' | 'capitals';
