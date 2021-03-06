import { useRef, useEffect } from 'react';

interface CIProps {
  src: string;
  fills: Array<Fill>;
}

const FillableImage = ({ src, fills }: CIProps) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // **********************************************************************
    // Beware that this algorithm assumes that there is an ultimate edge
    // on all sides.
    // **********************************************************************
    const floodFill = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      clr: number,
      bkgr: number = 0xffffff
    ): void => {
      const { width, height } = ctx.canvas;
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

      const floodFillQueue = (x: number, y: number): void => {
        const lineWidth = width * 4; // Line of RGBA
        const offset = y * lineWidth + x * 4;

        if (colour(offset) !== bkgr) return;

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
      const ctx = canvasRef.current.getContext('2d');

      ctx.fillStyle = '#eeeeff';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      imageRef.current = new Image();

      imageRef.current.onload = () => {
        ctx.drawImage(imageRef.current, 0, 0);
        fills.forEach(({ x, y, colour }) => floodFill(ctx, x, y, colour));
      };

      imageRef.current.src = src;
    }
  }, [canvasRef, src, fills]);

  return <canvas ref={canvasRef} width="860" height="600" />;
};

export default FillableImage;
