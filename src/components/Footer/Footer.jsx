import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RiGithubLine, RiLinkedinLine, RiTwitterXLine } from 'react-icons/ri';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './Footer.module.css';

const SOCIAL = [
  { href: 'https://github.com/xavierleonard',      label: 'GitHub',   icon: <RiGithubLine size={16} />,    type: 'github'   },
  { href: 'https://linkedin.com/in/xavierleonard', label: 'LinkedIn', icon: <RiLinkedinLine size={16} />,  type: 'linkedin' },
  { href: 'https://twitter.com/xavierleonard',     label: 'X',        icon: <RiTwitterXLine size={16} />,  type: 'twitter'  },
];

const NAV = [
  { to: '/about',    label: 'About'   },
  { to: '/projects', label: 'Work'    },
  { to: '/resume',   label: 'Resume'  },
  { to: '/contact',  label: 'Hire'    },
];

const Footer = memo(function Footer() {
  const { trackGitHubClick, trackLinkedInClick, trackNavClick } = useAnalytics();

  const handleSocialClick = useCallback((type) => {
    if (type === 'github')   trackGitHubClick();
    if (type === 'linkedin') trackLinkedInClick();
  }, [trackGitHubClick, trackLinkedInClick]);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topLine} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <span className={styles.brandName}>Xavier Leonard E</span>
          <span className={styles.brandMono}>Full-Stack Developer · MCA Student</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className={styles.links} role="list">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={styles.link}
                  onClick={() => trackNavClick(label)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <ul className={styles.social} role="list" aria-label="Social links">
            {SOCIAL.map(({ href, label, icon, type }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialBtn}
                  onClick={() => handleSocialClick(type)}
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Xavier Leonard E
          </p>
        </div>

      </div>
    </footer>
  );
});

export default Footer;
