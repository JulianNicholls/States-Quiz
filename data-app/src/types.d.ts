interface Point2D {
  x: number;
  y: number;
}

interface MapPosition extends Point2D {
  state: string;
  capital: string;
  seq?: string;
}
