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
          <th>Name</th>
          <th>X</th>
          <th>Y</th>
        </tr>
      </thead>
      <tbody>
        {positions.map(({ x, y, name }, idx) => (
          <tr key={`${x}${y}`}>
            <td className="numeric">{idx + 1}</td>
            <td className="name">{name || ''}</td>
            <td className="numeric">{x}</td>
            <td className="numeric">{y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PositionsTable;
