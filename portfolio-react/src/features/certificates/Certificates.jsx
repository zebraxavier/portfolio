import { memo } from 'react';
import { motion } from 'framer-motion';
import { RiAwardLine, RiExternalLinkLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './Certificates.module.css';

const CERTS = [
  {
    id: 'comp',
    title: 'College Competition Participant',
    issuer: 'Dept. of Computer Science — NPR Arts & Science College',
    date: null,
    link: 'https://drive.google.com/drive/folders/1Lj_vs5oe1xRJlqboBpQJDZvmN5Hl071U?usp=drive_link',
  },
  {
    id: 'css',
    title: 'Advanced CSS and Sass',
    issuer: 'Design Masters',
    date: 'Jan 2023',
    link: '#',
  },
  {
    id: 'react',
    title: 'React — The Complete Guide',
    issuer: 'Online Courses Inc.',
    date: 'Sep 2022',
    link: '#',
  },
  {
    id: 'node',
    title: 'Node.js, Express & MongoDB',
    issuer: 'Server-side Gurus',
    date: 'Jun 2022',
    link: '#',
  },
];

export default memo(function Certificates() {
  return (
    <PageTransition>
      <SEO
        title="Certificates"
        description="Professional certifications and achievements by Xavier Leonard."
        path="/certificates"
      />

      <main className={`page ${styles.certs}`}>
        <div className="container">

          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">04 — Credentials</p>
            <h1 className={`section-title ${styles.heading}`}>Certificates</h1>
          </motion.header>

          <ul className="cards-grid" role="list">
            {CERTS.map((cert, i) => (
              <motion.li
                key={cert.id}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.42, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              >
                <CertCard cert={cert} />
              </motion.li>
            ))}
          </ul>
        </div>
      </main>
    </PageTransition>
  );
});

const CertCard = memo(function CertCard({ cert }) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      aria-label={cert.title}
    >
      <div className={styles.edgeLight} aria-hidden="true" />

      <div className={styles.iconWrap} aria-hidden="true">
        <RiAwardLine size={18} />
      </div>

      <h2 className={styles.title}>{cert.title}</h2>
      <p className={styles.issuer}>{cert.issuer}</p>

      <div className={styles.footer}>
        {cert.date && (
          <span className={styles.date}>{cert.date}</span>
        )}
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credLink}
          aria-label={`View credential: ${cert.title}`}
          data-cursor-hover
        >
          View
          <RiExternalLinkLine size={12} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
});
