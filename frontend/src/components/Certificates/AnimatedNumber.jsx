import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedNumber({ value, duration = 1200, format = v => v }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef();
  const observer = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animate();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.current.observe(node);
    return () => observer.current && observer.current.disconnect();
    // eslint-disable-next-line
  }, [value, duration, hasAnimated]);

  function animate() {
    let start = 0;
    const end = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(end)) return setDisplay(value);
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(end);
    }
    requestAnimationFrame(tick);
  }

  return (
    <span ref={ref}>{format(display)}</span>
  );
}
