import { useEffect, useState } from 'react';

// Give the first viewport a paint before mounting the longer content below it.
// Two animation frames yield to the browser; no content or animation is removed.
export function useAfterFirstPaint() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);
  return ready;
}
