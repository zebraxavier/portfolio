import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RiGithubLine, RiLinkedinLine, RiTwitterXLine } from 'react-icons/ri';
import styles from './Footer.module.css';

const SOCIAL = [
  { href: 'https://github.com/',   label: 'GitHub',   icon: <RiGithubLine size={16} />   },
  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: <RiLinkedinLine size={16} />  },
  { href: 'https://twitter.com/',  label: 'X',        icon: <RiTwitterXLine size={16} />  },
];

const NAV = [
  { to: '/about',    label: 'About'  },
  { to: '/projects', label: 'Work'   },
  { to: '/contact',  label: 'Hire'   },
];

const Footer = memo(function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topLine} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <span className={styles.brandName}>Xavier Leonard</span>
          <span className={styles.brandMono}>Full-Stack Developer</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className={styles.links} role="list">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <ul className={styles.social} role="list" aria-label="Social links">
            {SOCIAL.map(({ href, label, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialBtn}
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Xavier Leonard
          </p>
        </div>

      </div>
    </footer>
  );
});

export default Footer;
