import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowRightLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './Home.module.css';

const STATS = [
  { value: '1+',  label: 'Yr. exp.'  },
  { value: '3+',  label: 'Projects'  },
  { value: '3',   label: 'Certs'     },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default memo(function Home() {
  const typed = useTypewriter(
    ['Full-Stack Developer', 'MCA Student', 'AI & Automation Explorer', 'Cloud Enthusiast'],
    75, 40, 1800
  );
  const { trackNavClick } = useAnalytics();

  return (
    <PageTransition>
      <SEO
        title="Xavier Leonard — Full-Stack Developer"
        description="Computer Science graduate and MCA student specialising in full-stack web development, AI, and cloud technologies. Open to software development and ERP roles."
        path="/"
        keywords="Xavier Leonard, full-stack developer, MCA, computer science, MERN, MongoDB, JavaScript, Tamil Nadu, hire developer"
      />

      <main className={`page ${styles.home}`} aria-label="Home">
        <div className={`container ${styles.content}`}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className={styles.heroGrid}
          >
            {/* Left — text */}
            <div className={styles.heroText}>
              {/* Mono label */}
              <motion.div variants={item} className={styles.label}>
                <span className="dot-accent" aria-hidden="true" />
                <span className="mono">Available for opportunities</span>
              </motion.div>

              {/* Name */}
              <motion.h1 variants={item} className={styles.name}>
                Xavier<br />Leonard
              </motion.h1>

              {/* Typewriter role */}
              <motion.p variants={item} className={styles.role} aria-live="polite">
                <span className={styles.typed}>{typed}</span>
                <span className={styles.cursor} aria-hidden="true">|</span>
              </motion.p>

              {/* Description */}
              <motion.p variants={item} className={styles.desc}>
                Computer Science graduate currently pursuing my MCA — building
                software systems at the intersection of web development, AI automation,
                and cloud infrastructure. Based in Tamil Nadu, India.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} className={styles.ctas}>
                <Link
                  to="/projects"
                  className={styles.btnPrimary}
                  data-cursor-hover
                  onClick={() => trackNavClick('View Work')}
                >
                  View Work
                  <RiArrowRightLine size={16} aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className={styles.btnGhost}
                  data-cursor-hover
                  onClick={() => trackNavClick('Get In Touch')}
                >
                  Get In Touch
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.ul variants={item} className={styles.stats} role="list" aria-label="Career stats">
                {STATS.map(({ value, label }) => (
                  <li key={label} className={styles.stat}>
                    <span className={styles.statVal}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right — glass card */}
            <motion.div
              variants={item}
              className={styles.card}
              aria-hidden="true"
            >
              {/* Edge light */}
              <div className={styles.cardEdge} />

              <div className={styles.cardAvatar}>
                <img
                  src="/photo.jpg"
                  alt="Xavier Leonard"
                  width="240"
                  height="240"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Terminal-style badge */}
              <div className={styles.cardBadge}>
                <span className={styles.badgeDot} />
                <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  status: open to work
                </span>
              </div>

              {/* Skill chips — real tech stack */}
              <div className={styles.chips}>
                {['JavaScript', 'MongoDB', 'C / C++', 'SQL'].map(s => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          aria-hidden="true"
        >
          <span className={styles.scrollTrack}>
            <span className={styles.scrollDot} />
          </span>
          <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            scroll
          </span>
        </motion.div>
      </main>
    </PageTransition>
  );
});
