import React from 'react';

interface PTProps {
  positions: Array<MapPosition>;
}

const PositionsTable = ({ positions }: PTProps) => {
  return (
    <table className="pos-table">
      <thead>
        <tr>
          <th>#</th>
          <th>State</th>
          <th>Capital</th>
          <th>X</th>
          <th>Y</th>
        </tr>
      </thead>
      <tbody>
        {positions.map(({ x, y, state, capital }, idx) => (
          <tr key={`${x}${y}`}>
            <td className="numeric">{idx + 1}</td>
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
