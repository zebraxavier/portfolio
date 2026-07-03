import { useContext } from 'react';
import { AnalyticsContext } from '../context/analyticsContextRef';

/** useAnalytics — access all GA4 event tracking functions */
export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return ctx;
}
