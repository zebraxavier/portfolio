import { useCallback, memo } from 'react';
import { AnalyticsContext } from './analyticsContextRef';

export { AnalyticsContext } from './analyticsContextRef';

function gtag(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export const AnalyticsProvider = memo(function AnalyticsProvider({ children }) {
  const track = useCallback((eventName, params = {}) => {
    gtag('event', eventName, params);
  }, []);

  const trackResumeDownload = useCallback(() => track('resume_download',         { event_category: 'Resume' }),               [track]);
  const trackResumePreview  = useCallback(() => track('resume_preview',          { event_category: 'Resume' }),               [track]);
  const trackResumeHover    = useCallback(() => track('resume_button_hover',     { event_category: 'Resume' }),               [track]);
  const trackGitHubClick    = useCallback((p = '') => track('github_click',      { event_category: 'Engagement', project: p }), [track]);
  const trackLinkedInClick  = useCallback(() => track('linkedin_click',          { event_category: 'Engagement' }),           [track]);
  const trackProjectView    = useCallback((t) => track('project_view',           { event_category: 'Projects', project: t }), [track]);
  const trackProjectDemo    = useCallback((t) => track('project_demo_click',     { event_category: 'Projects', project: t }), [track]);
  const trackContactSubmit  = useCallback(() => track('contact_form_submission', { event_category: 'Contact' }),              [track]);
  const trackThemeChange    = useCallback((t) => track('theme_change',           { event_category: 'UI', theme: t }),         [track]);
  const trackNavClick       = useCallback((l) => track('navigation_click',       { event_category: 'Navigation', label: l }), [track]);
  const trackScrollDepth    = useCallback((p) => track('scroll_depth',           { event_category: 'Engagement', percent: p }), [track]);

  return (
    <AnalyticsContext.Provider value={{
      track,
      trackResumeDownload, trackResumePreview, trackResumeHover,
      trackGitHubClick,    trackLinkedInClick,
      trackProjectView,    trackProjectDemo,
      trackContactSubmit,  trackThemeChange,
      trackNavClick,       trackScrollDepth,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
});
