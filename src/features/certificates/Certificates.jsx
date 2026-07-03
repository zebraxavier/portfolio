import { memo } from 'react';
import { motion } from 'framer-motion';
import { RiAwardLine, RiExternalLinkLine, RiShieldCheckLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import { useCardTilt } from '../../hooks/useCardTilt';
import styles from './Certificates.module.css';

const CERTS = [
  {
    id: 'mongodb',
    title: 'MongoDB Certification',
    issuer: 'MongoDB University',
    date: null,
    description: 'Foundational knowledge in NoSQL databases, document-based data modeling, and storage systems.',
    link: '#',
    icon: 'shield',
  },
  {
    id: 'uipath',
    title: 'UiPath Automation Certification',
    issuer: 'UiPath Academy',
    date: null,
    description: 'Basics of Robotic Process Automation (RPA) and end-to-end workflow automation design.',
    link: '#',
    icon: 'shield',
  },
  {
    id: 'oracle',
    title: 'Oracle Cloud Certification',
    issuer: 'Oracle University',
    date: null,
    description: 'Cloud computing fundamentals covering infrastructure, deployment models, and Oracle Cloud services.',
    link: '#',
    icon: 'shield',
  },
  {
    id: 'comp',
    title: 'College Competition Participant',
    issuer: 'Dept. of Computer Science — NPR Arts & Science College',
    date: null,
    description: 'Participated in departmental computer science competition, demonstrating technical problem-solving skills.',
    link: 'https://drive.google.com/drive/folders/1Lj_vs5oe1xRJlqboBpQJDZvmN5Hl071U?usp=drive_link',
    icon: 'award',
  },
];

const certsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Certifications by Xavier Leonard',
  itemListElement: CERTS.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      description: c.description,
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    },
  })),
};

export default memo(function Certificates() {
  return (
    <PageTransition>
      <SEO
        title="Certificates"
        description="Xavier Leonard's professional certifications — MongoDB, UiPath Automation, Oracle Cloud, and academic recognition from NPR Arts & Science College."
        path="/certificates"
        keywords="Xavier Leonard certificates, MongoDB certification, UiPath RPA, Oracle Cloud, computer science award"
        schema={certsSchema}
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
  const { ref, onMouseMove, onMouseLeave } = useCardTilt({ maxTilt: 5, scale: 1.02 });

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      aria-label={cert.title}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.edgeLight} aria-hidden="true" />

      <div className={styles.iconWrap} aria-hidden="true">
        {cert.icon === 'shield'
          ? <RiShieldCheckLine size={18} />
          : <RiAwardLine size={18} />
        }
      </div>

      <h2 className={styles.title}>{cert.title}</h2>
      <p className={styles.issuer}>{cert.issuer}</p>
      {cert.description && (
        <p className={styles.certDesc}>{cert.description}</p>
      )}

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
