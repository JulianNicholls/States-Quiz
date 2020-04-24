import React, { useState, useEffect, useRef } from 'react';

interface CIProps {
  src: string;
  alt?: string;
  positions: Array<MapPosition>;
  savePosition: (pos: MapPosition) => void;
}

const emptyPosition: MapPosition = { x: 0, y: 0, state: '', capital: '', seq: -1 };

const ClickableImage = ({ src, alt, savePosition, positions }: CIProps) => {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [rect, setRect] = useState<ClientRect>();
  const [pos, setPos] = useState<MapPosition>(emptyPosition);
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    if (imgRef && imgRef.current) setRect(imgRef.current.getBoundingClientRect());
  }, [imgRef]);

  const onClick = (e: React.MouseEvent<Element>): void => {
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setPos({ ...pos, x, y });

    positions.forEach((p, index) => {
      if (Math.abs(p.x - x) < 6 && Math.abs(p.y - y) < 6) {
        console.log(index);
        setSelected(index);
        if (p.seq)
          setPos({ x, y, state: p.state, capital: p.capital, seq: p.seq });
        else setPos({ ...pos, x, y, state: p.state, capital: p.capital });
      }
    });

    inputRef.current.focus();
  };

  return (
    <div className="positioned" ref={imgRef}>
      <img src={src} alt={alt || 'Clickable Image'} onClick={onClick} />

      {positions.map(({ x, y, capital, seq }, index) => {
        let klass = 'spot';

        if (capital && seq) klass += ' capital';
        if (index === selected) klass += ' selected';

        return (
          <div
            key={`${x}${y}`}
            className={klass}
            style={{ top: y + 'px', left: x + 'px' }}
          ></div>
        );
      })}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (pos.x > 0 && pos.y > 0 && pos.state !== '') {
            savePosition(pos);
            setPos({ ...emptyPosition, seq: pos.seq + 1 });
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
          value={pos.state}
          onChange={(e) => setPos({ ...pos, state: e.target.value })}
        />
        <br />
        <label htmlFor="capital">State Capital:</label>
        <input
          type="text"
          name="capital"
          id="capital"
          value={pos.capital}
          onChange={(e) => setPos({ ...pos, capital: e.target.value })}
        />
        <br />
        <label htmlFor="seq">Sequence No.</label>
        <input
          type="text"
          name="seq"
          id="seq"
          value={pos.seq}
          onChange={(e) => setPos({ ...pos, seq: Number(e.target.value) })}
        />
        <br />
        <button style={{ margin: '0.5em 0 0 8em' }}>Add Point</button>
      </form>
    </div>
  );
};

export default ClickableImage;
