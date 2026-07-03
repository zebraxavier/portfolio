import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  RiDownloadLine,
  RiEyeLine,
  RiFilePdfLine,
  RiCheckLine,
} from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './Resume.module.css';

const RESUME_PDF_URL  = '/Xavier_Leonard_Resume.pdf';
const RESUME_VIEW_URL = '/Xavier_Leonard_Resume.pdf';

const HIGHLIGHTS = [
  { label: 'Degree',      value: 'B.Sc. CS'  },
  { label: 'Pursuing',    value: 'MCA'        },
  { label: 'Experience',  value: '1 yr'       },
  { label: 'Certs',       value: '3'          },
];

const resumeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xavier Leonard E',
  jobTitle: 'Full-Stack Developer',
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Bachelor of Computer Science', credentialCategory: 'degree' },
    { '@type': 'EducationalOccupationalCredential', name: 'Master of Computer Applications (In Progress)', credentialCategory: 'degree' },
    { '@type': 'EducationalOccupationalCredential', name: 'MongoDB Certification', credentialCategory: 'certificate' },
    { '@type': 'EducationalOccupationalCredential', name: 'UiPath Automation Certification', credentialCategory: 'certificate' },
    { '@type': 'EducationalOccupationalCredential', name: 'Oracle Cloud Certification', credentialCategory: 'certificate' },
  ],
};

export default memo(function Resume() {
  const { trackResumeDownload, trackResumePreview, trackResumeHover } = useAnalytics();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = useCallback(() => {
    trackResumeDownload();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  }, [trackResumeDownload]);

  const handlePreview = useCallback(() => {
    trackResumePreview();
  }, [trackResumePreview]);

  return (
    <PageTransition>
      <SEO
        title="Resume"
        description="Download Xavier Leonard's resume — Computer Science graduate, MCA student, certified in MongoDB, UiPath, and Oracle Cloud. 1 year system engineering experience."
        path="/resume"
        schema={resumeSchema}
        keywords="Xavier Leonard resume, CV, download, computer science, MCA, MongoDB, UiPath, Oracle Cloud"
      />

      <main className={`page ${styles.resumePage}`}>
        <div className="container">

          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">07 — Resume</p>
            <h1 className={`section-title ${styles.heading}`}>My résumé</h1>
          </motion.header>

          <div className={styles.layout}>
            {/* Glass resume card */}
            <motion.div
              className={styles.card}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.edgeLight} aria-hidden="true" />

              {/* PDF icon + title */}
              <div className={styles.cardTop}>
                <div className={styles.fileIcon} aria-hidden="true">
                  <RiFilePdfLine size={28} />
                </div>
                <div>
                  <h2 className={styles.cardTitle}>Xavier Leonard E — CV</h2>
                  <p className={styles.cardMeta}>Full-Stack Developer · MCA Student · April 2026</p>
                </div>
              </div>

              {/* Highlights grid */}
              <ul className={styles.highlights} role="list" aria-label="Resume highlights">
                {HIGHLIGHTS.map(({ label, value }) => (
                  <li key={label} className={styles.highlight}>
                    <span className={styles.hlValue}>{value}</span>
                    <span className={styles.hlLabel}>{label}</span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className={styles.actions}>
                <motion.a
                  href={RESUME_PDF_URL}
                  download="Xavier_Leonard_Resume.pdf"
                  className={`${styles.downloadBtn} ${downloaded ? styles.downloaded : ''}`}
                  onClick={handleDownload}
                  onMouseEnter={trackResumeHover}
                  aria-label="Download resume as PDF"
                  data-cursor-hover
                  whileHover={{ scale: downloaded ? 1 : 1.03, y: downloaded ? 0 : -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <motion.span
                    className={styles.btnIcon}
                    animate={downloaded ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    aria-hidden="true"
                  >
                    {downloaded ? <RiCheckLine size={15} /> : <RiDownloadLine size={15} />}
                  </motion.span>
                  <span>{downloaded ? 'Downloaded!' : 'Download PDF'}</span>
                </motion.a>

                <motion.a
                  href={RESUME_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.previewBtn}
                  onClick={handlePreview}
                  aria-label="Preview resume in new tab"
                  data-cursor-hover
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <RiEyeLine size={15} aria-hidden="true" />
                  <span>Preview</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Side info */}
            <motion.div
              className={styles.info}
              initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <h2 className={styles.infoTitle}>What you&apos;ll find</h2>
              <ul className={styles.infoList} role="list">
                {[
                  'System engineering internship at KG Systems',
                  'B.Sc. Computer Science + MCA (in progress)',
                  'MongoDB, UiPath & Oracle Cloud certifications',
                  'Projects in AI, DBMS & data systems',
                  'Technical skills: C, C++, JavaScript, SQL',
                ].map(infoItem => (
                  <li key={infoItem} className={styles.infoItem}>
                    <span className={styles.dot} aria-hidden="true" />
                    {infoItem}
                  </li>
                ))}
              </ul>

              <p className={styles.note}>
                Resume updated April 2026.
                Reach out via the{' '}
                <a href="/contact" className={styles.noteLink}>contact page</a>
                {' '}for the latest version or a referral.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
});
