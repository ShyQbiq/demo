import { useEffect, useRef, useState } from "react";

interface OneShotGifProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * Displays a GIF that plays exactly once by loading it fresh
 * and swapping to a frozen canvas frame when complete.
 */
export function OneShotGif({ src, alt = "", className = "" }: OneShotGifProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    // Estimate GIF duration — default 3s, can be refined
    const timer = setTimeout(() => {
      const img = imgRef.current;
      const canvas = canvasRef.current;
      if (img && canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setFrozen(true);
        }
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [src]);

  return (
    <>
      {!frozen && (
        <img
          ref={imgRef}
          src={`${src}?t=${Date.now()}`}
          alt={alt}
          className={className}
          crossOrigin="anonymous"
        />
      )}
      <canvas
        ref={canvasRef}
        className={frozen ? className : "hidden"}
      />
    </>
  );
}
