import React, { useState, useEffect } from 'react';

import ClickableImage from './components/ClickableImage';
import PositionsTable from './components/PositionsTable';

const App = () => {
  const [positions, setPositions] = useState<Array<MapPosition>>([]);

  useEffect(() => {
    const lsPos = localStorage.sqPos;

    if (lsPos) {
      const loaded = JSON.parse(lsPos);

      setPositions(loaded);
    }
  }, []);

  const savePosition = (pos: MapPosition) => {
    const found = positions.findIndex(
      (p) => p.state === pos.state || (p.x === pos.x && p.y === pos.y)
    );
    let updated;

    if (found !== -1) {
      updated = [...positions];
      updated[found] = pos;
    } else updated = [...positions, pos];

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
