import React, { useState, useRef, useEffect } from 'react';

const BKGR = 0xffffff;
const FILL = 0xff0000;

interface CIProps {
  src: string;
}

const ClickableImage = ({ src }: CIProps) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [rect, setRect] = useState<ClientRect>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setWidth(canvasRef.current.width);
      setHeight(canvasRef.current.height);
      setRect(canvasRef.current.getBoundingClientRect());

      const cctx = canvasRef.current.getContext('2d');

      setCtx(cctx);

      imageRef.current = new Image();

      imageRef.current.onload = () => cctx.drawImage(imageRef.current, 0, 0);

      imageRef.current.src = src;
    }
  }, [canvasRef, src]);

  const fillState = (e: React.MouseEvent<Element>) => {
    const x: number = Math.round(e.clientX - rect.left);
    const y: number = Math.round(e.clientY - rect.top);

    fill(x, y);
  };

  // ***************
  // Beware that this algorithm assumes that there is an ultimate edge on all sides.
  // ***************
  const fill = (
    x: number,
    y: number,
    clr: number = FILL,
    bkgr: number = BKGR
  ): void => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    const colour = (offset: number): number =>
      (pixels[offset] << 16) + (pixels[offset + 1] << 8) + pixels[offset + 2];

    const setColour = (offset: number, clr: number): void => {
      pixels[offset] = clr >> 16;
      pixels[offset + 1] = (clr >> 8) & 0xff;
      pixels[offset + 2] = clr & 0xff;
      pixels[offset + 3] = 0xff;
    };

    const floodFillQueue = (x: number, y: number) => {
      const lineWidth = width * 4; // Line of RGBA
      const offset = y * lineWidth + x * 4;

      if (colour(offset) !== BKGR) return;

      setColour(offset, clr);

      const q = [offset];

      while (q.length !== 0) {
        const n = q.shift();
        let w = n;
        let e = n;

        while (colour(w - 4) === bkgr) w -= 4;

        while (colour(e + 4) === bkgr) e += 4;

        for (let o = w; o <= e; o += 4) {
          setColour(o, clr);

          if (o - lineWidth > 0 && colour(o - lineWidth) === bkgr) {
            q.push(o - lineWidth);
          }

          if (
            o + lineWidth < height * lineWidth &&
            colour(o + lineWidth) === bkgr
          ) {
            q.push(o + lineWidth);
          }
        }
      }
    };

    floodFillQueue(x, y);

    ctx.putImageData(imageData, 0, 0);
  };

  return <canvas ref={canvasRef} width="900" height="600" onClick={fillState} />;
};

export default ClickableImage;
