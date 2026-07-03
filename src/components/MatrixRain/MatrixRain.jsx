import { useEffect, useRef, memo } from 'react';
import styles from './MatrixRain.module.css';

/**
 * MatrixRain — ultra-lightweight, GPU-friendly canvas background.
 *
 * Design constraints:
 *  - Emerald only (#10B981) at 8–18% opacity, never > 20%
 *  - Columns spaced 40–70px apart, widely spaced, breathing room
 *  - Characters: mixed 0/1, A-Z, Katakana, <>{}/
 *  - Speed: 40–70px/sec per column
 *  - Organic: random pauses, fade-out, restart
 *  - Pauses when tab is hidden
 *  - Fully disabled for prefers-reduced-motion
 */

const CHARS =
  '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}/' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function createColumn(canvasW, canvasH, forceX = null) {
  const x = forceX !== null ? forceX : rand(0, canvasW);
  const fontSize = rand(10, 14);
  const speed = rand(40, 70); // px / sec
  const charCount = randInt(4, 14); // column length in chars
  const spacing = fontSize * rand(1.1, 1.4);

  return {
    x,
    y: rand(-canvasH * 0.6, 0), // start above viewport randomly
    fontSize,
    speed,
    charCount,
    spacing,
    chars: Array.from({ length: charCount }, () =>
      CHARS[randInt(0, CHARS.length - 1)]
    ),
    opacity: rand(0.08, 0.18),
    state: 'falling',       // 'falling' | 'pausing' | 'fading' | 'dead'
    pauseTimer: 0,
    pauseDuration: rand(600, 2800), // ms
    fadeProgress: 0,
    charSwapTimer: 0,
    charSwapInterval: rand(80, 320), // ms between random char changes
  };
}

function buildColumns(canvasW, canvasH) {
  // Spacing: 40–70 px between columns
  const gap = rand(40, 70);
  const count = Math.floor(canvasW / gap);
  const cols = [];
  for (let i = 0; i < count; i++) {
    // Spread columns but add jitter so they don't form a rigid grid
    const baseX = (i + 0.5) * (canvasW / count);
    const x = baseX + rand(-12, 12);
    cols.push(createColumn(canvasW, canvasH, Math.max(0, Math.min(canvasW, x))));
  }
  return cols;
}

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let cols = [];
    let rafId = null;
    let lastTime = performance.now();
    let paused = false;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      cols = buildColumns(W, H);
    }

    function onVisibility() {
      paused = document.hidden;
      if (!paused && rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    }

    resize();

    // Debounced resize
    let resizeTimer = null;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 160);
    }

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility, { passive: true });

    function tick(now) {
      if (paused) { rafId = null; return; }

      const dt = Math.min(now - lastTime, 50); // cap dt at 50ms
      lastTime = now;

      // Clear frame with full transparency
      ctx.clearRect(0, 0, W, H);

      const dtSec = dt / 1000;

      for (let ci = 0; ci < cols.length; ci++) {
        const col = cols[ci];

        // Update char swap timer
        col.charSwapTimer += dt;
        if (col.charSwapTimer >= col.charSwapInterval) {
          col.charSwapTimer = 0;
          // Randomly swap one character
          const idx = randInt(0, col.charCount - 1);
          col.chars[idx] = CHARS[randInt(0, CHARS.length - 1)];
          col.charSwapInterval = rand(80, 320);
        }

        if (col.state === 'falling') {
          col.y += col.speed * dtSec;

          // Draw the column
          ctx.save();
          ctx.font = `${col.fontSize}px 'JetBrains Mono', monospace`;
          ctx.textBaseline = 'top';

          for (let i = 0; i < col.charCount; i++) {
            const charY = col.y + i * col.spacing;
            if (charY < -col.spacing || charY > H + col.spacing) continue;

            // Fade out towards tail
            const tailFade = 1 - i / col.charCount;
            const alpha = col.opacity * tailFade;
            if (alpha <= 0.005) continue;

            // Very subtle glow
            ctx.shadowBlur = 1;
            ctx.shadowColor = `rgba(16,185,129,${alpha * 0.7})`;
            ctx.fillStyle = `rgba(16,185,129,${alpha})`;
            ctx.fillText(col.chars[i], col.x, charY);
          }

          ctx.restore();

          // Column fell off screen — decide next state
          const tailY = col.y + col.charCount * col.spacing;
          if (tailY > H) {
            // Random: pause and restart or immediately restart or fade
            const r = Math.random();
            if (r < 0.25) {
              col.state = 'pausing';
              col.pauseTimer = 0;
              col.pauseDuration = rand(400, 2200);
            } else if (r < 0.55) {
              col.state = 'fading';
              col.fadeProgress = 0;
            } else {
              // Restart immediately
              const newCol = createColumn(W, H, col.x + rand(-8, 8));
              cols[ci] = newCol;
            }
          }
        } else if (col.state === 'pausing') {
          col.pauseTimer += dt;
          if (col.pauseTimer >= col.pauseDuration) {
            const newCol = createColumn(W, H, col.x + rand(-8, 8));
            cols[ci] = newCol;
          }
        } else if (col.state === 'fading') {
          col.fadeProgress += dtSec * 0.9;
          const fadedOpacity = col.opacity * (1 - col.fadeProgress);

          if (fadedOpacity > 0.005) {
            ctx.save();
            ctx.font = `${col.fontSize}px 'JetBrains Mono', monospace`;
            ctx.textBaseline = 'top';

            for (let i = 0; i < col.charCount; i++) {
              const charY = col.y + i * col.spacing;
              if (charY < -col.spacing || charY > H + col.spacing) continue;

              const tailFade = 1 - i / col.charCount;
              const alpha = fadedOpacity * tailFade;
              if (alpha <= 0.005) continue;

              ctx.shadowBlur = 1;
              ctx.shadowColor = `rgba(16,185,129,${alpha * 0.5})`;
              ctx.fillStyle = `rgba(16,185,129,${alpha})`;
              ctx.fillText(col.chars[i], col.x, charY);
            }

            ctx.restore();
          } else {
            col.state = 'dead';
          }

          col.y += col.speed * dtSec;
        } else if (col.state === 'dead') {
          // Slowly restart with random delay
          col.pauseTimer = (col.pauseTimer || 0) + dt;
          if (col.pauseTimer > rand(500, 2000)) {
            const newCol = createColumn(W, H, col.x + rand(-10, 10));
            cols[ci] = newCol;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(resizeTimer);
    };
  }, []);

  // If reduced motion, render nothing
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}

export default memo(MatrixRain);
