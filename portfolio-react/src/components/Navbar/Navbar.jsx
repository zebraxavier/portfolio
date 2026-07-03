import { useState, useEffect, useRef, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/',             label: 'Home'         },
  { to: '/about',        label: 'About'        },
  { to: '/projects',     label: 'Projects'     },
  { to: '/certificates', label: 'Certs'        },
  { to: '/education',    label: 'Education'    },
  { to: '/contact',      label: 'Contact'      },
];

const Navbar = memo(function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <NavLink to="/" className={styles.logo} aria-label="Xavier Leonard — Go to home">
            <span className={styles.logoMark} aria-hidden="true">XL</span>
            <span className={styles.logoDivider} aria-hidden="true" />
            <span className={styles.logoSub}>Portfolio</span>
          </NavLink>

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul className={styles.desktopNav} role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.active : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + hamburger */}
          <div className={styles.actions}>
            <NavLink to="/contact" className={styles.ctaBtn} aria-label="Hire me">
              Hire Me
            </NavLink>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.16 }}
                >
                  {menuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-nav"
              className={styles.mobileDrawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              aria-label="Mobile navigation"
            >
              <ul role="list">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.22 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                      }
                    >
                      <span className={styles.mobileLinkNum}>{String(i + 1).padStart(2, '0')}</span>
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
