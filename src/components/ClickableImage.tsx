import React, { useState, useEffect, useRef } from 'react';

interface CIProps {
  src: string;
  alt?: string;
  savePosition: (pos: Point2D) => void;
}

const ClickableImage = ({ src, alt, savePosition }: CIProps) => {
  const imgRef = useRef(null);
  const [rect, setRect] = useState<ClientRect>();
  const [pos, setPos] = useState<Point2D>({ x: 0, y: 0 });
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (imgRef && imgRef.current) setRect(imgRef.current.getBoundingClientRect());
  }, [imgRef]);

  return (
    <div className="positioned">
      <img
        ref={imgRef}
        src={src}
        alt={alt || 'Clickable Image'}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={(e) =>
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
        onClick={() => {
          if (show) savePosition(pos);
        }}
      />
      {show && (
        <div className="xy-position">
          x: <strong>{pos.x}</strong>, y: <strong>{pos.y}</strong>
        </div>
      )}
    </div>
  );
};

export default ClickableImage;
