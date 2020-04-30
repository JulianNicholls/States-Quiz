interface Point2D {
  x: number;
  y: number;
}

interface State extends Point2D {
  name: string;
  capital: string;
  seq?: number;
}
