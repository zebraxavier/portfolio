import { useState, useCallback } from 'react';

/**
 * Minimal toast hook — returns { toast, showToast }.
 * toast: { message, type: 'success' | 'error' } | null
 */
export function useToast(duration = 4000) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = 'success') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  return { toast, showToast };
}
