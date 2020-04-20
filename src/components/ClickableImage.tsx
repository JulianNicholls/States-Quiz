import React, { useState, useEffect, useRef } from 'react';

interface CIProps {
  src: string;
  alt?: string;
  positions: Array<MapPosition>;
  savePosition: (pos: MapPosition) => void;
}

const ClickableImage = ({ src, alt, savePosition, positions }: CIProps) => {
  const imgRef = useRef(null);
  const [rect, setRect] = useState<ClientRect>();
  const [mousePos, setMousePos] = useState<MapPosition>({ x: 0, y: 0, name: '' });
  const [pos, setPos] = useState<MapPosition>({ x: 0, y: 0, name: '' });
  const inputRef = useRef(null);

  useEffect(() => {
    if (imgRef && imgRef.current) setRect(imgRef.current.getBoundingClientRect());
  }, [imgRef]);

  return (
    <div className="positioned" ref={imgRef}>
      <img
        src={src}
        alt={alt || 'Clickable Image'}
        onMouseMove={(e) =>
          setMousePos({
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top),
          })
        }
        onClick={() => {
          setPos({ ...pos, x: mousePos.x, y: mousePos.y });
          inputRef.current.focus();
        }}
      />

      {positions.map(({ x, y }) => (
        <div
          key={`${x}${y}`}
          className="spot"
          style={{ top: y + 'px', left: x + 'px' }}
        ></div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (pos.x > 0 && pos.y > 0 && pos.name !== '') {
            savePosition(pos);
            setPos({ x: 0, y: 0, name: '' });
          }
        }}
      >
        <span>
          x: {pos.x}, y: {pos.y}
        </span>
        <br />
        <label htmlFor="state">State</label>
        <input
          ref={inputRef}
          type="text"
          name="state"
          id="state"
          value={pos.name}
          onChange={(e) => setPos({ ...pos, name: e.target.value })}
        />
        <button>Add Point</button>
      </form>
    </div>
  );
};

export default ClickableImage;
