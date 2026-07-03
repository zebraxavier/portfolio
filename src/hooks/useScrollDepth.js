import { useEffect, useRef } from 'react';
import { useAnalytics } from './useAnalytics';

/**
 * Fires scroll depth events at 25%, 50%, 75%, 100%.
 * Only fires each milestone once per page.
 */
export function useScrollDepth() {
  const { trackScrollDepth } = useAnalytics();
  const fired = useRef(new Set());

  useEffect(() => {
    fired.current.clear();

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      [25, 50, 75, 100].forEach(milestone => {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [trackScrollDepth]);
}
