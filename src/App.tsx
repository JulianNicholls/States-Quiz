import React, { useState } from 'react';

import ClickableImage from './components/ClickableImage';

const App = () => {
  const [positions, setPositions] = useState<Array<Point2D>>([]);

  const savePosition = (pos: Point2D) => {
    setPositions([...positions, { x: Math.round(pos.x), y: Math.round(pos.y) }]);
    console.log({ pos });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What state am I in?</h1>
      </header>

      <ClickableImage
        src="images/exported-877.png"
        alt="USA States Map"
        savePosition={savePosition}
      />

      {positions.map(({ x, y }) => (
        <span>
          x: {x}, y: {y},{' '}
        </span>
      ))}
    </div>
  );
};

export default App;
