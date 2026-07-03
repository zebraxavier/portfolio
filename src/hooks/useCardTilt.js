import { useRef, useCallback } from 'react';

/**
 * useCardTilt — subtle 3D perspective tilt on hover.
 * Returns event handlers and a ref to attach to the card element.
 * Respects prefers-reduced-motion.
 */
export function useCardTilt(options = {}) {
  const {
    maxTilt = 6,      // degrees
    scale = 1.02,
    speed = 300,      // ms transition
  } = options;

  const ref = useRef(null);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMouseMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return;
      const card = ref.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      card.style.transition = `transform 0.08s ease`;
    },
    [maxTilt, scale, reducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    ref.current.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  }, [speed]);

  return { ref, onMouseMove, onMouseLeave };
}
