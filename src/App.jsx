import { lazy, Suspense, useEffect, useState, useCallback, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import SplashScreen from './components/SplashScreen/SplashScreen';
import MatrixRain from './components/MatrixRain/MatrixRain';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollDepth } from './hooks/useScrollDepth';
import { useAnalytics } from './hooks/useAnalytics';

// Route-level code splitting
const Home         = lazy(() => import('./features/home/Home'));
const About        = lazy(() => import('./features/about/About'));
const Projects     = lazy(() => import('./features/projects/Projects'));
const Certificates = lazy(() => import('./features/certificates/Certificates'));
const Education    = lazy(() => import('./features/education/Education'));
const Contact      = lazy(() => import('./features/contact/Contact'));
const Resume       = lazy(() => import('./features/resume/Resume'));

function NotFound() {
  return (
    <main
      className="page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <p className="section-label">Error</p>
      <h1
        className="section-title"
        style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', letterSpacing: '-0.05em' }}
      >
        404
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
        Page not found.
      </p>
    </main>
  );
}

function PageLoader() {
  return (
    <div
      style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-label="Loading page"
      role="status"
    >
      <span className="spinner" style={{ width: 28, height: 28, borderWidth: 2 }} />
    </div>
  );
}

/** Inner app — uses hooks that require context providers */
const AppInner = memo(function AppInner() {
  const location = useLocation();
  const { track } = useAnalytics();

  useSmoothScroll();
  useScrollDepth();

  // Custom cursor
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  // GA4 page_view on route change
  useEffect(() => {
    track('page_view', {
      page_path:  location.pathname,
      page_title: document.title,
    });
  }, [location.pathname, track]);

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"             element={<Home />}         />
            <Route path="/about"        element={<About />}        />
            <Route path="/projects"     element={<Projects />}     />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/education"    element={<Education />}    />
            <Route path="/resume"       element={<Resume />}       />
            <Route path="/contact"      element={<Contact />}      />
            <Route path="*"             element={<NotFound />}     />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </>
  );
});

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const onSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <HelmetProvider>
      <MatrixRain />
      <SplashScreen onDone={onSplashDone} />
      {splashDone && <AppInner />}
    </HelmetProvider>
  );
}
