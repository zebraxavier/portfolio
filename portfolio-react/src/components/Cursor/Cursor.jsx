import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Cursor.module.css';

/**
 * Premium custom cursor — desktop only.
 * Auto-disables on touch devices via pointer media query.
 */
export default function Cursor() {
  const [visible, setVisible]   = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Smooth spring follow
  const sx = useSpring(mx, { stiffness: 520, damping: 38, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 520, damping: 38, mass: 0.4 });

  // Outer ring lags behind
  const rx = useSpring(mx, { stiffness: 160, damping: 28, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 160, damping: 28, mass: 0.6 });

  const onMove = useCallback((e) => {
    mx.set(e.clientX);
    my.set(e.clientY);
    if (!visible) setVisible(true);
  }, [mx, my, visible]);

  const onLeave  = useCallback(() => setVisible(false), []);
  const onEnter  = useCallback(() => setVisible(true), []);
  const onDown   = useCallback(() => setClicking(true), []);
  const onUp     = useCallback(() => setClicking(false), []);

  useEffect(() => {
    // Detect touch device — bail out
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    document.addEventListener('mouseenter', onEnter, { passive: true });
    document.addEventListener('mousedown',  onDown,  { passive: true });
    document.addEventListener('mouseup',    onUp,    { passive: true });

    // Track interactive elements for "hover" state
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      setHovering(!!el);
    };
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseover',  onOver);
    };
  }, [onMove, onLeave, onEnter, onDown, onUp]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className={styles.dot}
        style={{ x: sx, y: sy }}
        animate={{
          opacity:  visible ? 1 : 0,
          scale:    clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      />
      {/* Ring */}
      <motion.div
        className={styles.ring}
        style={{ x: rx, y: ry }}
        animate={{
          opacity: visible ? 1 : 0,
          scale:   clicking ? 0.75 : hovering ? 1.6 : 1,
        }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </>
  );
}
