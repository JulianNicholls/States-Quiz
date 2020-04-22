import React, { useState, useEffect, useRef } from 'react';

interface CIProps {
  src: string;
  alt?: string;
  positions: Array<MapPosition>;
  savePosition: (pos: MapPosition) => void;
}

interface XYPos {
  x: number;
  y: number;
}

const emptyPosition: XYPos = { x: 0, y: 0 };

const ClickableImage = ({ src, alt, savePosition, positions }: CIProps) => {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [rect, setRect] = useState<ClientRect>();
  const [mousePos, setMousePos] = useState<XYPos>(emptyPosition);
  const [pos, setPos] = useState<XYPos>(emptyPosition);
  const [stateName, setStateName] = useState<string>('');
  const [capital, setCapital] = useState<string>('');
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    if (imgRef && imgRef.current) setRect(imgRef.current.getBoundingClientRect());
  }, [imgRef]);

  const onMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setMousePos({ x, y });
  };

  const onClick = () => {
    const { x, y } = mousePos;

    setPos({ x, y });

    positions.forEach((p, index) => {
      if (Math.abs(p.x - x) < 10 && Math.abs(p.y - y) < 10) {
        console.log(index);
        setSelected(index);
        setPos({ x, y });
        setStateName(p.state);
        setCapital(p.capital || '');
      }
    });

    inputRef.current.focus();
  };

  return (
    <div className="positioned" ref={imgRef}>
      <img
        src={src}
        alt={alt || 'Clickable Image'}
        onMouseMove={onMove}
        onClick={onClick}
      />

      {positions.map(({ x, y }, index) => (
        <div
          key={`${x}${y}`}
          className={index === selected ? 'spot selected' : 'spot'}
          style={{ top: y + 'px', left: x + 'px' }}
        ></div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (pos.x > 0 && pos.y > 0 && stateName !== '') {
            savePosition({ x: pos.x, y: pos.y, state: stateName, capital });
            setPos(emptyPosition);
            setStateName('');
            setCapital('');
          }
        }}
      >
        <span>
          x: {pos.x}, y: {pos.y}
        </span>
        <br />
        <label htmlFor="state">State Name:</label>
        <input
          ref={inputRef}
          type="text"
          name="state"
          id="state"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
        />
        <br />
        <label htmlFor="capital">State Capital:</label>
        <input
          type="text"
          name="capital"
          id="capital"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
        <br />
        <button style={{ margin: '0.5em 0 0 8em' }}>Add Point</button>
      </form>
    </div>
  );
};

export default ClickableImage;
