import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cursor from './components/Cursor/Cursor';

// Route-level code splitting
const Home         = lazy(() => import('./features/home/Home'));
const About        = lazy(() => import('./features/about/About'));
const Projects     = lazy(() => import('./features/projects/Projects'));
const Certificates = lazy(() => import('./features/certificates/Certificates'));
const Education    = lazy(() => import('./features/education/Education'));
const Contact      = lazy(() => import('./features/contact/Contact'));

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
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-label="Loading page"
      role="status"
    >
      <span className="spinner" style={{ width: 32, height: 32, borderWidth: 2 }} />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  // Apply custom cursor class — only on pointer devices
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  return (
    <HelmetProvider>
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
            <Route path="/contact"      element={<Contact />}      />
            <Route path="*"             element={<NotFound />}     />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </HelmetProvider>
  );
}
