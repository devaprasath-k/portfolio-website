import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Counts up from 0 to `value` once it scrolls into view — runs once
// (useInView's `once: true`) so it doesn't re-trigger every time you
// scroll past the About section again.
export default function Counter({ value, suffix = '', duration = 1200, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = progress * value;
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}