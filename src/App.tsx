import React, { useState, useEffect } from 'react';

import ClickableImage from './components/ClickableImage';
import PositionsTable from './components/PositionsTable';

const App = () => {
  const [positions, setPositions] = useState<Array<MapPosition>>([]);

  useEffect(() => {
    const lsPos = localStorage.sqPos;

    if (lsPos) setPositions(JSON.parse(lsPos));
  }, []);

  const savePosition = (pos: MapPosition) => {
    const updated = [...positions, pos];

    setPositions(updated);
    localStorage.setItem('sqPos', JSON.stringify(updated));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What state am I in?</h1>
      </header>

      <main>
        <div>
          <ClickableImage
            src="images/exported-877.png"
            alt="USA States Map"
            positions={positions}
            savePosition={savePosition}
          />
        </div>

        <PositionsTable positions={positions} />
      </main>
    </div>
  );
};

export default App;
