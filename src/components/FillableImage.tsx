import React, { useState, useRef, useEffect } from 'react';

const BKGR = 0xffffff;
const FILL = 0xff0000;

interface CIProps {
  src: string;
  fills: Array<Fill>;
}

const FillableImage = ({ src, fills }: CIProps) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  // const [rect, setRect] = useState<ClientRect>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>(null);

  useEffect(() => {
    // ***************
    // Beware that this algorithm assumes that there is an ultimate edge on all sides.
    // ***************
    const floodFill = (
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

    if (canvasRef && canvasRef.current) {
      setWidth(canvasRef.current.width);
      setHeight(canvasRef.current.height);
      // setRect(canvasRef.current.getBoundingClientRect());

      const cctx = canvasRef.current.getContext('2d');

      setCtx(cctx);

      cctx.fillStyle = '#eeeeff';
      cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height);

      imageRef.current = new Image();

      imageRef.current.onload = () => {
        cctx.drawImage(imageRef.current, 0, 0);
        fills.forEach(({ x, y, colour }) => floodFill(x, y, colour));
      };

      imageRef.current.src = src;
    }
  }, [canvasRef, ctx, height, width, src, fills]);

  return <canvas ref={canvasRef} width="860" height="600" />;
};

export default FillableImage;
