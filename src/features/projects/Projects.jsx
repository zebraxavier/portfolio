import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RiExternalLinkLine, RiGithubLine, RiArrowRightUpLine } from 'react-icons/ri';
import PageTransition from '../../components/PageTransition/PageTransition';
import SEO from '../../components/SEO/SEO';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'neon',
    num: '01',
    title: 'Project Neon',
    description:
      'Futuristic social media dashboard with real-time data visualization, customizable widgets, and live analytics.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    link: '#',
    github: '#',
    status: 'Live',
  },
  {
    id: 'cybermart',
    num: '02',
    title: 'CyberMart',
    description:
      'E-commerce platform with cyberpunk aesthetic — Stripe payments, cart management, and secure authentication.',
    tags: ['Vue.js', 'Stripe', 'Firebase', 'Tailwind'],
    link: '#',
    github: '#',
    status: 'Live',
  },
  {
    id: 'ai-portfolio',
    num: '03',
    title: 'AI Portfolio Generator',
    description:
      'Generative AI tool that produces personalized portfolio websites from a structured developer profile.',
    tags: ['JavaScript', 'OpenAI API', 'HTML/CSS'],
    link: '#',
    github: '#',
    status: 'Beta',
  },
  {
    id: 'datastream',
    num: '04',
    title: 'Data Stream',
    description:
      'Real-time IoT data pipeline built on microservices — handles thousands of device events per second.',
    tags: ['Node.js', 'WebSocket', 'MongoDB', 'Docker'],
    link: '#',
    github: '#',
    status: 'Live',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
};

export default memo(function Projects() {
  return (
    <PageTransition>
      <SEO
        title="Projects"
        description="Selected work by Xavier Leonard — full-stack web applications built with React, Node.js, and MongoDB."
        path="/projects"
      />

      <main className={`page ${styles.projects}`}>
        <div className="container">

          {/* Header */}
          <motion.header
            className={styles.pageHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="section-label">02 — Work</p>
            <h1 className={`section-title ${styles.heading}`}>
              Selected projects
            </h1>
          </motion.header>

          {/* Project list */}
          <motion.ol
            className={styles.list}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
            aria-label="Projects list"
          >
            {PROJECTS.map((project) => (
              <motion.li
                key={project.id}
                variants={cardVariants}
                transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </main>
    </PageTransition>
  );
});

/* ── ProjectCard — memoised to prevent sibling re-renders ── */
const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      aria-label={project.title}
    >
      {/* Top edge light */}
      <div className={styles.edgeLight} aria-hidden="true" />

      <div className={styles.cardInner}>
        {/* Left meta */}
        <div className={styles.meta}>
          <span className={styles.num}>{project.num}</span>
          <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
            {project.status}
          </span>
        </div>

        {/* Content */}
        <div className={styles.body}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.desc}>{project.description}</p>

          <ul className={styles.tags} role="list" aria-label="Technologies">
            {project.tags.map(tag => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
            aria-label={`Live demo of ${project.title}`}
            data-cursor-hover
          >
            <RiExternalLinkLine size={14} aria-hidden="true" />
            <span>Demo</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghBtn}
            aria-label={`GitHub repository for ${project.title}`}
            data-cursor-hover
          >
            <RiGithubLine size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
});
