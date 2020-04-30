import React, { useState, useRef, useEffect } from 'react';

interface CIProps {
  src: string;
}

const ClickableImage = ({ src }: CIProps) => {
  const canvasRef = useRef(null);
  const [image, _setImage] = useState(new Image());
  const [_ctx, setCtx] = useState<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const cctx = canvasRef.current.getContext('2d');

      setCtx(cctx);

      image.onload = () => cctx.drawImage(image, 0, 0);

      image.src = src;
    }
  }, [image, canvasRef, src]);

  return <canvas ref={canvasRef} width="900" height="600"></canvas>;
};

export default ClickableImage;
