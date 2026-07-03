import { memo, useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './About.module.css';

const SKILLS = [
  { name: 'JavaScript',    level: 80 },
  { name: 'C / C++',       level: 75 },
  { name: 'HTML & CSS',    level: 82 },
  { name: 'MongoDB',       level: 78 },
  { name: 'SQL / DBMS',    level: 76 },
  { name: 'Python',        level: 65 },
  { name: 'Java',          level: 60 },
  { name: 'Data Recovery', level: 70 },
];

const TOOLS = [
  'VS Code', 'GitHub', 'MongoDB',
  'Microsoft SQL Server', 'Eclipse',
  'UiPath', 'Oracle Cloud', 'Linux',
];

const STATS = [
  { value: 1,   suffix: '+', label: 'Yr. exp.'   },
  { value: 3,   suffix: '+', label: 'Projects'   },
  { value: 3,   suffix: '',  label: 'Certs'      },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] },
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xavier Leonard E',
  description:
    'Computer Science graduate and MCA student specialising in full-stack web development, AI automation, and cloud infrastructure.',
  knowsAbout: SKILLS.map(s => s.name),
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'NPR Arts and Science College, Natham',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'KGISL Institute of Information Management, Coimbatore',
    },
  ],
};

export default memo(function About() {
  return (
    <PageTransition>
      <SEO
        title="About"
        description="Xavier Leonard — Computer Science graduate pursuing MCA, with hands-on experience in system engineering, data recovery, and full-stack web development."
        path="/about"
        keywords="Xavier Leonard, full-stack developer, MCA, computer science, MongoDB, JavaScript, Tamil Nadu"
        schema={personSchema}
      />

      <main className={`page ${styles.about}`}>
        <div className="container">

          <motion.header className={styles.pageHeader} {...fadeUp()}>
            <p className="section-label">01 — About</p>
            <h1 className={`section-title ${styles.heading}`}>
              The developer<br />behind the code
            </h1>
          </motion.header>

          {/* Animated stats row */}
          <motion.ul
            className={styles.statsRow}
            role="list"
            aria-label="Career statistics"
            {...fadeUp(0.05)}
          >
            {STATS.map(({ value, suffix, label }) => (
              <li key={label} className={styles.statItem}>
                <AnimatedNumber value={value} suffix={suffix} />
                <span className={styles.statLabel}>{label}</span>
              </li>
            ))}
          </motion.ul>

          <div className={styles.grid}>
            {/* Photo */}
            <motion.div className={styles.left} {...fadeUp(0.1)}>
              <div className={styles.photoWrap}>
                <img
                  src="/photo.jpg"
                  alt="Xavier Leonard, full-stack developer based in Tamil Nadu"
                  width="320"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className={styles.photo}
                />
                <div className={styles.photoOverlay} aria-hidden="true" />
              </div>
            </motion.div>

            <div className={styles.right}>
              {/* Bio */}
              <motion.div className={styles.bioCard} {...fadeUp(0.15)}>
                <p className={styles.bio}>
                  I&apos;m Xavier — a Computer Science graduate from Tamil Nadu, currently
                  deepening my expertise through a Master of Computer Applications at KGISL
                  Institute of Information Management, Coimbatore. I have hands-on experience
                  from a system engineering internship at KG Systems where I performed data
                  recovery operations and maintained critical IT infrastructure.
                </p>
                <p className={styles.bio} style={{ marginTop: 'var(--space-4)' }}>
                  I&apos;m certified in MongoDB, UiPath Automation, and Oracle Cloud — and I
                  genuinely enjoy the process of solving hard problems with clean code. My
                  focus is on building reliable software systems, contributing to ERP solutions,
                  and exploring the growing space between automation and AI.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.section aria-label="Technical skills" {...fadeUp(0.22)}>
                <h2 className={styles.sectionSub}>Technical Skills</h2>
                <ul className={styles.skillsList} role="list">
                  {SKILLS.map(({ name, level }) => (
                    <SkillBar key={name} name={name} level={level} />
                  ))}
                </ul>
              </motion.section>

              {/* Tools */}
              <motion.section aria-label="Tools and ecosystem" {...fadeUp(0.3)}>
                <h2 className={styles.sectionSub}>Tools & Ecosystem</h2>
                <ul className={styles.toolGrid} role="list">
                  {TOOLS.map(tool => (
                    <motion.li
                      key={tool}
                      className={styles.tool}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      {tool}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
});

/* ── Animated number counter ── */
const AnimatedNumber = memo(function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setDisplay(value); return; }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, prefersReduced]);

  return (
    <span ref={ref} className={styles.statValue} aria-label={`${value}${suffix}`}>
      {display}{suffix}
    </span>
  );
});

/* ── Skill bar row ── */
const SkillBar = memo(function SkillBar({ name, level }) {
  return (
    <li className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPct}>{level}%</span>
      </div>
      <div
        className={styles.skillBar}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency ${level}%`}
      >
        <motion.div
          className={styles.skillFill}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </li>
  );
});
