import { memo } from 'react';
import { motion } from 'framer-motion';
import { RiMapPinLine, RiTimeLine, RiBookOpenLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './Education.module.css';

const EDUCATION = [
  {
    id: 'mca',
    institution: 'KGISL Institute of Information Management',
    location: 'Coimbatore, Tamil Nadu',
    degree: 'Master of Computer Applications (MCA)',
    duration: 'Aug 2025 — May 2027',
    status: 'In Progress',
    gpa: null,
    description:
      'Currently pursuing my postgraduate degree with a focus on advanced software engineering, cloud infrastructure, and database systems. Building deeper expertise in Python, computer networks, and operating systems.',
    highlights: ['Database Management Systems', 'Python', 'Web Development', 'Operating Systems', 'Computer Networks'],
  },
  {
    id: 'bsc',
    institution: 'NPR Arts and Science College, Natham',
    location: 'Dindigul, Tamil Nadu',
    degree: 'Bachelor of Computer Science (B.Sc.)',
    duration: 'Aug 2022 — May 2025',
    status: 'Completed',
    gpa: '6.9 / 10.0',
    description:
      'Graduated with a foundation in programming, data structures, and database management. Coursework covered core engineering principles across Java, web development, and operating systems.',
    highlights: ['Data Structures', 'Database Management Systems', 'Java', 'Web Development', 'Operating Systems'],
  },
];

const educationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xavier Leonard E',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'KGISL Institute of Information Management',
      address: { '@type': 'PostalAddress', addressLocality: 'Coimbatore', addressCountry: 'IN' },
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'NPR Arts and Science College',
      address: { '@type': 'PostalAddress', addressLocality: 'Natham', addressCountry: 'IN' },
    },
  ],
};

export default memo(function Education() {
  return (
    <PageTransition>
      <SEO
        title="Education"
        description="Xavier Leonard's academic background — B.Sc. Computer Science from NPR Arts & Science College and currently pursuing MCA at KGISL Institute, Coimbatore."
        path="/education"
        keywords="Xavier Leonard education, MCA KGISL, BSc Computer Science NPR College, Coimbatore, Tamil Nadu"
        schema={educationSchema}
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
                      {edu.gpa && (
                        <span className={styles.metaItem}>
                          <RiBookOpenLine size={11} aria-hidden="true" />
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status badge */}
                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <span className={`${styles.statusBadge} ${edu.status === 'In Progress' ? styles.inProgress : styles.completed}`}>
                      {edu.status}
                    </span>
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
