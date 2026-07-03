import { useState, useEffect, useRef } from 'react';

/**
 * Typewriter hook — cycles through an array of strings.
 * @param {string[]} words
 * @param {number}   typeSpeed   ms per char
 * @param {number}   deleteSpeed ms per char delete
 * @param {number}   pauseMs     ms to pause at full word
 */
export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, pauseMs = 1800) {
  const [display, setDisplay]  = useState('');
  const [wordIdx, setWordIdx]  = useState(0);
  const [typing,  setTyping]   = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const word = words[wordIdx % words.length];

    if (typing) {
      if (display.length < word.length) {
        timeout.current = setTimeout(() => {
          setDisplay(word.slice(0, display.length + 1));
        }, typeSpeed);
      } else {
        timeout.current = setTimeout(() => setTyping(false), pauseMs);
      }
    } else {
      if (display.length > 0) {
        timeout.current = setTimeout(() => {
          setDisplay(display.slice(0, -1));
        }, deleteSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout.current);
  }, [display, typing, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return display;
}
