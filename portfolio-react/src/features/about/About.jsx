import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './About.module.css';

const SKILLS = [
  { name: 'JavaScript', level: 92 }, { name: 'React',      level: 90 },
  { name: 'Node.js',    level: 85 }, { name: 'MongoDB',    level: 82 },
  { name: 'CSS / SCSS', level: 88 }, { name: 'TypeScript', level: 78 },
  { name: 'C / C++',    level: 70 }, { name: 'Java',       level: 68 },
];

const TOOLS = ['Git', 'Docker', 'Figma', 'VS Code', 'Linux', 'AWS', 'REST APIs', 'Jest'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] },
});

export default memo(function About() {
  return (
    <PageTransition>
      <SEO
        title="About"
        description="Learn about Xavier Leonard — full-stack developer with 5+ years building scalable web applications."
        path="/about"
      />

      <main className={`page ${styles.about}`}>
        <div className="container">

          {/* Header */}
          <motion.header className={styles.pageHeader} {...fadeUp()}>
            <p className="section-label">01 — About</p>
            <h1 className={`section-title ${styles.heading}`}>
              The developer<br />behind the code
            </h1>
          </motion.header>

          <div className={styles.grid}>
            {/* Photo + bio */}
            <motion.div className={styles.left} {...fadeUp(0.1)}>
              <div className={styles.photoWrap}>
                <img
                  src="/photo.jpg"
                  alt="Xavier Leonard, full-stack developer"
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
                  Hello — I&apos;m Xavier, a developer based in the digital universe.
                  With 5+ years of experience I&apos;ve built everything from real-time
                  dashboards to full e-commerce platforms. I care deeply about
                  performance, accessibility, and interfaces that feel inevitable.
                </p>
                <p className={styles.bio} style={{ marginTop: 'var(--space-4)' }}>
                  My approach: understand the problem first, then engineer the
                  cleanest solution possible. I thrive at the intersection of
                  design and engineering.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.section aria-label="Skills" {...fadeUp(0.22)}>
                <h2 className={styles.sectionSub}>Technical Skills</h2>
                <ul className={styles.skillsList} role="list">
                  {SKILLS.map(({ name, level }) => (
                    <li key={name} className={styles.skillRow}>
                      <div className={styles.skillMeta}>
                        <span className={styles.skillName}>{name}</span>
                        <span className={styles.skillPct}>{level}%</span>
                      </div>
                      <div className={styles.skillBar} role="progressbar"
                        aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}
                        aria-label={`${name} proficiency`}>
                        <motion.div
                          className={styles.skillFill}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true, margin: '-30px' }}
                          transition={{ duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Tools */}
              <motion.section aria-label="Tools" {...fadeUp(0.3)}>
                <h2 className={styles.sectionSub}>Tools & Ecosystem</h2>
                <ul className={styles.toolGrid} role="list">
                  {TOOLS.map(tool => (
                    <motion.li
                      key={tool}
                      className={styles.tool}
                      whileHover={{ scale: 1.05, y: -1 }}
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
