import { memo } from 'react';
import { motion } from 'framer-motion';
import { RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './Education.module.css';

const EDUCATION = [
  {
    id: 'uni',
    institution: 'University of Technology',
    degree: 'B.Sc. Computer Science',
    duration: '2018 – 2022',
    location: 'On-campus',
    description:
      'Focused on algorithms, data structures, and software engineering. Final year project on machine learning applications in production systems.',
    highlights: ['Algorithms', 'Data Structures', 'Machine Learning', 'Software Architecture'],
  },
  {
    id: 'hs',
    institution: 'Downtown High School',
    degree: 'High School Diploma',
    duration: '2016 – 2018',
    location: 'On-campus',
    description:
      'Mathematics and physics specialisation, building the analytical foundation for a career in computer science and engineering.',
    highlights: ['Mathematics', 'Physics', 'Computing'],
  },
  {
    id: 'bootcamp',
    institution: 'Online Course Platform',
    degree: 'Full-Stack Web Developer Bootcamp',
    duration: '2023',
    location: 'Remote',
    description:
      'Comprehensive curriculum covering the MERN stack, RESTful APIs, authentication, deployment, and modern frontend development patterns.',
    highlights: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'],
  },
];

export default memo(function Education() {
  return (
    <PageTransition>
      <SEO
        title="Education"
        description="Educational background and qualifications of Xavier Leonard."
        path="/education"
      />

      <main className={`page ${styles.education}`}>
        <div className="container">

          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">05 — Background</p>
            <h1 className={`section-title ${styles.heading}`}>Education</h1>
          </motion.header>

          {/* Timeline */}
          <div className={styles.timeline} role="list" aria-label="Education timeline">
            {/* Animated vertical line */}
            <motion.div
              className={styles.timelineLine}
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              style={{ transformOrigin: 'top' }}
            />

            {EDUCATION.map((edu, i) => (
              <motion.article
                key={edu.id}
                className={styles.item}
                role="listitem"
                initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.44, delay: 0.2 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                aria-label={`${edu.institution} — ${edu.degree}`}
              >
                {/* Timeline dot */}
                <div className={styles.dot} aria-hidden="true" />

                <motion.div
                  className={styles.card}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                >
                  <div className={styles.edgeLight} aria-hidden="true" />

                  <div className={styles.cardTop}>
                    <div>
                      <h2 className={styles.institution}>{edu.institution}</h2>
                      <p className={styles.degree}>{edu.degree}</p>
                    </div>
                    <div className={styles.cardMeta}>
                      <span className={styles.metaItem}>
                        <RiTimeLine size={11} aria-hidden="true" />
                        {edu.duration}
                      </span>
                      <span className={styles.metaItem}>
                        <RiMapPinLine size={11} aria-hidden="true" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <p className={styles.desc}>{edu.description}</p>

                  <ul className={styles.highlights} role="list" aria-label="Key topics">
                    {edu.highlights.map(h => (
                      <li key={h} className={styles.highlight}>{h}</li>
                    ))}
                  </ul>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
});
