import React, { useState, useEffect } from 'react';

interface PTProps {
  positions: Array<MapPosition>;
}

const PositionsTable = ({ positions }: PTProps) => {
  const [sortedPositions, setSorted] = useState([]);

  const sortBySeq = () => {
    console.log('sortBySeq');
    const newSorted = [...sortedPositions].sort(
      (a: MapPosition, b: MapPosition) => a.seq - b.seq
    );

    setSorted(newSorted);
  };

  const sortByName = () => {
    const newSorted = [...sortedPositions].sort((a: MapPosition, b: MapPosition) =>
      a.state.localeCompare(b.state)
    );

    setSorted(newSorted);
  };

  const sortByCapital = () => {
    const newSorted = [...sortedPositions].sort((a: MapPosition, b: MapPosition) =>
      a.capital.localeCompare(b.capital)
    );

    setSorted(newSorted);
  };

  useEffect(() => {
    setSorted(positions);
  }, [positions]);

  return (
    <table className="pos-table">
      <thead>
        <tr>
          <th className="clickable-header" onClick={sortBySeq}>
            Seq
          </th>
          <th className="clickable-header" onClick={sortByName}>
            State
          </th>
          <th className="clickable-header" onClick={sortByCapital}>
            Capital
          </th>
          <th>X</th>
          <th>Y</th>
        </tr>
      </thead>
      <tbody>
        {sortedPositions.map(({ seq, x, y, state, capital }) => (
          <tr key={`${x}${y}`}>
            <td className="numeric">{seq || ''}</td>
            <td className="name">{state || ''}</td>
            <td className="name">{capital || ''}</td>
            <td className="numeric">{x}</td>
            <td className="numeric">{y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PositionsTable;
